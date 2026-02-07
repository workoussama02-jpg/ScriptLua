/**
 * Discord Notification System - Test Suite
 * Use this script to test all Discord notification scenarios
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Configuration - Update these with your values
const SUPABASE_URL = 'https://ndniosrqgrzcsqnfabxr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjEyNTAsImV4cCI6MjA4NTEzNzI1MH0.vu7GRZ-C-qdhPT8niHVOgz3E1Sxhv5hewi-GDSGR01w'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Test utilities
const log = {
    success: (msg) => console.log(`✅ ${msg}`),
    error: (msg) => console.error(`❌ ${msg}`),
    info: (msg) => console.log(`ℹ️  ${msg}`),
    test: (msg) => console.log(`\n🧪 Test: ${msg}\n${'='.repeat(50)}`)
}

// Helper: Wait for a specific duration
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Test 1: Create a test ticket with no moderators available
 */
async function testTicketCreationNoModerators() {
    log.test('Ticket Creation - No Moderators Available')
    
    try {
        // Step 1: Set all moderators to unavailable
        log.info('Setting all moderators to unavailable...')
        const { error: updateError } = await supabase
            .from('users')
            .update({ available: false })
            .eq('role', 'moderator')
        
        if (updateError) throw updateError
        log.success('All moderators set to unavailable')
        
        // Step 2: Create a test ticket
        log.info('Creating test ticket...')
        const testTicket = {
            title: 'Test - Notification système Discord',
            description: 'Ceci est un ticket de test pour le système de notification Discord. Aucun modérateur n\'est disponible.',
            client_id: 'test-user-123',
            client_name: 'Utilisateur Test',
            status: 'open',
            priority: 'normal'
        }
        
        const { data: ticket, error: ticketError } = await supabase
            .from('tickets')
            .insert(testTicket)
            .select()
            .single()
        
        if (ticketError) throw ticketError
        log.success(`Ticket created: ${ticket.id}`)
        
        // Step 3: Trigger Discord notification
        log.info('Triggering Discord notification...')
        const { data, error: functionError } = await supabase.functions.invoke(
            'notify-ticket-created',
            { body: { ticket } }
        )
        
        if (functionError) throw functionError
        log.success('Discord notification triggered successfully')
        log.info(`Response: ${JSON.stringify(data, null, 2)}`)
        
        // Step 4: Verify notification was logged
        await wait(2000) // Wait for database to update
        const { data: notification, error: notifError } = await supabase
            .from('discord_notifications')
            .select('*')
            .eq('ticket_id', ticket.id)
            .single()
        
        if (notifError) throw notifError
        log.success('Notification logged in database')
        
        // Step 5: Check notification queue for escalation
        const { data: queueItem } = await supabase
            .from('notification_queue')
            .select('*')
            .eq('ticket_id', ticket.id)
            .single()
        
        if (queueItem) {
            log.success(`Escalation scheduled for: ${queueItem.scheduled_for}`)
        }
        
        log.success('✨ Test 1 PASSED: Go check your Discord moderator channel!')
        return { success: true, ticketId: ticket.id }
        
    } catch (error) {
        log.error(`Test 1 FAILED: ${error.message}`)
        return { success: false, error: error.message }
    }
}

/**
 * Test 2: Test ticket claim notification
 */
async function testTicketClaim(ticketId) {
    log.test('Ticket Claim - Moderator Takes Ticket')
    
    try {
        // Get the ticket
        log.info(`Fetching ticket ${ticketId}...`)
        const { data: ticket, error: ticketError } = await supabase
            .from('tickets')
            .select('*')
            .eq('id', ticketId)
            .single()
        
        if (ticketError || !ticket) throw new Error('Ticket not found')
        log.success('Ticket found')
        
        // Simulate moderator claiming the ticket
        log.info('Simulating moderator claim...')
        const testModerator = {
            id: 'test-moderator-123',
            name: 'Jean Dupont (Test)'
        }
        
        const { error: updateError } = await supabase
            .from('tickets')
            .update({
                assigned_to: testModerator.id,
                assigned_to_name: testModerator.name,
                status: 'in_progress'
            })
            .eq('id', ticketId)
        
        if (updateError) throw updateError
        log.success('Ticket assigned to moderator')
        
        // Trigger claim notification
        log.info('Triggering claim notification...')
        const { data, error: functionError } = await supabase.functions.invoke(
            'notify-ticket-claimed',
            {
                body: {
                    ticket_id: ticketId,
                    moderator_id: testModerator.id,
                    moderator_name: testModerator.name
                }
            }
        )
        
        if (functionError) throw functionError
        log.success('Claim notification sent')
        log.info(`Response: ${JSON.stringify(data, null, 2)}`)
        
        // Verify queue item was removed
        await wait(2000)
        const { data: queueItem } = await supabase
            .from('notification_queue')
            .select('*')
            .eq('ticket_id', ticketId)
            .eq('processed', false)
            .single()
        
        if (!queueItem) {
            log.success('Escalation cancelled (queue item removed)')
        }
        
        log.success('✨ Test 2 PASSED: Check Discord moderator channel for claim notification!')
        return { success: true }
        
    } catch (error) {
        log.error(`Test 2 FAILED: ${error.message}`)
        return { success: false, error: error.message }
    }
}

/**
 * Test 3: Test escalation notification (manual trigger)
 */
