-- Clean up problematic cron jobs and set up proper external cron job approach

-- First, let's see what cron jobs exist and remove them
-- Note: This will only work if pg_cron is available, but Supabase may not support it

DO $$
BEGIN
    -- Try to drop existing cron jobs if they exist
    BEGIN
        PERFORM cron.unschedule('process_notifications');
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Could not unschedule cron job (may not exist or pg_cron not available): %', SQLERRM;
    END;

    BEGIN
        PERFORM cron.unschedule('notification_queue_processor');
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Could not unschedule notification_queue_processor (may not exist or pg_cron not available): %', SQLERRM;
    END;
END $$;

-- Remove any existing cron job functions that are causing issues
DROP FUNCTION IF EXISTS invoke_process_queue();
DROP FUNCTION IF EXISTS auto_process_notifications();

-- Create a simple function that just logs when called (for testing)
CREATE OR REPLACE FUNCTION manual_trigger_notifications()
RETURNS jsonb AS $$
DECLARE
    result jsonb;
BEGIN
    -- This function can be called manually to test the system
    -- In production, use external cron job calling the Edge Function directly

    RAISE NOTICE 'Manual notification trigger called at %', now();

    result := jsonb_build_object(
        'message', 'Manual trigger completed',
        'timestamp', now()::text,
        'instruction', 'Use external cron job to call: POST /functions/v1/process-notification-queue'
    );

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;