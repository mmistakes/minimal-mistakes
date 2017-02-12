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

There are several ways to install the theme:

**1.** For a **new site**, fork the Minimal Mistakes repo on GitHub. If you plan on hosting your site with GitHub Pages follow the steps outlined in the *Quick-Start Guide*.

**2.** For an **existing site** you have some more work ahead of you. What I suggest is to fork and rename the theme's repo as before, then clone it locally by running `git clone https://github.com/USERNAME/REPONAME.git` --- replacing **USERNAME** and **REPONAME** with your own.

<figure>
  <img src="{{ base_path }}/images/mm-github-copy-repo-url.png" alt="copy GitHub repo URL">
  <figcaption>Tap the copy to clipboard button (outlined in red above) to grab your GitHub repo's path.</figcaption>
</figure>

**3.** And for those who don't want to mess with Git, you can download the theme as a ZIP file to work with locally.

[Download Minimal Mistakes Theme](https://github.com/mmistakes/minimal-mistakes/archive/master.zip){: .btn .btn--success}

---

To move over any existing content you'll want to copy the contents of your `_posts` folder to the new site. Along with any pages, collections, data files, images, or other assets.

Next you'll need to convert posts and pages to use the proper layouts and settings. In most cases you simply need to update `_config.yml` to your liking and set the correct `layout` in their YAML Front Matter.

[**Front Matter defaults**](https://jekyllrb.com/docs/configuration/#front-matter-defaults) are your friend and I encourage you to leverage them instead of setting a layout and other global options in each post/page's YAML Front Matter.

With something like this in your `_config.yml` all posts can be assigned the `single` page layout with reading time, comments, social sharing links, and related posts enabled.

```yaml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      read_time: true
      comments: true
      share: true
      related: true
```

**Post/Page Settings**: Be sure to read through the "Working with Posts/Pages/Collections" documentation to learn about all the options available to you. Minimal Mistakes has been designed to be flexible, with numerous settings for toggling features on/off.
{: .notice--info}

## Install Dependencies

If this is your first time using Jekyll be sure to read through the [official documentation](https://jekyllrb.com/docs/home/) to familiarize yourself. This guide assumes you've done that and have Ruby v2 installed.

To keep your sanity and better manage dependencies I strongly urge you to [install Bundler](http://bundler.io/) with `gem install bundler` and use the included [`Gemfile`](https://github.com/mmistakes/minimal-mistakes/blob/master/Gemfile). Minimal Mistake's Gemfile defaults to the `github-pages` gem to maintain a local Jekyll environment in sync with GitHub Pages.

If you're not planning on hosting with GitHub Pages and want to leverage features found in the latest version of Jekyll replace `gem "github-pages"` with `gem "jekyll"` in your `Gemfile` and then run:

```bash
$ bundle install
```

<figure>
  <img src="{{ base_path }}/images/mm-bundle-install.gif" alt="bundle install in Terminal window">
</figure>

Depending on what gems you already have installed you may have to run `bundle update` to clear up any dependency issues. Bundler is usually pretty good at letting you know what the issue is to work through them.

When using Bundler to manage gems you'll want to run Jekyll using `bundle exec jekyll serve` and `bundle exec jekyll build`. Essentially prepending any Jekyll command with `bundle exec`.

Doing so executes the gem versions specified in `Gemfile.lock`. Sure you can go cowboy and test your luck with a naked `jekyll serve`. A lot of Jekyll errors I see can be tracked down to gems fighting with each other. So do yourself a favor and just use Bundler.