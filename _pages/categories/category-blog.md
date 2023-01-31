---
title: 'Blog Dev'
layout: archive
permalink: /categories/blog
sidebar:
  nav: 'sidebar-category'
---

{% assign posts = site.categories.['Blog Dev'] %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
