// Supabase Edge Function: create-ticket
// Creates a new support ticket with proper authentication and authorization

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { decode, verify, type Algorithm } from "https://deno.land/x/djwt@v3.0.2/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

// Constant-time comparison helper to prevent timing attacks
function timingSafeEqual(a: string | null, b: string | null): boolean {
  if (a === null || b === null) {
    return false
  }

  const encoder = new TextEncoder()
  const aBytes = encoder.encode(a)
  const bBytes = encoder.encode(b)

  // Pad both byte arrays to the same length to prevent timing attacks
  const maxLength = Math.max(aBytes.length, bBytes.length)
  const paddedA = new Uint8Array(maxLength)
  const paddedB = new Uint8Array(maxLength)

  // Copy the original bytes into the padded arrays
  paddedA.set(aBytes)
  paddedB.set(bBytes)

  // Perform constant-time comparison on equal-length buffers
  return crypto.subtle.timingSafeEqual(paddedA, paddedB)
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

  // Validate key algorithm
  if (key.alg !== 'RS256') {
    throw new Error(`Invalid key algorithm: expected RS256, got ${key.alg}`)
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
    
    // Convert base64url to base64 by replacing chars and adding padding
    let base64 = headerB64.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) {
      base64 += '='
    }
    
    let header: any
    try {
      header = JSON.parse(atob(base64))
    } catch (decodeError) {
      throw new Error('Failed to decode JWT header')
    }
    
    if (!header.kid) {
      throw new Error('No key ID found in JWT header')
    }

    // Get the public key
    const publicKey = await getClerkPublicKey(header.kid)
    
    // Verify the token
    const payload = await verify(token, publicKey)
    
    // Validate JWT claims
    const expectedIssuer = Deno.env.get('CLERK_ISSUER')
    if (expectedIssuer && payload.iss !== expectedIssuer) {
      throw new Error(`Invalid JWT issuer: expected ${expectedIssuer}, got ${payload.iss}`)
    }
    
    const expectedAudience = Deno.env.get('CLERK_AUDIENCE')
    if (expectedAudience && payload.aud) {
      // Validate audience claim
      const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
      if (!audiences.includes(expectedAudience)) {
        throw new Error(`Invalid JWT audience: expected ${expectedAudience}, got ${audiences.join(', ')}`)
      }
    }
    // Note: CLERK_AUDIENCE is now optional - if not set or token has no aud claim, we accept the token
    
    return payload
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`JWT verification failed: ${errorMessage}`)
  }
}

interface TicketData {
  title: string
  description: string
  priority: string
  client_id?: string // This should be ignored from client
  client_name?: string // This should be ignored from client
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('🎫 CREATE-TICKET FUNCTION CALLED - START')

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

    // Extract Clerk JWT from custom header (not using Authorization to bypass Supabase's JWT validation)
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

    const token = clerkToken
    
    let userId: string

