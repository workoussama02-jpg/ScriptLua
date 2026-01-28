-- Supabase Database Schema for Ticketing & Chat System

-- Overview
-- This schema implements a comprehensive ticketing and real-time chat system with role-based access control for the Script Lua application.

-- Database Tables

-- 1. users
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT,
    name TEXT,
    discord_username TEXT,
    discord_avatar TEXT,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'moderator', 'admin')),
    available BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.jwt() ->> 'sub' = clerk_id);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.jwt() ->> 'sub' = clerk_id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role = 'admin'
        )
    );

-- 2. tickets
CREATE TABLE tickets (
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

-- Policies
CREATE POLICY "Clients can view their own tickets" ON tickets
    FOR SELECT USING (client_id = auth.jwt() ->> 'sub');

CREATE POLICY "Clients can create tickets" ON tickets
    FOR INSERT WITH CHECK (client_id = auth.jwt() ->> 'sub');

CREATE POLICY "Moderators can view assigned and open tickets" ON tickets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role IN ('moderator', 'admin')
        ) AND (
            assigned_to = auth.jwt() ->> 'sub' OR
            status = 'open' OR
            EXISTS (
                SELECT 1 FROM users
                WHERE clerk_id = auth.jwt() ->> 'sub'
                AND role = 'admin'
            )
        )
    );

CREATE POLICY "Moderators can update tickets" ON tickets
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role IN ('moderator', 'admin')
        )
    );

-- 3. messages
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'moderator', 'admin')),
    sender_name TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view messages for their tickets" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                EXISTS (
                    SELECT 1 FROM users
                    WHERE clerk_id = auth.jwt() ->> 'sub'
                    AND role IN ('moderator', 'admin')
                )
            )
        )
    );

CREATE POLICY "Users can insert messages for their tickets" ON messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM tickets
            WHERE tickets.id = messages.ticket_id
            AND (
                tickets.client_id = auth.jwt() ->> 'sub' OR
                tickets.assigned_to = auth.jwt() ->> 'sub' OR
                EXISTS (
                    SELECT 1 FROM users
                    WHERE clerk_id = auth.jwt() ->> 'sub'
                    AND role IN ('moderator', 'admin')
                )
            )
        )
    );

-- 4. internal_notes (for moderators/admins)
CREATE TABLE internal_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL REFERENCES users(clerk_id),
    author_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE internal_notes ENABLE ROW LEVEL SECURITY;

-- Policies (only moderators and admins)
CREATE POLICY "Staff can view internal notes" ON internal_notes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role IN ('moderator', 'admin')
        )
    );

CREATE POLICY "Staff can create internal notes" ON internal_notes
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE clerk_id = auth.jwt() ->> 'sub'
            AND role IN ('moderator', 'admin')
        )
    );

-- Database Functions

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

-- Real-time Subscriptions

-- Enable real-time for tables
-- Enable real-time for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE internal_notes;

-- Setup Instructions

-- 1. Create a new Supabase project
-- 2. Run the SQL schema in the Supabase SQL editor
-- 3. Update the configuration in script.js:
--    const SUPABASE_URL = 'https://your-project.supabase.co';
--    const SUPABASE_ANON_KEY = 'your-anon-key';
-- 4. Install Supabase client in your HTML:
--    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

-- Initial Admin Setup

-- After setting up the database, create your first admin user:

-- Replace with your Clerk user ID
INSERT INTO users (clerk_id, email, name, role)
VALUES ('your-clerk-user-id', 'admin@example.com', 'Admin User', 'admin');

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
CREATE INDEX idx_tickets_client_id ON tickets(client_id);
CREATE INDEX idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_messages_ticket_id ON messages(ticket_id);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);

-- Consider partitioning the messages table if you expect high volume

-- Database Migrations

-- Add Discord fields to users table (run this if you have existing data)
-- ALTER TABLE users ADD COLUMN discord_username TEXT;
-- ALTER TABLE users ADD COLUMN discord_avatar TEXT;