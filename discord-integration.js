// Discord Notification Integration for script.js
// Add these functions to your existing script.js file

// ===================================================================
// DISCORD NOTIFICATION SYSTEM - INTEGRATION CODE
// ===================================================================

/**
 * Calls the Supabase Edge Function to send Discord notification for new ticket
 * @param {Object} ticket - The ticket object from database
 */
async function notifyNewTicket(ticket) {
    try {
        console.log('Sending Discord notification for ticket:', ticket.id);
        
        const { data, error } = await supabase.functions.invoke('notify-ticket-created', {
            body: { ticket }
        });
        
        if (error) {
            console.error('Discord notification error:', error);
            // Don't throw - notification failure shouldn't break ticket creation
            return { success: false, error };
        }
        
        console.log('Discord notification sent:', data);
        return { success: true, data };
        
    } catch (err) {
        console.error('Exception sending Discord notification:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Calls the Supabase Edge Function when moderator claims a ticket
 * @param {string} ticketId - UUID of the ticket
 * @param {string} moderatorId - UUID of the moderator
 * @param {string} moderatorName - Display name of moderator
 */
async function notifyTicketClaimed(ticketId, moderatorId, moderatorName) {
    try {
        console.log(`Notifying ticket claim: ${ticketId} by ${moderatorName}`);
        
        const { data, error } = await supabase.functions.invoke('notify-ticket-claimed', {
            body: { 
                ticket_id: ticketId,
                moderator_id: moderatorId,
                moderator_name: moderatorName
            }
        });
        
        if (error) {
            console.error('Claim notification error:', error);
            return { success: false, error };
        }
        
        console.log('Claim notification sent:', data);
        return { success: true, data };
        
    } catch (err) {
        console.error('Exception sending claim notification:', err);
        return { success: false, error: err.message };
    }
}

/**
 * Enhanced version of createTicket with Discord notifications
 * Replace or update your existing createTicket function
 */
async function createTicketWithNotifications(ticketData) {
    try {
        // Validate required fields
        if (!ticketData.title || !ticketData.description) {
            throw new Error('Titre et description requis');
        }
        
        // Get current user info for client name
        const user = await Clerk.user;
        if (!user) {
            throw new Error('Utilisateur non authentifié');
        }
        const clientName = user?.fullName || user?.username || 'Utilisateur';
        
        // Prepare ticket data
        const newTicket = {
            title: ticketData.title,
            description: ticketData.description,
            client_id: user.id,
            client_name: clientName,
            status: 'open',
            priority: ticketData.priority || 'normal'
        };
        
        // Insert ticket into database
        const { data: ticket, error } = await supabase
            .from('tickets')
            .insert(newTicket)
            .select()
            .single();
        
        if (error) {
            console.error('Error creating ticket:', error);
            throw error;
        }
        
        console.log('Ticket created successfully:', ticket.id);
        
        // Send Discord notification (non-blocking)
        // We don't await this to avoid slowing down ticket creation
        notifyNewTicket(ticket).catch(err => {
            console.error('Background notification failed:', err);
        });
        
        return ticket;
        
    } catch (error) {
        console.error('Failed to create ticket:', error);
        throw error;
    }
}

/**
 * Enhanced version of claimTicket with Discord notifications
 * Replace or update your existing claimTicket function
 */
async function claimTicketWithNotifications(ticketId) {
    try {
        // Get current moderator info
        const user = await Clerk.user;
        const moderatorName = user?.fullName || user?.username || 'Modérateur';
        const moderatorId = user.id;
        
        // Check if user is actually a moderator
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('clerk_id', moderatorId)
            .single();
        
        if (!userData || !['moderator', 'admin'].includes(userData.role)) {
            throw new Error('Vous n\'avez pas les permissions pour prendre en charge ce ticket');
        }
        
        // Update ticket assignment
        const { data: ticket, error } = await supabase
            .from('tickets')
            .update({
                assigned_to: moderatorId,
                assigned_to_name: moderatorName,
                status: 'in_progress',
                claimed_at: new Date().toISOString()
            })
            .eq('id', ticketId)
            .eq('assigned_to', null) // Only claim if not already assigned
            .select()
            .maybeSingle();
        
        if (error) {
            console.error('Error claiming ticket:', error);
            throw error;
        }
        
        if (!ticket) {
            throw new Error('Ce ticket a déjà été pris en charge par un autre modérateur');
        }
        
        console.log('Ticket claimed successfully:', ticketId);
        
        // Send Discord notification (non-blocking)
        notifyTicketClaimed(ticketId, moderatorId, moderatorName).catch(err => {
            console.error('Background claim notification failed:', err);
        });
        
        return ticket;
        
    } catch (error) {
        console.error('Failed to claim ticket:', error);
        throw error;
    }
}

/**
 * Update moderator availability status
 * This affects whether notifications are sent for new tickets
 */
async function setModeratorAvailability(available) {
    try {
        const user = await Clerk.user;
        
        const { data, error } = await supabase
            .from('users')
            .update({ 
                available: available,
                last_availability_change: new Date().toISOString()
            })
            .eq('clerk_id', user.id)
            .select()
            .single();
        
        if (error) throw error;
        
        console.log(`Moderator availability set to: ${available}`);
        return data;
        
    } catch (error) {
        console.error('Error updating availability:', error);
        throw error;
    }
}

/**
 * Get tickets that need escalation (for testing/admin dashboard)
 */
async function getTicketsNeedingEscalation(minutesThreshold = 30) {
    try {
        const { data, error } = await supabase
            .rpc('get_tickets_needing_escalation', { minutes_threshold: minutesThreshold });
        
        if (error) throw error;
        
        return data;
        
    } catch (error) {
        console.error('Error getting tickets needing escalation:', error);
        throw error;
    }
}

/**
 * Manually trigger escalation notification (for testing)
 * Admin only
 */
async function triggerEscalationManually(ticketId) {
    try {
        // Get current user info
        const user = await Clerk.user;
        const userId = user.id;
        
        // Check if user is admin
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('clerk_id', userId)
            .single();
        
        if (!userData || userData.role !== 'admin') {
            throw new Error('Vous n\'avez pas les permissions d\'administrateur pour déclencher une escalade manuelle');
        }
        
        const { data, error } = await supabase.functions.invoke('notify-ticket-escalation', {
            body: { ticket_id: ticketId }
        });
        
        if (error) throw error;
        
        console.log('Manual escalation triggered:', data);
        return data;
        
    } catch (error) {
        console.error('Error triggering manual escalation:', error);
        throw error;
    }
}

/**
 * Get notification statistics (for admin dashboard)
 */
async function getNotificationStats(days = 7) {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const { data, error } = await supabase
            .from('discord_notifications')
            .select('notification_type, webhook_used, sent_at')
            .gte('sent_at', startDate.toISOString());
        
        if (error) throw error;
        
        // Group by type and webhook
        const stats = data.reduce((acc, notification) => {
            const key = `${notification.notification_type}_${notification.webhook_used}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        
        return {
            total: data.length,
            byType: stats,
            raw: data
        };
        
    } catch (error) {
        console.error('Error getting notification stats:', error);
        throw error;
    }
}

// ===================================================================
// EXAMPLE USAGE IN YOUR EXISTING CODE
// ===================================================================

/*
// Replace your existing ticket form submission handler with this:

document.getElementById('ticketForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Création en cours...';
        
        const ticketData = {
            title: document.getElementById('ticketTitle').value,
            description: document.getElementById('ticketDescription').value,
            priority: document.getElementById('ticketPriority')?.value || 'normal'
        };
        
        // Use the new function with Discord notifications
        const ticket = await createTicketWithNotifications(ticketData);
        
        // Show success message
        showNotification('Ticket créé avec succès!', 'success');
        
        // Reset form
        e.target.reset();
        
        // Refresh ticket list
        await loadUserTickets();
        
    } catch (error) {
        showNotification('Erreur lors de la création du ticket: ' + error.message, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
});

// For moderator ticket claim button:

async function handleClaimTicket(ticketId) {
    const button = event.target;
    const originalText = button.textContent;
    
    try {
        button.disabled = true;
        button.textContent = 'Prise en charge...';
        
        // Use the new function with Discord notifications
        const ticket = await claimTicketWithNotifications(ticketId);
        
        showNotification('Ticket pris en charge avec succès!', 'success');
        
        // Refresh ticket list
        await loadModeratorTickets();
        
    } catch (error) {
        showNotification('Erreur: ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = originalText;
    }
}

// For moderator availability toggle:

document.getElementById('availabilityToggle')?.addEventListener('change', async (e) => {
    try {
        await setModeratorAvailability(e.target.checked);
        showNotification(
            e.target.checked ? 'Vous êtes maintenant disponible' : 'Vous êtes maintenant indisponible',
            'success'
        );
    } catch (error) {
        showNotification('Erreur lors du changement de statut: ' + error.message, 'error');
        e.target.checked = !e.target.checked; // Revert toggle
    }
});
*/

// ===================================================================
// EXPORT FUNCTIONS (if using modules)
// ===================================================================

// If your script.js uses ES modules, export these functions:
/*
export {
    notifyNewTicket,
    notifyTicketClaimed,
    createTicketWithNotifications,
    claimTicketWithNotifications,
    setModeratorAvailability,
    getTicketsNeedingEscalation,
    triggerEscalationManually,
    getNotificationStats
};
*/
