# PowerPlatform Tips Blog - Setup Guide

This guide explains how to set up and run your PowerPlatform Tips blog using Jekyll and the Minimal Mistakes theme.

## Quick Start

### Prerequisites
- [Ruby](https://www.ruby-lang.org/en/downloads/) (version 2.5 or higher)
- [Bundler](https://bundler.io/) gem
- [Git](https://git-scm.com/)

### Installation

1. **Clone or download this repository**
```bash
git clone [your-repo-url]
cd PowerPlatformTip
```

2. **Install dependencies**
```bash
bundle install
```

3. **Run the blog locally**
```bash
bundle exec jekyll serve
```

4. **Open your browser** and go to `http://localhost:4000`

## Configuration

### Basic Settings
Edit `_config.yml` to customize your blog:

```yaml
# Site Settings
title: "PowerPlatform Tips"
subtitle: "Fresh insights in mint design"
name: "Marcel Lehmann"
description: "A beautiful blog for PowerPlatform tips and insights"
url: "https://yourusername.github.io"
baseurl: "/your-repo-name"
```

### Theme and Appearance
The blog uses the Minimal Mistakes theme with mint color scheme:

```yaml
remote_theme: "mmistakes/minimal-mistakes"
minimal_mistakes_skin: "mint"
```

### Navigation
Customize the main navigation in `_data/navigation.yml`:

```yaml
main:
  - title: "Home"
    url: /
  - title: "Posts"
    url: /posts/
  - title: "Categories"
    url: /categories/
  - title: "Tags"
    url: /tags/
  - title: "About"
    url: /about/
```

## Content Creation

### Creating a New PowerPlatformTip

1. **Use the template**: Copy `_post-template.md`
2. **Name your file**: `YYYY-MM-DD-powerplatformtip-[number]-[slug].md`
3. **Save in `_posts` folder**
4. **Fill in the content** following the PowerPlatformTip structure

### File Naming Convention
```
2025-05-27-powerplatformtip-134-optimize-canvas-apps-yaml.md
```

### Required Front Matter
```yaml
---
title: "PowerPlatformTip 134 – 'Optimize Canvas Apps with YAML'"
date: 2025-05-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - Technology
  - Marcel Lehmann
excerpt: "Short description of your tip"
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---
```

## Blog Structure

### Automatic Features
- **Tagging**: All tags are automatically organized
- **Categories**: Posts grouped by category
- **Table of Contents**: Generated from headings
- **Related Posts**: Based on tags and categories
- **Archive Pages**: Automatic tag and category pages

### Content Structure
Each PowerPlatformTip follows this format:

1. **💡 Challenge** - Describe the problem
2. **✅ Solution** - Brief solution overview  
3. **🔧 How It's Done** - Step-by-step implementation
4. **🎉 Result** - Outcome and benefits
5. **🌟 Key Advantages** - Main benefits
6. **💡 Pro Tip** - Additional insights
7. **🛠️ FAQ** - Common questions

### Markdown Features
- **Emoji headers**: Use emojis to make sections visually appealing
- **Code blocks**: Syntax highlighting for various languages
- **Lists**: Bullet points with 🔸 for sub-items
- **Links**: Internal and external linking
- **Images**: Support for screenshots and diagrams

## Deployment Options

### GitHub Pages (Recommended)
1. **Create a GitHub repository**
2. **Enable GitHub Pages** in repository settings
3. **Set source** to main branch
4. **Your blog** will be available at `username.github.io/repository-name`

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

### Custom Domain (Optional)
1. **Add CNAME file** to root directory with your domain
2. **Configure DNS** to point to GitHub Pages
3. **Enable HTTPS** in repository settings

## Customization

### Colors and Styling
The mint theme provides a fresh, professional look. To customize:

1. **Override variables** in `assets/css/main.scss`
2. **Custom CSS** for specific styling needs
3. **Layout modifications** in `_layouts` and `_includes`

### Layout Optimization
- **No author profile** on posts for wider content
- **Sticky table of contents** for easy navigation
- **Responsive design** for all devices
- **Optimized typography** for readability

### Adding Features
- **Comments**: Enable Disqus, Utterances, or other providers
- **Analytics**: Add Google Analytics or other tracking
- **Search**: Built-in search functionality
- **Social sharing**: Automatic sharing buttons

## Content Guidelines

### Writing Style
- **Clear and actionable**: Focus on practical solutions
- **Consistent structure**: Follow the PowerPlatformTip format
- **Real-world examples**: Use actual scenarios
- **Step-by-step**: Break down complex processes

### SEO Best Practices
- **Descriptive titles**: Include key terms
- **Good excerpts**: Summarize the value
- **Relevant tags**: Use searchable terms
- **Internal linking**: Connect related content

### Quality Standards
- **Tested solutions**: Only share verified approaches
- **Complete information**: Include all necessary details
- **Visual aids**: Add screenshots when helpful
- **Professional tone**: Maintain consistent voice

## Maintenance

### Regular Tasks
- **Update dependencies**: `bundle update`
- **Review analytics**: Monitor popular content
- **Update about page**: Keep information current
- **Backup content**: Regular Git commits

### Performance
- **Image optimization**: Compress images before upload
- **Clean URLs**: Use descriptive file names
- **Mobile testing**: Verify responsiveness
- **Loading speed**: Monitor site performance

## Troubleshooting

### Common Issues
1. **Bundle install fails**: Update Ruby and Bundler
2. **Jekyll serve error**: Check gem dependencies
3. **Theme not loading**: Verify remote_theme setting
4. **Posts not showing**: Check file naming and front matter

### Getting Help
- **Jekyll Documentation**: [jekyllrb.com](https://jekyllrb.com)
- **Minimal Mistakes Guide**: [mmistakes.github.io](https://mmistakes.github.io/minimal-mistakes/)
- **GitHub Issues**: Check repository issues page

## Advanced Features

### Multi-language Support
To add German/English support, you would need:
- Language-specific post collections
- Navigation switching
- Translated templates
- URL structure planning

### Custom Post Types
Beyond PowerPlatformTips, you can add:
- Case studies
- Tutorials
- News updates
- Guest posts

---

*Ready to start? Use the `_post-template.md` file and follow the PowerPlatformTip structure for your first post!*
