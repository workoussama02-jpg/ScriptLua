-- Check moderators and their availability
SELECT id, name, email, role, available, active, clerk_id
FROM users
WHERE role = 'moderator'
ORDER BY name;

-- Check recent tickets and their assignment status
SELECT id, title, status, assigned_to, assigned_to_name, created_at, updated_at
FROM tickets
ORDER BY created_at DESC
LIMIT 10;

-- Check if there are any available moderators
SELECT COUNT(*) as available_moderators
FROM users
WHERE role = 'moderator' AND available = true AND active = true;