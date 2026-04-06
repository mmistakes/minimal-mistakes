# Development and Deployment

This repository currently backs two live DSG websites:

- `https://dsgiitr.in/`
- `https://dsg.iitr.ac.in/`

They serve the same Jekyll content, but they are not hosted the same way.

## Architecture

### 1. Public website

- URL: `https://dsgiitr.in/`
- Current delivery path: `Cloudflare -> GitHub Pages`
- DNS for `dsgiitr.in` currently resolves to Cloudflare IPs.
- The source repo for that site is this repo.
- The repo-level [`CNAME`](./CNAME) must stay `dsgiitr.in` so GitHub Pages keeps serving the public domain correctly.
- The default Jekyll config in [`_config.yml`](./_config.yml) is intentionally set to `https://dsgiitr.in`.

### 2. IITR website

- URL: `https://dsg.iitr.ac.in/`
- Current delivery path: `AWS EC2 -> Nginx -> static files in /var/www/dsg-site`
- EC2 public IP: `3.110.75.251`
- SSH user: `ubuntu`
- Site root on the server: `/var/www/dsg-site`
- Nginx vhost: `/etc/nginx/sites-available/dsg`
- TLS certificate:
  - `/etc/ssl/certs/dsg_iitr_ac_in_fullchain.crt`
  - `/etc/ssl/private/dsg_iitr_ac_in.key`

`dsg.iitr.ac.in` uses IITR's wildcard certificate for `*.iitr.ac.in`, so this domain must be built with the IITR hostname, not the public hostname.

The IITR-specific hostname override lives in [`_config.iitr.yml`](./_config.iitr.yml).

## Local Setup

### Prerequisites

- Ruby and Bundler installed
- A working native build toolchain for gems

This repo is a Jekyll site built on the Minimal Mistakes theme.

Install dependencies:

```bash
bundle install
```

Run locally:

```bash
bundle exec jekyll serve --livereload
```

That serves the site locally at `http://127.0.0.1:4000`.

## Build Commands

### Public build for `dsgiitr.in`

Use the default config:

```bash
JEKYLL_ENV=production bundle exec jekyll build --destination _site_public
```

### IITR build for `dsg.iitr.ac.in`

Use the IITR override config:

```bash
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.iitr.yml --destination _site_iitr
```

That override keeps content shared while changing the generated absolute URLs and canonical metadata to the IITR hostname.

## How to Update the Public Website

The public website is currently the GitHub Pages copy of this repository, fronted by Cloudflare.

Typical update flow:

1. Make content or layout changes in this repo.
2. Commit and push to `master`.
3. Let GitHub Pages rebuild the site.
4. If Cloudflare caches an old page, purge cache there if needed.

Important:

- Keep [`CNAME`](./CNAME) as `dsgiitr.in`.
- Keep [`_config.yml`](./_config.yml) pointing to `https://dsgiitr.in`.
- Do not point the public build at `dsg.iitr.ac.in`, or GitHub Pages pages will emit the wrong canonical URLs.

## How to Update the IITR Website

The IITR website is a static copy deployed manually to the EC2 instance.

Recommended flow:

1. Build the IITR version locally.
2. Copy the generated files to the EC2 instance.
3. Sync them into `/var/www/dsg-site`.
4. Ensure ownership stays `www-data:www-data`.
5. Validate and reload Nginx.

Example commands:

```bash
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.iitr.yml --destination _site_iitr
rsync -avz --delete _site_iitr/ ubuntu@3.110.75.251:/tmp/dsg-site/
ssh -i /path/to/your/key.pem ubuntu@3.110.75.251
```

Then on the server:

```bash
sudo rsync -av --delete /tmp/dsg-site/ /var/www/dsg-site/
sudo chown -R www-data:www-data /var/www/dsg-site
sudo nginx -t
sudo systemctl reload nginx
```

## Nginx Notes

Current behavior on the EC2 instance:

- `http://dsg.iitr.ac.in` redirects to `https://dsg.iitr.ac.in`
- `https://dsg.iitr.ac.in` serves the site from `/var/www/dsg-site`
- `http://3.110.75.251` serves the same static site directly

If you change the IITR virtual host, re-check:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I http://127.0.0.1
curl -Ik https://127.0.0.1
```

## Firewall and Access Notes

As of April 6, 2026, the EC2 host firewall (`ufw`) was blocking direct IITR/public traffic because only Cloudflare IP ranges were allowed on `80/443`. That was fixed by allowing `80/tcp` and `443/tcp` on the instance itself.

Important operational rule:

- Let AWS security groups enforce the network policy.
- Do not re-introduce Cloudflare-only `ufw` rules unless the IITR deployment is intentionally moved behind Cloudflare as well.

The intended split from the IITR mail thread is:

- Port `80`: campus-network access policy handled upstream in AWS/IITR
- Port `443`: public HTTPS access

## Which Config to Edit

- Edit [`_config.yml`](./_config.yml) for shared site settings and the public domain.
- Edit [`_config.iitr.yml`](./_config.iitr.yml) only for IITR-host-specific overrides.
- Edit [`CNAME`](./CNAME) only if the public GitHub Pages custom domain changes.
- Edit EC2 Nginx only when the IITR deployment path, server names, or certificate files change.

## Quick Summary

- `dsgiitr.in` = public site, GitHub Pages + Cloudflare, default repo config
- `dsg.iitr.ac.in` = EC2/Nginx site, built with `_config.iitr.yml`
- Shared content = this repo
- Public hostname default stays in [`_config.yml`](./_config.yml)
- IITR hostname override stays in [`_config.iitr.yml`](./_config.iitr.yml)
