---
title: "Upgrading"
permalink: /docs/upgrading/
excerpt: "Instructions and suggestions for upgrading the theme."
last_modified_at: 2016-11-03T10:16:34-04:00
---

If you're using the Ruby Gem version of the theme upgrading is fairly painless.

Simply run `bundle update` if you're using Bundler (have a `Gemfile`) or `gem update minimal-mistakes-jekyll` if you're not.

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
