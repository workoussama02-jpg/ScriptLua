-- Check if tables exist and their structure
-- Run this in Supabase SQL Editor

-- Check if tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('tickets', 'messages', 'ticket_reads', 'users')
ORDER BY tablename;

-- Check messages table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'messages'
ORDER BY ordinal_position;

-- Check ticket_reads table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'ticket_reads'
ORDER BY ordinal_position;