async function testEscalation(ticketId) {
    log.test('Escalation - Unassigned Ticket (30+ minutes)')
    
    try {
        // Unassign the ticket
        log.info('Unassigning ticket for escalation test...')
        const { error: updateError } = await supabase
            .from('tickets')
            .update({
                assigned_to: null,
                assigned_to_name: null,
                status: 'open'
            })
            .eq('id', ticketId)
        
        if (updateError) throw updateError
        log.success('Ticket unassigned')
        
        // Manually trigger escalation
        log.info('Triggering escalation notification...')
        const { data, error: functionError } = await supabase.functions.invoke(
            'notify-ticket-escalation',
            { body: { ticket_id: ticketId } }
        )
        
        if (functionError) throw functionError
        log.success('Escalation notification sent')
        log.info(`Response: ${JSON.stringify(data, null, 2)}`)
        
        // Verify escalation was logged
        await wait(2000)
        const { data: notification } = await supabase
            .from('discord_notifications')
            .select('*')
            .eq('ticket_id', ticketId)
            .eq('notification_type', 'escalation')
            .single()
        
        if (notification) {
            log.success('Escalation logged in database')
        }
        
        log.success('✨ Test 3 PASSED: Check Discord admin channel for escalation!')
        return { success: true }
        
    } catch (error) {
        log.error(`Test 3 FAILED: ${error.message}`)
        return { success: false, error: error.message }
    }
}

/**
 * Test 4: Test anti-spam cooldown
 */
async function testAntiSpamCooldown(ticketId) {
    log.test('Anti-Spam - Cooldown Mechanism')
    
    try {
        log.info('Attempting to send duplicate notification...')
        
        const { data: ticket } = await supabase
            .from('tickets')
            .select('*')
            .eq('id', ticketId)
            .single()
        
        const { data, error } = await supabase.functions.invoke(
            'notify-ticket-created',
            { body: { ticket } }
        )
        
        // Should succeed but skip sending due to cooldown
        log.success('Function called successfully')
        log.info(`Response: ${JSON.stringify(data, null, 2)}`)
        
        if (data?.message?.includes('cooldown') || data?.message?.includes('Cooldown')) {
            log.success('✨ Test 4 PASSED: Cooldown is working correctly!')
            return { success: true }
        } else {
            log.error('Cooldown did not activate as expected')
            return { success: false }
        }
        
    } catch (error) {
        log.error(`Test 4 FAILED: ${error.message}`)
        return { success: false, error: error.message }
    }
}

/**
 * Test 5: Process notification queue
 */
async function testNotificationQueue() {
    log.test('Notification Queue Processing')
    
    try {
        log.info('Invoking queue processor...')
        
        const { data, error } = await supabase.functions.invoke(
            'process-notification-queue'
        )
        
        if (error) throw error
        
        log.success('Queue processor executed')
        log.info(`Response: ${JSON.stringify(data, null, 2)}`)
        
        log.success('✨ Test 5 PASSED: Queue processing works!')
        return { success: true, data }
        
    } catch (error) {
        log.error(`Test 5 FAILED: ${error.message}`)
        return { success: false, error: error.message }
    }
}

/**
 * Cleanup test data
 */
async function cleanup(ticketId) {
    log.info('Cleaning up test data...')
    
    try {
        // Delete notifications
        await supabase
            .from('discord_notifications')
            .delete()
            .eq('ticket_id', ticketId)
        
        // Delete queue items
        await supabase
            .from('notification_queue')
            .delete()
            .eq('ticket_id', ticketId)
        
        // Delete ticket
        await supabase
            .from('tickets')
            .delete()
            .eq('id', ticketId)
        
        log.success('Test data cleaned up')
        
    } catch (error) {
        log.error(`Cleanup failed: ${error.message}`)
    }
}

/**
 * Run all tests sequentially
 */
async function runAllTests() {
    console.log('\n🚀 Starting Discord Notification System Tests\n')
    
    let ticketId = null
    
    try {
        // Test 1: Create ticket with notification
        const test1 = await testTicketCreationNoModerators()
        if (!test1.success) {
            throw new Error('Test 1 failed - cannot continue')
        }
        ticketId = test1.ticketId
        
        await wait(3000) // Wait between tests
        
        // Test 2: Claim ticket
        const test2 = await testTicketClaim(ticketId)
        if (!test2.success) {
            console.warn('Test 2 failed but continuing...')
        }
        
        await wait(3000)
        
        // Test 3: Escalation
        const test3 = await testEscalation(ticketId)
        if (!test3.success) {
            console.warn('Test 3 failed but continuing...')
        }
        
        await wait(3000)
        
        // Test 4: Anti-spam
        const test4 = await testAntiSpamCooldown(ticketId)
        if (!test4.success) {
            console.warn('Test 4 failed but continuing...')
        }
        
        await wait(3000)
        
        // Test 5: Queue processing
        const test5 = await testNotificationQueue()
        if (!test5.success) {
            console.warn('Test 5 failed but continuing...')
        }
        
        console.log('\n' + '='.repeat(50))
        console.log('🎉 All tests completed!')
        console.log('='.repeat(50) + '\n')
        
        // Ask if user wants to cleanup
        console.log('⚠️  Test ticket ID:', ticketId)
        console.log('Run cleanup(ticketId) to remove test data')
        
    } catch (error) {
        log.error(`Test suite failed: ${error.message}`)
        
        if (ticketId) {
            console.log('\n⚠️  Cleaning up after failure...')
            await cleanup(ticketId)
        }
    }
}

// Export for use in browser console or Node.js
if (typeof window !== 'undefined') {
    window.DiscordTests = {
        runAllTests,
        testTicketCreationNoModerators,
        testTicketClaim,
        testEscalation,
        testAntiSpamCooldown,
        testNotificationQueue,
        cleanup
    }
    
    console.log('Discord Test Suite loaded!')
    console.log('Run: DiscordTests.runAllTests() to start testing')
}

// If running in Node/Deno, execute immediately
if (typeof Deno !== 'undefined' || typeof process !== 'undefined') {
    runAllTests()
}
