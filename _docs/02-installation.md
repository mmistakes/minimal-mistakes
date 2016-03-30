---
title: "Installation"
permalink: /docs/installation/
excerpt:
sidebar:
  nav: docs
---

{% include base_path %}
{% include toc %}

Minimal Mistakes has been developed to be 100% compatible with sites hosted on GitHub Pages. To get up and running with a new GitHub repository following these steps.

## Fork Minimal Mistakes

[Fork this repo](https://github.com/mmistakes/minimal-mistakes/fork), then rename it to **_yourgithubusername_.github.io**

Your Jekyll based site should then be viewable at <http://yourgithubusername.github.io> --- if it's not, you can force it to build by adding and publishing your a post (see below).

## Install Dependencies

If this is your first time using Jekyll be sure to read through the [official documentation](https://jekyllrb.com/docs/home/) to familiarize yourself. This guide assumes you've done that and have Ruby v2 installed.

To keep your sanity and better manage dependencies I strongly urge you to [install Bundler](http://bundler.io/) with `gem install bundler` and use the included [`Gemfile`](https://github.com/mmistakes/minimal-mistakes/blob/master/Gemfile).

```bash
$ bundle install
```

Depending on what gems you already have installed you may have to run `bundle update` to clear up any dependency issues. Bundler is usually pretty good at letting you know what the issue is to work through them.

## Customize Your Site

Enter your site name, description, avatar and many other options by editing the _config.yml file. You can easily turn on Google Analytics tracking, Disqus commenting and social icons here too.

Making a change to _config.yml (or any file in your repository) will force GitHub Pages to rebuild your site with jekyll. Your rebuilt site will be viewable a few seconds later at http://yourgithubusername.github.io - if not, give it ten minutes as GitHub suggests and it'll appear soon

There are 3 different ways that you can make changes to your blog's files:

Edit files within your new username.github.io repository in the browser at GitHub.com (shown below).
Use a third party GitHub content editor, like Prose by Development Seed. It's optimized for use with Jekyll making markdown editing, writing drafts, and uploading images really easy.
Clone down your repository and make updates locally, then push them to your GitHub repository.
_config.yml

Step 3) Publish your first blog post

Edit /_posts/2014-3-3-Hello-World.md to publish your first blog post. This Markdown Cheatsheet might come in handy.

First Post

You can add additional posts in the browser on GitHub.com too! Just hit the + icon in /_posts/ to create new content. Just make sure to include the front-matter block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md