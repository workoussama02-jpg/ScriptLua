-- CRITICAL: Run this SQL in your Supabase SQL Editor to fix ticket_reads RLS policies

-- Drop the old restrictive ticket_reads policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;

-- Drop any existing policies with the new names (in case of previous failed runs)
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_insert_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_update_policy" ON ticket_reads;

-- Create new user-scoped policies using Clerk user IDs
CREATE POLICY "ticket_reads_select_policy" ON ticket_reads FOR SELECT USING (user_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));
CREATE POLICY "ticket_reads_insert_policy" ON ticket_reads FOR INSERT WITH CHECK (user_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));
CREATE POLICY "ticket_reads_update_policy" ON ticket_reads FOR UPDATE USING (user_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true)) WITH CHECK (user_id = auth.jwt() ->> 'sub' AND EXISTS (SELECT 1 FROM users WHERE clerk_id = auth.jwt() ->> 'sub' AND active = true));

-- Make sure RLS is enabled
ALTER TABLE ticket_reads ENABLE ROW LEVEL SECURITY;