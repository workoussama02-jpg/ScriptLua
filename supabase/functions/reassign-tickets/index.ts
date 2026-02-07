// Supabase Edge Function: reassign-tickets
// Reassigns unassigned tickets to available moderators

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('🔄 REASSIGN-TICKETS FUNCTION CALLED - START')

  // Validate required environment variables
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  if (!SUPABASE_URL) {
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
    return new Response(
      JSON.stringify({ success: false, error: 'Server configuration error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // For reassign, we can allow any authenticated user, or restrict to moderators
    // For now, allow any authenticated user

    // Extract Clerk JWT from custom header
    const clerkToken = req.headers.get('x-clerk-token')
    if (!clerkToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'No valid Clerk token provided' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // For simplicity, just check if token exists, don't verify fully
    // In production, verify the token

    // Find unassigned tickets
    const { data: unassignedTickets, error: ticketError } = await supabase
      .from('tickets')
      .select('id, title, description, client_name')
      .eq('status', 'open')
      .is('assigned_to', null)
      .order('created_at', { ascending: true }) // Oldest first

    if (ticketError) {
      console.error('❌ Error fetching unassigned tickets:', ticketError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch unassigned tickets' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!unassignedTickets || unassignedTickets.length === 0) {
      console.log('ℹ️ No unassigned tickets found')
      return new Response(
        JSON.stringify({ success: true, message: 'No unassigned tickets to reassign', reassigned: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`📋 Found ${unassignedTickets.length} unassigned tickets`)

    // Find available moderators
    const { data: availableModerators, error: modError } = await supabase
      .from('users')
      .select('id, name, clerk_id, available, active, role')
      .eq('role', 'moderator')
      .eq('available', true)
      .eq('active', true)

    if (modError) {
      console.error('❌ Error fetching available moderators:', modError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch available moderators' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!availableModerators || availableModerators.length === 0) {
      console.log('⚠️ No available moderators found')
      return new Response(
        JSON.stringify({ success: true, message: 'No available moderators', reassigned: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`👥 Found ${availableModerators.length} available moderators`)

    // Get current ticket counts for each moderator
    const moderatorCounts = new Map()
    for (const mod of availableModerators) {
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('assigned_to', mod.clerk_id)
        .eq('status', 'in-progress')
      moderatorCounts.set(mod.clerk_id, count || 0)
    }

    // Sort moderators by current load
    const sortedModerators = availableModerators.sort((a, b) => 
      (moderatorCounts.get(a.clerk_id) || 0) - (moderatorCounts.get(b.clerk_id) || 0)
    )

    let reassignedCount = 0

    // Assign tickets to moderators in round-robin fashion
    for (let i = 0; i < unassignedTickets.length; i++) {
      const ticket = unassignedTickets[i]
      const moderator = sortedModerators[i % sortedModerators.length]

      console.log(`🎯 Assigning ticket ${ticket.id} to ${moderator.name}`)

      // Update ticket
      const { error: assignError } = await supabase
        .from('tickets')
        .update({
          assigned_to: moderator.clerk_id,
          assigned_to_name: moderator.name,
          status: 'in-progress'
        })
        .eq('id', ticket.id)

      if (assignError) {
        console.error(`❌ Error assigning ticket ${ticket.id}:`, assignError)
        continue
      }

      // Insert system message
      await supabase
        .from('messages')
        .insert([{
          ticket_id: ticket.id,
          content: `Votre ticket "${ticket.title}" a été automatiquement assigné à ${moderator.name}. Vous recevrez bientôt une réponse.`,
          sender_type: 'system',
          sender_name: 'Système',
          sender_id: 'system'
        }])

      // Send Discord notification
      try {
        const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
        const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'

        const discordMessage = {
          embeds: [{
            author: {
              name: 'Ticket Réassigné',
              icon_url: 'https://cdn-icons-png.flaticon.com/512/7656/7656139.png'
            },
            title: '🔄 Réassignation Automatique',
            color: 0x3B82F6,
            fields: [
              {
                name: '� Ticket',
                value: `#${ticket.id.substring(0, 8)}`,
                inline: true
              },
              {
                name: '👤 Client',
                value: ticket.client_name,
                inline: true
              },
              {
                name: '\u200b',
                value: '\u200b',
                inline: false
              },
              {
                name: '👨‍💼 Nouveau Modérateur',
                value: moderator.name,
                inline: false
              },
              {
                name: '📝 Problème',
                value: ticket.title,
                inline: false
              },
              {
                name: '\u200b',
                value: '\u200b',
                inline: false
              },
              {
                name: '🔗 Actions',
                value: `[Voir le ticket](${SITE_URL}/espace-client.html)`,
                inline: false
              }
            ],
            footer: {
              text: 'Script Lua Support System',
              icon_url: 'https://cdn-icons-png.flaticon.com/512/2965/2965358.png'
            },
            timestamp: new Date().toISOString()
          }]
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const discordResponse = await fetch(DISCORD_WEBHOOK_MODERATOR, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordMessage),
          signal: controller.signal
        })
        clearTimeout(timeoutId)

        if (!discordResponse.ok) {
          console.error('❌ Discord webhook failed for reassignment:', discordResponse.status)
        } else {
          console.log('✅ Reassignment Discord notification sent')
        }
      } catch (e) {
        console.error('❌ Exception during Discord notification:', e)
      }

      reassignedCount++
    }

    console.log(`✅ Reassigned ${reassignedCount} tickets`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Reassigned ${reassignedCount} tickets`,
        reassigned: reassignedCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in reassign-tickets:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})