-- Supabase Database Schema for Ticketing & Chat System

-- Overview
-- This schema implements a comprehensive ticketing and real-time chat system with role-based access control for the Script Lua application.

-- Database Functions (defined first to avoid dependency issues)

-- Role checking functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION is_admin(user_clerk_id TEXT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM users WHERE clerk_id = user_clerk_id AND role = 'admin' AND active = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_staff(user_clerk_id TEXT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM users WHERE clerk_id = user_clerk_id AND role IN ('moderator', 'admin') AND active = true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_moderator_stats(moderator_id TEXT)
RETURNS TABLE (
    open_tickets BIGINT,
    in_progress_tickets BIGINT,
    closed_today BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE status = 'open') as open_tickets,
        COUNT(*) FILTER (WHERE status = 'in-progress' AND assigned_to = moderator_id) as in_progress_tickets,
        COUNT(*) FILTER (WHERE status = 'closed' AND DATE(updated_at) = CURRENT_DATE) as closed_today
    FROM tickets
    WHERE assigned_to = moderator_id OR status = 'open';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Statistics
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS TABLE (
    total_tickets BIGINT,
    active_moderators BIGINT,
    total_users BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM tickets) as total_tickets,
        (SELECT COUNT(*) FROM users WHERE role = 'moderator' AND available = true) as active_moderators,
        (SELECT COUNT(*) FROM users) as total_users;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Unread Messages Count Function
CREATE OR REPLACE FUNCTION get_unread_message_count(p_ticket_id UUID, p_user_clerk_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    last_read_time TIMESTAMP WITH TIME ZONE;
    unread_count INTEGER;
BEGIN
    -- Get the last read timestamp for this user and ticket
    SELECT last_read_at INTO last_read_time
    FROM ticket_reads
    WHERE ticket_id = p_ticket_id AND user_id = p_user_clerk_id;

    -- If no read timestamp exists, all messages are unread (excluding user's own messages)
    IF last_read_time IS NULL THEN
        SELECT COUNT(*) INTO unread_count
        FROM messages
        WHERE ticket_id = p_ticket_id
        AND sender_id != p_user_clerk_id;
    ELSE
        -- Count messages created after the last read time (excluding user's own messages)
        SELECT COUNT(*) INTO unread_count
        FROM messages
        WHERE ticket_id = p_ticket_id
        AND created_at > last_read_time
        AND sender_id != p_user_clerk_id;
    END IF;

    RETURN unread_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Database Tables

-- 1. users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT,
    name TEXT,
    discord_username TEXT,
    discord_avatar TEXT,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'moderator', 'admin')),
    available BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.jwt() ->> 'sub' = clerk_id AND active = true);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.jwt() ->> 'sub' = clerk_id AND active = true);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (is_admin(auth.jwt() ->> 'sub'));

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (is_admin(auth.jwt() ->> 'sub'));

-- 2. tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'closed', 'escalated')),
    client_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    assigned_to TEXT REFERENCES users(clerk_id),
    assigned_to_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Tickets policies
CREATE POLICY "Clients can view their own tickets" ON tickets
    FOR SELECT USING (client_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));

CREATE POLICY "Clients can create tickets" ON tickets
    FOR INSERT WITH CHECK (client_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));

CREATE POLICY "Moderators can view assigned and open tickets" ON tickets
    FOR SELECT USING (
        is_staff(auth.jwt() ->> 'sub') AND (
            assigned_to = auth.jwt() ->> 'sub' OR
            status = 'open' OR
            is_admin(auth.jwt() ->> 'sub')
        )
    );

CREATE POLICY "Moderators can update tickets" ON tickets
    FOR UPDATE USING (is_staff(auth.jwt() ->> 'sub'));

-- 3. messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'moderator', 'admin')),
    sender_name TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    sender_avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Messages policies
CREATE POLICY "Users can view messages for their tickets" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                is_staff(auth.jwt() ->> 'sub')
            )
        ) AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true)
    );

CREATE POLICY "Users can insert messages for their tickets" ON messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                is_staff(auth.jwt() ->> 'sub')
            )
        ) AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true)
    );

-- 4. internal_notes (for moderators/admins)
CREATE TABLE IF NOT EXISTS internal_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL REFERENCES users(clerk_id),
    author_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE internal_notes ENABLE ROW LEVEL SECURITY;

-- Internal notes policies (only moderators and admins)
CREATE POLICY "Staff can view internal notes" ON internal_notes
    FOR SELECT USING (is_staff(auth.jwt() ->> 'sub'));

CREATE POLICY "Staff can create internal notes" ON internal_notes
    FOR INSERT WITH CHECK (is_staff(auth.jwt() ->> 'sub'));

-- 5. ticket_reads (for unread message tracking) - UPDATED TO USE CLERK_ID
CREATE TABLE IF NOT EXISTS ticket_reads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL, -- Changed from UUID to TEXT for clerk_id
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(ticket_id, user_id)
);

-- Enable RLS
ALTER TABLE ticket_reads ENABLE ROW LEVEL SECURITY;

