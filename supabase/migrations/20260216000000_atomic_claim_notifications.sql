-- Atomic claim_notifications_for_processing function using separate UPDATE and SELECT
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
DECLARE
    claimed_ids UUID[];
BEGIN
    -- First, collect the IDs that should be claimed (using a subquery to maintain ORDER BY)
    SELECT array(
        SELECT nq.id
        FROM notification_queue nq
        WHERE nq.scheduled_for <= processing_time
          AND nq.processed = false
          AND nq.processing_started_at IS NULL
        ORDER BY nq.scheduled_for
        LIMIT batch_size
    ) INTO claimed_ids;

    -- Then update them atomically
    UPDATE notification_queue
    SET processing_started_at = processing_time
    WHERE id = ANY(claimed_ids);

    -- Finally, return the updated records
    RETURN QUERY
    SELECT
        nq.id,
        nq.ticket_id,
        nq.notification_type,
        nq.scheduled_for,
        nq.processed,
        nq.processed_at,
        nq.retry_count,
        nq.created_at,
        nq.processing_started_at
    FROM notification_queue nq
    WHERE nq.id = ANY(claimed_ids)
    ORDER BY nq.scheduled_for;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;