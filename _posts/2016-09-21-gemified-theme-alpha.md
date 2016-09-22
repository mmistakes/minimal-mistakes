---
title:  "Gemified Theme Alpha Release"
categories: 
  - Jekyll
tags:
  - update
---

Jekyll themes distributed as Ruby gems are finally here!

If you're interested in testing out Minimal Mistakes as a gemified theme read on. There is a caveat though:

> Support for all `assets` (not just `_sass` partials) was recently added to Jekyll core, but has yet to be rolled into GitHub Pages. Meaning you can't use Minimal Mistakes as a Ruby gem there just yet. Oh, and Windows users are out of luck for now too. 

Fine with that? Great. Let's continue.

If you're migrating a site already using Minimal Mistakes and haven't customized any of the `_includes`, `_layouts`, or `_sass` partials this should be quick and painless.

**Step 1:** Remove `_includes`, `_layouts`, and `_sass` folders. You won't need these anymore as they're bundled in the theme. If you customized any of these files then leave them alone and remove any that you didn't.

**Step 2:** Update `Gemfile`

Remove `gem "github-pages"` or `gem "jekyll"` and replace with `gem "jekyll", :git => "https://github.com/jekyll/jekyll.git"` to install the latest version of Jekyll which [reads `assets` from a theme](https://github.com/jekyll/jekyll/pull/5364). 

You'll also need to add the pre-release Minimal Mistakes gem: 

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

**Step 3:** Run `bundle install` (or `bundle update` if you're updating an existing repo).

**Step 4:** Add `gem: "minimal-mistakes-jekyll"` to your `_config.yml` file. If you're migrating from an existing Minimal Mistakes site you shouldn't have to change anything else. If it's a new site consult then docs to [properly config](https://mmistakes.github.io/minimal-mistakes/docs/configuration/).

**Please Note:** Images headers, teasers, and galleries need full paths now specified in YAML Front Matter or in `_config.yml`. Instead of just `image: filename.jpg` you'll need to use the full path eg: `image: assets/images/filename.jpg`. The preferred location is now `assets/images` but can be placed elsewhere or external hosted.
{: .notice--warning}

**Step 5:** If this is a new site be sure to add the following files to `_data` and customize as you see fit. There is currently no way of bundling them in with the theme, so be sure to consult the docs on how to properly use both.

- [`_data/ui-text.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml) - UI text [documentation](https://mmistakes.github.io/minimal-mistakes/docs/ui-text/)
- [`_data/navigation.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/navigation.yml) - navigation [documentation](https://mmistakes.github.io/minimal-mistakes/docs/navigation/)

That's it! If all goes well running `bundle exec jekyll serve` should spin-up your site. If you encounter any bumps please file an issue on GitHub and make sure to indicate you're testing the pre-release Ruby gem version.

[File an issue](https://github.com/mmistakes/minimal-mistakes/issues/new){: .btn .btn--info .btn--large}

Thanks!
