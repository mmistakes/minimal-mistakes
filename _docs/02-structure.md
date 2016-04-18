---
title: "Structure"
permalink: /docs/structure/
excerpt: "How the theme is organized and what all of the files are for."
modified: 2016-04-13T15:54:02-04:00
---

Nothing clever here :wink:. Layouts, data files, and includes are all placed in their default locations. Stylesheets and scripts in `assets`, and a few development related files in the project's root directory.

```bash
minimal-mistakes
├── _data                      # data files for customizing the theme
|  ├── navigations.yml         # main navigation links
|  └── ui-text.yml             # text used throughout the theme's UI
├── _includes
|  ├── analytics-providers     # snippets for analytics (Google and custom)
|  ├── comments-providers      # snippets for comments (Disqus, Facebook, Google+, and custom)
|  ├── footer                  # custom snippets to add to site footer
|  ├── head                    # custom snippets to add to site head
|  ├── base_path               # site.url + site.baseurl shortcut
|  ├── feature_row             # feature row helper
|  ├── gallery                 # image gallery helper
|  ├── group-by-array          # group by array helper for archives
|  ├── nav_list                # navigation list helper
|  ├── toc                     # table of contents helper
|  └── ...
├── _layouts
|  ├── archive-taxonomy.html   # tag/category archive for Jekyll Archives plugin
|  ├── archive.html            # archive listing documents in an array
|  ├── compress.html           # compresses HTML in pure Liquid
|  ├── default.html            # base for all other layouts
|  ├── single.html             # single document (post/page/etc)
|  └── splash.html             # splash page
├── assets
|  ├── _scss                   # stylesheet source files
|  |  ├── vendor               # vendor SCSS partials
|  |  ├── main.scss            # imports all SCSS partials
|  |  └── ...                  # theme SCSS partials
|  ├── css
|  |  └── main.css             # optimized stylesheet loaded in <head>
|  ├── fonts
|  |  └── fontawesome-webfont  # Font Awesome webfonts
|  ├── js
|  |  ├── plugins              # jQuery plugins
|  |  ├── vendor               # vendor scripts
|  |  ├── _main.js             # plugin settings and other scripts to load after jQuery
|  |  └── main.min.js          # optimized and concatenated script file loaded before </body>
├── images                     # image assets for posts/pages/collections/etc.
├── _config.yml                # site configuration
├── Gemfile                    # gem file dependencies
├── Gemfile.lock               # gem file dependencies
├── index.html                 # paginated home page showing recent posts
└── package.json               # NPM build scripts
```