---
title: "BLOG"
layout: archive
permalink: /categories/BLOG
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.BLOG %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}