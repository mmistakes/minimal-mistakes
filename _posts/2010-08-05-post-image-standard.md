---
title: "Post: Image (Standard)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

The preferred way of using images is placing them in the `/images/` directory and referencing them with an absolute path. Prepending the filename with `{% raw %}{{ site.url }}{{ site.baseurl }}/images/{% endraw %}` well make sure your images display properly in feeds and such.

![Unsplash image 9]({{ site.url }}{{ site.baseurl }}/images/unsplash-image-9.jpg)