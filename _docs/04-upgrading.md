---
title: "Upgrading"
permalink: /docs/upgrading/
excerpt: "Instructions and suggestions for upgrading the theme."
modified: 2016-08-01T09:43:46-04:00
---

{% include base_path %}

Currently there is no good way of upgrading the theme without doing a bit of manual work. The future looks promising now that [**gem based themes**](https://jekyllrb.com/docs/themes/) have landed with Jekyll `v3.2`, but for now here's some suggestions on how to handle updates.

**Gemified Theme**: A future version of Minimal Mistakes will suppor the new Jekyll theme system. A few key features like theme assets (eg. fonts, images, and JavaScript) and support for GitHub Pages are currently missing for this enhancement to happen now. Stay tuned!
{: .notice--info}

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
| `_data/navigation.yml` | Safe to keep. Verify that there were no major structural changes or additions. |
| `_data/ui-text.yml`    | Safe to keep. Verify that there were no major structural changes or additions. |
| `_config.yml`          | Safe to keep. Verify that there were no major structural changes or additions. |
