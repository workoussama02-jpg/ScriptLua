-- Fix ticket_reads.user_id to reference users.id instead of users.clerk_id
-- Similar to the fix we did for tickets.client_id

-- Step 1: Drop the problematic foreign key constraint
ALTER TABLE ticket_reads DROP CONSTRAINT IF EXISTS ticket_reads_user_id_fkey;

-- Step 2: Drop existing RLS policies (they might cause issues during column type change)
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can manage their own read timestamps" ON ticket_reads;

-- Drop any other policies that might exist
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'ticket_reads') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ticket_reads';
    END LOOP;
END $$;

-- Step 3: Change user_id column from TEXT to UUID
ALTER TABLE ticket_reads ALTER COLUMN user_id TYPE UUID USING (
    SELECT users.id FROM users WHERE users.clerk_id = ticket_reads.user_id
);

-- Step 4: Add the correct foreign key constraint pointing to users.id
ALTER TABLE ticket_reads ADD CONSTRAINT ticket_reads_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Step 5: Recreate RLS policies using database UUID instead of Clerk ID
-- Note: Since edge functions use service role, RLS is mainly for direct client access
-- However, we'll update them for consistency

-- Helper function to get user UUID from JWT
CREATE OR REPLACE FUNCTION get_user_id_from_jwt()
RETURNS UUID AS $$
DECLARE
    clerk_user_id TEXT;
    db_user_id UUID;
BEGIN
    -- Get clerk_id from JWT
    clerk_user_id := auth.jwt() ->> 'sub';
    
    -- Look up database UUID
    SELECT id INTO db_user_id
    FROM users
    WHERE clerk_id = clerk_user_id AND active = true;
    
    RETURN db_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public, pg_catalog';

CREATE POLICY "Users can view their own read timestamps" ON ticket_reads
    FOR SELECT USING (
        user_id = get_user_id_from_jwt()
    );

CREATE POLICY "Users can insert their own read timestamps" ON ticket_reads
    FOR INSERT WITH CHECK (
        user_id = get_user_id_from_jwt()
        AND EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = ticket_reads.ticket_id
            AND (
                tickets.client_id = get_user_id_from_jwt() OR
                EXISTS (SELECT 1 FROM users WHERE id = get_user_id_from_jwt() AND role IN ('moderator', 'admin'))
            )
        )
    );

CREATE POLICY "Users can update their own read timestamps" ON ticket_reads
    FOR UPDATE USING (
        user_id = get_user_id_from_jwt()
    );

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'ticket_reads' AND column_name = 'user_id';

SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'ticket_reads'::regclass;
