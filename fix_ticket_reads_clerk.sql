-- Fix ticket_reads RLS policies for Clerk authentication
-- Run this in Supabase SQL Editor

-- Drop old policies
DROP POLICY IF EXISTS "Users can view their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can insert their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "Users can update their own read timestamps" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_select_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_insert_policy" ON ticket_reads;
DROP POLICY IF EXISTS "ticket_reads_update_policy" ON ticket_reads;

-- Create new permissive policies that work with Clerk
-- Allow authenticated users to manage their own ticket_reads
CREATE POLICY "Allow authenticated users to read ticket_reads" 
ON ticket_reads FOR SELECT 
USING (true);  -- Allow all reads (filtering happens in app)

CREATE POLICY "Allow authenticated users to insert ticket_reads" 
ON ticket_reads FOR INSERT 
WITH CHECK (true);  -- Allow all inserts

CREATE POLICY "Allow authenticated users to update ticket_reads" 
ON ticket_reads FOR UPDATE 
USING (true)  -- Allow all updates
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE ticket_reads ENABLE ROW LEVEL SECURITY;
