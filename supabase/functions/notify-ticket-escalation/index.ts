// Supabase Edge Function: notify-ticket-escalation
// Triggers when a ticket is unassigned for 1+ minutes
// Sends Discord notification to admins

import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Validate authorization before processing
  const authHeader = req.headers.get('authorization')
  const functionKey = req.headers.get('x-function-key')
  const expectedFunctionKey = Deno.env.get('FUNCTION_SECRET_KEY')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  // Extract bearer token
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  // Check if authorized with either function key or service role key
  // TEMPORARY: Allow all requests for testing escalation notifications
  // TODO: Remove this and implement proper authentication
  const isAuthorized = true

  if (!isAuthorized) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Validate required environment variables
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const DISCORD_WEBHOOK_ADMIN = Deno.env.get('DISCORD_WEBHOOK_ADMIN')
    const DISCORD_ADMIN_ROLE_ID = Deno.env.get('DISCORD_ADMIN_ROLE_ID')
    const SITE_URL = Deno.env.get('SITE_URL')

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: 'Supabase configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!DISCORD_WEBHOOK_ADMIN) {
      return new Response(
        JSON.stringify({ success: false, error: 'DISCORD_WEBHOOK_ADMIN not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { ticket_id } = await req.json()
    if (!ticket_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'No ticket_id provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get ticket details
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticket_id)
      .single()

    if (ticketError || !ticket) {
      return new Response(
        JSON.stringify({ success: false, error: 'Ticket not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if ticket is still unassigned and open
    if (ticket.assigned_to || ticket.status === 'closed') {
      return new Response(
        JSON.stringify({ success: true, message: 'Ticket already handled' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check for recent escalation notifications (15 minute cooldown)
    const { data: recentEscalation } = await supabase
      .from('discord_notifications')
      .select('*')
      .eq('ticket_id', ticket_id)
      .eq('notification_type', 'escalation')
      .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString())
      .maybeSingle()

    if (recentEscalation) {
      return new Response(
        JSON.stringify({ success: true, message: 'Cooldown active' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate time since ticket creation
    const createdDate = new Date(ticket.created_at)
    const now = new Date()
    const minutesWaiting = Math.floor((now.getTime() - createdDate.getTime()) / 1000 / 60)

    const timestamp = createdDate.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Prepare Discord message for admins
    const discordMessage = {
      content: DISCORD_ADMIN_ROLE_ID ? `🚨 <@&${DISCORD_ADMIN_ROLE_ID}> Ticket urgent en attente ! 🚨` : '🚨 Ticket urgent en attente ! 🚨',
      embeds: [{
        title: '⚠️ ESCALADE: Ticket Sans Modérateur',
        color: 0xEF4444,
        description: `Ce ticket attend depuis **${minutesWaiting} minutes** sans être pris en charge.`,
        fields: [
          {
            name: '👤 Client',
            value: ticket.client_name,
            inline: true
          },
          {
            name: '🆔 Ticket',
            value: `#${ticket.id.substring(0, 8)}`,
            inline: true
          },
          {
            name: '📝 Problème',
            value: ticket.title,
            inline: false
          },
          {
            name: '📄 Description',
            value: ticket.description.length > 200 
              ? ticket.description.substring(0, 200) + '...' 
              : ticket.description,
            inline: false
          },
          {
            name: '🕒 Créé le',
            value: timestamp,
            inline: true
          },
          {
            name: '⏱️ En attente depuis',
            value: `**${minutesWaiting} minutes**`,
            inline: true
          },
          {
            name: '⚠️ Statut',
            value: 'Aucun modérateur actuellement disponible.\nCe ticket attend d\'être pris en charge.',
            inline: false
          }
        ],
        footer: {
          text: 'Script Lua Support System - Escalade Admin'
        },
        timestamp: new Date().toISOString()
      }],
      components: SITE_URL ? [{
        type: 1,
        components: [{
          type: 2,
          label: '🔗 Voir le ticket',
          style: 5,
          url: `${SITE_URL}/espace-client.html`
        }]
      }] : []
    }

    // Create log entry before sending Discord
    const { error: logError } = await supabase
      .from('discord_notifications')
      .insert({
        ticket_id: ticket.id,
        notification_type: 'escalation',
        webhook_used: 'admin',
        sent_at: null
      })

    if (logError) {
      console.error('Failed to create log entry:', logError)
    }

    // Send to Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_ADMIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage)
    })

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text()
      
      // Update log with failure
      await supabase
        .from('discord_notifications')
        .update({ 
          sent_at: new Date().toISOString(),
          metadata: { error: `Discord failed: ${discordResponse.status}` }
        })
        .eq('ticket_id', ticket.id)
        .eq('notification_type', 'escalation')
        .is('sent_at', null)

      return new Response(
        JSON.stringify({ success: false, error: `Discord webhook failed: ${discordResponse.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update log with success
    await supabase
      .from('discord_notifications')
      .update({ sent_at: new Date().toISOString() })
      .eq('ticket_id', ticket.id)
      .eq('notification_type', 'escalation')
      .is('sent_at', null)

    // Update ticket status to escalated
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ status: 'escalated' })
      .eq('id', ticket_id)

    if (updateError) {
      console.error('Failed to update ticket status:', updateError)
    }

    // Insert system message to notify the client
    const { error: messageError } = await supabase
      .from('messages')
      .insert({
        ticket_id: ticket_id,
        content: '🚨 Votre ticket a été escaladé vers les administrateurs en raison de l\'absence de modérateurs disponibles.',
        sender_type: 'system',
        sender_name: 'Système',
        sender_id: null,
        sender_avatar: null
      });

    if (messageError) {
      console.error('Failed to insert system message:', messageError);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Escalation notification sent' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: (error instanceof Error ? error.message : 'Internal server error') }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
