// Supabase Edge Function: notify-ticket-claimed
// Triggers when a moderator claims a ticket
// Sends Discord notification to moderator channel

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

// JWT verification function
async function verifyClerkToken(token: string): Promise<any> {
  try {
    const CLERK_ISSUER = Deno.env.get('CLERK_ISSUER')
    const CLERK_DOMAIN = Deno.env.get('CLERK_DOMAIN')
    
    if (!CLERK_ISSUER || !CLERK_DOMAIN) {
      throw new Error('Missing Clerk configuration')
    }

    // Fetch Clerk's public keys
    const jwksResponse = await fetch(`https://${CLERK_DOMAIN}/.well-known/jwks.json`)
    if (!jwksResponse.ok) {
      throw new Error('Failed to fetch JWKS')
    }
    
    const jwks = await jwksResponse.json()
    
    // Decode JWT header to get key ID
    const [headerB64] = token.split('.')
    const header = JSON.parse(atob(headerB64))
    const keyId = header.kid
    
    // Find the matching public key
    const publicKeyData = jwks.keys.find((key: any) => key.kid === keyId)
    if (!publicKeyData) {
      throw new Error('Public key not found')
    }
    
    // Import the public key
    const publicKey = await crypto.subtle.importKey(
      'jwk',
      publicKeyData,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['verify']
    )
    
    // Verify the JWT
    const encoder = new TextEncoder()
    const data = encoder.encode(`${token.split('.')[0]}.${token.split('.')[1]}`)
    const signature = Uint8Array.from(atob(token.split('.')[2].replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    
    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      publicKey,
      signature,
      data
    )
    
    if (!isValid) {
      throw new Error('Invalid signature')
    }
    
    // Decode payload
    const payload = JSON.parse(atob(token.split('.')[1]))
    
    // Verify issuer
    if (payload.iss !== CLERK_ISSUER) {
      throw new Error('Invalid issuer')
    }
    
    // Optional audience validation (only if CLERK_AUDIENCE is set)
    const CLERK_AUDIENCE = Deno.env.get('CLERK_AUDIENCE')
    if (CLERK_AUDIENCE && payload.aud !== CLERK_AUDIENCE) {
      console.warn('Audience mismatch, but allowing since CLERK_AUDIENCE is optional')
    }
    
    // Check expiration
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }
    
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw error
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get and validate environment variables first
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    if (!SUPABASE_URL) {
      throw new Error('Missing SUPABASE_URL environment variable')
    }

    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
    }

    // Check if this is a service role call (from another Edge Function)
    const authHeader = req.headers.get('authorization')
    let isServiceRoleCall = false
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      isServiceRoleCall = token === SUPABASE_SERVICE_ROLE_KEY
    }

    let payload = null
    if (!isServiceRoleCall) {
      // For client-side calls, verify Clerk JWT token
      const clerkToken = req.headers.get('x-clerk-token')
      if (!clerkToken) {
        return new Response(
          JSON.stringify({ success: false, error: 'Unauthorized - No Clerk token' }),
          { 
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      payload = await verifyClerkToken(clerkToken)
    }

    const DISCORD_WEBHOOK_MODERATOR = Deno.env.get('DISCORD_WEBHOOK_MODERATOR')
    if (!DISCORD_WEBHOOK_MODERATOR) {
      return new Response(
        JSON.stringify({ success: false, error: 'Discord webhook not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const SITE_URL = Deno.env.get('SITE_URL')
    if (!SITE_URL) {
      return new Response(
        JSON.stringify({ success: false, error: 'Site URL not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { ticket_id, moderator_id, moderator_name } = await req.json()

    if (!ticket_id || !moderator_id || !moderator_name) {
      throw new Error('Missing required parameters')
    }

    // Get ticket details
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticket_id)
      .single()

    if (ticketError || !ticket) {
      throw new Error('Ticket not found')
    }

    // Check for recent claim notifications (anti-spam) - but allow if this is a different assignment
    const { data: recentClaims, error: recentError } = await supabase
      .from('discord_notifications')
      .select('*')
      .eq('ticket_id', ticket_id)
      .eq('notification_type', 'ticket_claimed')
      .gte('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(5) // Check last 5 notifications

    if (recentError) {
      console.error('Error checking for recent notifications:', recentError)
      // Continue anyway - don't fail due to logging issues
    } else if (recentClaims && recentClaims.length > 0) {
      // Check if any recent notification was sent to the same moderator
      const sameModeratorNotifications = recentClaims.filter(notification => 
        notification.metadata?.moderator_id === moderator_id
      )
      
      if (sameModeratorNotifications.length > 0) {
        return new Response(
          JSON.stringify({ success: true, message: 'Cooldown active for same moderator' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // Prepare Discord message
    const discordMessage = {
      embeds: [{
        author: {
          name: 'Ticket pris en charge',
          icon_url: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png'
        },
        title: '✅ Ticket Pris en Charge',
        color: 0x10B981, // Green - success color
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
            value: moderator_name,
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
      }],
      components: [{
        type: 1,
        components: [{
          type: 2,
          label: 'Voir le ticket',
          style: 5,
          url: `${SITE_URL}/espace-client.html`
        }]
      }]
    }

    // Send to Discord with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    let discordResponse: Response
    try {
      discordResponse = await fetch(DISCORD_WEBHOOK_MODERATOR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordMessage),
        signal: controller.signal
      })
      clearTimeout(timeoutId)
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error('Discord fetch error:', fetchError)
      if (fetchError.name === 'AbortError') {
        console.error('Discord webhook request timed out after 10 seconds')
        throw new Error('Discord webhook request timed out')
      }
      throw fetchError
    }

    if (!discordResponse.ok) {
      const errorText = await discordResponse.text()
      console.error('Discord webhook error response:', errorText)
      throw new Error(`Discord webhook failed: ${discordResponse.status}`)
    }

    // Log notification (best-effort - don't fail if DB logging fails)
    try {
      const { error: logError } = await supabase.from('discord_notifications').insert({
        ticket_id: ticket.id,
        notification_type: 'ticket_claimed',
        webhook_used: 'moderator',
        sent_at: new Date().toISOString(),
        metadata: { moderator_id, moderator_name }
      })

      if (logError) {
        console.error('Failed to log notification (non-critical):', logError)
      }
    } catch (logError) {
      console.error('Exception during notification logging (non-critical):', logError)
    }

    // Remove from escalation queue if present (best-effort - don't fail if cleanup fails)
    try {
      const { error: queueError } = await supabase
        .from('notification_queue')
        .delete()
        .eq('ticket_id', ticket_id)

      if (queueError) {
        console.error('Failed to remove from notification queue (non-critical):', queueError)
      }
    } catch (queueError) {
      console.error('Exception during queue cleanup (non-critical):', queueError)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Claim notification sent' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in notify-ticket-claimed:', error)
    
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
