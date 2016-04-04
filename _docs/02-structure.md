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
├── _data
|  ├── navigations.yml
|  └── ui-text.yml
├── _includes
|  ├── analytics-providers
|  ├── comments-providers
|  ├── footer
|  ├── head
|  ├── base_path
|  ├── feature-row
|  ├── gallery
|  ├── group-by-array
|  ├── nav_list
|  ├── toc
|  └── ...
├── _layouts
|  ├── archive-taxonomy.html
|  ├── archive.html
|  ├── compress.html
|  ├── default.html
|  ├── single.html
|  └── splash.html
├── assets
|  ├── _scss
|  |  ├── vendor
|  |  ├── main.scss
|  |  └── ...
|  ├── css
|  |  └── main.css
|  ├── fonts
|  |  └── fontawesome-webfont
|  ├── js
|  |  ├── plugins
|  |  ├── vendor
|  |  ├── _main.js
|  |  └── main.min.js
├── assets
├── _config.yml
├── Gemfile
├── Gemfile.lock
├── index.html
└── package.json
```