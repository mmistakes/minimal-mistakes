# CLAUDE.md - Project Guide

## Project Overview
Personal academic website for Aditya Soenarjo, hosted on GitHub Pages at `soenarjo.github.io`.
Built with Jekyll using the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) remote theme (v4.28.0).

## Architecture
- **No theme source files in repo** — uses `remote_theme` in `_config.yml` to pull Minimal Mistakes from GitHub at build time
- **Skin**: "air" (light gray background, blue accents)
- **Pages**: Home (`index.md`), Papers & Discussions (`_pages/papers.md`), CV (external PDF link)

## Key Files
- `_config.yml` — Site configuration, author info, theme settings, plugin list
- `_data/navigation.yml` — Top navigation menu
- `index.md` — Home page content
- `_pages/papers.md` — Papers & Discussions page
- `assets/images/headshot.jpg` — Author headshot
- `assets/css/main.scss` — Custom CSS overrides (scrollbar fix, dark mode, sidebar sizing)
- `assets/js/dark-mode.js` — Dark mode toggle logic (persists preference via localStorage)
- `_includes/head/custom.html` — Applies saved dark mode class before first paint (avoids flash)
- `_includes/footer/custom.html` — Loads dark-mode.js
- `Gemfile` — Ruby dependencies (`github-pages` gem + `jekyll-include-cache`)

## Local Development
```bash
bundle install
# Serve outside Dropbox folder to avoid Dropbox sync interference:
bundle exec jekyll serve --destination /tmp/jekyll-site --no-watch
# Site available at http://localhost:4000
```

> **Note**: Always use `--destination /tmp/jekyll-site --no-watch` when developing locally.
> The repo lives in a Dropbox-synced folder; without these flags, Dropbox triggers continuous
> Jekyll rebuilds, causing page flicker.

## Deployment
Push to `master` branch via PR. GitHub Pages builds and deploys automatically.

## Adding/Editing Content
- **New pages**: Add markdown files to `_pages/` with front matter (`layout: single`, `author_profile: true`, `permalink: /your-path/`)
- **Navigation**: Edit `_data/navigation.yml` to add/remove nav links
- **Author info**: Edit the `author:` section in `_config.yml`
- **Theme updates**: Change the version tag in `remote_theme` in `_config.yml`
- **Custom CSS**: Add overrides to `assets/css/main.scss` (imports theme first, then custom rules)
- **Papers page**: Edit `_pages/papers.md` — abstracts use `<details>`/`<summary>` HTML for collapsible sections

## Dark Mode
- Toggle button injected into sidebar via `assets/js/dark-mode.js`
- Preference saved to `localStorage` and applied before first paint via `_includes/head/custom.html`
- CSS lives in the `html.dark-mode { }` block in `assets/css/main.scss`

## Custom Domain (future)
To point `www.soenarjo.com` here:
1. Add a `CNAME` file containing `www.soenarjo.com`
2. Update DNS: CNAME `www` -> `soenarjo.github.io`, A records for apex domain to GitHub IPs
3. Enable HTTPS in GitHub repo Settings > Pages
