// Supabase Edge Function: mark-messages-read
// Marks messages as read for a user in a ticket with proper authentication and authorization

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
  const response = await fetch(jwksUrl)
  
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
    } else if (expectedAudience && !payload.aud) {
      throw new Error(`Invalid JWT: expected audience ${expectedAudience} but token has no aud claim`)
    }
    
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid JWT token')
  }
}

interface ReadData {
  ticketId: string
  userId?: string // This should be ignored from client - we derive from JWT
  providedTimestamp?: string // Optional timestamp to use instead of current time
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

    // Extract Clerk JWT from custom header (not using Authorization to bypass Supabase's JWT validation)
    const clerkToken = req.headers.get('x-clerk-token')
    if (!clerkToken) {
      console.error('Missing Clerk token in x-clerk-token header')
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

    console.log('Authenticated user:', userId ? '[REDACTED]' : 'missing')

    // Get user data from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, clerk_id, name, email, role, active')
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

    // Get read data from request
    let readData: ReadData
    try {
      readData = await req.json()
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!readData || !readData.ticketId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required data (ticketId)' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }
    // Check if user has access to the ticket
    const ticketId = readData.ticketId
    let hasAccess = false

    if (user.role === 'client') {
      // Clients can only mark messages as read in their own tickets
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('client_id')
        .eq('id', ticketId)
        .single()

      if (!ticketError && ticket) {
        hasAccess = ticket.client_id === userId // Compare with Clerk ID from JWT
      }    } else if (user.role === 'moderator') {
      // Moderators can mark messages as read in tickets assigned to them or open tickets
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('assigned_to, status')
        .eq('id', ticketId)
        .single()

      if (!ticketError && ticket) {
        hasAccess = ticket.assigned_to === userId || ticket.status === 'open' // Compare with Clerk ID from JWT
      }
    } else if (user.role === 'admin') {
      // Admins can mark messages as read in all tickets
      hasAccess = true
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

    // Validate and determine the timestamp to use
    const serverTime = new Date()
    const serverTimeISOString = serverTime.toISOString()
    let timestampToUse = serverTimeISOString

    // If client provided a timestamp, validate it
    if (readData.providedTimestamp) {
      try {
        const providedTime = new Date(readData.providedTimestamp)

        // Check if the provided timestamp is valid
        if (isNaN(providedTime.getTime())) {
          console.warn('Invalid provided timestamp format:', readData.providedTimestamp)
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid timestamp format' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        // Check if timestamp is in the future (allow 5 second tolerance for clock skew)
        const maxFutureTime = new Date(serverTime.getTime() + 5000) // 5 seconds tolerance
        if (providedTime > maxFutureTime) {
          console.warn('Rejected future timestamp:', readData.providedTimestamp, 'server time:', serverTimeISOString)
          return new Response(
            JSON.stringify({ success: false, error: 'Timestamp cannot be in the future' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        // Check against the last stored read time for this ticket/user
        // Prevent timestamps that would move read time backwards
        const { data: existingRead, error: readCheckError } = await supabase
          .from('ticket_reads')
          .select('last_read_at')
          .eq('ticket_id', ticketId)
          .eq('user_id', user.id)
          .maybeSingle()

        if (readCheckError) {
          console.error('Error checking existing read timestamp:', readCheckError)
          return new Response(
            JSON.stringify({ success: false, error: 'Database error during read timestamp validation' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        } else if (existingRead && existingRead.last_read_at) {
          const lastReadTime = new Date(existingRead.last_read_at)
          if (providedTime < lastReadTime) {
            console.warn('Rejected timestamp earlier than last read time:', {
              provided: readData.providedTimestamp,
              lastRead: existingRead.last_read_at,
              ticketId,
              userId: user.id
            })
            return new Response(
              JSON.stringify({ success: false, error: 'Timestamp cannot be earlier than last read time' }),
              {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }
        }

        // Timestamp is valid, use it
        timestampToUse = providedTime.toISOString()
        console.log('Using validated provided timestamp:', timestampToUse)

      } catch (error) {
        console.error('Error validating provided timestamp:', error)
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid timestamp' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    } else {
      console.log('No provided timestamp, using server time:', serverTimeISOString)
    }

    // Update or insert the read timestamp
    // Use upsert to handle both insert and update cases
    const { data: readRecord, error: readError } = await supabase
      .from('ticket_reads')
      .upsert({
        ticket_id: ticketId,
        user_id: user.id, // Use database user ID for ticket_reads table
        last_read_at: timestampToUse,
        updated_at: serverTimeISOString
      }, {
        onConflict: 'ticket_id,user_id'
      })
      .select()
      .single()

    if (readError) {
      console.error('Error updating read timestamp:', readError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to mark messages as read: ${readError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Messages marked as read successfully:', readRecord)

    return new Response(
      JSON.stringify({
        success: true,
        readRecord: {
          ticket_id: readRecord.ticket_id,
          user_id: readRecord.user_id,
          last_read_at: readRecord.last_read_at
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in mark-messages-read:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }})