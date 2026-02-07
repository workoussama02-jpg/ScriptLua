-- Disable RLS for Clerk authentication
-- Run this in Supabase SQL Editor
-- Clerk handles authentication, so Supabase RLS is not needed

-- ===========================================
-- TICKETS TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Clients can view their own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients can create tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can view assigned and open tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can update tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to read tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to create tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to update tickets" ON tickets;

-- Disable RLS
ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- MESSAGES TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Users can insert messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users to read messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users to insert messages" ON messages;

-- Disable RLS
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- TICKET_READS TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_insert_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_update_policy" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to read ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to insert ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to update ticket_reads" ON ticket_reads;

-- Disable RLS
ALTER TABLE ticket_reads DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- USERS TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Moderators can view all users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to read users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to insert users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to update users" ON users;

-- Disable RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- VERIFICATION
-- ===========================================

-- Verify RLS is disabled (rowsecurity should be 'f' for false)
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename;

-- Should return no rows (all policies dropped)
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename, policyname;
