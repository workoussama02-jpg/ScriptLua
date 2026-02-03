-- Advanced RLS Setup with Clerk Integration
-- This provides database-level security while working with Clerk auth

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_reads ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own record" ON users;
DROP POLICY IF EXISTS "Users can insert own record" ON users;
DROP POLICY IF EXISTS "Users can update own record" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update user roles" ON users;
DROP POLICY IF EXISTS "users_select_policy" ON users;
DROP POLICY IF EXISTS "users_insert_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;
DROP POLICY IF EXISTS "Clients can view own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients can create tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can view assigned tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can update tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can view all tickets" ON tickets;
DROP POLICY IF EXISTS "tickets_select_policy" ON tickets;
DROP POLICY IF EXISTS "tickets_insert_policy" ON tickets;
DROP POLICY IF EXISTS "tickets_update_policy" ON tickets;
DROP POLICY IF EXISTS "Users can view messages in their tickets" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "messages_select_policy" ON messages;
DROP POLICY IF EXISTS "messages_insert_policy" ON messages;
DROP POLICY IF EXISTS "messages_delete_policy" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users access to users table" ON users;
DROP POLICY IF EXISTS "Allow authenticated users access to tickets table" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users access to messages table" ON messages;
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_insert_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_update_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_delete_policy" ON ticket_reads;

-- Create RPC function to set user context
CREATE OR REPLACE FUNCTION set_user_context(user_clerk_id TEXT)
RETURNS VOID AS $$
BEGIN
    -- Set session variable for RLS context
    PERFORM set_config('app.user_clerk_id', user_clerk_id, FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if current user is admin/moderator
CREATE OR REPLACE FUNCTION is_admin_or_moderator()
RETURNS BOOLEAN AS $$
DECLARE
    user_clerk_id TEXT;
    user_role TEXT;
BEGIN
    user_clerk_id := current_setting('app.user_clerk_id', true);
    IF user_clerk_id IS NULL THEN
        RETURN false;
    END IF;

    SELECT role INTO user_role
    FROM users
    WHERE clerk_id = user_clerk_id AND active = true;

    RETURN user_role IN ('admin', 'moderator');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Simple but effective RLS policies
-- These work with our application logic and provide database-level protection

-- Users table policies
CREATE POLICY "users_select_policy" ON users
FOR SELECT USING (
    clerk_id = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Allow reads for own record or admin/moderator access

CREATE POLICY "users_insert_policy" ON users
FOR INSERT WITH CHECK (
    clerk_id = current_setting('app.user_clerk_id', true)
); -- Ensure new user record matches session context

CREATE POLICY "users_update_policy" ON users
FOR UPDATE USING (
    clerk_id = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Allow updates for own record or admin/moderator access

CREATE POLICY "users_delete_policy" ON users
FOR DELETE USING (false); -- Prevent user deletions to maintain data integrity

-- Tickets table policies
CREATE POLICY "tickets_select_policy" ON tickets
FOR SELECT USING (
    client_id = current_setting('app.user_clerk_id', true) OR
    assigned_to = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Users can view tickets they created, tickets assigned to them, or all tickets if admin/moderator

CREATE POLICY "tickets_insert_policy" ON tickets
FOR INSERT WITH CHECK (
    client_id = current_setting('app.user_clerk_id', true)
); -- Users can only create tickets for themselves

CREATE POLICY "tickets_update_policy" ON tickets
FOR UPDATE USING (
    client_id = current_setting('app.user_clerk_id', true) OR
    assigned_to = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Users can update tickets they created, tickets assigned to them, or all tickets if admin/moderator

CREATE POLICY "tickets_delete_policy" ON tickets
FOR DELETE USING (false); -- Prevent ticket deletions to preserve conversation history

-- Messages table policies
CREATE POLICY "messages_select_policy" ON messages
FOR SELECT USING (true); -- Allow reads, app filters by ticket access

CREATE POLICY "messages_insert_policy" ON messages
FOR INSERT WITH CHECK (true); -- Allow sending, app validates

CREATE POLICY "messages_delete_policy" ON messages
FOR DELETE USING (false); -- Prevent message deletion to preserve conversation history

-- Ticket reads table policies
CREATE POLICY "ticket_reads_select_policy" ON ticket_reads
FOR SELECT USING (
    user_id = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Users can only view their own read timestamps, admins/moderators can view all

CREATE POLICY "ticket_reads_insert_policy" ON ticket_reads
FOR INSERT WITH CHECK (
    user_id = current_setting('app.user_clerk_id', true)
); -- Users can only insert their own read timestamps

CREATE POLICY "ticket_reads_update_policy" ON ticket_reads
FOR UPDATE USING (
    user_id = current_setting('app.user_clerk_id', true) OR
    is_admin_or_moderator()
); -- Users can only update their own read timestamps, admins/moderators can update all

CREATE POLICY "ticket_reads_delete_policy" ON ticket_reads
FOR DELETE USING (
    is_admin_or_moderator()
); -- Only admins/moderators can delete read timestamps for cleanup operations