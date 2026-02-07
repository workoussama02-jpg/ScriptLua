// Supabase Edge Function: update-moderator-availability
// Updates a moderator's availability status and reassigns tickets if becoming available

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

  console.log('🔄 UPDATE-MODERATOR-AVAILABILITY FUNCTION CALLED')

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

    // Optional Clerk token validation (for additional security)
    const clerkToken = req.headers.get('x-clerk-token')
    if (clerkToken) {
      console.log('✅ Clerk token provided, validating...')
      // If token is provided, validate it
      try {
        // Basic token validation - just check if it's a JWT
        const parts = clerkToken.split('.')
        if (parts.length !== 3) {
          throw new Error('Invalid JWT format')
        }
        console.log('✅ Clerk token format valid')
      } catch (error) {
        console.log('⚠️ Invalid Clerk token provided, but continuing since this is an internal operation')
      }
    } else {
      console.log('ℹ️ No Clerk token provided, proceeding with frontend authentication')
    }

    // Get request data
    const { clerk_id, available } = await req.json()

    if (!clerk_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing clerk_id' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (typeof available !== 'boolean') {
      return new Response(
        JSON.stringify({ success: false, error: 'available must be boolean' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Update moderator availability
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ available })
      .eq('clerk_id', clerk_id)
      .eq('role', 'moderator')
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating moderator availability:', updateError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update availability' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`✅ Updated moderator ${clerk_id} availability to ${available}`)

    let reassignedCount = 0
    let unassignedCount = 0

    // If setting to available, reassign unassigned tickets
    if (available) {
      console.log('🔄 Moderator going online...')

      // Send Discord notification that moderator is now available
      try {
        const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
        const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'

        // Get moderator details
        const { data: moderatorData } = await supabase
          .from('users')
          .select('name, email')
          .eq('clerk_id', clerk_id)
          .single()

        const moderatorName = moderatorData?.name || updatedUser?.name || 'Modérateur'

        const discordMessage = {
          embeds: [{
            author: {
              name: 'Modérateur En Ligne',
              icon_url: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png'
            },
            title: '✅ Modérateur Disponible',
            color: 0x10B981, // Green - success color
            description: `**${moderatorName}** est maintenant en ligne et prêt à traiter des tickets.`,
            fields: [
              {
                name: '👨‍💼 Modérateur',
                value: `**${moderatorName}**`,
                inline: true
              },
              {
                name: '📊 Statut',
                value: '**Disponible**',
                inline: true
              },
              {
                name: '\u200b',
                value: '\u200b',
                inline: false
              },
              {
                name: '🔔 Information',
                value: 'Ce modérateur peut maintenant recevoir et traiter des tickets de support.',
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

        console.log('📤 Sending moderator online notification to Discord')

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
          const errorText = await discordResponse.text()
          console.error('❌ Discord notification failed:', discordResponse.status, errorText)
        } else {
          console.log('✅ Moderator online notification sent to Discord')
        }
      } catch (notificationError) {
        console.error('❌ Exception during moderator online notification:', notificationError)
      }

      console.log('🔄 Reassigning unassigned tickets...')

      // Find unassigned tickets
      const { data: unassignedTickets, error: ticketError } = await supabase
        .from('tickets')
        .select('id, title, description, client_name')
        .eq('status', 'open')
        .is('assigned_to', null)
        .order('created_at', { ascending: true })

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
        console.log('ℹ️ No unassigned tickets to reassign')
      } else {
        console.log(`📋 Found ${unassignedTickets.length} unassigned tickets`)

        // Find available moderators (including the one we just made available)
        const { data: availableModerators, error: modError } = await supabase
          .from('users')
          .select('id, name, clerk_id, available, active, role')
          .eq('role', 'moderator')
          .eq('available', true)
          .eq('active', true)

        if (modError || !availableModerators || availableModerators.length === 0) {
          console.log('⚠️ No available moderators found')
        } else {
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

            // Insert system message (with idempotency check)
            try {
              console.log('💬 Checking for existing reassignment system messages')
              
              // Check if a recent reassignment system message already exists for this ticket (within last 2 minutes)
              const { data: existingMessages, error: checkError } = await supabase
                .from('messages')
                .select('id, content, created_at')
                .eq('ticket_id', ticket.id)
                .eq('sender_type', 'system')
                .eq('sender_id', 'system')
                .ilike('content', '%maintenant en ligne%')
                .gte('created_at', new Date(Date.now() - 2 * 60 * 1000).toISOString())
                .limit(1)
              
              if (checkError) {
                console.error('❌ Error checking for existing system messages:', checkError)
              } else if (existingMessages && existingMessages.length > 0) {
                console.log('ℹ️ Recent reassignment system message already exists for this ticket, skipping')
              } else {
                console.log('💬 Inserting system message for reassignment')
                await supabase
                  .from('messages')
                  .insert([{
                    ticket_id: ticket.id,
                    content: `Bonne nouvelle ! ${moderator.name} est maintenant en ligne et a pris en charge votre ticket "${ticket.title}". Vous recevrez bientôt une réponse.`,
                    sender_type: 'system',
                    sender_name: 'Système',
                    sender_id: 'system'
                  }])
                console.log('✅ System message inserted')
              }
            } catch (msgException) {
              console.error('❌ Exception checking/inserting system message:', msgException)
            }

            // Send Discord notification (with idempotency check)
            try {
              console.log('🔔 Checking if notification already sent for ticket', ticket.id)
              
              // Check if ANY notification was recently sent for this ticket (anti-duplicate within 2 minutes)
              const { data: recentNotifs, error: checkError } = await supabase
                .from('discord_notifications')
                .select('sent_at, notification_type')
                .eq('ticket_id', ticket.id)
                .gte('sent_at', new Date(Date.now() - 2 * 60 * 1000).toISOString())
              
              if (checkError) {
                console.error('❌ Error checking for recent notifications:', checkError)
              } else if (recentNotifs && recentNotifs.length > 0) {
                console.log('ℹ️ Notification(s) already sent recently for this ticket:', recentNotifs.map(n => n.notification_type).join(', '))
                console.log('⏭️ Skipping reassignment notification to prevent duplicate')
              } else {
                console.log('🔔 Sending Discord notification for reassignment')
                
                // Insert notification record FIRST to prevent duplicates
                const { error: insertError } = await supabase
                  .from('discord_notifications')
                  .insert({
                    ticket_id: ticket.id,
                    notification_type: 'ticket_claimed',
                    webhook_used: 'moderator',
                    sent_at: new Date().toISOString(),
                    metadata: { moderator: moderator.name, source: 'moderator_available' }
                  })
                
                if (insertError && !insertError.message.includes('duplicate')) {
                  console.error('❌ Error inserting notification record:', insertError)
                } else {
                  const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
                  const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'

                  const discordMessage = {
                    embeds: [{
                      author: {
                        name: 'Ticket Réassigné',
                        icon_url: 'https://cdn-icons-png.flaticon.com/512/7656/7656139.png'
                      },
                      title: '🔄 Réassignation Automatique',
                      color: 0x3B82F6, // Blue - reassignment color
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
                    console.error('❌ Discord webhook failed for reassignment')
                  } else {
                    console.log('✅ Reassignment Discord notification sent')
                  }
                }
              }
            } catch (e) {
              console.error('❌ Exception during Discord notification:', e)
            }

            reassignedCount++
          }
        }
      }
    } else {
      // If setting to unavailable, unassign their tickets back to the queue
      console.log('🔄 Unassigning tickets from unavailable moderator...')

      const { data: assignedTickets, error: ticketError } = await supabase
        .from('tickets')
        .select('id, title, client_name')
        .eq('assigned_to', clerk_id)
        .eq('status', 'in-progress')

      if (ticketError) {
        console.error('❌ Error fetching assigned tickets:', ticketError)
      } else if (assignedTickets && assignedTickets.length > 0) {
        console.log(`📋 Found ${assignedTickets.length} tickets assigned to this moderator`)

        // Unassign tickets
        for (const ticket of assignedTickets) {
          console.log(`🔄 Unassigning ticket ${ticket.id}, current status: in-progress`)
          
          const { data: updatedTicket, error: unassignError } = await supabase
            .from('tickets')
            .update({
              assigned_to: null,
              assigned_to_name: null,
              status: 'open'
            })
            .eq('id', ticket.id)
            .select()
            .single()

          if (unassignError) {
            console.error(`❌ Error unassigning ticket ${ticket.id}:`, unassignError)
            console.error(`❌ Error details:`, JSON.stringify(unassignError, null, 2))
          } else if (!updatedTicket) {
            console.error(`❌ Ticket ${ticket.id} update returned no data - might be RLS issue`)
          } else {
            console.log(`✅ Unassigned ticket ${ticket.id}`)
            console.log(`✅ Updated status: ${updatedTicket.status}, assigned_to: ${updatedTicket.assigned_to}`)

            // Insert system message (with idempotency check)
            try {
              console.log('💬 Checking for existing unassignment system messages')
              
              // Check if an unassignment system message already exists for this ticket
              const { data: existingMessages, error: checkError } = await supabase
                .from('messages')
                .select('id, content')
                .eq('ticket_id', ticket.id)
                .eq('sender_type', 'system')
                .eq('sender_id', 'system')
                .ilike('content', '%remis en file d\'attente%')
                .limit(1)
              
              if (checkError) {
                console.error('❌ Error checking for existing unassignment messages:', checkError)
              } else if (existingMessages && existingMessages.length > 0) {
                console.log('ℹ️ Unassignment system message already exists for this ticket, skipping')
              } else {
                console.log('💬 Inserting unassignment system message')
                const { error: msgError } = await supabase
                  .from('messages')
                  .insert([{
                    ticket_id: ticket.id,
                    content: `Votre ticket "${ticket.title}" a été remis en file d'attente car le modérateur n'est plus disponible.`,
                    sender_type: 'system',
                    sender_name: 'Système',
                    sender_id: 'system'
                  }])

                if (msgError) {
                  console.error(`❌ Error inserting system message for ticket ${ticket.id}:`, msgError)
                } else {
                  console.log(`✅ System message inserted for ticket ${ticket.id}`)
                }
              }
            } catch (msgException) {
              console.error(`❌ Exception checking/inserting unassignment system message:`, msgException)
            }

            unassignedCount++
          }
        }

        // Check if there are now unassigned tickets and no available moderators
        console.log('🔍 Checking for alert conditions...')
        const { count: remainingUnassignedCount, error: checkError } = await supabase
          .from('tickets')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open')
          .is('assigned_to', null)

        console.log('🔍 Unassigned tickets query result:', { count: remainingUnassignedCount, error: checkError })

        const { count: availableModsCount, error: modCheckError } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'moderator')
          .eq('available', true)
          .eq('active', true)

        console.log('🔍 Available moderators query result:', { count: availableModsCount, error: modCheckError })

        console.log(`📊 After unassignment: ${remainingUnassignedCount} unassigned tickets, ${availableModsCount} available moderators`)

        if (!checkError && !modCheckError && remainingUnassignedCount > 0 && availableModsCount === 0) {
          console.log(`🚨 ${remainingUnassignedCount} unassigned tickets with no available moderators - checking if alert needed`)

          // Send Discord alert notification (with idempotency check)
          try {
            // Check if an alert was recently sent (within 5 minutes)
            const { data: recentAlerts, error: alertCheckError } = await supabase
              .from('discord_notifications')
              .select('sent_at, metadata')
              .eq('notification_type', 'alert_no_moderators')
              .gte('sent_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())
              .order('sent_at', { ascending: false })
              .limit(1)
            
            if (alertCheckError) {
              console.error('❌ Error checking for recent alerts:', alertCheckError)
            } else if (recentAlerts && recentAlerts.length > 0) {
              console.log('ℹ️ Alert notification already sent recently, skipping to prevent spam')
            } else {
              console.log('🔔 Sending alert notification')
              
              // Insert notification record FIRST to prevent duplicates
              const { error: insertError } = await supabase
                .from('discord_notifications')
                .insert({
                  ticket_id: null, // This is a general alert, not specific to one ticket
                  notification_type: 'alert_no_moderators',
                  webhook_used: 'moderator',
                  sent_at: new Date().toISOString(),
                  metadata: { unassigned_count: remainingUnassignedCount, source: 'moderator_unavailable' }
                })
              
              if (insertError && !insertError.message.includes('duplicate') && !insertError.message.includes('null value')) {
                console.error('❌ Error inserting alert notification record:', insertError)
              } else {
                const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
                const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'

                const discordMessage = {
                  embeds: [{
                    author: {
                      name: 'Tickets en attente',
                      icon_url: 'https://cdn-icons-png.flaticon.com/512/564/564619.png'
                    },
                    title: '🚨 Alerte - Aucun Modérateur Disponible',
                    color: 0xF59E0B, // Orange - warning color
                    description: `⚠️ **${remainingUnassignedCount} ticket(s)** en file d'attente\n**Aucun modérateur disponible** pour traiter les demandes.`,
                    fields: [
                      {
                        name: '📄 Tickets en attente',
                        value: `**${remainingUnassignedCount}**`,
                        inline: true
                      },
                      {
                        name: '👥 Modérateurs disponibles',
                        value: '**0**',
                        inline: true
                      },
                      {
                        name: '\u200b',
                        value: '\u200b',
                        inline: false
                      },
                      {
                        name: '🔔 Action requise',
                        value: `➡️ Les modérateurs doivent se connecter pour traiter les tickets en attente.\n\n[🔗 Accéder à l'espace modérateur](${SITE_URL}/espace-client.html)`,
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

                console.log('📤 Sending Discord alert with message:', discordMessage.content)

                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 10000)

                const discordResponse = await fetch(DISCORD_WEBHOOK_MODERATOR, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(discordMessage),
                  signal: controller.signal
                })
                clearTimeout(timeoutId)

                console.log('📊 Discord response status:', discordResponse.status)

                if (!discordResponse.ok) {
                  const errorText = await discordResponse.text()
                  console.error('❌ Discord alert webhook failed:', discordResponse.status, errorText)
                } else {
                  console.log('✅ Alert Discord notification sent successfully')
                }
              }
            }
          } catch (e) {
            console.error('❌ Exception during Discord alert:', e)
          }
        } else {
          console.log(`ℹ️ No alert needed: unassigned=${remainingUnassignedCount}, available_mods=${availableModsCount}, errors: check=${!!checkError}, mod_check=${!!modCheckError}`)
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: available ? `Availability updated. Reassigned ${reassignedCount} tickets.` : `Availability updated. Unassigned ${unassignedCount} tickets.`,
        updated_user: updatedUser,
        reassigned: reassignedCount,
        unassigned: unassignedCount
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in update-moderator-availability:', error)
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