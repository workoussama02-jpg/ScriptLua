# Script Lua - Quick Setup Script
# This script will help you set up your development environment

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🚀 Script Lua - Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($null -eq $nodeCommand) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "📥 Please install Node.js from: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "   (Download the LTS version)" -ForegroundColor Gray
    Start-Process "https://nodejs.org"
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

$nodeVersion = node --version 2>$null
Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green

# Check if .env file exists
Write-Host ""
Write-Host "🔍 Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    
    # Check if template exists
    if (-not (Test-Path ".env.example")) {
        Write-Host "❌ .env.example template not found!" -ForegroundColor Red
        Write-Host "   Please ensure .env.example exists in the project root" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press any key to exit..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
    
    Write-Host "📋 Creating .env from template..." -ForegroundColor Yellow
    try {
        Copy-Item ".env.example" ".env" -ErrorAction Stop
        Write-Host "✅ .env file created" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  IMPORTANT: Edit .env with your actual API keys!" -ForegroundColor Red
        Write-Host "   Open .env and replace placeholder values" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Failed to create .env file: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Press any key to exit..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
} else {
    Write-Host "✅ .env file exists" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "(This may take a minute...)" -ForegroundColor Gray
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Success message
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Edit .env file with your API keys" -ForegroundColor White
Write-Host "   2. Run: npm run dev" -ForegroundColor White
Write-Host "   3. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "   - Quick Start: SETUP_INSTRUCTIONS.md" -ForegroundColor White
Write-Host "   - Full Guide:  ENV_SETUP_GUIDE.md" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to start development!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to start dev server
$response = Read-Host "Do you want to start the development server now? (y/n)"
if ($response.Trim() -match "^y(es)?$") {
    Write-Host ""
    Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
    Write-Host "   (Press Ctrl+C to stop)" -ForegroundColor Gray
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "👍 No problem! Run 'npm run dev' when you're ready." -ForegroundColor Yellow
    Write-Host ""
}
