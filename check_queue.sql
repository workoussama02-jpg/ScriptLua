-- Check notification queue status
SELECT id, ticket_id, notification_type, scheduled_for, processed, processing_started_at, processed_at, retry_count, created_at
FROM notification_queue
ORDER BY created_at DESC
LIMIT 10;

-- Check recent discord notifications
SELECT id, ticket_id, notification_type, webhook_used, sent_at, created_at
FROM discord_notifications
ORDER BY created_at DESC
LIMIT 10;

-- Check if there are any available moderators
SELECT COUNT(*) as available_moderators
FROM users
WHERE role = 'moderator' AND available = true AND active = true;

-- Check recent tickets
SELECT id, title, status, assigned_to, assigned_to_name, created_at, updated_at
FROM tickets
ORDER BY created_at DESC
LIMIT 5;