// Supabase Edge Function: send-message
// Sends a message to a ticket with proper authentication and authorization

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
    if (error.name === 'AbortError') {
      throw new Error('JWKS fetch timed out after 5 seconds')
    }
    throw new Error(`Failed to fetch JWKS: ${error.message}`)
  } finally {
    clearTimeout(timeoutId)
  }
  
  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: ${response.status}`)
  }

  const jwks = await response.json()
  const key = jwks.keys.find((k: any) => k.kid === kid)
  
  if (!key) {
    throw new Error(`Public key with kid ${kid} not found in JWKS`)
  }

  // Validate that the key uses the expected algorithm
  if (key.alg !== 'RS256') {
    throw new Error(`Invalid key algorithm: expected RS256, got ${key.alg || 'undefined'}`)
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
    let base64 = headerB64.replace(/-/g, '+').replace(/_/g, '/')
    // Add padding if necessary
    while (base64.length % 4 !== 0) {
      base64 += '='
    }
    const header = JSON.parse(atob(base64))    
    if (!header.kid) {
      throw new Error('No key ID found in JWT header')
    }

    // Get the public key
    const publicKey = await getClerkPublicKey(header.kid)
    
    // Verify the token
    const payload = await verify(token, publicKey)
    
    // Validate JWT claims
    const expectedIssuer = Deno.env.get('CLERK_ISSUER')
    if (!expectedIssuer) {
      throw new Error('CLERK_ISSUER environment variable is required')
    }
    if (payload.iss !== expectedIssuer) {
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
    console.error('JWT verification failed:', error)
    throw new Error('Invalid JWT token')
  }
}

interface MessageData {
  ticketId: string
  content: string
  senderName?: string // This should be ignored from client
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate required environment variables
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

    if (Deno.env.get('LOG_PII') === 'true') {
      console.log('Authenticated user ID:', userId)
    }

    // Get user data from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, name, email, role, active, discord_username, discord_avatar')
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

    // Get message data from request
    const messageData: MessageData = await req.json()

    if (!messageData || !messageData.ticketId || !messageData.content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required message data (ticketId, content)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate message content
    const trimmedContent = messageData.content.trim()
    if (trimmedContent.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message content cannot be empty' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    if (trimmedContent.length > 1000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Message too long (max 1000 characters)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user has access to the ticket
    const ticketId = messageData.ticketId
    let hasAccess = false
    let ticketStatus = null

    if (user.role === 'client') {
      // Clients can only message their own tickets
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('client_id, status')
        .eq('id', ticketId)
        .single()

      if (!ticketError && ticket) {
        hasAccess = ticket.client_id === user.id // Use database user id for comparison
        ticketStatus = ticket.status
      }
    } else if (user.role === 'moderator') {
      // Moderators can message tickets assigned to them or open tickets
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('assigned_to, status')
        .eq('id', ticketId)
        .single()

      if (!ticketError && ticket) {
        hasAccess = ticket.assigned_to === user.id || ticket.status === 'open' // Use database user id for comparison
        ticketStatus = ticket.status
      }
    } else if (user.role === 'admin') {
      // Admins can message all tickets, but still need to check status
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('status')
        .eq('id', ticketId)
        .single()

      if (!ticketError && ticket) {
        hasAccess = true
        ticketStatus = ticket.status
      } else {
        hasAccess = true
      }
    }

    if (!hasAccess) {
      return new Response(
        JSON.stringify({ success: false, error: 'Access denied to this ticket' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if ticket is closed - nobody can send messages to closed tickets
    if (ticketStatus === 'closed') {
      return new Response(
        JSON.stringify({ success: false, error: 'Cannot send messages to closed tickets' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Determine sender type based on role
    const senderType = user.role === 'client' ? 'client' : user.role

    // Create the message with authenticated user data
    const messageToInsert = {
      ticket_id: ticketId,
      content: trimmedContent,
      sender_id: user.id, // Use authenticated user's database ID
      sender_name: user.name || user.email || (user.role === 'client' ? 'Client' : 'Staff'),
      sender_type: senderType,
      sender_avatar: user.discord_avatar || null
    }

    console.log('Sending message:', { ticketId, senderId: user.id, contentLength: trimmedContent.length })

    // Insert the message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert(messageToInsert)
      .select()
      .single()

    if (messageError) {
      console.error('Error sending message:', messageError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send message' }),
        {          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Message sent successfully:', message.id)

    return new Response(
      JSON.stringify({
        success: true,
        message: {
          id: message.id,
          ticket_id: message.ticket_id,
          content: message.content,
          sender_id: message.sender_id,
          sender_name: message.sender_name,
          sender_type: message.sender_type,
          sender_avatar: message.sender_avatar,
          created_at: message.created_at
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in send-message:', error)
    
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