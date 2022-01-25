---
title: "BLOG"
layout: category
permalink: /category/BLOG
author_profile: true
sidebar:
    nav: "docs"
taxonomy: BLOG
---



{% assign posts = site.category.BLOG %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}