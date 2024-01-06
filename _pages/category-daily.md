---
title: "Category: Daily"
layout: archive
permalink: /daily
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% assign posts = site.categories.daily %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
