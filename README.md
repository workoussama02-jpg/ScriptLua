# 🎮 Script Lua - Gaming Scripts Marketplace

Professional marketplace for Dofus gaming scripts with integrated support system.

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Security](https://img.shields.io/badge/Security-Environment%20Variables-green)

---

## ⚡ Quick Start

### 1️⃣ Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1
```

### 2️⃣ Manual Setup
```powershell
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your keys
code .env

# Start development server
npm run dev
```

---

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org))
- **Git** (optional, for version control)
- **Clerk Account** ([Sign up](https://clerk.com))
- **Supabase Account** ([Sign up](https://supabase.com))

---

## 🏗️ Project Structure

```
ScriptLua/
├── 📄 index.html              # Homepage
├── 📄 nos-scripts.html        # Scripts marketplace
├── 📄 power-leveling.html     # Account leveling service
├── 📄 proxy.html              # Proxy service (maintenance)
├── 📄 espace-client.html      # Client portal & ticketing
├── 📄 a-propos.html           # About page
├── 📜 script.js               # Main JavaScript (5,983 lines)
├── 🎨 style.css               # Styles (3,958 lines)
├── ⚙️  config.js               # Configuration module
├── 🔧 vite.config.js          # Build configuration
├── 🗄️  supabase-schema.sql    # Database schema
├── 📁 img/                    # Images (22 files)
├── 📁 chat-mockups/           # Design mockups
├── 📁 docs/                   # Documentation
├── 🔒 .env                    # Environment variables (SECRET!)
└── 📖 .env.example            # Environment template
```

---

## 🔐 Environment Variables

### Required Variables
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...   # Clerk auth key
VITE_SUPABASE_URL=https://...            # Supabase URL
VITE_SUPABASE_ANON_KEY=eyJhbGci...       # Supabase anon key
```

### Getting Your Keys

**Clerk (Authentication)**
1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create application
3. Copy publishable key

**Supabase (Database)**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create project
3. Run `supabase-schema.sql` in SQL Editor
4. Copy URL and anon key from Settings → API

📖 **Full Guide**: See [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md)

---

## 🚀 Available Commands

```powershell
# Development
npm run dev         # Start dev server (localhost:3000)

# Production
npm run build       # Build for production
npm run preview     # Preview production build

# Other
npm run serve       # Alias for preview
```

---

## 🌟 Features

### ✅ Implemented
- 🛍️ **Scripts Marketplace** - 13 gaming scripts
- 👤 **User Authentication** - Clerk integration
- 🎫 **Ticketing System** - Support tickets with real-time chat
- 💬 **Real-time Chat** - WebSocket-based messaging
- 👥 **Role Management** - Client, Moderator, Admin roles
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔒 **Row Level Security** - Supabase RLS policies
- 🎨 **Modern UI/UX** - Animated particles, gradients

### 🚧 In Development
- 💳 Payment processing (Stripe)
- 📧 Email notifications
- 📊 Analytics dashboard
- 🌐 Proxy service
- 📦 Shopping cart

### 📋 Planned
- 🌍 Multi-language support
- 📱 Mobile app
- 🔔 Push notifications
- 📈 Advanced analytics
- 🤖 AI-powered support

---

## 🔒 Security

### ✅ Current Security Measures
- Environment variables (not hardcoded)
- Row Level Security (RLS) in database
- JWT-based authentication
- HTTPS enforcement (in production)
- Git-ignored secrets (.gitignore)

### ⚠️ Before Production
- [ ] Switch to production API keys
- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Add legal pages (Terms, Privacy)
- [ ] Set up error monitoring
- [ ] Enable security headers
- [ ] Add GDPR cookie consent

---

## 📦 Deployment

### Deploying to Vercel
```powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Deploying to Netlify
```powershell
# Build
npm run build

# Deploy dist/ folder
netlify deploy --prod
```

📖 **Full Deployment Guide**: See [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md#platform-specific-guides)

---

## 🐛 Troubleshooting

### Common Issues

**"npm is not recognized"**
→ Install Node.js from [nodejs.org](https://nodejs.org)

**"Configuration errors"**
→ Check `.env` file exists and has valid values

**"Clerk not loading"**
→ Use `npm run dev`, don't open HTML files directly

**"Database errors"**
→ Run `supabase-schema.sql` in Supabase SQL Editor

📖 **More Help**: See [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md#troubleshooting)

---

## 📚 Documentation

- 📖 [Setup Instructions](SETUP_INSTRUCTIONS.md) - Quick start guide
- 📖 [Environment Variables Guide](ENV_SETUP_GUIDE.md) - Complete env setup
- 📖 [Ticketing System](TICKETING-README.md) - Support system docs
- 📖 [Clerk Setup](CLERK_SETUP.md) - Authentication guide

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS (on client portal)
- Vite (build tool)

### Backend & Services
- [Clerk](https://clerk.com) - Authentication
- [Supabase](https://supabase.com) - Database & Real-time
- PostgreSQL (via Supabase)

### Deployment
- Vercel / Netlify (recommended)
- GitHub Pages (possible)
- Traditional hosting (cPanel, FTP)

---

## 📄 License

© 2025 Script Lua. All rights reserved.

---

## 🤝 Support

- 💬 **Discord**: [Join Server](https://discord.gg/C5FP62dRU3)
- 📧 **Email**: Contact through Discord
- 🛍️ **Marketplace**: [Snowbot Seller](https://snowbot.eu/dashboard/marketplace/seller/8)
- 🔰 **Power Leveling**: [D3GATE Profile](https://d3gate.snowbot.eu/profile/apkwHd8lX8ZOOqdAGuoY8syc13l1)

---

## 🎯 Current Status

**Development Phase**: 60% Complete

**Production Ready**: ❌ Not yet
- ✅ Core features implemented
- ✅ Security measures in place
- ⚠️ Missing payment processing
- ⚠️ Missing legal pages
- ⚠️ Needs production keys

**Next Priority**: 
1. Integrate Stripe payments
2. Add Terms of Service & Privacy Policy
3. Switch to production API keys
4. Deploy to production environment

---

## 📊 Statistics

- **Lines of Code**: ~10,000+
- **HTML Pages**: 6
- **JavaScript Files**: 2 (main: 5,983 lines)
- **CSS Files**: 1 (3,958 lines)
- **Scripts in Marketplace**: 13
- **Database Tables**: 5
- **User Roles**: 3 (Client, Moderator, Admin)

---

**Made with ❤️ for the ScriptLUA Community**
