---
layout: post
title: "Creating Guthub Page with Jekyll"
excerpt: "First post explaining the existance of this site"
tags: [tutorial, github pages, jekyll]
modified: 2014-10-22
comments: true
---

## The page

In the past 4-5 weeks I have been working on my personal webiste(s). I started off with [Wix](http://www.wix.com), because in my opinion this is the best free website generator for personal purposes, which features an incredible amount of nice themes and gives you a lot of room for creativity. However, I soon realised that one of its disadvantages is its cumbersome approach for blogging. So I switched to [Wordpress](https://wordpress.org), arguably the best solution for blogging. At this point I realised that I do enjoy the "how to ..." learning process much more than I actually want my website to be done. Hence, I started to search for something more challenging, that gives me more freedom rather in the back-end than in the front-end.
<br><br>
So I went on the geeky road and found the [Github Pages](https://pages.github.com), hosted by [Github](http://github.com) and powered by [Jekyll](http://jekyllrb.com/). After several failed attempt, as part of the learning process, I eventually figured how to set up the page, using [Michael Rose's](https://mademistakes.com) [Minimal Mistakes project](http://github.com/mmistakes). I am convinced that this is a great solution for a personal website and a blog too. So, here is a short summary of the project for those who are interested.

## on Github

A huge benefit of GitHub Pages is ease of collaboration. Changes you make in the repository are automatically synced, so if your site’s hosted on GitHub, it’s as up-to-date as your GitHub repository. Plus, you can reach and edit your website through your Git account anytime you want.  
If you are new to Github, you might want learn [how to set up your own Git](https://help.github.com/articles/set-up-git/). If you are unfamiliar with or have significant aversion to code-writing, then Github is not necessarely for you. But if your work / interest involves some sort programming, then you should definitely check it out.

## with Jekyll

On Github you can start building your site from scratch or use one of the pre-made templates. Either way, you have to learn a little bit about Jekyll, starting from the [installation](http://jekyllrb.com/docs/installation/). If you would like to create a new Jekyll site using Minimal Mistakes follow these steps:

1. Fork the [Minimal Mistakes repo](http://github.com/mmistakes/minimal-mistakes/fork).
2. Clone the repo you just forked and rename it according to the [Github Pages guide](https://pages.github.com).
3. [Install Bundler](http://bundler.io) `gem install bundler` and Run `bundle install` to install all dependencies ([Jekyll](http://jekyllrb.com/), [Jekyll-Sitemap](https://github.com/jekyll/jekyll-sitemap), [Octopress](https://github.com/octopress/octopress), etc)
4. Start working on you site by using the guide in the [Minimal Mistakes project](http://github.com/mmistakes).
<br><br>
Note: `the highlighted texts` are console commands for Mac users.

## and Markdown

Jekyll is a fantastic website generator that’s designed for building minimal, static blogs to be hosted on GitHub Pages. It makes content creating and blogging very easy as it automatically creates HTML / XHTML files from Markdown files. Markdown provides you with a a really simple and convenient way to write (and to read) plain text. Learning the language is relatively fast, and you can find great guides too, such as [this one](http://markdown-guide.readthedocs.org/en/latest/) or [this one](https://daringfireball.net/projects/markdown/basics).
