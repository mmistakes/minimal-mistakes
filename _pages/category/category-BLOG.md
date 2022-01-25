---
title: "BLOG"
layout: archive
categories: BLOG
permalink: /category/BLOG/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: BLOG
---

{% assign posts = site.categories.BLOG %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}