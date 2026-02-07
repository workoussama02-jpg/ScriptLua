-- Comprehensive RLS fix for Clerk authentication
-- Run this in Supabase SQL Editor
-- This DISABLES RLS since Clerk handles authentication (not Supabase Auth)

-- ===========================================
-- FIX TICKETS TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Clients can view their own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients can create tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can view assigned and open tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can update tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to read tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to create tickets" ON tickets;
DROP POLICY IF EXISTS "Allow authenticated users to update tickets" ON tickets;

-- Disable RLS - Clerk handles auth on the frontend
ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- FIX MESSAGES TABLE
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Users can insert messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users to read messages" ON messages;
DROP POLICY IF EXISTS "Allow authenticated users to insert messages" ON messages;

-- Disable RLS - Clerk handles auth on the frontend
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- ===========================================
-- FIX TICKET_READS TABLE
-- ===========================================

-- Drop old policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to read ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to insert ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to update ticket_reads" ON ticket_reads;
DROP POLall existing policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to read ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to insert ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "Allow authenticated users to update ticket_reads" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_insert_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_update_policy" ON ticket_reads;

-- Disable RLS - Clerk handles auth on the frontend
ALTER TABLE ticket_reads DISw authenticated users to insert users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to update users" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Moderators can view all users" ON users;

-- Create new permissive policies
CREATE POLICY "Allow authenticated users to read users" 
ON users FOR SELEC
-- ===========================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to insert users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to update users" ON users;
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;
DROP POLICY IF EXISTS "Moderators can view all users" ON users;

-- Disable RLS - Clerk handles auth on the frontend
ALTER TABLE users DISRLS is disabled on all tables
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename;

-- Should return no policies (all dropped)
SELECT schemaname, tablename, policynam