-- Check RLS status on all tables
-- Run this in Supabase SQL Editor

SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity = true THEN '❌ ENABLED (causing 406 errors)'
        ELSE '✅ DISABLED (good)'
    END as rls_status,
    rowsecurity
FROM pg_tables 
WHERE tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename;
