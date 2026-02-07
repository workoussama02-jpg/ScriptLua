# 🚀 Discord Notification System - Deployment Checklist

Use this checklist to track your deployment progress. Check off each item as you complete it.

---

## 📋 Pre-Deployment Checklist

### Discord Setup
- [ ] **Create Moderator Discord Channel** (if not exists)
- [ ] **Create Admin Discord Channel** (if not exists)
- [ ] **Create Moderator Webhook**
  - Go to Moderator Channel → Settings → Integrations → Webhooks
  - Click "New Webhook"
  - Name: "Script Lua - Tickets"
  - Copy Webhook URL
  - Save as: `DISCORD_WEBHOOK_MODERATOR`
- [ ] **Create Admin Webhook**
  - Go to Admin Channel → Settings → Integrations → Webhooks
  - Click "New Webhook"
  - Name: "Script Lua - Admin Escalations"
  - Copy Webhook URL
  - Save as: `DISCORD_WEBHOOK_ADMIN`
- [ ] **Get Moderator Role ID**
  - Enable Developer Mode in Discord (Settings → Advanced)
  - Right-click @moderator role → Copy ID
  - Save this ID (you'll need it for the code)
- [ ] **Get Admin Role ID**
  - Right-click @admin role → Copy ID
  - Save this ID (you'll need it for the code)

### Supabase Setup
- [ ] **Get Supabase Service Role Key**
  - Go to https://supabase.com/dashboard
  - Select your project
  - Go to Settings → API
  - Copy "service_role" key (secret)
  - **NEVER commit this to git!**
- [ ] **Install Supabase CLI**
  ```bash
  npm install -g supabase
  ```
- [ ] **Verify CLI Installation**
  ```bash
  supabase --version
  ```

### Local Configuration
- [ ] **Update .env file** with:
  ```bash
  SUPABASE_SERVICE_ROLE_KEY=your_key_here
  DISCORD_WEBHOOK_MODERATOR=https://discord.com/api/webhooks/...
  DISCORD_WEBHOOK_ADMIN=https://discord.com/api/webhooks/...
  DISCORD_ROLE_ID=your_moderator_role_id_here
  DISCORD_ADMIN_ROLE_ID=your_admin_role_id_here
  CLERK_DOMAIN=your_clerk_domain_here  # e.g., your-app.clerk.accounts.dev
  SITE_URL=https://votre-site.com  # Your production domain
  ```
- [ ] **Get Moderator Role ID**
  - Enable Developer Mode in Discord (Settings → Advanced)
  - Right-click @moderator role → Copy ID
  - Save as: `DISCORD_ROLE_ID` in .env file
- [ ] **Get Admin Role ID**
  - Right-click @admin role → Copy ID
  - Save as: `DISCORD_ADMIN_ROLE_ID` in .env file

---

## 🗄️ Database Deployment

- [ ] **Open Supabase SQL Editor**
  - Go to https://supabase.com/dashboard
  - Select your project
  - Go to SQL Editor
- [ ] **Run Database Schema**
  - Copy contents of `supabase-discord-schema.sql`
  - Paste into SQL Editor
  - Click "Run" button
  - Verify no errors
- [ ] **Verify Tables Created**
  - Go to Database → Tables
  - Confirm `discord_notifications` exists
  - Confirm `notification_queue` exists
- [ ] **Test Helper Function**
  ```sql
  SELECT * FROM get_tickets_needing_escalation(30);
  ```
  (Should return empty result if no old tickets)

---

## ⚡ Edge Functions Deployment

### Login and Link Project
```bash
# Step 1: Login to Supabase
supabase login
```
- [ ] Successfully logged in

```bash
# Step 2: Link your project (get project ref from dashboard URL)
cd "c:\Users\Oussama\Desktop\ScriptLua jules"
supabase link --project-ref YOUR_PROJECT_REF
```
- [ ] Project linked successfully

### Set Environment Variables
```bash
# Step 3: Set secrets in Supabase
supabase secrets set DISCORD_WEBHOOK_MODERATOR="https://discord.com/api/webhooks/YOUR_MODERATOR_WEBHOOK"
```
- [ ] Moderator webhook set

```bash
supabase secrets set DISCORD_WEBHOOK_ADMIN="https://discord.com/api/webhooks/YOUR_ADMIN_WEBHOOK"
```
- [ ] Admin webhook set

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```
- [ ] Service role key set

```bash
supabase secrets set DISCORD_ROLE_ID="YOUR_MODERATOR_ROLE_ID"
```
- [ ] Moderator role ID set

```bash
supabase secrets set DISCORD_ADMIN_ROLE_ID="YOUR_ADMIN_ROLE_ID"
```
- [ ] Admin role ID set

```bash
supabase secrets set CLERK_DOMAIN="your_clerk_domain_here"
```
- [ ] Clerk domain set

```bash
supabase secrets set SITE_URL="https://votre-site.com"
```
- [ ] Site URL set

```bash
# Verify secrets were set
supabase secrets list
```
- [ ] All 7 secrets visible in list

### Deploy Functions
```bash
# Deploy function 1
supabase functions deploy notify-ticket-created
```
- [ ] ✅ notify-ticket-created deployed

```bash
# Deploy function 2
supabase functions deploy notify-ticket-escalation
```
- [ ] ✅ notify-ticket-escalation deployed

```bash
# Deploy function 3
supabase functions deploy notify-ticket-claimed
```
- [ ] ✅ notify-ticket-claimed deployed

```bash
# Deploy function 4
supabase functions deploy process-notification-queue
```
- [ ] ✅ process-notification-queue deployed

```bash
# Verify all functions
supabase functions list
```
- [ ] All 4 functions listed and active

---

## ⏰ Cron Job Setup

Choose one method:

### Option A: Cron-job.org (Recommended)
- [ ] Go to https://cron-job.org and create account
- [ ] Click "Create Cronjob"
- [ ] **Title:** "Script Lua - Process Notifications"
- [ ] **URL:** `https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-notification-queue`
- [ ] **Schedule:** Every 5 minutes → `*/5 * * * *`
- [ ] **HTTP Method:** POST
- [ ] **Request Headers:** Add header
  - Name: `Authorization`
  - Value: `Bearer YOUR_SERVICE_ROLE_KEY`
- [ ] **Request Body:** `{}`
- [ ] Click "Create"
- [ ] Test the job (click "Run now")
- [ ] Verify execution was successful

### Option B: GitHub Actions
- [ ] Create `.github/workflows/process-notifications.yml`
- [ ] Add workflow configuration (see detailed guide)
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to GitHub Secrets
- [ ] Add `SUPABASE_PROJECT_REF` to GitHub Secrets
- [ ] Push to GitHub
- [ ] Verify workflow runs every 5 minutes

### Option C: Supabase pg_cron
- [ ] Run SQL to create cron function (see setup guide)
- [ ] Verify cron schedule created
- [ ] Test manually: `SELECT invoke_process_queue();`

---

## 🔗 Frontend Integration

- [ ] **Copy integration code**
  - Open `discord-integration.js`
  - Copy all functions
- [ ] **Update script.js**
  - Find your existing `createTicket` function
  - Replace with `createTicketWithNotifications`
  - Find your existing `claimTicket` function
  - Replace with `claimTicketWithNotifications`
- [ ] **Add moderator availability toggle** (optional)
  - Add toggle switch in moderator UI
  - Call `setModeratorAvailability(true/false)`
- [ ] **Test locally**
  - Run `npm run dev`
  - Create a test ticket
  - Verify no JavaScript errors in console

---

## 🧪 Testing Phase

### Test 1: New Ticket Notification (No Moderators)
- [ ] Set all moderators to `available: false` in database
- [ ] Create a new ticket from client UI
- [ ] Check moderator Discord channel for notification
- [ ] Verify notification includes:
  - [ ] Client name
  - [ ] Ticket ID
  - [ ] Problem description
  - [ ] Timestamp
  - [ ] "Aucun modérateur" message
  - [ ] Dashboard link button

### Test 2: Ticket Claimed Notification
- [ ] Have a moderator claim the ticket
- [ ] Check moderator Discord channel for claim notification
- [ ] Verify notification includes:
  - [ ] Ticket ID
  - [ ] Client name
  - [ ] Moderator name
  - [ ] Green checkmark/success indicator

### Test 3: Escalation Notification (Manual Trigger)
- [ ] Open Supabase SQL Editor
- [ ] Run:
  ```sql
  SELECT content FROM http((
    'POST',
    'https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-ticket-escalation',
    ARRAY[http_header('Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY')],
    'application/json',
    '{"ticket_id": "YOUR_TICKET_UUID"}'
  )::http_request);
  ```
- [ ] Check admin Discord channel for escalation
- [ ] Verify notification includes:
  - [ ] "ESCALADE" indicator
  - [ ] Minutes waiting
  - [ ] Admin mention
  - [ ] Dashboard link

### Test 4: Anti-Spam Cooldown
- [ ] Try to send same notification twice quickly
- [ ] Verify second attempt is blocked
- [ ] Check logs: `supabase functions logs notify-ticket-created`
- [ ] Should see "Cooldown active" message

### Test 5: Queue Processing
- [ ] Manually call queue processor:
  ```bash
  curl -X POST \
    https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-notification-queue \
    -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
  ```
- [ ] Verify response shows processing results
- [ ] Check logs: `supabase functions logs process-notification-queue`

### Test 6: End-to-End (Full Flow)
- [ ] Set moderators to unavailable
- [ ] Create ticket → Wait for Discord notification
- [ ] Wait 30+ minutes OR manually trigger escalation
- [ ] Verify admin escalation notification
- [ ] Have moderator set available and claim ticket
- [ ] Verify claim notification sent
- [ ] Check `discord_notifications` table has all records
- [ ] Check `notification_queue` shows escalation was processed

---

## 📊 Monitoring Setup

- [ ] **Set up log monitoring**
  ```bash
  # In separate terminal windows:
  supabase functions logs notify-ticket-created --follow
  supabase functions logs notify-ticket-escalation --follow
  supabase functions logs notify-ticket-claimed --follow
  supabase functions logs process-notification-queue --follow
  ```
- [ ] **Create admin dashboard queries**
  ```sql
  -- Recent notifications
  SELECT * FROM discord_notifications 
  WHERE sent_at > NOW() - INTERVAL '24 hours'
  ORDER BY sent_at DESC;
  
  -- Pending escalations
  SELECT * FROM notification_queue 
  WHERE processed = false;
  
  -- Stats
  SELECT * FROM notification_stats 
  WHERE date > CURRENT_DATE - INTERVAL '7 days';
  ```
- [ ] **Set up Discord error notifications** (optional)
  - Create a separate webhook for error logs
  - Modify Edge Functions to send errors to this webhook

---

## 🎉 Production Checklist

- [ ] **All tests passed**
- [ ] **No errors in logs**
- [ ] **Webhooks working correctly**
- [ ] **Cron job running every 5 minutes**
- [ ] **Frontend integration complete**
- [ ] **Team trained on new system**
- [ ] **Documentation shared with moderators**
- [ ] **Backup plan in case of Discord downtime**
- [ ] **Webhook URLs stored securely**

---

## 🔒 Security Verification

- [ ] `.env` file is in `.gitignore`
- [ ] No webhooks URLs in git commits
- [ ] Service role key never committed
- [ ] Supabase secrets set correctly (not in code)
- [ ] Discord role ID configured as environment variable
- [ ] RLS policies enabled on all tables
- [ ] Only admins can view notification logs
- [ ] Webhook URLs use HTTPS

---

## 📝 Post-Deployment

- [ ] **Document webhook locations**
  - Save where you created webhooks (channel names)
  - Store role IDs in team documentation
- [ ] **Schedule maintenance**
  - Monthly: Run `SELECT cleanup_old_notifications();`
  - Quarterly: Review and rotate webhooks
  - As needed: Update role IDs if Discord roles change
- [ ] **Monitor for first week**
  - Check logs daily
  - Verify notifications sending correctly
  - Adjust timing if needed (30 min escalation)
- [ ] **Gather feedback**
  - Ask moderators about notification usefulness
  - Ask admins about escalation frequency
  - Adjust based on team needs

---

## ✅ Success Criteria

Your Discord notification system is fully deployed when:

1. ✅ New tickets trigger moderator notifications when no one is available
2. ✅ Tickets escalate to admins after 30 minutes unassigned
3. ✅ Moderators get confirmation when tickets are claimed
4. ✅ No duplicate notifications sent (cooldown working)
5. ✅ Cron job processes escalations every 5 minutes
6. ✅ All notifications appear in correct Discord channels
7. ✅ Role mentions (@moderator, @admin) work correctly
8. ✅ Dashboard links are clickable and go to correct page
9. ✅ No errors in Edge Function logs
10. ✅ Database tables tracking notifications properly

---

## 🆘 Need Help?

If you get stuck:
1. Check [DISCORD_NOTIFICATION_SETUP.md](DISCORD_NOTIFICATION_SETUP.md) for detailed instructions
2. Review [DISCORD_QUICK_REFERENCE.md](DISCORD_QUICK_REFERENCE.md) for troubleshooting
3. Check Edge Function logs for errors
4. Verify environment variables are set correctly
5. Test webhooks manually with curl

**Common Issues:**
- **No notifications**: Check webhook URLs and environment variables
- **Wrong channel**: Verify MODERATOR vs ADMIN webhook variables
- **No role mentions**: Update role IDs in Edge Function code
- **Duplicate notifications**: Check cooldown in `discord_notifications` table
- **Escalations not working**: Verify cron job is running

---

**Last Updated:** February 4, 2026
**Version:** 1.0
**Status:** Ready for Deployment 🚀
