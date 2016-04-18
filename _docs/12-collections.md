---
title: "Working with Collections"
permalink: /docs/collections/
excerpt: "Suggestions and Front Matter defaults for working with collections."
modified: 2016-04-13T15:54:02-04:00
---

{% include base_path %}

Collections like posts and pages work as you'd expect. If you're new to them be sure to read [Jekyll's documentation](https://jekyllrb.com/docs/collections/).

The theme has been built with collections in mind and you will find [several examples]({{ base_path }}/collection-archive/) on the demo site ([portfolio]({{ base_path }}/portfolio/), [recipes]({{ base_path }}/recipes/), pets). 

**Collections in the Wild:** This set of documentation is also [built as a collection]({{ site.gh_repo }}/gh-pages/_docs/) if you're looking for a fully fleshed out example to inspect.
{: .notice--info}

---

A popular use case for collections is to build a portfolio section as part of one's personal site. Let's quickly walk through the steps to do that.

**Step 1:** Configure the portfolio collection by adding the following to `_config.yml`.

```yaml
collections:
  portfolio:
    output: true
    permalink: /:collection/:path/
```

These settings essentially say output `index.html` files for each portfolio document in `_portfolio` at `_site/portfolio/<document-filename>/`.

Just like posts and pages you'll probably want to set some defaults for the Front Matter:

```yaml
defaults:
  # _portfolio
  - scope:
      path: ""
      type: portfolio
    values:
      layout: single
      author_profile: false
      share: true
```

And then create portfolio content like [`_portfolio/foo-bar-website.md`]({{ site.gh_repo }}/gh-pages/_portfolio/foo-bar-website.md), to end up with something like this.

![portfolio collection example]({{ base_path }}/images/mm-portfolio-collection-example.jpg)