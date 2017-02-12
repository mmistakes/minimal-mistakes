---
title: "Structure"
permalink: /docs/structure/
excerpt:
sidebar:
  nav: docs
---

For consistency, Minimal Mistake's folder and file structure tries to remain close to a *default* Jekyll site. There's nothing clever here to be found :wink:.

```bash
minimal-mistakes
├── _data                      # data files for customizing the theme
|  ├── navigations.yml         # main navigation links
|  └── ui-text.yml             # text used through out the theme's UI
├── _includes
|  ├── analytics-providers     # snippets for analytics (Google and custom)
|  ├── comments-providers      # snippets for comments (Disqus, Facebook, Google+, and custom)
|  ├── footer                  # custom snippets to add to site footer
|  ├── head                    # custom snippets to add to site head
|  ├── base_path               # site.url + site.baseurl shortcut
|  ├── feature_row             # feature row helper
|  ├── gallery                 # image gallery helper
|  ├── group-by-array          # group by array helper for index listings
|  ├── nav_list                # navigation list helper
|  ├── toc                     # Markdown table of contents helper
|  └── ...
├── _layouts
|  ├── archive-taxonomy.html   # tag/category archive for Jekyll Archives plugin
|  ├── archive.html            # archive listing documents in an array
|  ├── compress.html           # compresses HTML in pure Liquid
|  ├── default.html            # base for all other layouts
|  ├── single.html             # single document (post/page/etc)
|  └── splash.html             # splash page
├── assets
|  ├── _scss                   # stylesheet source in SCSS
|  |  ├── vendor               # vendor SCSS partials
|  |  ├── main.scss            # all SCSS partials are imported here
|  |  └── ...                  # SCSS partials
|  ├── css
|  |  └── main.css             # optimized stylesheet for the theme
|  ├── fonts
|  |  └── fontawesome-webfont  # Font Awesome webfonts
|  ├── js
|  |  ├── plugins              # jQuery plugins
|  |  ├── vendor               # vendor scripts
|  |  ├── _main.js             # scripts to be loaded after jQuery and plugins
|  |  └── main.min.js          # optimized and concatenated script file for the theme
├── images                     # image assets for posts/pages/collections/etc.
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── Gemfile.lock               # gem file dependencies
├── index.html                 # paginated home page showing recent posts
└── package.json               # NPM build scripts
```