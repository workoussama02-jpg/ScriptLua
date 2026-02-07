-- Create essential tables for ticketing system (NO RLS)
-- Run this in Supabase SQL Editor

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT,
    name TEXT,
    discord_username TEXT,
    discord_avatar TEXT,
    role TEXT DEFAULT 'client' CHECK (role IN ('client', 'moderator', 'admin')),
    available BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 2. TICKETS TABLE
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed', 'escalated')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    client_id TEXT NOT NULL,
    client_name TEXT NOT NULL,
    assigned_to TEXT,
    assigned_to_name TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE tickets DISABLE ROW LEVEL SECURITY;

-- 3. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'moderator', 'admin', 'system')),
    sender_name TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    sender_avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE messages DISABLE ROW LEVEL SECURITY;

-- 4. TICKET_READS TABLE
CREATE TABLE IF NOT EXISTS ticket_reads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(ticket_id, user_id)
);

ALTER TABLE ticket_reads DISABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_messages_ticket_id ON messages(ticket_id);
CREATE INDEX IF NOT EXISTS idx_ticket_reads_ticket_user ON ticket_reads(ticket_id, user_id);

-- Verify tables were created
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'tickets', 'messages', 'ticket_reads')
ORDER BY tablename;
