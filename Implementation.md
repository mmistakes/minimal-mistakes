# The Neon Vault - Implementation Guide

This guide will walk you through implementing your certificate portfolio site with Jekyll and the Minimal Mistakes theme.

## Directory Structure

First, ensure your repository has this structure:

```
minimal-mistakes-certifications-gallery/
├── _certificates/
│   └── aws-cloud-practitioner.md
├── _data/
│   └── navigation.yml
├── _pages/
│   ├── blog.md
│   ├── categories.md
│   ├── category-cloud.md
│   ├── category-software-dev.md
│   ├── certificate-gallery.md
│   ├── home.md
│   └── tags.md
├── _posts/
│   └── (your blog posts will go here)
├── assets/
│   └── images/
│       ├── certificates/
│       │   ├── aws-cp-full.jpg
│       │   ├── aws-cp-header.jpg
│       │   └── aws-cp-thumb.jpg
│       └── neon-header.jpg
├── _config.yml
├── index.html
└── README.md
```

## Implementation Steps

### Step 1: Create Essential Directories

First, make sure all necessary directories exist:

```bash
mkdir -p _certificates _data _pages _posts assets/images/certificates
```

### Step 2: Configure Basic Files

1. Add an `index.html` file to the root with the following content:

```html
---
layout: home
author_profile: true
---
```

2. Copy the `_config.yml` file we created to the root of your repository.

3. Copy the `navigation.yml` file to the `_data` directory.

### Step 3: Add Pages and Certificates

1. Copy all the `.md` files from `_pages` to your `_pages` directory.
2. Copy the sample certificate to your `_certificates` directory.

### Step 4: Prepare Images

For the site to work properly, you'll need these images:

1. `assets/images/neon-header.jpg` - A banner image for your homepage
2. For each certificate, you'll need 3 images:
   - `assets/images/certificates/aws-cp-full.jpg` - The full certificate image
   - `assets/images/certificates/aws-cp-header.jpg` - A header image
   - `assets/images/certificates/aws-cp-thumb.jpg` - A thumbnail

You can use placeholder images while setting up:
- Create a simple banner image with a dark background and neon-colored text
- Use a placeholder certificate image until you have your real certificates

### Step 5: Push to GitHub

```bash
git add .
git commit -m "Initial setup of The Neon Vault certificate gallery"
git push
```

### Step 6: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select the "main" branch and "/" (root) folder
5. Click Save

Your site will be published at `https://gerryjekova.github.io/minimal-mistakes-certifications-gallery/`

## Adding New Certificates

To add a new certificate:

1. Create a new `.md` file in the `_certificates` directory
2. Use the sample certificate as a template
3. Update the content, categories, and tags
4. Add the corresponding images to the `assets/images/certificates` directory
5. Commit and push your changes

## Adding New Categories/Subcategories

If you want to add a new category or subcategory:

1. Create a new category page in `_pages` (use existing ones as templates)
2. Update the `navigation.yml` file to include the new category
3. Use the new category in your certificate front matter