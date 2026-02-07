// Supabase Edge Function: delete-ticket
// Permanently deletes a ticket and all associated data (admin only)

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

interface DeleteTicketData {
  ticketId: string
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

    // ADMIN ONLY - Only admins can permanently delete tickets
    if (user.role !== 'admin') {
      console.warn('Non-admin user attempted to delete ticket:', {
        userId: user.id,
        userRole: user.role
      })
      return new Response(
        JSON.stringify({ success: false, error: 'Only administrators can permanently delete tickets' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get ticket ID from request
    const { ticketId } = await req.json() as DeleteTicketData

    if (!ticketId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required field: ticketId' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if ticket exists
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('id, title')
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

    console.log('Permanently deleting ticket:', ticketId, 'by admin:', user.id)

    // Delete in order: messages -> ticket_reads -> ticket
    // 1. Delete all messages
    const { error: messagesError } = await supabase
      .from('messages')
      .delete()
      .eq('ticket_id', ticketId)

    if (messagesError) {
      console.error('Error deleting messages:', messagesError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete messages: ${messagesError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 2. Delete ticket_reads
    const { error: readsError } = await supabase
      .from('ticket_reads')
      .delete()
      .eq('ticket_id', ticketId)

    if (readsError) {
      console.error('Error deleting ticket_reads:', readsError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete ticket reads: ${readsError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 3. Delete ticket
    const { error: deleteError } = await supabase
      .from('tickets')
      .delete()
      .eq('id', ticketId)

    if (deleteError) {
      console.error('Error deleting ticket:', deleteError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete ticket: ${deleteError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Ticket permanently deleted successfully:', ticketId)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Ticket and all associated data permanently deleted',
        ticketId: ticketId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in delete-ticket:', error)
    
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
