// Supabase Edge Function: process-notification-queue
// Scheduled function to process delayed notifications (escalations)
// Run this via cron job every 5 minutes
// Updated: 2024-02-17 - Fixed RPC function call

import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Constant-time string comparison to prevent timing attacks
async function secureCompare(a: string | null | undefined, b: string | null | undefined): Promise<boolean> {
  if (!a || !b) return false

  try {
    // Hash both inputs to fixed-length digests to avoid length-based timing
    const aHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(a))
    const bHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(b))
    
    return crypto.timingSafeEqual(new Uint8Array(aHash), new Uint8Array(bHash))
  } catch {
    return false
  }
}

serve(async (req) => {
  console.log('Function called with method:', req.method)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  // TEMPORARY: Disable all authorization for testing cron jobs
  // TODO: Add proper authentication later

  // Validate required Supabase environment variables
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  if (!SUPABASE_URL) {
    console.error('SUPABASE_URL not configured')
    return new Response(
      JSON.stringify({ success: false, error: 'Server configuration error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY not configured')
    return new Response(
      JSON.stringify({ success: false, error: 'Server configuration error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    const FUNCTION_URL = Deno.env.get('FUNCTION_URL') || SUPABASE_URL

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    console.log('Processing notification queue...')

    // For now, use simple selection (not atomic) - TODO: Implement proper atomic claiming
    const now = new Date().toISOString()
    const { data: notificationsToProcess, error: selectError } = await supabase
      .from('notification_queue')
      .select('*')
      .eq('processed', false)
      .is('processing_started_at', null)
      .lte('scheduled_for', now)
      .order('scheduled_for')
      .limit(10)

    if (selectError) {
      console.error('Error selecting notifications:', selectError)
      throw selectError
    }

    if (!notificationsToProcess || notificationsToProcess.length === 0) {
      console.log('No notifications available for processing')
      return new Response(
        JSON.stringify({ success: true, message: 'No notifications to process' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mark notifications as being processed
    const notificationIds = notificationsToProcess.map(n => n.id)
    const { error: updateProcessingError } = await supabase
      .from('notification_queue')
      .update({ processing_started_at: now })
      .in('id', notificationIds)

    if (updateProcessingError) {
      console.error('Error marking notifications as processing:', updateProcessingError)
      // Continue anyway
    }

    const claimedNotifications = notificationsToProcess

    if (!claimedNotifications || claimedNotifications.length === 0) {
      console.log('No notifications available for processing')
      return new Response(
        JSON.stringify({ success: true, message: 'No notifications to process' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Claimed ${claimedNotifications.length} notifications for processing`)

    const results = []

    for (const notification of claimedNotifications) {
      try {
        if (notification.notification_type === 'escalation_check') {
          // Trigger escalation function
          const response = await fetch(`${FUNCTION_URL}/functions/v1/notify-ticket-escalation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
            },
            body: JSON.stringify({ ticket_id: notification.ticket_id })
          })

          if (response.ok) {
            results.push({ ticket_id: notification.ticket_id, status: 'success' })

            // Mark as processed only on success (don't throw on DB update failure)
            const { error: updateError } = await supabase
              .from('notification_queue')
              .update({ processed: true, processed_at: new Date().toISOString() })
              .eq('id', notification.id)

            if (updateError) {
              console.error(`Failed to mark notification ${notification.id} as processed:`, updateError)
              // Log the failure but don't throw - escalation was successful
              results.push({ ticket_id: notification.ticket_id, status: 'success_with_db_error', error: `DB update failed: ${updateError.message}` })
            } else {
              results.push({ ticket_id: notification.ticket_id, status: 'success' })
            }
          } else {
            const error = await response.text()
            console.error(`Escalation failed for ticket ${notification.ticket_id}:`, error)
            results.push({ ticket_id: notification.ticket_id, status: 'failed', error })
            // Clear processing_started_at to allow retry
            await supabase
              .from('notification_queue')
              .update({ processing_started_at: null })
              .eq('id', notification.id)
          }
        }

      } catch (error) {
        console.error(`Error processing notification ${notification.id}:`, error)
        
        // Implement retry limit to prevent infinite retries
        const currentRetryCount = notification.retry_count || 0
        const maxRetries = 5
        
        if (currentRetryCount >= maxRetries) {
          // Mark as permanently failed after max retries
          console.log(`Notification ${notification.id} exceeded max retries (${maxRetries}), marking as permanently failed`)
          
          const { error: permanentFailError } = await supabase
            .from('notification_queue')
            .update({ 
              processed: true, 
              processed_at: new Date().toISOString(),
              retry_count: currentRetryCount + 1
            })
            .eq('id', notification.id)

          if (permanentFailError) {
            console.error(`Failed to mark notification ${notification.id} as permanently failed:`, permanentFailError)
          }

          results.push({ 
            ticket_id: notification.ticket_id, 
            status: 'failed_permanent', 
            error: `Exceeded max retries (${maxRetries}): ${(error instanceof Error ? error.message : String(error))}`,
            retry_count: currentRetryCount + 1
          })
        } else {
          // Increment retry count and leave unprocessed for retry
          console.log(`Notification ${notification.id} failed (attempt ${currentRetryCount + 1}/${maxRetries + 1}), will retry`)
          
          const { error: retryUpdateError } = await supabase
            .from('notification_queue')
            .update({ 
              retry_count: currentRetryCount + 1,
              processing_started_at: null  // Clear processing lock for retry
            })
            .eq('id', notification.id)

          if (retryUpdateError) {
            console.error(`Failed to update retry count for notification ${notification.id}:`, retryUpdateError)
          }

          results.push({ 
            ticket_id: notification.ticket_id, 
            status: 'error', 
            error: (error instanceof Error ? error.message : String(error)),
            retry_count: currentRetryCount + 1
          })
          // Don't mark as processed - will be retried
        }
      }
    }

    // Count successful notifications
    const successCount = results.filter(result => result.status === 'success').length

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: successCount,
        results 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in process-notification-queue:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
