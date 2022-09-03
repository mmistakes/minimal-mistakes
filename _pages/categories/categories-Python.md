---
title: "Python"
layout: archive
permalink: categories/python


author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.python %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}