-- Ticket reads policies - UPDATED FOR CLERK_ID
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
                is_staff(auth.jwt() ->> 'sub')
            )
        )
    );

CREATE POLICY "Users can update their own read timestamps" ON ticket_reads
    FOR UPDATE USING (user_id = auth.jwt() ->> 'sub');

-- Real-time Subscriptions

-- Enable real-time for tables (ignore errors if already added)
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE users;
EXCEPTION WHEN duplicate_object THEN
    -- Table might already be in publication, ignore error
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE internal_notes;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE ticket_reads;
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- Setup Instructions

-- 1. Create a new Supabase project
-- 2. Set up Clerk as a third-party auth provider:
--    - Go to https://dashboard.clerk.com/setup/supabase
--    - Select your Clerk application and activate the Supabase integration
--    - Copy the Clerk domain (e.g., your-app.clerk.accounts.dev)
--    - Go to https://supabase.com/dashboard → Your Project → Authentication → Sign In / Up
--    - Click "Add provider" → Select "Clerk" → Paste the Clerk domain
-- 3. Run the SQL schema in the Supabase SQL editor
-- 4. Update the configuration in script.js:
--    const SUPABASE_URL = 'https://your-project.supabase.co';
--    const SUPABASE_ANON_KEY = 'your-anon-key';
-- 5. Install Supabase client in your HTML:
--    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

-- Initial Admin Setup

-- After setting up the database, create your first admin user (only if it doesn't exist):

-- Replace with your Clerk user ID
INSERT INTO users (clerk_id, email, name, role)
SELECT 'your-clerk-user-id', 'admin@example.com', 'Admin User', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE clerk_id = 'your-clerk-user-id');

-- Testing the System

-- 1. Create test users with different roles
-- 2. Test ticket creation as a client
-- 3. Test ticket assignment as a moderator
-- 4. Test real-time chat between client and moderator
-- 5. Test admin user management

-- Security Notes

-- All tables use Row Level Security (RLS)
-- Users can only access their own data or data they're authorized to see
-- Real-time subscriptions are filtered by ticket access
-- Admin role has full access to all data
-- Moderators can only see tickets assigned to them or open tickets

-- Performance Considerations

-- Add indexes on frequently queried columns:
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_messages_ticket_id ON messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- Composite index for get_unread_message_count function performance
CREATE INDEX IF NOT EXISTS idx_messages_ticket_created_sender ON messages(ticket_id, created_at, sender_id);

-- Consider partitioning the messages table if you expect high volume

-- Database Migrations

-- Add active field to existing users table (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'active') THEN
        ALTER TABLE users ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Update existing policies to include active checks
-- Note: You'll need to drop and recreate policies, or use ALTER POLICY if supported

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;

-- Recreate policies with active checks
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.jwt() ->> 'sub' = clerk_id AND active = true);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.jwt() ->> 'sub' = clerk_id AND active = true);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (is_admin(auth.jwt() ->> 'sub'));

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (is_admin(auth.jwt() ->> 'sub'));

-- Update tickets policies
DROP POLICY IF EXISTS "Clients can view their own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients can create tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can view assigned and open tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can update tickets" ON tickets;

CREATE POLICY "Clients can view their own tickets" ON tickets
    FOR SELECT USING (client_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));

CREATE POLICY "Clients can create tickets" ON tickets
    FOR INSERT WITH CHECK (client_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));

CREATE POLICY "Moderators can view assigned and open tickets" ON tickets
    FOR SELECT USING (
        is_staff(auth.jwt() ->> 'sub') AND (
            assigned_to = auth.jwt() ->> 'sub' OR
            status = 'open' OR
            is_admin(auth.jwt() ->> 'sub')
        )
    );

CREATE POLICY "Moderators can update tickets" ON tickets
    FOR UPDATE USING (is_staff(auth.jwt() ->> 'sub'));

-- Update messages policies
DROP POLICY IF EXISTS "Users can view messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Users can insert messages for their tickets" ON messages;

CREATE POLICY "Users can view messages for their tickets" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                is_staff(auth.jwt() ->> 'sub')
            )
        ) AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true)
    );

CREATE POLICY "Users can insert messages for their tickets" ON messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                is_staff(auth.jwt() ->> 'sub')
            )
        ) AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true)
    );

-- Update internal_notes policies
DROP POLICY IF EXISTS "Staff can view internal notes" ON internal_notes;
DROP POLICY IF EXISTS "Staff can create internal notes" ON internal_notes;

CREATE POLICY "Staff can view internal notes" ON internal_notes
    FOR SELECT USING (is_staff(auth.jwt() ->> 'sub'));

CREATE POLICY "Staff can create internal notes" ON internal_notes
    FOR INSERT WITH CHECK (is_staff(auth.jwt() ->> 'sub'));

-- Add Discord fields to users table (run this if you have existing data)
-- ALTER TABLE users ADD COLUMN discord_username TEXT;
-- ALTER TABLE users ADD COLUMN discord_avatar TEXT;