// Supabase Edge Function: update-ticket-priority
// Updates a ticket's priority with proper authentication and authorization

import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts"
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
    response = await fetch(jwksUrl, {
      signal: controller.signal
    })
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('JWKS fetch timed out after 5 seconds')
    }
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`Failed to fetch JWKS: ${errorMessage}`)
  }
  clearTimeout(timeoutId)

  if (!response.ok) {
    throw new Error(`Failed to fetch JWKS: HTTP ${response.status} ${response.statusText}`)
  }

  let jwks: any
  try {
    jwks = await response.json()
  } catch (error) {
    throw new Error('Failed to parse JWKS response as JSON')
  }

  // Validate JWKS structure
  if (!jwks || typeof jwks !== 'object') {
    throw new Error('Invalid JWKS response: not an object')
  }

  if (!Array.isArray(jwks.keys)) {
    throw new Error('Invalid JWKS response: keys property is not an array')
  }

  const key = jwks.keys.find((k: any) => k && typeof k === 'object' && k.kid === kid)

  if (!key) {
    throw new Error(`Public key with kid ${kid} not found in JWKS`)
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
    const base64 = headerB64.replace(/-/g, '+').replace(/_/g, '/')
    const paddedBase64 = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const header = JSON.parse(atob(paddedBase64))
    
    if (!header.kid) {
      throw new Error('No key ID found in JWT header')
    }

    // Get the public key
    const publicKey = await getClerkPublicKey(header.kid)
    
    // Verify the token
    const payload = await verify(token, publicKey)
    
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid JWT token')
  }
}

interface UpdatePriorityData {
  ticketId: string
  newPriority: string
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
    const { ticketId, newPriority } = await req.json() as UpdatePriorityData

    if (!ticketId || !newPriority) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: ticketId and newPriority' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate priority value
    const validPriorities = ['low', 'normal', 'high', 'urgent']
    if (!validPriorities.includes(newPriority)) {
      return new Response(
        JSON.stringify({ success: false, error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` }),
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

    // Authorization check: only admins and moderators can change priority
    // Clients can only change priority of their own tickets if they're still open
    let hasPermission = false

    if (user.role === 'admin') {
      hasPermission = true
    } else if (user.role === 'moderator') {
      // Moderators can change priority of tickets assigned to them or open tickets
      hasPermission = ticket.assigned_to === user.id || ticket.status === 'open'
    } else if (user.role === 'client') {
      // Clients can only change priority of their own tickets and only if they're still open
      hasPermission = ticket.client_id === user.id && ticket.status === 'open'
    }

    if (!hasPermission) {
      console.warn('User does not have permission to update ticket priority:', {
        userId: user.id,
        userRole: user.role,
        ticketId,
        ticketClientId: ticket.client_id,
        ticketAssignedTo: ticket.assigned_to,
        ticketStatus: ticket.status
      })
      return new Response(
        JSON.stringify({ success: false, error: 'You do not have permission to update this ticket\'s priority' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Updating ticket priority:', ticketId, 'to', newPriority)

    // Update the ticket priority
    const { data: updatedTicket, error: updateError } = await supabase
      .from('tickets')
      .update({ priority: newPriority })
      .eq('id', ticketId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating ticket priority:', updateError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to update ticket priority: ${updateError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Ticket priority updated successfully:', ticketId)

    return new Response(
      JSON.stringify({
        success: true,
        ticket: {
          id: updatedTicket.id,
          priority: updatedTicket.priority
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in update-ticket-priority:', error)
    
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