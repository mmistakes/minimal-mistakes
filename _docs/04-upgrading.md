---
title: "Upgrading"
permalink: /docs/upgrading/
excerpt:
sidebar:
  title: "v3.0"
  nav: docs
modified: 2016-04-13T15:54:02-04:00
---

{% include base_path %}

Currently there is no good way of upgrading the theme without doing a bit of manual work. The future looks promising with [**gem based themes**](https://github.com/jekyll/jekyll/pull/4595) on the horizon, but for now here's some suggestions on how handle theme updates.

## Use Git

If you want to get the most out of the Jekyll + GitHub Pages workflow, then you'll need to utilize Git. To pull down theme updates you must first ensure there's an upstream remote. If you forked the Minimal Mistakes repo then you're likely good to go.

To double check, run `git remote -v` and verify that you can fetch from `origin {{ site.gh_repo }}/minimal-mistakes.git`.

To add it you can do the following:

```bash
$ git remote add upstream {{ site.gh_repo }}/minimal-mistakes.git
```

### Pull Down Updates

Now you can pull any commits made to Minimal Mistakes `master` branch with:

```bash
$ git pull upstream master
```

Depending on the amount of customizations you've made after forking, there's likely to be merge conflicts. Work through the files Git lists as having conflicts and you should be all set.

## Update Files Manually

The alternate way of dealing with updates is [downloading the theme]({{ site.gh_repo }}/archive/master.zip) --- replacing your layouts, includes, and assets with the newer ones. To be sure that you don't miss any changes it's probably a good idea to review the [history]({{ site.gh_repo }}/commits/master) to see what's changed since you last forked/cloned the theme.

Here's a quick checklist of the important folders/files you'll want to be mindful of:

* `_layouts`
* `_includes`
* `assets` --- if you customized the stylesheets or added your own scripts make sure you reapply those changes
* `_data\navigation.yml` --- you likely edited this so double check that there were no major structural changes
* `_data\ui-text.yml` --- same as above
* `_config.yml` --- same as above