// Supabase Edge Function: reassign-tickets
// Reassigns unassigned tickets to available moderators

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
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
    if (expectedAudience) {
      if (!payload.aud) {
        throw new Error('Missing JWT audience claim')
      }
      // Validate audience claim
      const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud]
      if (!audiences.includes(expectedAudience)) {
        throw new Error(`Invalid JWT audience: expected ${expectedAudience}, got ${audiences.join(', ')}`)
      }
    }

    return payload
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`JWT verification failed: ${errorMessage}`)
  }
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

    let userId: string

    try {
      // Verify JWT signature and decode payload using Clerk's public keys
      const payload = await verifyClerkToken(clerkToken)
      userId = payload.sub
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid token",
          debug: Deno.env.get('NODE_ENV') !== 'production' ? { message: errorMessage } : undefined
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
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, email, role, active, clerk_id')
      .eq('clerk_id', userId)
      .eq('active', true)
      .single()

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'User not found or inactive'
        }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Only moderators and admins can reassign tickets
    if (user.role !== 'moderator' && user.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Only staff members can reassign tickets' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

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

    // Get current ticket counts for all moderators in one query
    const { data: inProgressTickets, error: countError } = await supabase
      .from('tickets')
      .select('assigned_to')
      .eq('status', 'in-progress')
      .in('assigned_to', availableModerators.map(m => m.clerk_id))

    if (countError) {
      console.error('❌ Error fetching ticket counts:', countError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch ticket counts' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const moderatorCounts = new Map()
    for (const mod of availableModerators) {
      moderatorCounts.set(mod.clerk_id, 0)
    }
    for (const ticket of inProgressTickets || []) {
      if (ticket.assigned_to && moderatorCounts.has(ticket.assigned_to)) {
        moderatorCounts.set(ticket.assigned_to, moderatorCounts.get(ticket.assigned_to) + 1)
      }
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

      // Update ticket (conditional to prevent race conditions)
      const { data: updatedTicket, error: assignError } = await supabase
        .from('tickets')
        .update({
          assigned_to: moderator.clerk_id,
          assigned_to_name: moderator.name,
          status: 'in-progress'
        })
        .eq('id', ticket.id)
        .is('assigned_to', null)
        .select()

      if (assignError) {
        console.error(`❌ Error assigning ticket ${ticket.id}:`, assignError)
        continue
      }

      if (!updatedTicket || updatedTicket.length === 0) {
        console.log(`ℹ️ Ticket ${ticket.id} already assigned by another process, skipping`)
        continue
      }

      // Insert system message
      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          ticket_id: ticket.id,
          content: `Votre ticket "${ticket.title}" a été automatiquement assigné à ${moderator.name}. Vous recevrez bientôt une réponse.`,
          sender_type: 'system',
          sender_name: 'Système',
          sender_id: 'system'
        }])

      if (messageError) {
        console.error(`❌ Error inserting system message for ticket ${ticket.id} "${ticket.title}" assigned to ${moderator.name}:`, messageError)
        // Continue with reassignment even if message fails
      }

      // Send Discord notification
      try {
        const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR')
        if (!DISCORD_WEBHOOK_MODERATOR) {
          console.warn('⚠️ DISCORD_WEBHOOK_MODERATOR not configured, skipping notification')
          reassignedCount++
          continue
        }
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
                name: '🎫 Ticket',
                value: `#${ticket.id.substring(0, 8)}`,
                inline: true              },
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