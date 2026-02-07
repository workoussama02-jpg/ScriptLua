-- Fix messages.sender_id to be UUID type and reference users.id
-- Comprehensive fix that handles all constraints and policies

BEGIN;

-- Step 1: Disable RLS temporarily
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies on messages
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, schemaname, tablename FROM pg_policies WHERE tablename = 'messages' AND schemaname = current_schema()) LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- Step 3: Drop ALL constraints on messages table
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'messages'::regclass
    ) LOOP
        EXECUTE 'ALTER TABLE messages DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname) || ' CASCADE';
    END LOOP;
END $$;

-- Step 4: Drop ALL indexes on messages
DO $$ 
DECLARE 
    r RECORD;
BEGIN
    FOR r IN (
        SELECT indexname, schemaname
        FROM pg_indexes 
        WHERE tablename = 'messages' 
        AND schemaname = 'public'
        AND indexname NOT LIKE '%_pkey'
    ) LOOP
        EXECUTE 'DROP INDEX IF EXISTS ' || quote_ident(r.schemaname) || '.' || quote_ident(r.indexname);
    END LOOP;
END $$;

-- Step 5: Set replica identity to allow deletes (needed for real-time publication)
ALTER TABLE messages REPLICA IDENTITY FULL;

-- WARNING: This step intentionally deletes all existing messages. Ensure a backup has been taken before running this migration.
-- Step 6: Delete all existing messages
DELETE FROM messages;

-- Step 7: Drop and recreate the sender_id column as UUID
ALTER TABLE messages DROP COLUMN sender_id;
ALTER TABLE messages ADD COLUMN sender_id UUID NOT NULL;

-- Step 8: Reset replica identity to default (uses primary key)
ALTER TABLE messages REPLICA IDENTITY DEFAULT;

-- Step 9: Re-add primary key if it was dropped
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'messages'::regclass 
        AND contype = 'p'
    ) THEN
        ALTER TABLE messages ADD PRIMARY KEY (id);
    END IF;
END $$;

-- Step 10: Add foreign key constraint to tickets
ALTER TABLE messages ADD CONSTRAINT messages_ticket_id_fkey 
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE;

-- Step 11: Add foreign key constraint to users
ALTER TABLE messages ADD CONSTRAINT messages_sender_id_fkey 
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE;

-- Step 11.5: Drop ticket_reads policies before altering column type
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;

-- Step 11.6: Update ticket_reads.user_id to UUID for consistency
ALTER TABLE ticket_reads DROP CONSTRAINT IF EXISTS ticket_reads_user_id_fkey;
ALTER TABLE ticket_reads DROP CONSTRAINT IF EXISTS ticket_reads_ticket_id_user_id_key;

-- Create a temporary UUID column and backfill using the clerk_id mapping
ALTER TABLE ticket_reads ADD COLUMN user_id_uuid UUID;

UPDATE ticket_reads tr
SET user_id_uuid = u.id
FROM users u
WHERE u.clerk_id = tr.user_id::text;

-- Ensure all rows were backfilled; fail if any NULLs remain
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM ticket_reads WHERE user_id_uuid IS NULL) THEN
        RAISE EXCEPTION 'Backfill failed: some ticket_reads rows could not map user_id to users.id';
    END IF;
END $$;

ALTER TABLE ticket_reads ALTER COLUMN user_id_uuid SET NOT NULL;

-- Drop old column and rename
ALTER TABLE ticket_reads DROP COLUMN user_id;
ALTER TABLE ticket_reads RENAME COLUMN user_id_uuid TO user_id;

-- Recreate constraints
ALTER TABLE ticket_reads ADD CONSTRAINT ticket_reads_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE ticket_reads ADD CONSTRAINT ticket_reads_ticket_id_user_id_key UNIQUE (ticket_id, user_id);

-- Step 12: Ensure get_user_id_from_jwt function exists
CREATE OR REPLACE FUNCTION get_user_id_from_jwt()
RETURNS UUID AS $$
DECLARE
    clerk_user_id TEXT;
    db_user_id UUID;
