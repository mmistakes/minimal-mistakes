---
title: "Installation"
permalink: /docs/installation/
excerpt: "Instructions for installing the theme for new and existing Jekyll based sites."
modified: 2016-05-16T10:07:40-04:00
---

{% include base_path %}

## Install the Theme

There are several ways to install the theme:

**1.** For a **new site**, fork the Minimal Mistakes repo on GitHub. If you plan on hosting your site with GitHub Pages follow the steps outlined in the [*Quick-Start Guide*]({{ base_path }}/docs/quick-start-guide/).

**2.** For an **existing site** you have some more work ahead of you. What I suggest is to fork and rename the theme's repo as before, then clone it locally by running `git clone https://github.com/USERNAME/REPONAME.git` --- replacing **USERNAME** and **REPONAME** with your own.

<figure>
  <img src="{{ base_path }}/images/mm-github-copy-repo-url.jpg" alt="copy GitHub repo URL">
  <figcaption>Tap the copy to clipboard button (outlined in red above) to grab your GitHub repo's path.</figcaption>
</figure>

**3.** And for those who don't want to mess with Git, you can download the theme as a ZIP file to work with locally.

[<i class="fa fa-download"></i> Download Minimal Mistakes Theme](https://github.com/mmistakes/minimal-mistakes/archive/master.zip){: .btn .btn--success}

**ProTip:** Be sure to [delete](https://github.com/blog/1377-create-and-delete-branches) the `gh-pages` branch if you forked Minimal Mistakes. This branch contains the documentation and demo site for the theme and you probably don't want that showing up in your repo.
{: .notice--info}

---

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

## Install Dependencies

If this is your first time using Jekyll be sure to read through the [official documentation](https://jekyllrb.com/docs/home/) before jumping in. This guide assumes you have Ruby v2 installed and a basic understanding of how Jekyll works.

To keep your sanity and better manage dependencies I strongly urge you to [install Bundler](http://bundler.io/) with `gem install bundler` and use the included [`Gemfile`]({{ site.gh_repo }}/blob/master/Gemfile). The theme's Gemfile includes the `github-pages` gem to maintain a local Jekyll environment in sync with GitHub Pages.

If you're not planning on hosting with GitHub Pages and want to leverage features found in the latest version of Jekyll, replace `gem "github-pages"` with `gem "jekyll"` in your `Gemfile`. In either case run the following:

```bash
$ bundle install
```

**Note:** The [GitHub Pages gem](https://github.com/github/pages-gem) installs additional dependencies that need to be added to your `Gemfile` if you replace `gem "github-pages"` with `gem "jekyll"`. To do this add the following gems and then run `bundle install`.
{: .notice--warning}

```ruby
source "https://rubygems.org"

gem "jekyll"
gem "jekyll-paginate"
gem "jekyll-sitemap"
gem "jekyll-gist"
gem "jekyll-feed"
gem "jemoji"
gem "wdm", "~> 0.1.0" if Gem.win_platform?
```

<figure>
  <img src="{{ base_path }}/images/mm-bundle-install.gif" alt="bundle install in Terminal window">
</figure>

Depending on what gems you already have installed you may have to run `bundle update` to clear up any dependency issues. Bundler is usually pretty good at letting you know what gems need updating or have issues installing, to further investigate.

When using Bundler to manage gems you'll want to run Jekyll using `bundle exec jekyll serve` and `bundle exec jekyll build`.

Doing so executes the gem versions specified in `Gemfile.lock`. Sure you can test your luck with a naked `jekyll serve`, but I wouldn't suggest it. A lot of Jekyll errors originate from outdated or conflicting gems fighting with each other. So do yourself a favor and just use Bundler.