    try {
      // Verify JWT signature and decode payload using Clerk's public keys
      const payload = await verifyClerkToken(token)
      userId = payload.sub
      
      // Extract email from JWT payload
      const userEmail = payload.email || payload.user?.email || payload.user_metadata?.email || null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      const errorStack = error instanceof Error ? error.stack : undefined
      
      // Return detailed error in development
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid token",
          debug: {
            message: errorMessage,
            stack: errorStack,
            clerkDomain: Deno.env.get('CLERK_DOMAIN'),
            clerkIssuer: Deno.env.get('CLERK_ISSUER')
          }
        }),
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

    // Get user data from database
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, email, role, active, clerk_id')
      .eq('clerk_id', userId)
      .eq('active', true)
      .single()

    if (userError || !user) {
      // Auto-create user if they don't exist
      const newUserData = {
        clerk_id: userId,
        name: 'New User',  // Can be updated later
        email: userEmail || `pending-${userId}@placeholder.local`,
        role: 'client',
        active: true
      }
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert(newUserData)
        .select()
        .single()
      
      if (createError) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Failed to create user account'
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      if (!newUser) {
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to create user account - no data returned' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      user = newUser
    }

    // Only clients can create tickets
    if (user.role !== 'client') {
      return new Response(
        JSON.stringify({ success: false, error: 'Only clients can create tickets' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get ticket data from request
    const { ticketData } = await req.json() as { ticketData: TicketData }

    if (!ticketData || !ticketData.title || !ticketData.description) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required ticket data (title, description)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate ticket data
    if (ticketData.title.length > 200) {
      return new Response(
        JSON.stringify({ success: false, error: 'Title too long (max 200 characters)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (ticketData.description.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Description too long (max 2000 characters)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate and normalize priority
    const ALLOWED_PRIORITIES = ['low', 'normal', 'high', 'urgent'] as const
    type Priority = typeof ALLOWED_PRIORITIES[number]
    
    const normalizePriority = (priority: string | undefined): Priority => {
      if (!priority) return 'normal'
      const normalized = priority.toLowerCase().trim()
      return ALLOWED_PRIORITIES.includes(normalized as Priority) ? (normalized as Priority) : 'normal'
    }

    const validatedPriority = normalizePriority(ticketData.priority)

    // Ignore any client-provided userId/userRole and use authenticated user data
    const ticketToCreate = {
      title: ticketData.title,
      description: ticketData.description,
      priority: validatedPriority,
      status: 'open',
      client_id: user.clerk_id, // Use the clerk_id for foreign key reference
      client_name: user.name || user.email || 'Client'
    }

    // Create the ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .insert(ticketToCreate)
      .select()
      .single()

    if (ticketError) {
      return new Response(
        JSON.stringify({ success: false, error: `Failed to create ticket: ${ticketError.message}`, debug: { userId: userId, user_id: user.id, ticketToCreate } }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check for available moderators and auto-assign if possible (best-effort)
    try {
      console.log('🔍 Checking for available moderators...')
      const { data: availableModerators, error: modError } = await supabase
        .from('users')
        .select('id, name, clerk_id, available, active, role')
        .eq('role', 'moderator')
        .eq('available', true)
        .eq('active', true)

      if (modError) {
        console.error('❌ Error fetching available moderators:', modError)
      } else {
        console.log('✅ Found available moderators:', availableModerators?.length || 0)
        if (availableModerators && availableModerators.length > 0) {
          console.log('👥 Available moderators:', availableModerators.map(m => ({ name: m.name, clerk_id: m.clerk_id })))
          
          // Find the moderator with the least assigned tickets
          let selectedModerator = null
          let minTickets = Infinity

          for (const moderator of availableModerators) {
            console.log(`🔢 Counting tickets for moderator: ${moderator.name} (${moderator.clerk_id})`)
            const { count, error: countError } = await supabase
              .from('tickets')
              .select('*', { count: 'exact', head: true })
              .eq('assigned_to', moderator.clerk_id) // Use clerk_id for comparison
              .eq('status', 'in-progress')

            if (countError) {
              console.error(`❌ Error counting tickets for moderator ${moderator.name}:`, countError)
              continue
            }

            const ticketCount = count || 0
            console.log(`📊 Moderator ${moderator.name} has ${ticketCount} in-progress tickets`)

            if (ticketCount < minTickets) {
              minTickets = ticketCount
              selectedModerator = moderator
            }
          }

          if (selectedModerator) {
            console.log(`🎯 Selected moderator for auto-assignment: ${selectedModerator.name} (${selectedModerator.clerk_id})`)
            
            // Auto-assign the ticket
            const { data: updatedTicket, error: assignError } = await supabase
              .from('tickets')
              .update({
                assigned_to: selectedModerator.clerk_id,
                assigned_to_name: selectedModerator.name,
                status: 'in-progress'
              })
              .eq('id', ticket.id)
              .select()
              .single()

            if (assignError) {
              console.error('❌ Error auto-assigning ticket:', assignError)
            } else {
              console.log('✅ Ticket auto-assigned successfully')
              
              // Insert system message for auto-assignment (with idempotency check)
              try {
                console.log('💬 Checking for existing system messages')
                
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
                  console.log('💬 Inserting system message for auto-assignment')
                  const { data: systemMessage, error: msgError } = await supabase
                    .from('messages')
                    .insert([{
                      ticket_id: ticket.id,
                      content: `Votre ticket "${ticket.title}" a été automatiquement assigné à ${selectedModerator.name}. Vous recevrez bientôt une réponse.`,
                      sender_type: 'system',
                      sender_name: 'Système',
                      sender_id: 'system'
                    }])
                    .select()
                    .single()

                  if (msgError) {
                    console.error('❌ Failed to insert auto-assignment system message:', msgError)
                  } else {
                    console.log('✅ System message inserted successfully')
                  }
                }
              } catch (msgException) {
                console.error('❌ Exception during auto-assignment system message:', msgException)
              }

              // Send Discord notification for auto-assignment (with idempotency check)
              try {
                console.log('🔔 Checking if notification already sent')
                
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
                console.log('⏭️ Skipping auto-assignment notification to prevent duplicate')
                } else {
                  console.log('🔔 Sending Discord notification for auto-assignment')
                  
                  // Insert notification record FIRST to prevent duplicates
                  const { error: insertError } = await supabase
                    .from('discord_notifications')
                    .insert({
                      ticket_id: ticket.id,
                      notification_type: 'ticket_claimed',
                      webhook_used: 'moderator',
                      sent_at: new Date().toISOString(),
                      metadata: { moderator: selectedModerator.name, source: 'auto_assign' }
                    })
                  
                  if (insertError && !insertError.message.includes('duplicate')) {
                    console.error('❌ Error inserting notification record:', insertError)
                  } else {
                    // Get from env or use hardcoded for testing
                    const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
                    const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'
                    
                    console.log('Using Discord webhook and site URL')
                    
                    const discordMessage = {
                      embeds: [{
                        author: {
                          name: 'Ticket pris en charge',
                          icon_url: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png'
                        },
                        title: '✅ Ticket Pris en Charge',
                        color: 0x10B981,
                        fields: [
                          {
                            name: '🆔 Ticket',
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
                            name: '👨‍💼 Modérateur',
                            value: selectedModerator.name,
                            inline: false
                          },
                          {
                            name: '📝 Problème',
                            value: ticket.title,
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

                    // Send to Discord with timeout
                    const controller = new AbortController()
                    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

                    const discordResponse = await fetch(DISCORD_WEBHOOK_MODERATOR, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(discordMessage),
                      signal: controller.signal
                    })
                    clearTimeout(timeoutId)

                    if (!discordResponse.ok) {
                      const errorText = await discordResponse.text()
                      console.error('❌ Discord webhook failed:', discordResponse.status, errorText)
                    } else {
                      console.log('✅ Auto-assignment Discord notification sent successfully')
                    }
                  }
                }
              } catch (notificationException) {
                console.error('❌ Exception during auto-assignment Discord notification:', notificationException)
              }
            }
          } else {
            console.log('⚠️ No suitable moderator found for auto-assignment')
          }
        } else {
          console.log('⚠️ No available moderators found - sending alert notification')
          
          // Insert system message for client explaining no moderators are available
          try {
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
          } catch (msgException) {
            console.error('❌ Exception inserting system message:', msgException)
          }
          
          // Send Discord alert since no moderators are available
          try {
            const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR') || 'https://discord.com/api/webhooks/1468431833569034503/kKJAHqBigEk5bcj8KRwoCRTwtBUFUKjil0kH-fSY_ttokzbaMr-wSk82E7GaThsidjSL'
            const DISCORD_ROLE_ID = Deno.env.get('DISCORD_ROLE_ID')
            const SITE_URL = Deno.env.get('SITE_URL') || 'http://localhost:3000'
            
            // Check if ANY notification was recently sent (anti-duplicate within 2 minutes)
            const { data: recentNotifs, error: checkError } = await supabase
              .from('discord_notifications')
              .select('sent_at, notification_type')
              .eq('ticket_id', ticket.id)
              .gte('sent_at', new Date(Date.now() - 2 * 60 * 1000).toISOString())
            
            if (checkError) {
              console.error('❌ Error checking for recent notifications:', checkError)
            } else if (recentNotifs && recentNotifs.length > 0) {
              console.log('ℹ️ Notification(s) already sent recently for this ticket:', recentNotifs.map(n => n.notification_type).join(', '))
              console.log('⏭️ Skipping alert notification to prevent duplicate')
            } else {
              // Insert notification record FIRST to prevent duplicates
              const { error: insertError } = await supabase
                .from('discord_notifications')
                .insert({
                  ticket_id: ticket.id,
                  notification_type: 'ticket_created',
                  webhook_used: 'moderator',
                  sent_at: new Date().toISOString(),
                  metadata: { reason: 'no_moderators_available' }
                })
              
              if (insertError && !insertError.message.includes('duplicate')) {
                console.error('❌ Error inserting notification record:', insertError)
              } else {
                // Format timestamp
                const createdDate = new Date(ticket.created_at)
                const timestamp = createdDate.toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })

                // Send Discord notification
                const discordMessage = {
                  content: DISCORD_ROLE_ID ? `<@&${DISCORD_ROLE_ID}>` : undefined,
                  embeds: [{
                    author: {
                      name: 'Nouveau ticket en attente!',
                      icon_url: 'https://cdn-icons-png.flaticon.com/512/3588/3588610.png'
                    },
                    title: '📋 Nouveau Ticket de Support',
                    color: 0xF59E0B,
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
                        name: '\u200b',
                        value: '\u200b',
                        inline: false
                      },
                      {
                        name: '📝 Problème',
                        value: ticket.title,
                        inline: false
                      },
                      {
                        name: '📄 Description',
                        value: ticket.description.length > 300 
                          ? ticket.description.substring(0, 300) + '...' 
                          : ticket.description,
                        inline: false
                      },
                      {
                        name: '🕒 Créé le',
                        value: timestamp,
                        inline: false
                      },
                      {
                        name: '⚠️ Statut',
                        value: `Aucun modérateur n'a pris en charge le ticket.`,
                        inline: false
                      }
                    ],
                    footer: {
                      text: 'Script Lua Support System',
                      icon_url: 'https://cdn-icons-png.flaticon.com/512/2965/2965358.png'
                    },
                    timestamp: ticket.created_at
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
                  console.error('❌ Discord webhook failed:', discordResponse.status)
                } else {
                  console.log('✅ Alert notification sent to Discord')
                }
              }
            }
          } catch (alertException) {
            console.error('❌ Exception during alert notification:', alertException)
          }
          
          // Call notify-ticket-created to schedule escalation check
          try {
            console.log('📅 Calling notify-ticket-created to schedule escalation')
            const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
            const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
            
            const notifyResponse = await fetch(`${SUPABASE_URL}/functions/v1/notify-ticket-created`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
              },
              body: JSON.stringify({ ticket: ticket })
            })
            
            if (!notifyResponse.ok) {
              console.error('❌ Failed to call notify-ticket-created:', notifyResponse.status)
            } else {
              console.log('✅ Successfully called notify-ticket-created for escalation scheduling')
            }
          } catch (notifyException) {
            console.error('❌ Exception calling notify-ticket-created:', notifyException)
          }
        }
      }
    } catch (autoAssignException) {
      console.error('❌ Exception during auto-assignment check:', autoAssignException)
    }

    return new Response(
      JSON.stringify({
        success: true,
        ticket: {
          id: ticket.id,
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          status: ticket.status,
          client_id: ticket.client_id,
          client_name: ticket.client_name,
          created_at: ticket.created_at
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Extract error message safely for logging and response
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    // Log the full error server-side safely
    console.error('Error in create-ticket:', errorMessage)
    console.error('Error stack:', errorStack)
    
    // Return error response to client with detailed info
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error",
        debug: {
          message: errorMessage,
          stack: errorStack
        }
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})