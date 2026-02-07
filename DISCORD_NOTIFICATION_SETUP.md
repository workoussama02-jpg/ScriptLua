# Discord Notification System - Deployment Guide

## 📋 Overview
This guide will help you deploy the Discord notification system for your ticketing platform using Supabase Edge Functions.

## 🚀 Prerequisites
1. **Supabase CLI** installed: `npm install -g supabase`
2. **Supabase Project** set up at https://supabase.com
3. **Discord Server** with webhook access
4. **Node.js** v18+ and npm installed

---

## 📊 Step 1: Update Database Schema

Run the Discord notification schema to create required tables:

```bash
# Connect to your Supabase database using psql or the Supabase SQL Editor
# Then run:
psql -h YOUR_DB_HOST -U postgres -d postgres < supabase-discord-schema.sql
```

Or use the Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `supabase-discord-schema.sql`
5. Click **Run**

This creates:
- `discord_notifications` table (tracks sent notifications)
- `notification_queue` table (manages delayed notifications)
- Helper functions for escalation logic
- Database triggers for ticket events

---

## 🔧 Step 2: Configure Discord Webhooks

### Create Discord Webhooks:

1. **For Moderator Notifications:**
   - Open your Discord server
   - Go to the moderator channel
   - Click ⚙️ Settings > Integrations > Webhooks
   - Click "New Webhook"
   - Name it "Script Lua - Tickets"
   - Copy the Webhook URL
   - Save it as `DISCORD_WEBHOOK_MODERATOR`

2. **For Admin Escalations:**
   - Go to your admin channel
   - Repeat the same process
   - Name it "Script Lua - Escalations"
   - Copy the Webhook URL
   - Save it as `DISCORD_WEBHOOK_ADMIN`

### Get Discord Role IDs:

To mention roles in notifications:
1. In Discord, enable Developer Mode (Settings > Advanced > Developer Mode)
2. Right-click the @moderator role > Copy ID
3. Right-click the @admin role > Copy ID
4. Update the Edge Functions:
   - Replace `YOUR_MODERATOR_ROLE_ID` in `notify-ticket-created/index.ts`
   - Replace `YOUR_ADMIN_ROLE_ID` in `notify-ticket-escalation/index.ts`

---

## 🔑 Step 3: Set Environment Variables

### Local Development (.env file):

Update your `.env` file with:

```bash
# Supabase Service Role Key (from Supabase Dashboard > Settings > API)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Discord Webhooks
DISCORD_WEBHOOK_MODERATOR=https://discord.com/api/webhooks/123456789/abcdef...
DISCORD_WEBHOOK_ADMIN=https://discord.com/api/webhooks/987654321/ghijkl...

# Site URL (production URL for links in Discord messages)
SITE_URL=https://votre-site.com
```

### Production Environment (Supabase Dashboard):

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** > **Edge Functions** > **Secrets**
4. Add each environment variable:
   - `SUPABASE_URL` (auto-provided)
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DISCORD_WEBHOOK_MODERATOR`
   - `DISCORD_WEBHOOK_ADMIN`
   - `SITE_URL`

---

## 📦 Step 4: Deploy Edge Functions

### Initialize Supabase (if not done):

```bash
cd "c:\Users\Oussama\Desktop\ScriptLua jules"
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

### Deploy all functions:

```bash
# Deploy notify-ticket-created
supabase functions deploy notify-ticket-created

# Deploy notify-ticket-escalation
supabase functions deploy notify-ticket-escalation

# Deploy notify-ticket-claimed
supabase functions deploy notify-ticket-claimed

# Deploy process-notification-queue
supabase functions deploy process-notification-queue
```

### Verify deployment:

```bash
supabase functions list
```

You should see all 4 functions listed as deployed.

---

## ⏰ Step 5: Set Up Cron Job for Escalations

The `process-notification-queue` function needs to run every 5 minutes to check for tickets that need escalation.

### Option A: Supabase Cron (Recommended)

Create a database function that calls the Edge Function:

```sql
-- Create a function to invoke the Edge Function
CREATE OR REPLACE FUNCTION invoke_process_queue()
RETURNS void AS $$
DECLARE
    result jsonb;
BEGIN
    SELECT content::jsonb INTO result
    FROM http((
        'POST',
        'https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-notification-queue',
        ARRAY[http_header('Authorization', 'Bearer ' || current_setting('app.service_role_key'))],
        'application/json',
        '{}'
    )::http_request);
    
    RAISE NOTICE 'Queue processed: %', result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule it to run every 5 minutes using pg_cron
SELECT cron.schedule(
    'process-notification-queue',
    '*/5 * * * *',  -- Every 5 minutes
    'SELECT invoke_process_queue();'
);
```

### Option B: External Cron Service

Use services like:
- **Cron-job.org**
- **EasyCron**
- **GitHub Actions**

Example with cron-job.org:
1. Go to https://cron-job.org
2. Create a new cron job
3. URL: `https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-notification-queue`
4. Schedule: Every 5 minutes
5. Add Header: `Authorization: Bearer YOUR_SERVICE_ROLE_KEY`
6. Method: POST

---

## 🔗 Step 6: Integrate with Frontend

