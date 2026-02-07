-- Additional Schema for Discord Notification System
-- Run this AFTER running the main supabase-schema.sql

-- =====================================================
-- Discord Notifications Tracking Table
-- =====================================================
CREATE TABLE IF NOT EXISTS discord_notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('ticket_created', 'escalation', 'ticket_claimed')),
    webhook_used TEXT NOT NULL CHECK (webhook_used IN ('moderator', 'admin')),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_discord_notifications_ticket_id ON discord_notifications(ticket_id);
CREATE INDEX IF NOT EXISTS idx_discord_notifications_type ON discord_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_discord_notifications_sent_at ON discord_notifications(sent_at);

-- Enable RLS
ALTER TABLE discord_notifications ENABLE ROW LEVEL SECURITY;

-- Only admins and moderators can view notifications
CREATE POLICY "Staff can view discord notifications" ON discord_notifications
    FOR SELECT USING (is_staff(auth.jwt() ->> 'sub'));

-- =====================================================
-- Notification Queue Table (for delayed notifications)
-- =====================================================
CREATE TABLE IF NOT EXISTS notification_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL CHECK (notification_type IN ('escalation_check', 'reminder')),
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled ON notification_queue(scheduled_for, processed);
CREATE INDEX IF NOT EXISTS idx_notification_queue_ticket ON notification_queue(ticket_id);

-- Unique constraint to prevent duplicate escalation entries
ALTER TABLE notification_queue ADD CONSTRAINT unique_ticket_notification_type 
    UNIQUE (ticket_id, notification_type);

-- Enable RLS
ALTER TABLE notification_queue ENABLE ROW LEVEL SECURITY;

-- Only system/admins can manage queue
CREATE POLICY "Admins can view notification queue" ON notification_queue
    FOR SELECT USING (is_admin(auth.jwt() ->> 'sub'));

-- =====================================================
-- Database Function: Call Edge Function on Ticket Creation
-- =====================================================
CREATE OR REPLACE FUNCTION notify_new_ticket()
RETURNS TRIGGER AS $$
DECLARE
    function_url TEXT;
    service_role_key TEXT;
BEGIN
    -- Get Supabase project URL from settings (you'll need to update this)
    function_url := 'https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/notify-ticket-created';
    
    -- This will be set via environment variable in production
    -- For now, we'll skip the actual HTTP call in the trigger
    -- and instead rely on client-side calls or manual invocation
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Database Trigger: On New Ticket
-- =====================================================
-- Note: Direct HTTP calls from triggers require pg_net extension
-- For now, we'll handle this via client-side Edge Function calls
-- Uncomment and modify when pg_net is available

/*
DROP TRIGGER IF EXISTS trigger_notify_new_ticket ON tickets;
CREATE TRIGGER trigger_notify_new_ticket
    AFTER INSERT ON tickets
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_ticket();
*/

-- =====================================================
-- Database Function: Call Edge Function on Ticket Claimed
-- =====================================================
CREATE OR REPLACE FUNCTION notify_ticket_claimed()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if assigned_to changed from NULL to a value
    IF OLD.assigned_to IS NULL AND NEW.assigned_to IS NOT NULL THEN
        -- Log that ticket was claimed
        -- In production, this would call the Edge Function
        -- For now, we'll handle this client-side
        RAISE NOTICE 'Ticket % claimed by %', NEW.id, NEW.assigned_to_name;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Trigger: On Ticket Assignment
-- =====================================================
DROP TRIGGER IF EXISTS trigger_notify_ticket_claimed ON tickets;
CREATE TRIGGER trigger_notify_ticket_claimed
    AFTER UPDATE ON tickets
    FOR EACH ROW
    WHEN (OLD.assigned_to IS NULL AND NEW.assigned_to IS NOT NULL)
    EXECUTE FUNCTION notify_ticket_claimed();

-- =====================================================
-- Cleanup Old Notifications (keep last 90 days)
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
    DELETE FROM discord_notifications
    WHERE created_at < NOW() - INTERVAL '90 days';
    
    DELETE FROM notification_queue
    WHERE processed = true AND processed_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Helper Function: Get Unassigned Tickets Older Than X Minutes
-- =====================================================
CREATE OR REPLACE FUNCTION get_tickets_needing_escalation(minutes_threshold INTEGER DEFAULT 30)
RETURNS TABLE (
    ticket_id UUID,
    client_name TEXT,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    minutes_waiting INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id as ticket_id,
        t.client_name,
        t.title,
        t.created_at,
        EXTRACT(EPOCH FROM (NOW() - t.created_at))::INTEGER / 60 as minutes_waiting
    FROM tickets t
    WHERE t.assigned_to IS NULL
      AND t.status != 'closed'
      AND t.created_at < NOW() - (minutes_threshold || ' minutes')::INTERVAL
      AND NOT EXISTS (
          SELECT 1 FROM discord_notifications dn
          WHERE dn.ticket_id = t.id
            AND dn.notification_type = 'escalation'
            AND dn.sent_at > NOW() - INTERVAL '15 minutes'
      );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- View: Notification Statistics
-- =====================================================
CREATE OR REPLACE VIEW notification_stats AS
SELECT 
    DATE(sent_at) as date,
    notification_type,
    webhook_used,
    COUNT(*) as count
FROM discord_notifications
WHERE sent_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(sent_at), notification_type, webhook_used
ORDER BY DATE(sent_at) DESC, notification_type;

-- Grant access to admins
GRANT SELECT ON notification_stats TO authenticated;

-- =====================================================
-- Realtime: Enable for notification tables
-- =====================================================
DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE discord_notifications;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

DO $$
BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE notification_queue;
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

-- =====================================================
-- Comments for documentation
-- =====================================================
COMMENT ON TABLE discord_notifications IS 'Tracks all Discord notifications sent for tickets';
COMMENT ON TABLE notification_queue IS 'Queue for delayed notifications (e.g., 30-minute escalations)';
COMMENT ON FUNCTION get_tickets_needing_escalation IS 'Returns tickets that need to be escalated to admins';
COMMENT ON FUNCTION cleanup_old_notifications IS 'Cleanup function to remove old notification records';
