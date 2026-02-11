-- Add processing_started_at and retry_count columns to notification_queue for atomic processing
ALTER TABLE notification_queue
ADD COLUMN IF NOT EXISTS processing_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS retry_count INTEGER DEFAULT 0;

-- Update index to include processing_started_at for better performance
DROP INDEX IF EXISTS idx_notification_queue_scheduled;
CREATE INDEX IF NOT EXISTS idx_notification_queue_scheduled ON notification_queue(scheduled_for, processed, processing_started_at);