---
title: Frequently Asked Questions
classes: wide
permalink: "/docs/faq/"
sidebar:
  nav: docs
last_modified_at: '2024-04-24T00:51:32+08:00'
toc: false
---

This page is still under construction. Meanwhile, check out existing [issues](https://github.com/mmistakes/minimal-mistakes/issues) and [discussions](https://github.com/mmistakes/minimal-mistakes/discussions) to see if your question has already been asked before.
{: .notice--primary }

- `'require': cannot load such file -- webrick (LoadError)`
  
  This error occurs when you run `jekyll serve` on Ruby 3.0+. 

  Ruby 3.0 no longer comes with Webrick by default. To fix this, add `gem "webrick"` to your `Gemfile` and run `bundle install`. See [jekyll/jekyll#8523](https://github.com/jekyll/jekyll/issues/8523)
