-- Allow NULL ticket_id for general alert notifications
-- Add new notification type for alert_no_moderators

-- Drop the NOT NULL constraint on ticket_id
ALTER TABLE discord_notifications 
  ALTER COLUMN ticket_id DROP NOT NULL;

-- Update the notification_type check constraint to include new type
ALTER TABLE discord_notifications 
  DROP CONSTRAINT IF EXISTS discord_notifications_notification_type_check;

ALTER TABLE discord_notifications 
  ADD CONSTRAINT discord_notifications_notification_type_check 
  CHECK (notification_type IN ('ticket_created', 'escalation', 'ticket_claimed', 'alert_no_moderators'));

-- Add index for notification_type to improve query performance
CREATE INDEX IF NOT EXISTS idx_discord_notifications_type_sent_at 
  ON discord_notifications(notification_type, sent_at DESC);

-- Update comment
COMMENT ON TABLE discord_notifications IS 'Tracks all Discord notifications sent for tickets and general alerts. ticket_id can be NULL for general alerts (e.g., no moderators available).';
