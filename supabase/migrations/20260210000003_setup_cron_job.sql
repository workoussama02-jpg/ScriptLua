-- Note: Supabase doesn't support pg_cron extension directly
-- Instead, we'll create a function that can be called periodically
-- You can set up a cron job externally or use Supabase's scheduled functions

-- Create a function to invoke the Edge Function
CREATE OR REPLACE FUNCTION invoke_process_queue()
RETURNS text AS $$
DECLARE
    response_status integer;
    response_body text;
BEGIN
    -- Use a simple approach - this function can be called manually or via external cron
    -- For now, we'll just return a message indicating it should be called externally

    RETURN 'Queue processing should be handled by external cron job calling the Edge Function directly';
EXCEPTION WHEN OTHERS THEN
    RETURN 'Error: ' || SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Alternative approach: Create a trigger-based system
-- This will automatically process notifications when they're due

CREATE OR REPLACE FUNCTION auto_process_notifications()
RETURNS trigger AS $$
BEGIN
    -- This trigger function will be called when notifications are inserted/updated
    -- For now, we'll just log that processing should happen

    RAISE NOTICE 'Notification queued for processing: %', NEW.ticket_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on notification_queue
DROP TRIGGER IF EXISTS trigger_auto_process_notifications ON notification_queue;
CREATE TRIGGER trigger_auto_process_notifications
    AFTER INSERT ON notification_queue
    FOR EACH ROW
    EXECUTE FUNCTION auto_process_notifications();

-- Note: For production, set up an external cron job that calls:
-- curl -X POST "https://your-project.supabase.co/functions/v1/process-notification-queue" \
--   -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
--   -H "Content-Type: application/json" \
--   -d "{}"