BEGIN
    clerk_user_id := auth.jwt() ->> 'sub';
    IF clerk_user_id IS NULL THEN
        RETURN NULL;
    END IF;
    SELECT id INTO db_user_id
    FROM users
    WHERE clerk_id = clerk_user_id AND active = true;
    IF NOT FOUND THEN
        RETURN NULL;
    END IF;
    RETURN db_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'pg_catalog, public';

-- Step 12.5: Update get_unread_message_count function to work with UUID sender_id
CREATE OR REPLACE FUNCTION get_unread_message_count(p_ticket_id UUID, p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    last_read_time TIMESTAMP WITH TIME ZONE;
    unread_count INTEGER;
BEGIN
    -- Get the last read timestamp for this user and ticket
    SELECT last_read_at INTO last_read_time
    FROM ticket_reads
    WHERE ticket_id = p_ticket_id AND user_id = p_user_id;

    -- If no read timestamp exists, all messages are unread (excluding user's own messages)
    IF last_read_time IS NULL THEN
        SELECT COUNT(*) INTO unread_count
        FROM messages
        WHERE ticket_id = p_ticket_id
        AND sender_id != p_user_id;
    ELSE
        -- Count messages created after the last read time (excluding user's own messages)
        SELECT COUNT(*) INTO unread_count
        FROM messages
        WHERE ticket_id = p_ticket_id
        AND created_at > last_read_time
        AND sender_id != p_user_id;
    END IF;

    RETURN unread_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 13: Re-enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Step 14: Create RLS policies
CREATE POLICY "Users can view messages for their tickets" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = get_user_id_from_jwt() OR
                tickets.assigned_to = get_user_id_from_jwt() OR
                EXISTS (
                    SELECT 1 FROM users 
                    WHERE clerk_id = (auth.jwt() ->> 'sub') 
                    AND role IN ('moderator', 'admin') 
                    AND active = true
                )
            )
        )
    );

CREATE POLICY "Users can insert messages for their tickets" ON messages
    FOR INSERT WITH CHECK (
        sender_id = get_user_id_from_jwt()
        AND EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = get_user_id_from_jwt() OR
                tickets.assigned_to = get_user_id_from_jwt() OR
                EXISTS (
                    SELECT 1 FROM users 
                    WHERE clerk_id = (auth.jwt() ->> 'sub') 
                    AND role IN ('moderator', 'admin') 
                    AND active = true
                )
            )
        )
    );

-- Step 14.5: Recreate ticket_reads policies to use UUID user_id
CREATE POLICY "Users can view their own read timestamps" ON ticket_reads
    FOR SELECT USING (user_id = get_user_id_from_jwt() AND EXISTS (SELECT 1 FROM users WHERE id = get_user_id_from_jwt() AND active = true));

CREATE POLICY "Users can insert their own read timestamps" ON ticket_reads
    FOR INSERT WITH CHECK (
        user_id = get_user_id_from_jwt() AND EXISTS (SELECT 1 FROM users WHERE id = get_user_id_from_jwt() AND active = true)
        AND EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = ticket_reads.ticket_id
            AND (
                tickets.client_id = get_user_id_from_jwt() OR
                tickets.assigned_to = get_user_id_from_jwt() OR
                EXISTS (SELECT 1 FROM users WHERE clerk_id = (auth.jwt() ->> 'sub') AND role IN ('moderator', 'admin') AND active = true)
            )
        )
    );

CREATE POLICY "Users can update their own read timestamps" ON ticket_reads
    FOR UPDATE USING (user_id = get_user_id_from_jwt() AND EXISTS (SELECT 1 FROM users WHERE id = get_user_id_from_jwt() AND active = true));

-- Step 15: Recreate useful indexes
CREATE INDEX idx_messages_ticket_id ON messages(ticket_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_ticket_reads_user_id ON ticket_reads(user_id);

COMMIT;
