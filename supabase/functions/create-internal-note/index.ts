// Supabase Edge Function: create-internal-note
// Creates a new internal note for a ticket (staff only)

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
    // Note: CLERK_AUDIENCE is optional - if not set, we accept the token regardless of aud claim

    return payload
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    throw new Error(`JWT verification failed: ${errorMessage}`)
  }
}

interface InternalNoteData {
  ticketId: string
  content: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('📝 CREATE-INTERNAL-NOTE FUNCTION CALLED - START')

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

       const payload = await verifyClerkToken(token)
       userId = payload.sub    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      const errorStack = error instanceof Error ? error.stack : undefined

      const isDev = Deno.env.get('ENVIRONMENT') === 'development'

      // Return detailed error in development
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid token",
          ...(isDev && { debug: {
            message: errorMessage,
            stack: errorStack,
            clerkDomain: Deno.env.get('CLERK_DOMAIN'),
            clerkIssuer: Deno.env.get('CLERK_ISSUER')
          }})
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )    }

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

    // Only moderators and admins can create internal notes
    if (user.role !== 'moderator' && user.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Only staff members can create internal notes' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get internal note data from request
    let body: InternalNoteData
    try {
      body = await req.json() as InternalNoteData
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    const { ticketId, content } = body

    if (!ticketId || !content) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required data (ticketId, content)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    // Validate content
    if (content.length > 500) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content too long (max 500 characters)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (content.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content cannot be empty' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify that the ticket exists and user has access to it
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('id, assigned_to, status')
      .eq('id', ticketId)
      .single()

    if (ticketError || !ticket) {
      return new Response(
        JSON.stringify({ success: false, error: 'Ticket not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user has access to this ticket
    let hasAccess = false

    if (user.role === 'admin') {
      // Admins have access to all tickets
      hasAccess = true
    } else if (user.role === 'moderator') {
      // Moderators have access to tickets assigned to them or open tickets
      hasAccess = ticket.assigned_to === user.clerk_id || ticket.status === 'open'
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

    // Create the internal note
    const { data: note, error: noteError } = await supabase
      .from('internal_notes')
      .insert({
        ticket_id: ticketId,
        author_id: user.clerk_id,
        author_name: user.name || user.email || 'Staff',
        content: content.trim()
      })
      .select()
      .single()

    if (noteError) {
      return new Response(
        JSON.stringify({ success: false, error: `Failed to create internal note: ${noteError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Internal note created successfully:', note.id)

    return new Response(
      JSON.stringify({
        success: true,
        note: {
          id: note.id,
          ticket_id: note.ticket_id,
          author_id: note.author_id,
          author_name: note.author_name,
          content: note.content,
          created_at: note.created_at
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Extract error message safely for logging and response
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    // Log the full error server-side safely
    console.error('Error in create-internal-note:', errorMessage)
    console.error('Error stack:', errorStack)

    // Return error response to client with detailed info
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        ...(Deno.env.get('NODE_ENV') !== 'production' ? {
          debug: {
            message: errorMessage,
            stack: errorStack
          }
        } : {})
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})