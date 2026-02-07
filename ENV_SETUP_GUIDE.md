# 🔐 Environment Variables Setup Guide

This guide will help you set up environment variables for your Script Lua website securely.

---

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Understanding Environment Variables](#understanding-environment-variables)
3. [Setup for Development](#setup-for-development)
4. [Setup for Production](#setup-for-production)
5. [Platform-Specific Guides](#platform-specific-guides)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your actual keys
# Use your favorite editor (VS Code, Notepad++, etc.)
```

### Step 3: Update Your Keys
Open `.env` and replace the placeholder values:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### Step 4: Run Development Server
```bash
npm run dev
```

---

## 🤔 Understanding Environment Variables

### What Are They?
Environment variables are key-value pairs that store configuration outside your code:
- ✅ **Secure**: Keep secrets out of your codebase
- ✅ **Flexible**: Different values for dev/staging/production
- ✅ **Safe**: Won't be committed to Git

### What's Safe to Expose?

**✅ PUBLIC (Safe in Client-Side Code):**
- Clerk Publishable Key (`pk_test_*` or `pk_live_*`)
- Supabase Anon Key (protected by RLS policies)
- Google Analytics ID
- Site URL

**🔴 PRIVATE (Never Expose):**
- Clerk Secret Key (`sk_test_*` or `sk_live_*`)
- Supabase Service Role Key
- Database passwords
- API secret keys
- Webhook secrets

### Why Use Environment Variables?

1. **Security**: No hardcoded secrets in code
2. **Flexibility**: Easy to change without code changes
3. **Environments**: Different configs for dev/staging/prod
4. **Git Safety**: `.gitignore` prevents committing secrets

---

## 💻 Setup for Development

### Method 1: Using Vite (Recommended)

**1. Install Vite**
```bash
npm install
```

**2. Configure `.env`**
```env
NODE_ENV=development
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**3. Update Your HTML Files**

Add this BEFORE your script.js:
```html
<!-- Load config first -->
<script type="module" src="/config.js"></script>
```

**4. Update script.js**

Replace hardcoded values:
```javascript
// ❌ OLD (Hardcoded)
const SUPABASE_URL = 'https://ndniosrqgrzcsqnfabxr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJI...';

// ✅ NEW (From environment)
const SUPABASE_URL = window.AppConfig.supabase.url;
const SUPABASE_ANON_KEY = window.AppConfig.supabase.anonKey;
```

**5. Run Development Server**
```bash
npm run dev
```

Visit: http://localhost:3000

---

### Method 2: Without Build Tools (Quick & Dirty)

If you don't want to use Vite:

**1. Create `env.js`** (gitignore this!)
```javascript
window._env_ = {
  VITE_CLERK_PUBLISHABLE_KEY: 'pk_test_your_key',
  VITE_SUPABASE_URL: 'https://your-project.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'your_anon_key',
};
```

**2. Load it in HTML** (before other scripts)
```html
<script src="/env.js"></script>
<script src="/config.js"></script>
<script src="/script.js"></script>
```

**3. Add `env.js` to `.gitignore`**

---

## 🌐 Setup for Production

### Get Production Keys

**1. Clerk Production Keys**
- Go to: https://dashboard.clerk.com
- Switch to Production environment
- Copy your `pk_live_*` key

**2. Supabase Production Database**
- Create new production project: https://supabase.com/dashboard
- Copy URL and anon key
- Run `supabase-schema.sql` in SQL editor

---

## 🚀 Platform-Specific Guides

### Deploying to Vercel

**1. Install Vercel CLI**
```bash
npm i -g vercel
```

**2. Deploy**
```bash
vercel
```

**3. Add Environment Variables in Vercel Dashboard**
- Go to: Project Settings → Environment Variables
- Add:
  - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_live_...`
  - `VITE_SUPABASE_URL` = `https://prod.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `your_prod_key`
  - `NODE_ENV` = `production`

**4. Redeploy**
```bash
vercel --prod
```

---

### Deploying to Netlify

**1. Build Your Site**
```bash
npm run build
```

**2. Deploy**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**3. Add Environment Variables**
- Go to: Site Settings → Build & Deploy → Environment
- Add same variables as Vercel

**4. Rebuild**
Netlify will rebuild automatically when you push to Git.

---

### Deploying to GitHub Pages

GitHub Pages doesn't support server-side environment variables. Use this workaround:

**1. Create `env-config.js`** (commit this, it's public anyway)
```javascript
window._env_ = {
  VITE_CLERK_PUBLISHABLE_KEY: 'pk_live_your_public_key',
  VITE_SUPABASE_URL: 'https://prod.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'your_public_anon_key',
  NODE_ENV: 'production',
};
```

**2. Load it before config.js**
```html
<script src="/env-config.js"></script>
<script src="/config.js"></script>
```

**Note**: These keys are PUBLIC anyway (Clerk publishable key, Supabase anon key), so this is safe.

---

### Deploying to Traditional Hosting (cPanel, FTP)

**1. Build Your Site**
```bash
npm run build
```

**2. Create `env-config.js` in `dist/` folder**
```javascript
window._env_ = {
  VITE_CLERK_PUBLISHABLE_KEY: 'pk_live_...',
  VITE_SUPABASE_URL: 'https://prod.supabase.co',
  VITE_SUPABASE_ANON_KEY: '...',
  NODE_ENV: 'production',
};
```

**3. Update all HTML files to load it**
```html
<script src="/env-config.js"></script>
```

**4. Upload `dist/` folder via FTP**

---

## 🔧 Troubleshooting

### "Configuration Errors" in Console

**Problem**: Missing environment variables

**Solution**:
```bash
# Check if .env file exists
ls -la .env

# If missing, copy from example
cp .env.example .env

# Edit with your keys
code .env  # or use any editor
```

---

### "Using TEST key in production" Warning

**Problem**: Using `pk_test_*` key in production

**Solution**:
1. Go to Clerk Dashboard
2. Switch to Production
3. Copy `pk_live_*` key
4. Update `.env` or deployment platform
5. Redeploy

---

### Vite Not Found

**Problem**: `npm run dev` fails

**Solution**:
```bash
# Install dependencies
npm install

# If still fails, delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

### Environment Variables Not Loading

**Problem**: `window.AppConfig` is undefined

**Solution**:
1. Make sure `config.js` loads BEFORE `script.js`
2. Check browser console for errors
3. Verify `.env` file exists and has correct format
4. Restart dev server after changing `.env`

---

### CORS Errors with Supabase

**Problem**: API requests blocked

**Solution**:
1. Check Supabase URL is correct
2. Verify RLS policies are configured
3. Check anon key is valid
4. Go to Supabase Dashboard → API Settings → Add your domain

---

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)

---

## ✅ Security Checklist

Before deploying to production:

- [ ] `.env` file is in `.gitignore`
- [ ] Using production keys (not test keys)
- [ ] No secrets in HTML/CSS/JS files
- [ ] Environment variables set in deployment platform
- [ ] Test deployment works correctly
- [ ] No `console.log` with sensitive data
- [ ] HTTPS enabled on custom domain
- [ ] Supabase RLS policies configured correctly

---

## 🆘 Need Help?

If you're stuck:
1. Check browser console for errors
2. Review this guide again
3. Check the logs in your deployment platform
4. Ask on GitHub issues or Discord

---

**Remember**: 
- ✅ Clerk publishable keys are SAFE to expose
- ✅ Supabase anon keys are SAFE to expose (with RLS)
- 🔴 Never expose secret keys or service role keys
- 🔐 Always use `.gitignore` to protect `.env` files
