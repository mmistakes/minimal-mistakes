---
layout: archive
title: "Blog"
permalink: /blog/
author_profile: true
---

This is a blog.
{% for post in site.posts %}
  {% include archive-single.html post=post %}
{% endfor %}
