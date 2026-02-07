-- Add 'system' to messages sender_type constraint
-- Run this in Supabase SQL Editor

-- Drop the old constraint
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_sender_type_check;

-- Add new constraint that includes 'system'
ALTER TABLE messages ADD CONSTRAINT messages_sender_type_check 
CHECK (sender_type IN ('client', 'moderator', 'admin', 'system'));

-- Verify it worked
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'messages'::regclass 
  AND conname = 'messages_sender_type_check';
