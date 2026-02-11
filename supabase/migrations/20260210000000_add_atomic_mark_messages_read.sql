-- Migration: Add atomic function for marking messages as read
-- This prevents race conditions where concurrent requests could overwrite newer timestamps

CREATE OR REPLACE FUNCTION mark_messages_read_atomic(
  p_ticket_id UUID,
  p_user_id UUID,
  p_last_read_at TIMESTAMPTZ
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result_record ticket_reads%ROWTYPE;
BEGIN
  -- Insert or update atomically
  -- Only update if the new timestamp is newer than existing, or if record doesn't exist
  INSERT INTO ticket_reads (ticket_id, user_id, last_read_at)
  VALUES (p_ticket_id, p_user_id, p_last_read_at)
  ON CONFLICT (ticket_id, user_id)
  DO UPDATE SET
    last_read_at = CASE
      WHEN ticket_reads.last_read_at IS NULL OR ticket_reads.last_read_at < p_last_read_at
      THEN p_last_read_at
      ELSE ticket_reads.last_read_at
    END
  RETURNING * INTO result_record;

  -- Return the record as JSON
  RETURN json_build_object(
    'ticket_id', result_record.ticket_id,
    'user_id', result_record.user_id,
    'last_read_at', result_record.last_read_at
  );
END;
$$;