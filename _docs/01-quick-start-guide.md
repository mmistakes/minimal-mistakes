---
title: "Quick-Start Guide"
permalink: /docs/quick-start-guide/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
modified: 2016-11-03T10:01:43-04:00
redirect_from:
  - /theme-setup/
---

Minimal Mistakes has been developed as a [Jekyll theme gem](http://jekyllrb.com/docs/themes/) for easier use. It is also 100% compatible with GitHub Pages --- just with a more involved installation process.

{% include toc %}

## Installing the Theme

If you're running Jekyll v3.3+ and self-hosting you can quickly install the theme as Ruby gem.
If you're hosting with GitHub Pages you'll have to use the old "repo fork" method or directly copy all of the theme files[^structure] into your site.

[^structure]: See [**Structure** page]({{ "/docs/structure/" | absolute_url }}) for a list of theme files and what they do.

**ProTip:** Be sure to remove `/docs` and `/test` if you forked Minimal Mistakes. These folders contain documentation and test pages for the theme and you probably don't littering up in your repo.
{: .notice--info}

### Ruby Gem Method

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "minimal-mistakes-jekyll"
```

Add this line to your Jekyll site's `_config.yml` file:

```yaml
theme: minimal-mistakes-jekyll
```

Then run Bundler to install the theme gem and dependencies:

```bash
bundle install
```

### GitHub Pages Compatible Method

Fork the [Minimal Mistakes theme](https://github.com/mmistakes/minimal-mistakes/fork), then rename the repo to **USERNAME.github.io** --- replacing **USERNAME** with your GitHub username.

<figure>
  <img src="{{ '/assets/images/mm-theme-fork-repo.png' | absolute_url }}" alt="fork Minimal Mistakes">
</figure>

**Note:** Your Jekyll site should be viewable immediately at <http://USERNAME.github.io>. If it's not, you can force a rebuild by **Customizing Your Site** (see below for more details).
{: .notice--warning}

If you're hosting several Jekyll based sites under the same GitHub username you will have to use Project Pages instead of User Pages. Essentially you rename the repo to something other than **USERNAME.github.io** and create a `gh-pages` branch off of `master`. For more details on how to set things up check [GitHub's documentation](https://help.github.com/articles/user-organization-and-project-pages/).

<figure>
  <img src="{{ '/assets/images/mm-gh-pages.gif' | absolute_url }}" alt="creating a new branch on GitHub">
</figure>

Replace the contents of `Gemfile` found in the root of your Jekyll site with the following:

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jemoji"
end
```

Then run `bundle update` and verify that all gems install properly.

### Remove the Unnecessary

If you forked or downloaded the `minimal-mistakes-jekyll` repo you can safely remove the following folders and files:

- `.editorconfig`
- `.gitattributes`
- `.github`
- `/docs`
- `/test`
- `CHANGELOG.md`
- `minimal-mistakes-jekyll.gemspec`
- `README.md`
- `screenshot-layouts.png`
- `screenshot.png`

## Setup Your Site

Depending on the path you took installing Minimal Mistakes you'll setup things a little differently.

### Starting Fresh

Starting with an empty folder and `Gemfile` you'll need to copy or re-create this [default `_config.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_config.yml) file. For a full explanation of every setting be sure to read the [**Configuration**]({{ "/docs/configuration/" | absolute_url }}) section.

After taking care of Jekyll's configuration file, you'll need to create and edit the following data files.

- [`_data/ui-text.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml) - UI text [documentation]({{ "/docs/ui-text/" | absolute_url }})
- [`_data/navigation.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/navigation.yml) - navigation [documentation]({{ "/docs/navigation/" | absolute_url }})

### Starting from `jekyll new`

Scaffolding out a site with the `jekyll new` command requires you to modify a few files that it creates.

Edit `_config.yml` and create `_data/ui-text.yml` and `_data/navigation.yml` same as above. Then:

- Replace `<site root>/index.md` with a modified [Minimal Mistakes `index.html`](https://github.com/mmistakes/minimal-mistakes/blob/master/index.html). Be sure to enable pagination if using the [`home` layout]({{ "/docs/layouts/#home-page" | absolute_url }}) by adding the necessary lines to **_config.yml**.
- Change `layout: post` in `_posts/0000-00-00-welcome-to-jekyll.markdown` to `layout: single`.
- Remove `about.md`, or at the very least change `layout: page` to `layout: single` and remove references to `icon-github.html` (or [copy to your `_includes`](https://github.com/jekyll/minima/tree/master/_includes) if using it).

### Migrating to Gem Version

If you're migrating a site already using Minimal Mistakes and haven't customized any of the theme files things upgrading will be easier for you.

Start by removing `_includes`, `_layouts`, `_sass`, `assets` folders and all files within. You won't need these anymore as they're bundled with the theme gem.

If you customized any of these files leave them alone, and only remove the untouched ones. If done correctly your modified versions should [override](http://jekyllrb.com/docs/themes/#overriding-theme-defaults) the versions bundled with the theme and be used by Jekyll instead.

#### Update Gemfile

Replace `gem "github-pages` or `gem "jekyll"` with `gem "jekyll", "~> 3.3.0"`. You'll need the latest version of Jekyll[^update-jekyll] for Minimal Mistakes to work and load all of the theme's assets properly, this line forces Bundler to do that.

[^update-jekyll]: You could also run `bundle update jekyll` to update Jekyll.

Add the Minimal Mistakes theme gem: 

```ruby
gem "minimal-mistakes-jekyll"
```

When finished your `Gemfile` should look something like this:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 3.3.0"
gem "minimal-mistakes-jekyll"
```

Then run `bundle update` and add `theme: minimal-mistakes-jekyll` to your `_config.yml`.

**v4 Breaking Change:** Paths for image headers, overlays, teasers, [galleries]({{ "/docs/helpers/#gallery" | absolute_url }}), and [feature rows]({{ "/docs/helpers/#feature-row" | absolute_url }}) have changed and now require a full path. Instead of just `image: filename.jpg` you'll need to use the full path eg: `image: /assets/images/filename.jpg`. The preferred location is now `/assets/images/` but can be placed elsewhere or external hosted. This all applies for image references in `_config.yml` and `author.yml` as well.
{: .notice--danger}

---

That's it! If all goes well running `bundle exec jekyll serve` should spin-up your site.