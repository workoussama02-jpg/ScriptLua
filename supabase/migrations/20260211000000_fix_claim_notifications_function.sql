-- Fix ambiguous column reference in claim_notifications_for_processing function
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
    WITH selected_notifications AS (
        SELECT nq.id
        FROM notification_queue nq
        WHERE nq.scheduled_for <= processing_time
          AND nq.processed = false
          AND nq.processing_started_at IS NULL
        ORDER BY nq.scheduled_for
        LIMIT batch_size
    ),
    updated_notifications AS (
        UPDATE notification_queue
        SET processing_started_at = processing_time
        WHERE id IN (SELECT id FROM selected_notifications)
        RETURNING *
    )
    SELECT
        un.id,
        un.ticket_id,
        un.notification_type,
        un.scheduled_for,
        un.processed,
        un.processed_at,
        un.retry_count,
        un.created_at,
        un.processing_started_at
    FROM updated_notifications un;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;