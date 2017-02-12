---
title: "Installation"
permalink: /docs/installation/
excerpt:
sidebar:
  nav: docs
---

{% include base_path %}
{% include toc %}

## Install the Theme

There are several ways to install the theme. 

The easiest being: fork the Minimal Mistakes repo on GitHub. If you plan on hosting your site with GitHub Pages then following the steps outlined in the **Quick-Start Guide**.

For an existing site you have some more work ahead of you. What I suggest is to fork and rename the theme as before, then clone it by running `git clone https://github.com/USERNAME/REPONAME.git` --- replacing **USERNAME** and **REPONAME** with yours.

**<< insert screenshot showing where to copy the repo's URL on GitHub >>**

Then depending on how much existing content you're moving over begin the process of copying and converting everything. In most cases you simply need to update the settings in `_config.yml` to your liking and set the correct `layout` in the YAML Front Matter.

**Converting Existing Content**: Be sure to read through the "Working with Posts/Pages/Collections" documentation to learn about all the options available to you. Minimal Mistakes has been designed to be flexible, with numerous settings for toggling features on/off.
{: .notice--info}

If for some chance you don't want to mess with Git you can also download the theme as a ZIP file and work with it locally that way.

[Download Minimal Mistakes Theme](https://github.com/mmistakes/minimal-mistakes/archive/master.zip){: .btn .btn--success}

## Install Dependencies

If this is your first time using Jekyll be sure to read through the [official documentation](https://jekyllrb.com/docs/home/) to familiarize yourself. This guide assumes you've done that and have Ruby v2 installed.

To keep your sanity and better manage dependencies I strongly urge you to [install Bundler](http://bundler.io/) with `gem install bundler` and use the included [`Gemfile`](https://github.com/mmistakes/minimal-mistakes/blob/master/Gemfile). Minimal Mistake's Gemfile defaults to the `github-pages` gem to maintain a local Jekyll environment in sync with GitHub Pages.

If you're not planning on hosting with GitHub Pages and want to leverage features found in the latest version of Jekyll replace `gem "github-pages"` with `gem "jekyll"` in `Gemfile` and then run:

```bash
$ bundle install
```

**<< insert screenshot of Terminal running bundle install >>**

Depending on what gems you already have installed you may have to run `bundle update` to clear up any dependency issues. Bundler is usually pretty good at letting you know what the issue is to work through them.