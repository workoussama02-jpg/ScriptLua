// ===================================================================
// CONFIGURATION MODULE - Environment Variables Handler
// ===================================================================
// This module handles environment variables for both development and production
// It works with Vite, Netlify, Vercel, and other deployment platforms

/**
 * Get environment variable with fallback
 * Works in different environments:
 * - window._env_ (set by inline script in HTML)
 * - process.env (Node.js environments, Vite-injected in browser)
 */
function getEnvVar(key, fallback = '') {
    // 1. Try window._env_ (set by inline script, highest priority for runtime)
    if (typeof window !== 'undefined' && window._env_ && window._env_[key]) {
        console.log(`✅ Found ${key} in window._env_`);
        return window._env_[key];
    }
    
    // 2. Try process.env (Node.js environments, injected by Vite in browser)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        console.log(`✅ Found ${key} in process.env`);
        return process.env[key];
    }
    
    // 3. Return fallback
    console.log(`⚠️ Using fallback for ${key}:`, fallback.substring(0, 20) + '...');
    return fallback;
}

/**
 * Application Configuration
 * All sensitive values should come from environment variables
 */
const config = {
    // Environment
    env: getEnvVar('NODE_ENV', 'development'),
    isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
    isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
    
    // Clerk Authentication
    clerk: {
        publishableKey: getEnvVar('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_bWVhc3VyZWQtamFndWFyLTcuY2xlcmsuYWNjb3VudHMuZGV2JA'),
    },
    
    // Supabase Database
    supabase: {
        url: getEnvVar('VITE_SUPABASE_URL', 'https://ndniosrqgrzcsqnfabxr.supabase.co'),
        anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbmlvc3JxZ3J6Y3NxbmZhYnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NjEyNTAsImV4cCI6MjA4NTEzNzI1MH0.vu7GRZ-C-qdhPT8niHVOgz3E1Sxhv5hewi-GDSGR01w'),
    },
    
    // Site Configuration
    site: {
        url: getEnvVar('SITE_URL', 'http://localhost:3000'),
        name: 'Script Lua',
    },
    
    // Optional: Analytics
    analytics: {
        googleAnalyticsId: getEnvVar('GOOGLE_ANALYTICS_ID', ''),
    },
    
    // Debug Mode
    debug: getEnvVar('DEBUG', 'false') === 'true',
};

/**
 * Validate configuration
 * Checks if all required environment variables are set
 */
function validateConfig() {
    const errors = [];
    
    if (!config.clerk.publishableKey) {
        errors.push('❌ VITE_CLERK_PUBLISHABLE_KEY is not set');
    }
    
    if (!config.supabase.url) {
        errors.push('❌ VITE_SUPABASE_URL is not set');
    }
    
    if (!config.supabase.anonKey) {
        errors.push('❌ VITE_SUPABASE_ANON_KEY is not set');
    }
    
    // Check if using test keys in production
    if (config.isProduction && config.clerk.publishableKey.startsWith('pk_test_')) {
        errors.push('⚠️  WARNING: Using Clerk TEST key in production!');
    }
    
    if (errors.length > 0) {
        console.error('🚨 Configuration Errors:');
        errors.forEach(error => console.error(error));
        
        if (!config.isDevelopment) {
            throw new Error('Configuration validation failed. Check console for details.');
        }
    } else {
        console.log('✅ Configuration validated successfully');
    }
    
    // Log configuration in development (without sensitive parts)
    if (config.isDevelopment && config.debug) {
        console.log('📋 Current Configuration:', {
            env: config.env,
            clerkKeyPrefix: config.clerk.publishableKey.substring(0, 10) + '...',
            supabaseUrl: config.supabase.url,
            siteUrl: config.site.url,
        });
    }
}

// Auto-validate on load (only in browser)
if (typeof window !== 'undefined') {
    validateConfig();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Also make available globally for browser
if (typeof window !== 'undefined') {
    window.AppConfig = config;
}
