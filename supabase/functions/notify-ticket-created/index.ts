// Supabase Edge Function: notify-ticket-created
// Triggers when a new ticket is created
// Sends Discord notification to moderators if none are available

import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
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

  // Validate authorization before processing
  const authHeader = req.headers.get('authorization')
  const functionKey = req.headers.get('x-function-key')
  const expectedFunctionKey = Deno.env.get('FUNCTION_SECRET_KEY')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  // Extract bearer token from auth header (remove "Bearer " prefix) and handle safely
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  // Simplified authentication check (direct comparison)
  let isAuthorized = false
  
  // Check function key authentication
  if (expectedFunctionKey && functionKey && functionKey === expectedFunctionKey) {
    isAuthorized = true
  }
  
  // Check bearer token against function key
  if (!isAuthorized && expectedFunctionKey && bearerToken && bearerToken === expectedFunctionKey) {
    isAuthorized = true
  }
  
  // Check bearer token against service role key (for internal Edge Function calls)
  if (!isAuthorized && serviceRoleKey && bearerToken && bearerToken === serviceRoleKey) {
    isAuthorized = true
  }

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

  try {
    // Get environment variables
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get ticket data from request
    const { ticket } = await req.json() as { ticket: Ticket }

    if (!ticket) {
      throw new Error('No ticket data provided')
    }

    console.log('Processing ticket:', ticket.id)

    // Check if there's a recent escalation notification for this ticket (anti-spam)
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

    // If moderators are available, don't send notification (they'll see it in dashboard)
    if (hasAvailableModerators) {
      console.log('Moderators available, skipping Discord notification')
      return new Response(
        JSON.stringify({ success: true, message: 'Moderators available, no notification needed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert system message for client explaining no moderators are available
    try {
      console.log('💬 Checking for existing system message')
      
      // Check if system message already exists for this ticket
      const { data: existingMessages, error: checkError } = await supabase
        .from('messages')
        .select('id')
        .eq('ticket_id', ticket.id)
        .eq('sender_type', 'system')
        .eq('sender_id', 'system')
        .limit(1)
      
      if (checkError) {
        console.error('❌ Error checking for existing system messages:', checkError)
      } else if (existingMessages && existingMessages.length > 0) {
        console.log('ℹ️ System message already exists for this ticket, skipping')
      } else {
        console.log('💬 Inserting system message for no moderators available')
        await supabase
          .from('messages')
          .insert([{
            ticket_id: ticket.id,
            content: `Votre ticket « ${ticket.title} » a été soumis avec succès. Nos modérateurs sont momentanément indisponibles, votre demande sera traitée dès qu'un membre de l'équipe sera disponible. Merci de votre confiance et de votre patience.`,
            sender_type: 'system',
            sender_name: 'Système',
            sender_id: 'system'
          }])
        console.log('✅ System message inserted for no moderators available')
      }
    } catch (msgException) {
      console.error('❌ Exception inserting system message:', msgException)
    }

    // Schedule escalation check after 1 minute
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
