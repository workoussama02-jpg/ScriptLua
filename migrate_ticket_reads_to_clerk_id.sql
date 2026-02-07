-- Migration: Convert ticket_reads.user_id from UUID to TEXT (clerk_id)
-- This fixes RLS policy compatibility with Clerk authentication

-- Step 1: Add temporary column for clerk_id
ALTER TABLE ticket_reads ADD COLUMN user_clerk_id TEXT;

-- Step 2: Populate clerk_id values from users table
UPDATE ticket_reads
SET user_clerk_id = users.clerk_id
FROM users
WHERE ticket_reads.user_id = users.id;

-- Step 3: Drop existing policies (they reference the old column)
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;

-- Step 4: Drop foreign key constraint
ALTER TABLE ticket_reads DROP CONSTRAINT IF EXISTS ticket_reads_user_id_fkey;

-- Step 5: Drop old UUID column
ALTER TABLE ticket_reads DROP COLUMN user_id;

-- Step 6: Rename clerk_id column to user_id
ALTER TABLE ticket_reads RENAME COLUMN user_clerk_id TO user_id;

-- Step 7: Add NOT NULL constraint
ALTER TABLE ticket_reads ALTER COLUMN user_id SET NOT NULL;

-- Step 8: Create updated RLS policies using clerk_id directly
CREATE POLICY "Users can view their own read timestamps" ON ticket_reads
    FOR SELECT USING (user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can insert their own read timestamps" ON ticket_reads
    FOR INSERT WITH CHECK (
        user_id = auth.jwt() ->> 'sub'
        AND EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = ticket_reads.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND role IN ('moderator', 'admin'))
            )
        )
    );

CREATE POLICY "Users can update their own read timestamps" ON ticket_reads
    FOR UPDATE USING (user_id = auth.jwt() ->> 'sub');

-- Step 9: Enable RLS on ticket_reads
ALTER TABLE ticket_reads ENABLE ROW LEVEL SECURITY;

-- Step 10: Verify the migration
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'ticket_reads' AND column_name = 'user_id';

-- Check a few rows to ensure data integrity
SELECT tr.ticket_id, tr.user_id, tr.read_at, u.username
FROM ticket_reads tr
LEFT JOIN users u ON u.clerk_id = tr.user_id
LIMIT 5;