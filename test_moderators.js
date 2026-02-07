import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ndniosrqgrzcsqnfabxr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTU2MTI1MCwiZXhwIjoyMDg1MTM3MjUwfQ.SKFzzoO_i92ug99o8CuP1AlyrxJsjWhs1gqVQvzNhXs';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function checkModerators() {
  try {
    console.log('Checking moderators...');

    const { data: moderators, error } = await supabase
      .from('users')
      .select('id, name, email, role, available, active, clerk_id')
      .eq('role', 'moderator')
      .eq('active', true);

    if (error) {
      console.error('Error fetching moderators:', error);
      return;
    }

    console.log(`Found ${moderators.length} moderators:`);
    moderators.forEach(mod => {
      console.log(`- ${mod.name} (${mod.email}): available=${mod.available}, active=${mod.active}`);
    });

    // Check available moderators
    const availableModerators = moderators.filter(m => m.available);
    console.log(`\nAvailable moderators: ${availableModerators.length}`);
    availableModerators.forEach(mod => {
      console.log(`- ${mod.name}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkModerators();