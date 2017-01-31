---
title:  "Gemified Theme -- Alpha Release"
modified: 2016-11-03T11:46:00-04:00
categories: 
  - Jekyll
tags:
  - update
---

Jekyll [themes distributed as Ruby gems](http://jekyllrb.com/docs/themes/) are finally here to make installing and upgrading much easier. Gone are the days of forking a repo just to "install it". Or dealing with merge conflicts when pulling in upstream commits to "upgrade it".

{% include toc title="Getting Started" %}

If you're interested in testing out Minimal Mistakes as a gemified theme read on. There are a few caveats though:

1. Support for a theme `assets` folder was recently [added to Jekyll core](https://github.com/jekyll/jekyll/pull/5364), but has yet to be released or rolled into the `github-pages` gem. Meaning you can't use Minimal Mistakes as a Ruby gem there just yet... locally served or self-hosted installs should be fine if you don't mind using a pre-release version of Jekyll. 
2. Windows users can't currently use themes packaged as gems due to a [bug with file paths](https://github.com/jekyll/jekyll/issues/5192) in Jekyll core. This is being worked on so hopefully a [fix is on the way](https://github.com/jekyll/jekyll/pull/5256) soon.

Fine with all that? Great. Let's continue.

If you're migrating a site already using Minimal Mistakes and haven't customized any of the `_includes`, `_layouts`, `_sass` partials, or `assets` this should be quick and painless.

## Step 1: Remove Theme Files 

Remove `_includes`, `_layouts`, `_sass`, `assets` folders and files within. You won't need these anymore as they're bundled in the theme.

If you customized any of these then leave them alone and only remove the untouched ones. If setup correctly your modified versions should act as [overrides](http://jekyllrb.com/docs/themes/#overriding-theme-defaults) to the versions bundled with the theme.

## Step 2: Update `Gemfile`

In order to test you'll need to install pre-release gems of Jekyll and Minimal Mistakes.

Start by replacing `gem "github-pages"` or `gem "jekyll"` with the following:

```ruby
gem "jekyll", :git => "https://github.com/jekyll/jekyll.git"
```

Then add the pre-release Minimal Mistakes theme gem: 

```ruby
gem "minimal-mistakes-jekyll", :git => "https://github.com/mmistakes/minimal-mistakes.git", :branch => "feature/theme-gem"`
```

When finished your `Gemfile` should look something like this:

```ruby
source "https://rubygems.org"

gem "jekyll", :git => "https://github.com/jekyll/jekyll.git"
gem "minimal-mistakes-jekyll", :git => "https://github.com/mmistakes/minimal-mistakes.git", :branch => "feature/theme-gem"

group :jekyll_plugins do
  # gem "jekyll-archives"
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jemoji"
end
```

## Step 3: Run Bundler

Run `bundle install` (or `bundle update` if you're updating an existing repo) to install the pre-release gems.

## Step 4: Install the Theme

Add `theme: "minimal-mistakes-jekyll"` to your `_config.yml` file.

If you're migrating from an existing Minimal Mistakes site you shouldn't have to change anything else after this. If it's a new site consult then docs to [properly config]({{ "/docs/configuration/" | absolute_url }}).

**Please Note:** Paths for image headers, overlays, teasers, [galleries]({{ "/docs/helpers/#gallery" | absolute_url }}), and [feature rows]({{ "/docs/helpers/#feature-row" | absolute_url }}) have changed and now require a full path. Instead of just `image: filename.jpg` you'll need to use the full path eg: `image: assets/images/filename.jpg`. The preferred location is now `assets/images` but can be placed elsewhere or external hosted. This applies for image references in `_config.yml` and `author.yml`.
{: .notice--danger}

## Step 5: `jekyll new` Tweaks

If this is a new site be sure to add the following files to `_data/` and customize as you see fit. There is currently no way of bundling them in with the theme, so be sure to consult the docs on how to properly use both.

- [`_data/ui-text.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml) - UI text [documentation]({{ "/docs/ui-text/" | absolute_url }})
- [`_data/navigation.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/navigation.yml) - navigation [documentation]({{ "/docs/navigation/" | absolute_url }})

You'll also need to: 

- Replace `<site root>/index.html` with a modified [Minimal Mistakes `index.html`](https://github.com/mmistakes/minimal-mistakes/blob/master/index.html).
- Change `layout: post` in `_posts/0000-00-00-welcome-to-jekyll.markdown` to `layout: single`.
- Remove `about.md`, or at the very least change `layout: page` to `layout: single` and remove references to `icon-github.html` (or [copy to your `_includes`](https://github.com/jekyll/minima/tree/master/_includes) if using).

---

That's it! If all goes well running `bundle exec jekyll serve` should spin-up your site. If you encounter any bumps please file an issue on GitHub and make sure to indicate you're testing the pre-release Ruby gem version.

[File an issue](https://github.com/mmistakes/minimal-mistakes/issues/new){: .btn .btn--info .btn--large}

Thanks!
