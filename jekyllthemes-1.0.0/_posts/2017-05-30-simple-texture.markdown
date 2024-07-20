---
layout: post
title: Simple Texture
date: 2017-05-30 00:00:00
homepage: https://github.com/yizeng/jekyll-theme-simple-texture
download: https://github.com/yizeng/jekyll-theme-simple-texture/archive/master.zip
demo: https://yizeng.github.io/jekyll-theme-simple-texture/
author: Yi Zeng
thumbnail: simple-texture.png
license: MIT License
license_link: https://github.com/yizeng/jekyll-theme-simple-texture/blob/master/LICENSE
---

**Simple Texture** is a gem-based responsive simple texture styled
Jekyll theme for [Jekyll][Jekyll] 3.3 or above, which can also be
forked as a boilerplate for older versions of Jekyll.

- Starter-kit demo: <https://yizeng.github.io/jekyll-theme-simple-texture/>
- My own personal blog: <http://yizeng.me/blog/>

![Screenshot - Home](https://github.com/yizeng/jekyll-theme-simple-texture/raw/master/assets/images/screenshots/home.png)

![Screenshot - Blog](https://github.com/yizeng/jekyll-theme-simple-texture/raw/master/assets/images/screenshots/post.png)

## Installation

### As a Jekyll theme gem (Jekyll >= 3.3)

If you are creating a new website or blog,
please follow the commands below first:

1. Install Jekyll and [Bunlder][Bunlder]

       gem install jekyll bundler

2. Create a new Jekyll app

       jekyll new jekyllapp

3. Enter the new directory

       cd jekyllapp

Then for newly created or existing Jekyll app,

1. Install Bundler if haven't done so.

       gem install bundler

2. Remove Jekyll auto-generated default pages `about.md` and `index.md`.

3. Download the respository [here](https://github.com/yizeng/jekyll-theme-simple-texture/archive/master.zip)
and locate `starter-kit` folder,
or download `starter-kit` folder directly [here](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/yizeng/jekyll-theme-simple-texture/tree/master/starter-kit).

4. Put everything in the `starter-kit` in the root directory,
i.e. `jekyllapp` in this example.

5. Run `bundle install` to install dependencies.

6. Run Jekyll with `bundle exec jekyll serve`

7. Hack away at <http://localhost:4000>!

### As a fork

1. Fork the repo [here](https://github.com/yizeng/jekyll-theme-simple-texture#fork-destination-box)

2. Clone the repo just forked.

       git clone git@github.com:[YOUR_USERNAME]/jekyll-theme-simple-texture.git

3. Delete `starter-kit` folder and
`jekyll-theme-simple-texture.gemspec` file (they're for people
installing via gem)

4. Install Bundler if haven't done so.

       gem install bundler

5. Update the `Gemfile` to look like the following:

   ```ruby
   source "https://rubygems.org"

   gem 'jekyll'

   group :jekyll_plugins do
     gem 'jekyll-feed'
     gem 'jekyll-redirect-from'
     gem 'jekyll-seo-tag'
     gem 'jekyll-sitemap'
   end
   ```

6. Run `bundle install` to install dependencies.

7. Run Jekyll with `bundle exec jekyll serve`

8. Hack away at <http://localhost:4000>!

[Jekyll]: http://jekyllrb.com/
[Bunlder]: http://bundler.io/
