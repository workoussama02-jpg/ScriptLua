import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://ndniosrqgrzcsqnfabxr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjEyNTAsImV4cCI6MjA4NTEzNzI1MH0.vu7GRZ-C-qdhPT8niHVOgz3E1Sxhv5hewi-GDSGR01w'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function checkModerators() {
  console.log('Checking moderators...')

  const { data: moderators, error } = await supabase
    .from('users')
    .select('id, name, email, role, available, active, clerk_id')
    .eq('role', 'moderator')

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('Moderators:', moderators)

  const availableCount = moderators.filter(m => m.available && m.active).length
  console.log(`Available moderators: ${availableCount}`)
}

checkModerators()