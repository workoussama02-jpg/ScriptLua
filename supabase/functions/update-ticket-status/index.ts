// Supabase Edge Function: update-ticket-status
// Updates a ticket's status with proper authentication and authorization

import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { decode, verify, type Algorithm } from "https://deno.land/x/djwt@v3.0.2/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

// Clerk JWT verification utilities
async function getClerkPublicKey(kid: string): Promise<CryptoKey> {
  const clerkDomain = Deno.env.get('CLERK_DOMAIN')
  if (!clerkDomain) {
    throw new Error('CLERK_DOMAIN environment variable not set')
  }

  const jwksUrl = `https://${clerkDomain}/.well-known/jwks.json`
  
  // Create AbortController for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
  
  let response: Response
  try {
    response = await fetch(jwksUrl, { signal: controller.signal })
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('JWKS fetch timed out after 5 seconds')
    }
    throw error
  }
  
  clearTimeout(timeoutId)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: ${response.status}`)
  }

  const jwks = await response.json()
  const key = jwks.keys.find((k: any) => k.kid === kid)
  
  if (!key) {
    throw new Error(`Public key with kid ${kid} not found`)
  }

  // Convert JWK to CryptoKey
  return await crypto.subtle.importKey(
    'jwk',
    key,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  )
}

async function verifyClerkToken(token: string): Promise<any> {
  try {
    // Decode header to get kid
    const [headerB64] = token.split('.')
    const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')))
    
    if (!header.kid) {
      throw new Error('No key ID found in JWT header')
    }

    // Get the public key
    const publicKey = await getClerkPublicKey(header.kid)
    
    // Verify the token
    const payload = await verify(token, publicKey)
    
    // Validate JWT claims
    const now = Math.floor(Date.now() / 1000)
    
    if (payload.exp && payload.exp <= now) {
      throw new Error('JWT expired')
    }
    
    const expectedIssuer = Deno.env.get('CLERK_ISSUER')
    if (!expectedIssuer) {
      throw new Error('CLERK_ISSUER environment variable is required')
    }
    if (payload.iss !== expectedIssuer) {
      throw new Error(`Invalid JWT issuer: expected ${expectedIssuer}, got ${payload.iss}`)
    }
    
    const expectedAudience = Deno.env.get('CLERK_AUDIENCE')
    if (expectedAudience && payload.aud) {
      const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
      if (!audiences.includes(expectedAudience)) {
        throw new Error(`Invalid JWT audience: expected ${expectedAudience}, got ${audiences.join(', ')}`)
      }
    }
    // Note: CLERK_AUDIENCE is now optional - if not set or token has no aud claim, we accept the token
    
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid JWT token')
  }
}

interface UpdateStatusData {
  ticketId: string
  newStatus: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get environment variables
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // Create Supabase client with service role
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Extract Clerk token from custom header
    const clerkToken = req.headers.get('x-clerk-token')
    if (!clerkToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing x-clerk-token header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const token = clerkToken
    let userId: string

    try {
      // Verify JWT signature and decode payload using Clerk's public keys
      const payload = await verifyClerkToken(token)
      userId = payload.sub
    } catch (error) {
      console.error('JWT verification failed:', error)
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid authorization token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'No user ID found in token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Authenticated user ID:', userId)

    // Get user data from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, email, role, active')
      .eq('clerk_id', userId)
      .eq('active', true)
      .single()

    if (userError || !user) {
      console.error('User not found or inactive:', userError)
      return new Response(
        JSON.stringify({ success: false, error: 'User not found or account inactive' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('User role:', user.role)

    // Get update data from request
    const { ticketId, newStatus } = await req.json() as UpdateStatusData

    if (!ticketId || !newStatus) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: ticketId and newStatus' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate status value
    const validStatuses = ['open', 'in-progress', 'waiting-for-client', 'resolved', 'closed', 'escalated']
    if (!validStatuses.includes(newStatus)) {
      return new Response(
        JSON.stringify({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if ticket exists and user has permission to update it
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('id, client_id, assigned_to, status')
      .eq('id', ticketId)
      .single()

    if (ticketError || !ticket) {
      console.error('Ticket not found:', ticketError)
      return new Response(
        JSON.stringify({ success: false, error: 'Ticket not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Authorization check based on user role and ticket relationship
    let hasPermission = false

    if (user.role === 'admin') {
      hasPermission = true
    } else if (user.role === 'moderator') {
      // Moderators can update status of tickets assigned to them
      hasPermission = ticket.assigned_to === userId // Use clerk_id for comparison
    } else if (user.role === 'client') {
      // Clients can only update status of their own tickets and only to limited statuses
      const allowedClientStatuses = ['waiting-for-client', 'resolved', 'closed']
      hasPermission = ticket.client_id === userId && allowedClientStatuses.includes(newStatus) // Use clerk_id for comparison
    }

    if (!hasPermission) {
      console.warn('User does not have permission to update ticket status:', {
        userId: user.id,
        userRole: user.role,
        ticketId,
        ticketClientId: ticket.client_id,
        ticketAssignedTo: ticket.assigned_to,
        currentStatus: ticket.status,
        requestedStatus: newStatus
      })
      return new Response(
        JSON.stringify({ success: false, error: 'You do not have permission to update this ticket\'s status' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Updating ticket status:', ticketId, 'from', ticket.status, 'to', newStatus)

    // Update the ticket status
    const { data: updatedTicket, error: updateError } = await supabase
      .from('tickets')
      .update({ status: newStatus })
      .eq('id', ticketId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating ticket status:', updateError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to update ticket status: ${updateError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Ticket status updated successfully:', ticketId)

    // If ticket was escalated, send Discord notification to admins
    if (newStatus === 'escalated') {
      console.log('Sending escalation notification to admins for ticket:', ticketId)
      
      try {
        const DISCORD_WEBHOOK_ADMIN = Deno.env.get('DISCORD_WEBHOOK_ADMIN')
        const DISCORD_ADMIN_ROLE_ID = Deno.env.get('DISCORD_ADMIN_ROLE_ID')
        const SITE_URL = Deno.env.get('SITE_URL')
        
        if (DISCORD_WEBHOOK_ADMIN) {
          // Get full ticket details for notification
          const { data: fullTicket, error: fullTicketError } = await supabase
            .from('tickets')
            .select('*')
            .eq('id', ticketId)
            .single()

          if (fullTicket && !fullTicketError) {
            const createdDate = new Date(fullTicket.created_at)
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
              content: DISCORD_ADMIN_ROLE_ID ? `🚨 <@&${DISCORD_ADMIN_ROLE_ID}> Ticket escaladé ! 🚨` : '🚨 Ticket escaladé ! 🚨',
              embeds: [{
                title: '⚠️ ESCALADE: Ticket Nécessitant Attention Admin',
                color: 0xEF4444,
                description: `Ce ticket a été escaladé et nécessite une intervention administrative.`,
                fields: [
                  {
                    name: '👤 Client',
                    value: fullTicket.client_name,
                    inline: true
                  },
                  {
                    name: '🆔 Ticket',
                    value: `#${fullTicket.id.substring(0, 8)}`,
                    inline: true
                  },
                  {
                    name: '📝 Problème',
                    value: fullTicket.title,
                    inline: false
                  },
                  {
                    name: '📄 Description',
                    value: fullTicket.description.length > 200 
                      ? fullTicket.description.substring(0, 200) + '...' 
                      : fullTicket.description,
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
                    name: '👮 Escaladé par',
                    value: user.name,
                    inline: true
                  }
                ],
                footer: {
                  text: 'Script Lua Support System - Escalade Manuelle'
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

            // Log the notification
            await supabase
              .from('discord_notifications')
              .insert({
                ticket_id: fullTicket.id,
                notification_type: 'escalation',
                webhook_used: 'admin',
                sent_at: null
              })

            // Send to Discord
            const discordResponse = await fetch(DISCORD_WEBHOOK_ADMIN, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(discordMessage)
            })

            if (discordResponse.ok) {
              // Update log with success
              await supabase
                .from('discord_notifications')
                .update({ sent_at: new Date().toISOString() })
                .eq('ticket_id', fullTicket.id)
                .eq('notification_type', 'escalation')
                .is('sent_at', null)
              
              console.log('Escalation notification sent successfully to Discord')
            } else {
              const errorText = await discordResponse.text()
              console.error('Failed to send Discord notification:', discordResponse.status, errorText)
              
              // Update log with failure
              await supabase
                .from('discord_notifications')
                .update({ 
                  sent_at: new Date().toISOString(),
                  metadata: { error: `Discord failed: ${discordResponse.status}` }
                })
                .eq('ticket_id', fullTicket.id)
                .eq('notification_type', 'escalation')
                .is('sent_at', null)
            }
          }
        } else {
          console.warn('DISCORD_WEBHOOK_ADMIN not configured, skipping escalation notification')
        }
      } catch (notificationError) {
        console.error('Error sending escalation notification:', notificationError)
        // Don't fail the whole request if notification fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        ticket: {
          id: updatedTicket.id,
          status: updatedTicket.status
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in update-ticket-status:', error)
    
    // Extract error message safely for additional logging if it's an Error instance
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error details:', errorMessage)
    
    // Return generic error response to client (don't expose internals)
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})