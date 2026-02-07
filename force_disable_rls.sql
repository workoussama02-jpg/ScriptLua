-- Force disable RLS on all tables
-- Run this in Supabase SQL Editor

ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_reads DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Verify it worked
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename;
