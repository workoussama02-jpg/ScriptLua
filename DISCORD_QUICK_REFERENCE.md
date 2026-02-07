# Discord Notification System - Quick Reference

## 📁 File Structure

```
ScriptLua jules/
├── supabase/
│   └── functions/
│       ├── notify-ticket-created/           # Sends notification when ticket is created
│       │   ├── index.ts
│       │   └── deno.json
│       ├── notify-ticket-escalation/        # Sends escalation after 30 mins
│       │   ├── index.ts
│       │   └── deno.json
│       ├── notify-ticket-claimed/           # Sends notification when ticket is claimed
│       │   ├── index.ts
│       │   └── deno.json
│       └── process-notification-queue/      # Cron job to process escalations
│           ├── index.ts
│           └── deno.json
├── supabase-discord-schema.sql              # Database tables & functions
├── discord-integration.js                   # Frontend integration code
├── test-discord-notifications.js            # Test suite
├── DISCORD_NOTIFICATION_SETUP.md            # Full deployment guide
└── .env                                     # Environment variables
```

## 🔄 System Flow

```
┌─────────────────┐
│ New Ticket      │
│ Created         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│ Check Moderator             │
│ Availability                │
└────────┬────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
Available   Unavailable
    │         │
    │         ▼
    │    ┌────────────────────┐
    │    │ Send Discord       │
    │    │ Notification to    │
    │    │ @moderator         │
    │    └─────────┬──────────┘
    │              │
    │              ▼
    │    ┌────────────────────┐
    │    │ Schedule           │
    │    │ Escalation Check   │
    │    │ (30 minutes)       │
    │    └─────────┬──────────┘
    │              │
    │         Wait 30 min
    │              │
    │              ▼
    │    ┌────────────────────┐
    │    │ Still Unassigned?  │
    │    └────────┬───────────┘
    │             │
    │        ┌────┴────┐
    │        │         │
    │       Yes       No
    │        │         │
    │        ▼         ×
    │    ┌────────────────────┐
    │    │ Escalate to        │
    │    │ @admin Discord     │
    │    └────────────────────┘
    │
    ▼
┌────────────────────┐
│ Moderator Claims   │
│ Ticket             │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Send "Claimed"     │
│ Notification to    │
│ @moderator         │
└────────────────────┘
```

## 🎯 Key Functions

### Frontend (discord-integration.js)

```javascript
// Create ticket with notification
await createTicketWithNotifications(ticketData)

// Claim ticket with notification
await claimTicketWithNotifications(ticketId)

// Set moderator availability
await setModeratorAvailability(true/false)

// Manual escalation trigger (admin only)
await triggerEscalationManually(ticketId)

// Get notification stats (admin dashboard)
await getNotificationStats(days)
```

### Edge Functions

| Function | Trigger | Sends To | When |
|----------|---------|----------|------|
| `notify-ticket-created` | Ticket created | @moderator | No mods available |
| `notify-ticket-escalation` | 30+ min unassigned | @admin | Still unassigned |
| `notify-ticket-claimed` | Moderator claims | @moderator | Ticket assigned |
| `process-notification-queue` | Cron (every 5 min) | Triggers escalations | Scheduled time reached |

## 🔧 Configuration

### Required Environment Variables

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
VITE_SUPABASE_ANON_KEY=eyJhbGc...

# Discord Webhooks
DISCORD_WEBHOOK_MODERATOR=https://discord.com/api/webhooks/123456/abc...
DISCORD_WEBHOOK_ADMIN=https://discord.com/api/webhooks/789012/def...

# Site
SITE_URL=https://votre-site.com
```

### Discord Role IDs

Update in Edge Functions:
- [notify-ticket-created/index.ts](supabase/functions/notify-ticket-created/index.ts#L75) Line 75: `YOUR_MODERATOR_ROLE_ID`
- [notify-ticket-escalation/index.ts](supabase/functions/notify-ticket-escalation/index.ts#L88) Line 88: `YOUR_ADMIN_ROLE_ID`

## 🚀 Quick Deploy

```bash
# 1. Install Supabase CLI
npm install -g supabase

# 2. Login and link project
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# 3. Deploy database schema
psql -h YOUR_DB_HOST -U postgres < supabase-discord-schema.sql

# 4. Set secrets
supabase secrets set DISCORD_WEBHOOK_MODERATOR=https://...
supabase secrets set DISCORD_WEBHOOK_ADMIN=https://...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...
supabase secrets set SITE_URL=https://votre-site.com

# 5. Deploy functions
supabase functions deploy notify-ticket-created
supabase functions deploy notify-ticket-escalation
supabase functions deploy notify-ticket-claimed
supabase functions deploy process-notification-queue

# 6. Set up cron job (run every 5 minutes)
# Use cron-job.org or similar to call:
# POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/process-notification-queue
# Header: Authorization: Bearer YOUR_SERVICE_ROLE_KEY
```

## 🧪 Quick Test

```bash
# In browser console or Node.js:
# Load test-discord-notifications.js

