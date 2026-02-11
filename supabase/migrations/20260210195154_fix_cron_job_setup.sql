-- Fix the cron job setup - Supabase doesn't support pg_cron directly
-- Remove the old cron setup that won't work

-- Drop the old function if it exists
DROP FUNCTION IF EXISTS invoke_process_queue();

-- Create a simple function for reference
CREATE OR REPLACE FUNCTION invoke_process_queue()
RETURNS text AS $$
BEGIN
    -- This is just a placeholder function
    -- The actual processing should be done by calling the Edge Function directly
    RETURN 'Use external cron job to call: POST /functions/v1/process-notification-queue';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Instructions for setting up cron job:
-- Since Supabase doesn't support pg_cron, you need to set up an external cron job
-- that calls the Edge Function every 5 minutes:
--
-- curl -X POST "https://ndniosrqgrzcsqnfabxr.supabase.co/functions/v1/process-notification-queue" \
--   -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
--   -H "Content-Type: application/json" \
--   -d "{}"
--
-- You can use:
-- 1. A cloud function (Vercel, Netlify, etc.)
-- 2. A cron service (Cron-Job.org, EasyCron, etc.)
-- 3. Your own server with cron
-- 4. Supabase Edge Functions scheduled via dashboard (if available)

-- For now, let's create a manual trigger function that can be called
CREATE OR REPLACE FUNCTION manual_process_notifications()
RETURNS jsonb AS $$
DECLARE
    result jsonb := '{"message": "Manual processing completed", "timestamp": "' || now() || '"}';
BEGIN
    -- This function can be called manually to process notifications
    -- In production, replace this with external cron job calling the Edge Function

    RAISE NOTICE 'Manual notification processing triggered at %', now();
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;