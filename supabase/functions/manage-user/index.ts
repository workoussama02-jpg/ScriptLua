// Supabase Edge Function: manage-user
// Handles secure user management operations (role updates, deactivation, reactivation)

import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { verifyToken } from 'https://esm.sh/@clerk/backend'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-clerk-token',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('🔧 MANAGE-USER FUNCTION CALLED')

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

    // Validate Clerk token (required for admin operations)
    const clerkToken = req.headers.get('x-clerk-token')
    if (!clerkToken) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const CLERK_SECRET_KEY = Deno.env.get('CLERK_SECRET_KEY')
    if (!CLERK_SECRET_KEY) {
      console.error('CLERK_SECRET_KEY not set')
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify the caller's token
    let callerIdentity
    try {
      callerIdentity = await verifyToken(clerkToken, { secretKey: CLERK_SECRET_KEY })
      console.log('✅ Caller authenticated:', callerIdentity.sub)
    } catch (error) {
      console.log('❌ Invalid authentication token:', error.message)
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid authentication token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if caller is admin
    const { data: callerUser, error: callerError } = await supabase
      .from('users')
      .select('role, active')
      .eq('clerk_id', callerIdentity.sub)
      .single()

    if (callerError || !callerUser) {
      console.error('❌ Error fetching caller user:', callerError)
      return new Response(
        JSON.stringify({ success: false, error: 'Unable to verify caller permissions' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (callerUser.role !== 'admin' || !callerUser.active) {
      console.log('❌ Access denied: caller is not an active admin')
      return new Response(
        JSON.stringify({ success: false, error: 'Admin access required' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Admin access confirmed for:', callerIdentity.sub)

    // Get request data
    const { action, userId, newRole } = await req.json()

    // Validate action
    const validActions = ['updateRole', 'deactivate', 'reactivate']
    if (!action || !validActions.includes(action)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid action. Must be one of: ' + validActions.join(', ') }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate userId
    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, error: 'userId is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get target user info
    const { data: targetUser, error: targetError } = await supabase
      .from('users')
      .select('id, clerk_id, name, email, role, active')
      .eq('id', userId)
      .single()

    if (targetError || !targetUser) {
      console.error('❌ Error fetching target user:', targetError)
      return new Response(
        JSON.stringify({ success: false, error: 'User not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`🔧 Performing action "${action}" on user:`, targetUser.name, `(ID: ${userId})`)

    let updateData = {}
    let successMessage = ''

    // Prepare update data based on action
    switch (action) {
      case 'updateRole':
        // Validate newRole
        const validRoles = ['client', 'moderator', 'admin']
        if (!newRole || !validRoles.includes(newRole)) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid role. Must be one of: ' + validRoles.join(', ') }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        // Prevent admin from demoting themselves
        if (targetUser.clerk_id === callerIdentity.sub && newRole !== 'admin') {
          return new Response(
            JSON.stringify({ success: false, error: 'Cannot change your own admin role' }),
            {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        updateData = { role: newRole }
        successMessage = `Role updated to ${newRole}`
        break

      case 'deactivate':
        // Prevent admin from deactivating themselves
        if (targetUser.clerk_id === callerIdentity.sub) {
          return new Response(
            JSON.stringify({ success: false, error: 'Cannot deactivate your own account' }),
            {
              status: 403,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        updateData = { active: false }
        successMessage = 'User deactivated successfully'
        break

      case 'reactivate':
        updateData = { active: true }
        successMessage = 'User reactivated successfully'
        break
    }

    // Perform the update
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating user:', updateError)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update user' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`✅ User ${action} successful:`, updatedUser.name)

    // For deactivation, we might want to unassign tickets
    if (action === 'deactivate' && targetUser.role === 'moderator') {
      console.log('🔄 Unassigning tickets from deactivated moderator...')

      const { data: assignedTickets, error: ticketError } = await supabase
        .from('tickets')
        .select('id, title')
        .eq('assigned_to', targetUser.clerk_id)
        .eq('status', 'in-progress')

      if (ticketError) {
        console.error('❌ Error fetching assigned tickets:', ticketError)
      } else if (assignedTickets && assignedTickets.length > 0) {
        console.log(`📋 Found ${assignedTickets.length} tickets to unassign`)

        for (const ticket of assignedTickets) {
          const { error: unassignError } = await supabase
            .from('tickets')
            .update({
              assigned_to: null,
              assigned_to_name: null,
              status: 'open'
            })
            .eq('id', ticket.id)

          if (unassignError) {
            console.error(`❌ Error unassigning ticket ${ticket.id}:`, unassignError)
          } else {
            console.log(`✅ Unassigned ticket ${ticket.id}`)

            // Insert system message
            try {
              const { error: msgError } = await supabase
                .from('messages')
                .insert([{
                  ticket_id: ticket.id,
                  content: `Votre ticket "${ticket.title}" a été remis en file d'attente car le modérateur n'est plus disponible.`,
                  sender_type: 'system',
                  sender_name: 'Système',
                  sender_id: 'system'
                }])

              if (msgError) {
                console.error(`❌ Error inserting system message for ticket ${ticket.id}:`, msgError)
              }
            } catch (msgException) {
              console.error(`❌ Exception inserting system message:`, msgException)
            }
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: successMessage,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          active: updatedUser.active
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Error in manage-user function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})