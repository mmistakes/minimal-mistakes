#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Sets up the WeirdDev Jekyll site for local development on Windows.
.DESCRIPTION
    Installs Ruby 3.2 with DevKit, Bundler 2.5.23, project gems, and optionally starts the dev server.
    Run from an Administrator PowerShell window in the repo root.
.PARAMETER skipServe
    If set, skips starting the Jekyll server after setup completes.
.EXAMPLE
    .\setup-windows.ps1
    # Full setup + start server on http://127.0.0.1:4000

    .\setup-windows.ps1 -skipServe
    # Setup only, no server start
#>
param(
    [switch]$skipServe
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "WeirdDev Jekyll Setup for Windows" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check/Install Ruby
Write-Host "[1/4] Checking Ruby 3.2 with DevKit..." -ForegroundColor Yellow
$rubyPath = "C:\Ruby32-x64\bin\ruby.exe"
$rubyInstalled = Test-Path $rubyPath

if ($rubyInstalled) {
    Write-Host "  ✓ Ruby 3.2 found at $rubyPath" -ForegroundColor Green
} else {
    Write-Host "  ℹ Ruby 3.2 not found. Installing via winget..." -ForegroundColor Cyan
    winget install --id RubyInstallerTeam.RubyWithDevKit.3.2 --exact `
        --accept-package-agreements --accept-source-agreements --silent | Out-Null

    if (Test-Path $rubyPath) {
        Write-Host "  ✓ Ruby 3.2 installed successfully" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Ruby 3.2 installation failed. Please install manually from:" -ForegroundColor Red
        Write-Host "    https://github.com/oneclick/rubyinstaller2/releases" -ForegroundColor Red
        exit 1
    }
}

# 2. Update PATH for this session
Write-Host "[2/4] Configuring PATH..." -ForegroundColor Yellow
$env:Path = "C:\Ruby32-x64\bin;C:\Ruby32-x64\msys64\usr\bin;" + $env:Path
Write-Host "  ✓ Ruby toolchain ready" -ForegroundColor Green

# Verify
$rubyVer = & ruby -v 2>&1 | Select-Object -First 1
Write-Host "    $rubyVer" -ForegroundColor Gray

# 3. Install/Pin Bundler
Write-Host "[3/4] Installing Bundler 2.5.23..." -ForegroundColor Yellow
& gem install bundler -v 2.5.23 --no-document 2>&1 | Where-Object { $_ -match "^(Successfully|1 gem)" } | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
Write-Host "  ✓ Bundler 2.5.23 installed" -ForegroundColor Green

# 4. Install gems
Write-Host "[4/4] Installing project gems (this may take 1-2 minutes)..." -ForegroundColor Yellow
Push-Location $repoRoot
& bundle _2.5.23_ install 2>&1 | Where-Object { $_ -match "(Bundle complete|error)" } | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
Pop-Location
Write-Host "  ✓ Project dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

if (-not $skipServe) {
    Write-Host "Starting Jekyll development server..." -ForegroundColor Cyan
    Write-Host "Open your browser to: http://127.0.0.1:4000" -ForegroundColor Green
    Write-Host ""
    Push-Location $repoRoot
    & bundle _2.5.23_ exec jekyll serve --host 127.0.0.1 --port 4000
    Pop-Location
} else {
    Write-Host "To start the Jekyll server, run:" -ForegroundColor Cyan
    Write-Host "  bundle _2.5.23_ exec jekyll serve --host 127.0.0.1 --port 4000" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Then open: http://127.0.0.1:4000" -ForegroundColor Green
}

