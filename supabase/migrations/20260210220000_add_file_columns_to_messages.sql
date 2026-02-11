-- Add file attachment columns to messages table
ALTER TABLE messages ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS file_name TEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS file_type TEXT;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS file_size BIGINT;