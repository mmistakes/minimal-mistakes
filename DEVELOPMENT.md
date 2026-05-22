y# Development Setup — WeirdDev Site

This Jekyll site based on [Minimal Mistakes Theme](https://mmistakes.github.io/minimal-mistakes/) runs on Ruby and Bundler.

## Quick Start (Windows)

### First-time setup

1. **Open PowerShell as Administrator** in the repo root
2. **Run the setup script:**
   ```powershell
   .\setup-windows.ps1
   ```
   This installs Ruby 3.2 with DevKit, Bundler, project gems, and starts the dev server.

3. **Open your browser to:** `http://127.0.0.1:4000`

### After first setup (any time)

```powershell
Set-Location "C:\IDEA\wrdv.github.io"
$env:Path = "C:\Ruby32-x64\bin;C:\Ruby32-x64\msys64\usr\bin;" + $env:Path
bundle _2.5.23_ exec jekyll serve --host 127.0.0.1 --port 4000
```

Or use the setup script with `-skipServe` if you just want to verify dependencies:
```powershell
.\setup-windows.ps1 -skipServe
```

## Manual Setup (if needed)

If the automated setup fails, follow these steps:

1. **Install Ruby 3.2 with DevKit**
   - Download from: https://github.com/oneclick/rubyinstaller2/releases
   - Run installer and select "Add Ruby to PATH"
   - Run the MSYS2 setup when prompted

2. **Install Bundler 2.5.23**
   ```powershell
   gem install bundler -v 2.5.23 --no-document
   ```

3. **Install project gems**
   ```powershell
   bundle _2.5.23_ install
   ```

4. **Start the server**
   ```powershell
   bundle _2.5.23_ exec jekyll serve --host 127.0.0.1 --port 4000
   ```

## Common Tasks

### Build the site (static files only)
```powershell
bundle _2.5.23_ exec jekyll build
```
Output is written to `_site/`

### Run with live reload
```powershell
bundle _2.5.23_ exec jekyll serve --host 127.0.0.1 --port 4000 --incremental
```

### Check for build errors
```powershell
bundle _2.5.23_ exec jekyll build --strict_front_matter
```

### Stop the dev server
- **Press Ctrl+C** in the terminal where `jekyll serve` is running

## Troubleshooting

### "Command not found: bundle"
**Solution:** Ruby hasn't been added to PATH. Either:
- Restart PowerShell (new window), or
- Manually add to PATH for current session:
  ```powershell
  $env:Path = "C:\Ruby32-x64\bin;C:\Ruby32-x64\msys64\usr\bin;" + $env:Path
  ```

### Port 4000 already in use
**Solution:** Change the port:
```powershell
bundle _2.5.23_ exec jekyll serve --port 4001
```

### Gems failed to install
**Solution:** Ensure MSYS2 build tools are installed. Run from Ruby installer or:
```powershell
ridk install
```

## Stack

- **Ruby:** 3.2.11 (with MSYS2 DevKit)
- **Bundler:** 2.5.23 (per `Gemfile.lock`)
- **Jekyll:** 3.10.0 (via `github-pages` gem)
- **Theme:** Minimal Mistakes

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Minimal Mistakes Theme Docs](https://mmistakes.github.io/minimal-mistakes/)
- [GitHub Pages (our gem dependency)](https://pages.github.com/)

