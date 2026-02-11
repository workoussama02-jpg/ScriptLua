-- Simple atomic claiming function
DROP FUNCTION IF EXISTS claim_notifications_for_processing(INTEGER, TIMESTAMP WITH TIME ZONE);

CREATE FUNCTION claim_notifications_for_processing(batch_size INTEGER, processing_time TIMESTAMP WITH TIME ZONE)
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
    RETURNING id, ticket_id, notification_type, scheduled_for, processed, processed_at, retry_count, created_at, processing_started_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;