Update your `script.js` to call the Edge Functions when tickets are created or claimed.

### When Creating a Ticket:

```javascript
async function createTicket(ticketData) {
    // Insert ticket into database
    const { data: ticket, error } = await supabase
        .from('tickets')
        .insert(ticketData)
        .select()
        .single();
    
    if (error) throw error;
    
    // Trigger Discord notification
    try {
        const { data, error: functionError } = await supabase.functions.invoke(
            'notify-ticket-created',
            {
                body: { ticket }
            }
        );
        
        if (functionError) {
            console.error('Notification error:', functionError);
        }
    } catch (err) {
        console.error('Failed to send Discord notification:', err);
    }
    
    return ticket;
}
```

### When Claiming a Ticket:

```javascript
async function claimTicket(ticketId, moderatorId, moderatorName) {
    // Update ticket assignment
    const { data: ticket, error } = await supabase
        .from('tickets')
        .update({ 
            assigned_to: moderatorId,
            assigned_to_name: moderatorName,
            status: 'in_progress'
        })
        .eq('id', ticketId)
        .select()
        .single();
    
    if (error) throw error;
    
    // Trigger Discord notification
    try {
        await supabase.functions.invoke('notify-ticket-claimed', {
            body: { 
                ticket_id: ticketId,
                moderator_id: moderatorId,
                moderator_name: moderatorName
            }
        });
    } catch (err) {
        console.error('Failed to send claim notification:', err);
    }
    
    return ticket;
}
```

---

## 🧪 Step 7: Testing

### Test Ticket Creation with No Moderators:

1. Make sure no moderators have `available: true` status
2. Create a new ticket
3. Check your moderator Discord channel for the notification

### Test Escalation After 30 Minutes:

Option 1: Wait 30 minutes (not practical)
Option 2: Manual trigger:

```bash
# Call the escalation function directly
curl -X POST \
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-ticket-escalation' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"ticket_id": "YOUR_TICKET_UUID"}'
```

### Test Ticket Claimed:

1. Have a moderator set their status to available
2. Claim a ticket
3. Check the moderator Discord channel for the claim notification

### Test Anti-Spam Cooldown:

1. Create a ticket
2. Immediately try to trigger the same notification again
3. It should be blocked due to the 15-minute cooldown

---

## 📊 Monitoring & Logs

### View Edge Function Logs:

```bash
# View logs for a specific function
supabase functions logs notify-ticket-created --follow

# Or in the dashboard
# Go to Edge Functions > Function Name > Logs
```

### Check Notification History:

```sql
-- View recent notifications
SELECT * FROM discord_notifications
ORDER BY sent_at DESC
LIMIT 20;

-- View pending escalations
SELECT * FROM notification_queue
WHERE processed = false
ORDER BY scheduled_for;

-- Get notification statistics
SELECT * FROM notification_stats
WHERE date > CURRENT_DATE - INTERVAL '7 days';
```

---

## 🔒 Security Best Practices

1. **Never commit secrets**: Ensure `.env` is in `.gitignore`
2. **Use Row Level Security**: Already configured in schema
3. **Rotate webhooks regularly**: Change Discord webhook URLs periodically
4. **Monitor logs**: Check for failed notifications or errors
5. **Rate limiting**: Discord has rate limits (30 requests per minute per webhook)

---

## 🐛 Troubleshooting

### Notifications Not Sending:

1. **Check environment variables**:
   ```bash
   supabase functions list
   supabase secrets list
   ```

2. **Check Discord webhook URLs**:
   - Test webhooks manually: `curl -X POST -H "Content-Type: application/json" -d '{"content": "Test"}' YOUR_WEBHOOK_URL`

3. **Check function logs**:
   ```bash
   supabase functions logs notify-ticket-created
   ```

### Duplicate Notifications:

- Check `discord_notifications` table for recent entries
- Verify cooldown logic (15 minutes)
- Ensure cron job isn't running too frequently

### Escalations Not Triggering:

- Verify `process-notification-queue` is running every 5 minutes
- Check `notification_queue` table for pending items
- Manually trigger: `supabase functions invoke process-notification-queue`

---

## 📈 Performance Optimization

1. **Database Indexes**: Already created in schema for fast lookups
2. **Cleanup Old Data**: Run monthly:
   ```sql
   SELECT cleanup_old_notifications();
   ```
3. **Batch Processing**: Queue processes up to 10 notifications at once
4. **Caching**: Consider caching moderator availability status

---

## 🎉 Success Checklist

- [X] Database schema deployed
- [ ] Discord webhooks created and tested
- [ ] Environment variables configured
- [ ] All 4 Edge Functions deployed
- [ ] Cron job set up for queue processing
- [ ] Frontend integration completed
- [ ] All 3 scenarios tested successfully
- [ ] Role IDs updated in functions
- [ ] Monitoring set up

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase Edge Function logs
3. Test webhooks manually
4. Verify database schema is correct

## 🔄 Updates & Maintenance

- **Weekly**: Check notification logs for errors
- **Monthly**: Run cleanup function
- **Quarterly**: Review and update Discord webhooks
- **As needed**: Update role IDs if Discord roles change
