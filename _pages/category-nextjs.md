---
title: "Category: NextJS"
layout: archive
permalink: /nextjs
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% assign posts = site.categories.nextjs %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
