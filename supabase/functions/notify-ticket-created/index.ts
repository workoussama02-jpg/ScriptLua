// Supabase Edge Function: notify-ticket-created
// Triggers when a new ticket is created
// Sends Discord notification to moderators if none are available

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

// Timing-safe string comparison to prevent timing attacks
async function timingSafeEqual(a: string | null | undefined, b: string | null | undefined): Promise<boolean> {
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

interface Ticket {
  id: string
  title: string
  description: string
  client_name: string
  client_id: string
  created_at: string
  status: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // TEMPORARY: Allow all requests for testing - remove in production
  // TODO: Implement proper authentication
  const isAuthorized = true

  if (!isAuthorized) {
    console.warn('Unauthorized access attempt to notify-ticket-created')
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

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

  // Create Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  // Get ticket data from request
  const requestData = await req.json()
  const ticket: Ticket = requestData.ticket

  if (!ticket || !ticket.id) {
    return new Response(
      JSON.stringify({ success: false, error: 'Ticket data is required' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  console.log('Processing ticket created notification for ticket:', ticket.id)

  try {
    const { data: recentNotification, error: cooldownError } = await supabase
      .from('discord_notifications')
      .select('*')
      .eq('ticket_id', ticket.id)
      .eq('notification_type', 'escalation')
      .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // Last 15 minutes
      .maybeSingle()

    if (cooldownError) {
      console.error('Error checking cooldown:', cooldownError)
      throw new Error(`Cooldown check failed: ${cooldownError.message}`)
    }

    if (recentNotification) {
      console.log('Escalation notification already sent recently for ticket:', ticket.id)
      return new Response(
        JSON.stringify({ success: true, message: 'Cooldown active, skipping escalation scheduling' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if any moderators are available
    const { count: availableModeratorsCount, error: modError } = await supabase
      .from('users')
      .select('id', { count: 'exact' })
      .eq('role', 'moderator')
      .eq('available', true)
      .eq('active', true)

    if (modError) {
      console.error('Error checking moderators:', modError)
      throw modError
    }

    const hasAvailableModerators = availableModeratorsCount && availableModeratorsCount > 0

    console.log(`Available moderators: ${availableModeratorsCount || 0}`)

    // Always schedule escalation check after 1 minute, regardless of moderator availability
    // The escalation function will check if the ticket is still unassigned
    console.log('📅 Scheduling escalation check for ticket:', ticket.id)
    const { error: queueError } = await supabase.from('notification_queue').insert({
      ticket_id: ticket.id,
      scheduled_for: new Date(Date.now() + 1 * 60 * 1000).toISOString(),
      notification_type: 'escalation_check'
    })

    if (queueError) {
      console.error('Failed to schedule escalation for ticket:', ticket.id, queueError)
      // Don't throw - the system message was already added
    } else {
      console.log('✅ Escalation scheduled successfully for ticket:', ticket.id)
    }

    // If moderators are available, don't send notification (they'll see it in dashboard)
    if (hasAvailableModerators) {
      console.log('Moderators available, skipping Discord notification')
      return new Response(
        JSON.stringify({ success: true, message: 'Moderators available, escalation scheduled but no immediate notification needed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Escalation scheduled successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in notify-ticket-created:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