# Run all tests
DiscordTests.runAllTests()

# Or individual tests
DiscordTests.testTicketCreationNoModerators()
DiscordTests.testTicketClaim(ticketId)
DiscordTests.testEscalation(ticketId)
DiscordTests.testAntiSpamCooldown(ticketId)
```

## 📊 Database Tables

### discord_notifications
Tracks all sent notifications with cooldown logic.

| Column | Type | Description |
|--------|------|-------------|
| ticket_id | UUID | Reference to ticket |
| notification_type | TEXT | `ticket_created`, `escalation`, `ticket_claimed` |
| webhook_used | TEXT | `moderator` or `admin` |
| sent_at | TIMESTAMP | When notification was sent |
| metadata | JSONB | Additional data (moderator name, etc.) |

### notification_queue
Manages delayed notifications (30-minute escalations).

| Column | Type | Description |
|--------|------|-------------|
| ticket_id | UUID | Reference to ticket |
| notification_type | TEXT | `escalation_check` or `reminder` |
| scheduled_for | TIMESTAMP | When to send notification |
| processed | BOOLEAN | Whether notification was sent |

## 🛡️ Anti-Spam Features

- **15-minute cooldown** per ticket for duplicate notifications
- **Checks for existing notifications** before sending
- **Single escalation** per ticket (won't spam admins)
- **Queue cleanup** after ticket is claimed

## 📈 Monitoring

### Check notification logs:
```bash
supabase functions logs notify-ticket-created --follow
```

### View notification history:
```sql
SELECT * FROM discord_notifications 
WHERE sent_at > NOW() - INTERVAL '24 hours'
ORDER BY sent_at DESC;
```

### Check pending escalations:
```sql
SELECT * FROM notification_queue 
WHERE processed = false 
ORDER BY scheduled_for;
```

### View statistics:
```sql
SELECT * FROM notification_stats 
WHERE date > CURRENT_DATE - INTERVAL '7 days';
```

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| No notifications | Check webhook URLs, verify Edge Functions deployed |
| Duplicate notifications | Check `discord_notifications` table for cooldown |
| Escalations not working | Verify cron job is running, check `notification_queue` |
| Wrong role mentions | Update role IDs in Edge Function code |
| Notifications to wrong channel | Verify `DISCORD_WEBHOOK_MODERATOR` vs `DISCORD_WEBHOOK_ADMIN` |

## 📝 Message Templates

### New Ticket (No Moderators)
```
🚨 @moderator Nouveau ticket en attente!
👤 Client: John Doe
📝 Problème: Cannot connect to server
🆔 Ticket: #12345678
🕒 Créé le: 2026-02-04 15:30
⚠️ Aucun modérateur n'a pris en charge le ticket.
[Voir dans le dashboard]
```

### Escalation (30+ Minutes)
```
🚨 @admin Ticket urgent en attente ! 🚨
Ce ticket attend depuis 35 minutes sans être pris en charge.
👤 Client: John Doe
🆔 Ticket: #12345678
📝 Problème: Cannot connect to server
⏱️ En attente depuis: 35 minutes
⚠️ Aucun modérateur n'est actuellement disponible.
[Voir le ticket dans le dashboard]
```

### Ticket Claimed
```
✅ Ticket Pris en Charge
🆔 Ticket: #12345678
👤 Client: John Doe
👨‍💼 Modérateur: Jean Dupont
📝 Problème: Cannot connect to server
[Voir le ticket]
```

## 🔗 Useful Links

- [Full Setup Guide](DISCORD_NOTIFICATION_SETUP.md)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Discord Webhooks Guide](https://discord.com/developers/docs/resources/webhook)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)

## 💡 Tips

1. **Test in development first** using test webhooks
2. **Set up proper role IDs** before production
3. **Monitor logs regularly** for errors
4. **Run cleanup function monthly** to remove old notifications
5. **Use test-discord-notifications.js** to validate everything works
6. **Keep webhook URLs secret** - treat them like passwords
7. **Set up Discord notifications** for errors in Edge Functions

## ⚙️ Advanced Configuration

### Custom Escalation Time
Change 30 minutes to different duration:
1. Update frontend when scheduling: `scheduled_for: new Date(Date.now() + 45 * 60 * 1000)` (for 45 min)
2. Update `get_tickets_needing_escalation` function parameter

### Multiple Escalation Levels
Add more notification types and schedule multiple escalations:
- 30 min → @moderator (urgent)
- 60 min → @admin
- 120 min → @super_admin

### Rich Embeds
Discord embeds support:
- Colors (already implemented)
- Thumbnails
- Images
- Author fields
- Multiple fields

See [Discord Embed Documentation](https://discord.com/developers/docs/resources/channel#embed-object)

---

**Need help?** Check the [full setup guide](DISCORD_NOTIFICATION_SETUP.md) or review Edge Function logs.
