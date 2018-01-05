---
title: "Upgrading"
permalink: /docs/upgrading/
excerpt: "Instructions and suggestions for upgrading the theme."
last_modified_at: 2018-01-05T08:23:01-05:00
toc: true
---

If you're using the Ruby Gem or remote theme versions of Minimal Mistakes, upgrading is fairly painless.

To check which version you are currently using, view the source of your built site and you should something similar to:

```
<!--
  Minimal Mistakes Jekyll Theme 4.9.0 by Michael Rose
  Copyright 2013-2018 Michael Rose - mademistakes.com | @mmistakes
  Free for personal and commercial use under the MIT license
  https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE.txt
-->
```

At the top of every `.html` file, `/assets/css/main.css`, and `/assets/js/main.min.js`.

## Ruby Gem

Simply run `bundle update` if you're using Bundler (have a `Gemfile`) or `gem update minimal-mistakes-jekyll` if you're not.

## Remote Theme

When hosting with GitHub Pages you'll need to push up a commit to force a rebuild with the latest [theme release](https://github.com/mmistakes/minimal-mistakes/releases).

An empty commit will get the job done too if you don't have anything to commit at the moment:

```terminal
git commit --allow-empty -m "Force rebuild of site"
```

## Use Git

If you want to get the most out of the Jekyll + GitHub Pages workflow, then you'll need to utilize Git. To pull down theme updates you must first ensure there's an upstream remote. If you forked the theme's repo then you're likely good to go.

To double check, run `git remote -v` and verify that you can fetch from `origin https://github.com/{{ site.repository }}.git`.

To add it you can do the following:

```bash
$ git remote add upstream https://github.com/{{ site.repository }}.git
```

### Pull Down Updates

Now you can pull any commits made to theme's `master` branch with:

```bash
$ git pull upstream master
```

Depending on the amount of customizations you've made after forking, there's likely to be merge conflicts. Work through any conflicting files Git flags, staging the changes you wish to keep, and then commit them.

## Update Files Manually

Another way of dealing with updates is [downloading the theme](https://github.com/{{ site.repository }}/archive/master.zip) --- replacing your layouts, includes, and assets with the newer ones manually. To be sure that you don't miss any changes it's probably a good idea to review the theme's [commit history](https://github.com/{{ site.repository }}/commits/master) to see what's changed since.

Here's a quick checklist of the important folders/files you'll want to be mindful of:

| Name                   |     |
| ----                   | --- |
| `_layouts`             | Replace all. Apply edits if you customized any layouts. |
| `_includes`            | Replace all. Apply edits if you customized any includes. |
| `assets`               | Replace all. Apply edits if you customized stylesheets or scripts. |
| `_sass`                | Replace all. Apply edits if you customized Sass partials. |
| `_data/navigation.yml` | Safe to keep. Verify that there were no major structural changes or additions. |
| `_data/ui-text.yml`    | Safe to keep. Verify that there were no major structural changes or additions. |
| `_config.yml`          | Safe to keep. Verify that there were no major structural changes or additions. |

---

**Note:** If you're not seeing the latest version, be sure to flush browser and CDN caches. Depending on your hosting environment older versions of `/assets/css/main.css`, `/assets/js/main.min.js`, or `*.html` may be cached.
{: .notice--info}