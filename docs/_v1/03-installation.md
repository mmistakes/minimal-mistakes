---
title: "Installation"
permalink: /docs/installation/
excerpt: "Instructions for installing the theme for new and existing Jekyll based sites."
last_modified_at: 2019-08-20T21:36:18-04:00
toc: true
---

## Install the theme

**1.** For a **new site**, install the `minimal-mistakes-jekyll` gem, remote theme, or fork the Minimal Mistakes repo on GitHub following the steps outlined in the [*Quick-Start Guide*]({{ "/docs/quick-start-guide/" | relative_url }}).

If you plan to host with GitHub Pages be sure to properly setup [**jekyll-remote-theme**](https://github.com/benbalter/jekyll-remote-theme) as it is required for the theme to work properly. 

**2.** For an **existing site** follow the steps outlined in the [*Quick-Start Guide*]({{ "/docs/quick-start-guide/" | relative_url }}). Then work through the guidelines below for migration and setup.

**3.** For those who'd like to make substantial edits to the theme, download as a ZIP file to customize.

[<i class="fas fa-download"></i> Download Minimal Mistakes Theme](https://github.com/mmistakes/minimal-mistakes/archive/master.zip){: .btn .btn--success}

**ProTip:** Be sure to remove `/docs` and `/test` if you forked or downloaded Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't littering up in your repo.
{: .notice--info}

**Note:** The theme uses the [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) plugin which will need to be installed in your `Gemfile` and added to the `plugins` array of `_config.yml`. Otherwise you'll throw `Unknown tag 'include_cached'` errors at build.
{: .notice--warning}

## Theme migration

To move over any existing content you'll want to copy the contents of your `_posts` folder to the new site. Along with any pages, collections, data files, images, or other assets you may have.

Next you'll need to convert posts and pages to use the proper layouts and settings. In most cases you simply need to update `_config.yml` to your liking and set the correct `layout` in their YAML Front Matter.

[**Front Matter defaults**](https://jekyllrb.com/docs/configuration/#front-matter-defaults) are your friend and I encourage you to leverage them instead of setting a layout and other global options in each post/page's YAML Front Matter.

Posts can be configured to use the `single` layout --- with reading time, comments, social sharing links, and related posts enabled. Adding the following to `_config.yml` will set these defaults for all posts:

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

**Post/Page Settings**: Be sure to read through the "Working with..." documentation to learn about all the options available to you. The theme has been designed to be flexible --- with numerous settings for each.
{: .notice--info}

## Install dependencies

If this is your first time using Jekyll be sure to read through the [official documentation](https://jekyllrb.com/docs/home/) before jumping in. This guide assumes you have Ruby v2 installed and a basic understanding of how Jekyll works.

To keep your sanity and better manage dependencies I strongly urge you to [install Bundler](http://bundler.io/) with `gem install bundler` and use the following `Gemfile`:

```ruby
source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

# gem "github-pages", group: :jekyll_plugins

# To upgrade, run `bundle update`.

gem "jekyll"
gem "minimal-mistakes-jekyll"

# The following plugins are automatically loaded by the theme-gem:
#   gem "jekyll-paginate"
#   gem "jekyll-sitemap"
#   gem "jekyll-gist"
#   gem "jekyll-feed"
#   gem "jekyll-include-cache"
#
# If you have any other plugins, put them here!
group :jekyll_plugins do
end
```

**ProTip:** To be bleeding edge install the latest (unreleased) version of Minimal Mistakes by adding this line to your `Gemfile`: `gem "minimal-mistakes-jekyll", :github => "mmistakes/minimal-mistakes"`.
{: .notice--info}

To maintain a local Jekyll environment in sync with GitHub Pages replace the `gem "jekyll"` line with `gem "github-pages", group: :jekyll_plugins` and run the following:

```bash
$ bundle install
```

**Note:** The [GitHub Pages gem](https://github.com/github/pages-gem) installs additional dependencies that may need to be added to your `Gemfile` if you decide to remove the `gem "github-pages"` eg. `jekyll-paginate`, `jekyll-sitemap`, `jekyll-feed`, `jekyll-include-cache`, etc.
{: .notice--warning}

<figure>
  <img src="{{ '/assets/images/mm-bundle-install.gif' | relative_url }}" alt="bundle install in Terminal window">
</figure>

Depending on what gems you already have installed you may have to run `bundle update` to clear up any dependency issues. Bundler is usually pretty good at letting you know what gems need updating or have issues installing, to further investigate.

When using Bundler to manage gems you'll want to run Jekyll using `bundle exec jekyll serve` and `bundle exec jekyll build`.

Doing so executes the gem versions specified in `Gemfile.lock`. Sure you can test your luck with a naked `jekyll serve`, but I wouldn't suggest it. A lot of Jekyll errors originate from outdated or conflicting gems fighting with each other. So do yourself a favor and just use Bundler.