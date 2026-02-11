-- RPC function to atomically claim notifications for processing
CREATE OR REPLACE FUNCTION claim_notifications_for_processing(batch_size INTEGER, processing_time TIMESTAMP WITH TIME ZONE)
RETURNS TABLE (
    id UUID,
    ticket_id UUID,
    notification_type TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    processed BOOLEAN,
    processed_at TIMESTAMP WITH TIME ZONE,
    retry_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    processing_started_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    UPDATE notification_queue
    SET processing_started_at = processing_time
    WHERE id IN (
        SELECT nq.id
        FROM notification_queue nq
        WHERE nq.scheduled_for <= processing_time
          AND nq.processed = false
          AND nq.processing_started_at IS NULL
        ORDER BY nq.scheduled_for
        LIMIT batch_size
    )
    RETURNING
        notification_queue.id,
        notification_queue.ticket_id,
        notification_queue.notification_type,
        notification_queue.scheduled_for,
        notification_queue.processed,
        notification_queue.processed_at,
        notification_queue.retry_count,
        notification_queue.created_at,
        notification_queue.processing_started_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;