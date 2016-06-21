---
title: "Upgrading"
permalink: /docs/upgrading/
excerpt: "Instructions and suggestions for upgrading the theme."
modified: 2016-04-27T10:35:00-04:00
---

{% include base_path %}

Currently there is no good way of upgrading the theme without doing a bit of manual work. The future looks promising with [**gem based themes**](https://github.com/jekyll/jekyll/pull/4595) on the horizon, but for now here's some suggestions on how handle theme updates.

## Use Git

If you want to get the most out of the Jekyll + GitHub Pages workflow, then you'll need to utilize Git. To pull down theme updates you must first ensure there's an upstream remote. If you forked the theme's repo then you're likely good to go.

To double check, run `git remote -v` and verify that you can fetch from `origin {{ site.gh_repo }}/minimal-mistakes.git`.

To add it you can do the following:

```bash
$ git remote add upstream https://github.com/mmistakes/minimal-mistakes.git
```

### Pull Down Updates

Now you can pull any commits made to theme's `master` branch with:

```bash
$ git pull upstream master
```

Depending on the amount of customizations you've made after forking, there's likely to be merge conflicts. Work through any conflicting files Git flags, staging the changes you wish to keep, and then commit them.

## Update Files Manually

Another way of dealing with updates is [downloading the theme]({{ site.gh_repo }}/archive/master.zip) --- replacing your layouts, includes, and assets with the newer ones manually. To be sure that you don't miss any changes it's probably a good idea to review the theme's [commit history]({{ site.gh_repo }}/commits/master) to see what's changed since.

Here's a quick checklist of the important folders/files you'll want to be mindful of:

| Name                   |     |
| ----                   | --- |
| `_layouts`             | Replace all. Apply edits if you customized any layouts. |
| `_includes`            | Replace all. Apply edits if you customized any includes. |
| `assets`               | Replace all. Apply edits if you customized stylesheets or scripts. |
| `_data/navigation.yml` | Safe to keep. Verify that there were no major structural changes or additions. |
| `_data/ui-text.yml`    | Safe to keep. Verify that there were no major structural changes or additions. |
| `_config.yml`          | Safe to keep. Verify that there were no major structural changes or additions. |
