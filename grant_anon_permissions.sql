-- Grant permissions to anon role
-- Run this in Supabase SQL Editor

-- Grant SELECT, INSERT, UPDATE permissions to anon and authenticated roles
GRANT ALL ON users TO anon, authenticated;
GRANT ALL ON tickets TO anon, authenticated;
GRANT ALL ON messages TO anon, authenticated;
GRANT ALL ON ticket_reads TO anon, authenticated;

-- Also grant sequence permissions if they exist
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Verify permissions
SELECT 
    tablename,
    has_table_privilege('anon', 'public.' || tablename, 'SELECT') as anon_select,
    has_table_privilege('anon', 'public.' || tablename, 'INSERT') as anon_insert,
    has_table_privilege('anon', 'public.' || tablename, 'UPDATE') as anon_update
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'tickets', 'messages', 'ticket_reads')
ORDER BY tablename;
