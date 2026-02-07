// Supabase Edge Function: assign-ticket
// Assigns a ticket to a moderator with proper authentication and authorization

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
    }
    // Note: CLERK_AUDIENCE is now optional - if not set or token has no aud claim, we accept the token
    
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    throw new Error('Invalid JWT token')
  }
}

interface AssignTicketData {
  ticketId: string
  moderatorId: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('assign-ticket function called')

    // Check environment variables
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const CLERK_DOMAIN = Deno.env.get('CLERK_DOMAIN')
    const CLERK_ISSUER = Deno.env.get('CLERK_ISSUER')
    const CLERK_AUDIENCE = Deno.env.get('CLERK_AUDIENCE')

    console.log('Environment variables:', {
      SUPABASE_URL: !!SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!SUPABASE_SERVICE_ROLE_KEY,
      CLERK_DOMAIN: !!CLERK_DOMAIN,
      CLERK_ISSUER: !!CLERK_ISSUER,
      CLERK_AUDIENCE: !!CLERK_AUDIENCE
    })

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing required environment variables')
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
      console.log('No x-clerk-token header found')
      return new Response(
        JSON.stringify({ success: false, error: 'Missing x-clerk-token header' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Got clerk token, length:', clerkToken.length)

    const token = clerkToken
    let userId: string

    try {
      // Verify JWT signature and decode payload using Clerk's public keys
      const payload = await verifyClerkToken(token)
      userId = payload.sub
      console.log('JWT verified, userId:', userId)
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

    // Get assignment data from request
    const { ticketId, moderatorId } = await req.json() as AssignTicketData

    if (!ticketId || !moderatorId) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: ticketId and moderatorId' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Assigning ticket:', ticketId, 'to moderator:', moderatorId)

    // Authorization check: only admins and moderators can assign tickets
    if (user.role !== 'admin' && user.role !== 'moderator') {
      console.warn('User does not have permission to assign tickets:', user.role)
      return new Response(
        JSON.stringify({ success: false, error: 'Only administrators and moderators can assign tickets' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if ticket exists
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('id, title, status, assigned_to, assigned_to_name')
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

    // Check if moderator exists and is active
    const { data: moderator, error: moderatorError } = await supabase
      .from('users')
      .select('id, clerk_id, name, email, role, active')
      .eq('id', moderatorId)
      .eq('role', 'moderator')
      .eq('active', true)
      .single()

    if (moderatorError || !moderator) {
      console.error('Moderator not found or inactive:', moderatorError)
      return new Response(
        JSON.stringify({ success: false, error: 'Moderator not found or inactive' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Assigning ticket:', ticketId, 'to moderator:', moderatorId, moderator.name)

    // Determine new status: change to 'in-progress' if currently 'open' or 'escalated'
    let newStatus = ticket.status
    if (ticket.status === 'open' || ticket.status === 'escalated') {
      newStatus = 'in-progress'
    }

    // Assign the ticket atomically (check and set in one operation)
    const { data: updatedTicket, error: updateError } = await supabase
      .from('tickets')
      .update({
        assigned_to: moderator.clerk_id, // Use clerk_id, not database UUID
        assigned_to_name: moderator.name,
        status: newStatus // Change status to in-progress if open or escalated
      })
      .eq('id', ticketId)
      .or(`assigned_to.is.null,assigned_to.eq.${moderator.clerk_id}`) // Use clerk_id for comparison
      .select()
      .single()

    if (updateError) {
      console.error('Error assigning ticket:', updateError)
      return new Response(
        JSON.stringify({ success: false, error: `Failed to assign ticket: ${updateError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if the update actually succeeded (row was updated)
    if (!updatedTicket) {
      return new Response(
        JSON.stringify({ success: false, error: 'Ticket is already assigned to another moderator' }),
        {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Ticket assigned successfully:', ticketId)

    // Insert system message to notify the client (best-effort - don't fail if message insertion fails)
    console.log('Inserting system message for ticket assignment:', ticketId)
    try {
      const { data: insertedMessage, error: messageError } = await supabase
        .from('messages')
        .insert([{
          ticket_id: ticketId,
          content: `Votre ticket "${ticket.title}" a été assigné à ${moderator.name}. Vous recevrez bientôt une réponse.`,
          sender_type: 'system',
          sender_name: 'Système',
          sender_id: 'system'
        }])
        .select()
        .single()

      if (messageError) {
        console.error('Failed to insert system message:', messageError)
      } else {
        console.log('System notification message inserted successfully:', insertedMessage.id)
      }
    } catch (messageError) {
      console.error('Exception during system message insertion:', messageError)
    }

    // Send Discord notification (best-effort - don't fail if notification fails)
    console.log('Sending Discord notification for ticket assignment:', ticketId)
    try {
      const notificationPayload = {
        ticket_id: ticketId,
        moderator_id: moderator.id,
        moderator_name: moderator.name
      }

      console.log('Calling notify-ticket-claimed with payload:', notificationPayload)

      // Call the notify-ticket-claimed Edge Function
      const notificationResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/notify-ticket-claimed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'x-clerk-token': clerkToken // Pass through the original token for consistency
        },
        body: JSON.stringify(notificationPayload)
      })

      if (!notificationResponse.ok) {
        const errorText = await notificationResponse.text()
        console.error('Discord notification failed:', notificationResponse.status, errorText)
      } else {
        const notificationResult = await notificationResponse.json()
        console.log('Discord notification sent successfully:', notificationResult)
      }
    } catch (notificationError) {
      console.error('Exception during Discord notification:', notificationError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        ticket: {
          id: updatedTicket.id,
          assigned_to: updatedTicket.assigned_to,
          assigned_to_name: updatedTicket.assigned_to_name,
          status: updatedTicket.status
        },
        moderatorId: moderator.id, // Return database ID, not Clerk ID
        moderatorName: moderator.name
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    // Log the full error server-side safely
    console.error('Error in assign-ticket:', error)
    
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