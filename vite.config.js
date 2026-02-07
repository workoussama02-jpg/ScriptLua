import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory
  root: '.',
  
  // Public directory for static assets
  publicDir: 'img',
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    
    // Multi-page configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scripts: resolve(__dirname, 'nos-scripts.html'),
        powerleveling: resolve(__dirname, 'power-leveling.html'),
        proxy: resolve(__dirname, 'proxy.html'),
        client: resolve(__dirname, 'espace-client.html'),
        about: resolve(__dirname, 'a-propos.html'),
      },
    },
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      },
    },
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  
  // Preview server (for testing production build)
  preview: {
    port: 4173,
    open: true,
  },
  
  // Environment variables prefix
  envPrefix: 'VITE_',
});
