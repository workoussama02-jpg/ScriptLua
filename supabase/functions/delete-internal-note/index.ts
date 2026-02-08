// Supabase Edge Function: delete-internal-note
// Deletes an internal note for a ticket (staff only)

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

interface DeleteInternalNoteData {
  noteId: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('🗑️ DELETE-INTERNAL-NOTE FUNCTION CALLED - START')

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

    // Only moderators and admins can delete internal notes
    if (user.role !== 'moderator' && user.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'Only staff members can delete internal notes' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get delete data from request
    const { noteId } = await req.json() as DeleteInternalNoteData

    if (!noteId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required data (noteId)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get the existing note to verify ownership and access
    const { data: existingNote, error: noteFetchError } = await supabase
      .from('internal_notes')
      .select('id, ticket_id, author_id')
      .eq('id', noteId)
      .single()

    if (noteFetchError || !existingNote) {
      return new Response(
        JSON.stringify({ success: false, error: 'Internal note not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if user can delete this note (only author or admin can delete)
    if (existingNote.author_id !== user.clerk_id && user.role !== 'admin') {
      return new Response(
        JSON.stringify({ success: false, error: 'You can only delete your own notes' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify that the ticket still exists and user has access to it
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('id, assigned_to, status')
      .eq('id', existingNote.ticket_id)
      .single()

    if (ticketError || !ticket) {
      return new Response(
        JSON.stringify({ success: false, error: 'Associated ticket not found' }),
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

    // Delete the internal note
    const { error: deleteError } = await supabase
      .from('internal_notes')
      .delete()
      .eq('id', noteId)

    if (deleteError) {
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete internal note: ${deleteError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Internal note deleted successfully:', noteId)

    return new Response(
      JSON.stringify({
        success: true,
        noteId: noteId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Extract error message safely for logging and response
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined

    // Log the full error server-side safely
    console.error('Error in delete-internal-note:', errorMessage)
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