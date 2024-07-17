---
title: "New Theme: Minimal Mistakes"
tags:
  - Jekyll
---
I'm moving to a new theme, [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/).

I don't like the default github themes because they're missing basic things like sidebars and displaying post titles.
These _can_ be added (because it's all code nothing is impossible), but it requires modifying a theme's \_layout and locking you into a theme, but theme flexibility is the point of using a [built-in theme](https://pages.github.com/themes/).

Github has recently-ish (11/2017) added [shared themes a.k.a remote themes](https://blog.github.com/2017-11-29-use-any-theme-with-github-pages/), allowing specially-built [themes](https://github.com/topics/jekyll-theme) stored in github to be used by reference in your `_config.yaml`.

I chose Minimal Mistakes because it looked good and didn't need any customization in `_layouts` (none in my case) and minimal configuration.

Some of the steps I needed to do to incorporate it:
* Changes to `_config.yml`
  * added required new plugins
  * defaults for posts
  * Added sidebar links and avatar that links to my Gravatar page
  * Declarations for pagination, breadcrumbs, 
  * Include for `_pages` dir to get it processed
* created `_pages/category-archive.md` and `_pages/tags-archive.md` to generate pages with tags and categories
* removed `layout: post` from front matter in every post (now defaulted in `_config.yml`)
* Added a lot of defaults for posts and pages in `_config.yml`
* Removed all customizations from `_layouts`
* Moved `about.md` to `_pages` and fixed the permalink in the file
* Created `_data/navigation.yml` to set up a menubar
* Changed `index.html` to have "important" front matter, the key being `layout: home`. Until I added this the homepage didn't work.
* Add a header image and configure header code in `index.html` front matter

It looks like a lot of steps, but was a good learning experience for Jekyll and a lot of these steps were because I was porting from another theme.

I will be labeling the merge to `master` branch so I can easily find the changes, but for now all changes are made on the 
[ branch](https://github.com/edgriebel/edgriebel.github.io/tree/minimal-mistakes) `minimal-mistakes`.
