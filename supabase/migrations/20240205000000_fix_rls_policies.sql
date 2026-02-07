-- Fix RLS policies for development - allow anonymous access
-- This allows the application to work with anon key during development
-- In production, these should be replaced with proper JWT-based policies

-- Users table policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;

-- Allow anonymous access for development
CREATE POLICY "Allow anonymous read access to users" ON users
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert to users" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update to users" ON users
    FOR UPDATE USING (true);

-- Tickets table policies
DROP POLICY IF EXISTS "Clients can view their own tickets" ON tickets;
DROP POLICY IF EXISTS "Clients can create tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can view assigned and open tickets" ON tickets;
DROP POLICY IF EXISTS "Moderators can update tickets" ON tickets;

CREATE POLICY "Allow anonymous access to tickets" ON tickets
    FOR ALL USING (true);

-- Messages table policies
DROP POLICY IF EXISTS "Users can view messages for their tickets" ON messages;
DROP POLICY IF EXISTS "Users can insert messages for their tickets" ON messages;

CREATE POLICY "Allow anonymous access to messages" ON messages
    FOR ALL USING (true);

-- Ticket reads table policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;

CREATE POLICY "Allow anonymous access to ticket_reads" ON ticket_reads
    FOR ALL USING (true);

-- Internal notes policies
DROP POLICY IF EXISTS "Staff can view internal notes" ON internal_notes;
DROP POLICY IF EXISTS "Staff can create internal notes" ON internal_notes;

CREATE POLICY "Allow anonymous access to internal_notes" ON internal_notes
    FOR ALL USING (true);