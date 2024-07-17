---
title: Getting a Blog running on Github with Jekyll
date: 2017-02-27T20:00:00+00:00
author: edgriebel
permalink: /first-jekyll/
tags:
   - blogging
   - jekyll
   - ruby
   - ubuntu
---
# Overall thoughts
{:right: style="float: right" width="250px"}
![jekyll](../wp-content/uploads/2017/jekyll.png){:width="250px"}\\
*With special Ruby Powers!*
{:right}
Jekyll is complicated! I had a very hard time converting an existing Wordpress
blog to Jekyll. It took 15-20 hours because of futzing with themes, 
working around firewalls, false starts with running Jekyll in Windows, etc.<!--more--> 

I'm still not happy with the theme.
Theming in Jekyll is way harder than in Wordpress. Wordpress is click-click to change
to a new theme and even just a single click to preview. The way with Jekyll is
to:
1. clone someone else's github repo with a style you like
2. copy `_posts` directory into the clone
3. copy static/asset content to the clone
4. figure out what layout they use in their posts and pages and change appropriately
5. run `jekyll serve` multiple times until all bugs are exorcised
6. Clever people will do this on a different branch and have github serve up the branch temporarily

Instead of changing every post, one can make an alias, if you use layout "mypost", create `_layouts/mypost.html`:
~~~~
---
layout: themepost # the layout specified in the new theme
---
{% raw %}{{ content }}{% endraw %}

~~~~

When there are any errors in the numerous cookbook-style blogs about how to convert,
there is a lot to know about Ruby, Jekyll, `bundle`, `Gemfile`s, RubyGems, etc.
to get all the moving parts working.

Jekyll does not work well with Windows. Most of the blogs say this, and I agree, _do not use windows_
for Jekyll. The toolchain just doesn't work well for anything more complicated than the
default `minima` theme. 
Things went much smoother when I set up a linux vm in VirtualBox on my windows box,
but there were still some gotchas when getting github previews working.

# Exporting from existing wordpress blog
This was tons of trouble. It seems that the [wordpress exporter] I used
would export the post content and images, etc. but doesn't preserve
the theme. When the `_posts` contents copied into a newly-initialized
`jekyll new testblog`, there are errors about specified layouts not found.
A barely acceptable solution is to create a new jekyll blog and then copy Gemfile,
make changes in `_config.yml`, and futz with stuff to get `jekyll build` to complete.
Some of the problems could also have been because of trying to use Windows. **DO NOT USE WINDOWS!!**


# Steps to get Jekyll working with Github themes (a.k.a. github "preview") on Ubuntu MATE
**Do not try to use Windows until you _completely_ understand Jekyll!!!**

## Install requisite libraries to preview github-themed pages
~~~~ bash
sudo apt-get install ruby
sudo apt-get install libz-dev
sudo apt-get install g++
sudo gem install jekyll
# change perms so gem doesn't have to be run with sudo
sudo chmod -R a+w /var/lib/gems
gem install bundler
gem install jekyll-feed
gem install jekyll-instant
gem install minima # originally used the minima theme
gem install nokogiri
gem install therubyracer # For coffeescript used by github-pages build
# need to remove newer version of Jekyll as github pages supports older version
gem uninstall jekyll 
# choose newer version from list
~~~~

At some point this could probably be turned into a [Vagrant](https://www.vagrantup.com/) vm-based dev env.

## Troubleshooting Notes
`Gemfile.lock` is required to be in the repo. 
It is NOT a lockfile to prevent multiple edits as I initially assumed, 
but a listing of all the [gem] [versions] used the last time `gem update` was run.

Most of the github themes don't list an individual page's 
title at the top of the page. The `default.html` page was copied from the
theme's `_layout` directory and then `<h2>{{ page.title }}</h2>` was added
inside the page. A title was similarly added to `<h2 class='title'>` block
as almost every stock github-pages theme uses the site's title.

`gem "therubyracer"` was required in `Gemfile` due to error about needing a
javascript engine. Node.js would have been usable as well if installed.

Need to fix `gem "jekyll", "~> 3.3"` because this is the version that 
Github uses and `github-pages` requires this version.

_NOTE_ that jekyll __does not__ run on Windows with this arrangement even if 
Ruby and Jekyll are installed due to therubyracer and native libraries required
by github-pages.

# Update for new environment 2018-11-01:
~~~~ bash
# install dependencies that will be needed by ruby-build
sudo apt install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev

# use rbenv
sudo apt install rbenv

# Add rbenv to .bashrc
rbenv init 2>> ~/.bashrc
. ~/.bashrc

# verify setup (repeatedly to fix errors)
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash

sudo apt install ruby-build

rbenv install --list
# old versions, so we need to update versions
git clone https://github.com/rbenv/rbenv-default-gems.git ~/.rbenv/plugins/rbenv-default-gems
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# install good ruby
rbenv install 2.5.3

# still getting /var/lib/gems errors:
gem install bundler
# wrong directory:
gem env home

# Install plugin that sets it to local dirs
git clone https://github.com/jf/rbenv-gemset.git $HOME/.rbenv/plugins/rbenv-gemset

# set up paths again
. ~/.bashrc
# verify..
gem env home

# installs all the gems specified in Gemfile
bundle install

gem install jekyll

gem update jekyll

bundle update

~~~~

[jekyll]: https://jekyllrb.com/
[wordpress exporter]: https://wordpress.org/plugins/jekyll-exporter/
[gem]: http://stackoverflow.com/a/7518215/3889
[versions]: http://stackoverflow.com/a/21527203/3889
