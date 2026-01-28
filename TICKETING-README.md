# Ticketing & Real-Time Chat System - Setup Guide

## Overview
This implementation adds a comprehensive ticketing and real-time chat system to the Script Lua application, featuring role-based access control with client, moderator, and admin roles.

## Features Implemented

### ✅ Completed Features
- **Role-based Authentication**: Client, Moderator, and Admin dashboards
- **Ticket Management**: Create, assign, update, and close tickets
- **Real-time Chat**: Instant messaging between clients and support staff
- **Responsive Design**: Mobile-friendly interface
- **Supabase Integration**: Real-time database with Row Level Security
- **Modal System**: Clean, accessible modal dialogs
- **Notification System**: User feedback and status updates

### 🎯 Key Components
1. **HTML Structure**: Complete dashboard layouts for all user roles
2. **CSS Styling**: Modern, responsive design with animations
3. **JavaScript Logic**: Full ticketing system with real-time features
4. **Database Schema**: Complete Supabase setup with security policies

## Setup Instructions

### 1. Supabase Configuration

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

#### Database Setup
1. Open the Supabase SQL Editor
2. Copy and paste the entire contents of `supabase-schema.sql`
3. Execute the SQL script

#### Get API Keys
1. Go to Settings → API in your Supabase dashboard
2. Copy the "Project URL" and "anon public" key

#### Update Configuration
Edit `script.js` and replace the placeholder values:
```javascript
const SUPABASE_URL = 'https://your-project-ref.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 2. Clerk Authentication
The Clerk authentication is already configured in the HTML file. Make sure your publishable key is correct.

### 3. Initial Admin Setup
After setting up the database, create your first admin user by running this SQL in Supabase:

```sql
-- Replace with your actual Clerk user ID
INSERT INTO users (clerk_id, email, name, role)
VALUES ('your-clerk-user-id', 'admin@example.com', 'Admin User', 'admin');
```

To find your Clerk user ID:
1. Sign in to your application
2. Open browser developer tools (F12)
3. Go to Console and type: `window.Clerk.user.id`

## User Roles & Permissions

### Client Role
- Create new support tickets
- View their own tickets
- Chat with assigned support staff
- Cannot see other users' tickets

### Moderator Role
- View open tickets and tickets assigned to them
- Assign themselves to tickets
- Update ticket status (in-progress, closed, escalated)
- Chat with clients
- View moderator statistics
- Access to internal notes

### Admin Role
- Full access to all tickets and users
- User role management
- View system-wide statistics
- Access to all internal notes
- Can assign tickets to any moderator

## File Structure

```
ScriptLua/
├── espace-client.html      # Main client space with ticketing system
├── style.css              # Complete styling including ticketing UI
├── script.js              # JavaScript logic for ticketing system
├── supabase-schema.sql    # Database schema and setup
└── README.md             # This setup guide
```

## Testing the System

### 1. Create Test Users
Create multiple Clerk accounts and assign different roles in the database:

```sql
-- Test client
INSERT INTO users (clerk_id, email, name, role)
VALUES ('client-clerk-id', 'client@test.com', 'Test Client', 'client');

-- Test moderator
INSERT INTO users (clerk_id, email, name, role)
VALUES ('moderator-clerk-id', 'mod@test.com', 'Test Moderator', 'moderator');
```

### 2. Test Ticket Creation
1. Sign in as a client
2. Click "Créer un ticket"
3. Fill out the form and submit
4. Verify the ticket appears in the list

### 3. Test Real-time Chat
1. Sign in as a moderator
2. Assign yourself to the test ticket
3. Open the ticket chat
4. Send messages back and forth between client and moderator accounts

### 4. Test Admin Features
1. Sign in as an admin
2. Check the user management section
3. Change user roles
4. View system statistics

## API Reference

### JavaScript Functions
- `createTicket()` - Create a new support ticket
- `updateTicketStatus(ticketId, status)` - Update ticket status
- `openTicketChat(ticketId)` - Open chat modal for a ticket
- `sendMessage()` - Send a chat message
- `updateUserRole(userId, role)` - Change user role (admin only)
- `openModal(modalId)` - Open a modal dialog
- `closeModal(modalId)` - Close a modal dialog

### Database Tables
- `users` - User accounts and roles
- `tickets` - Support tickets
- `messages` - Chat messages
- `internal_notes` - Private staff notes

## Security Features

### Row Level Security (RLS)
- Users can only access their own data
- Moderators see only assigned/open tickets
- Admins have full system access
- Real-time subscriptions are filtered

### Authentication
- Clerk handles user authentication
- Supabase RLS enforces data access policies
- JWT tokens used for API authorization

## Performance Optimizations

### Database Indexes
The schema includes optimized indexes for:
- User lookups by Clerk ID
- Ticket filtering by status and assignment
- Message retrieval by ticket ID

### Real-time Subscriptions
- Scoped to specific tickets only
- Automatic cleanup when modals close
- Efficient payload filtering

## Troubleshooting

### Common Issues

1. **"Supabase client not initialized"**
   - Check that SUPABASE_URL and SUPABASE_ANON_KEY are correctly set
   - Verify the Supabase project is active

2. **"User role not found"**
   - Ensure the user exists in the `users` table
   - Check that the Clerk ID matches exactly

3. **Real-time chat not updating**
   - Verify Supabase real-time is enabled for the tables
   - Check browser network tab for WebSocket connections

4. **Modal not opening**
   - Ensure modal HTML elements exist
   - Check for JavaScript errors in console

### Debug Mode
Add this to your browser console to enable debug logging:
```javascript
localStorage.setItem('debug', 'true');
```

## Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Database schema executed successfully
- [ ] API keys updated in `script.js`
- [ ] Clerk authentication working
- [ ] Initial admin user created
- [ ] Test users created for each role
- [ ] All user roles tested
- [ ] Real-time chat tested
- [ ] Mobile responsiveness verified

## Future Enhancements

### Potential Additions
- File attachments in tickets
- Ticket categories/tags
- Automated ticket routing
- Email notifications
- Chat typing indicators
- Message read receipts
- Ticket priority escalation
- Analytics dashboard
- API rate limiting
- Audit logging

### Performance Improvements
- Message pagination for large chats
- Ticket archiving for old tickets
- Database connection pooling
- CDN for static assets
- Service worker for offline support

## Support

For issues with this implementation:
1. Check the browser console for JavaScript errors
2. Verify Supabase logs for database errors
3. Test with different user roles
4. Check network tab for failed requests

## License

This ticketing system is part of the Script Lua application. See the main project license for usage terms.