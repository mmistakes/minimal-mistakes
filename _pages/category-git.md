---
title: "Category: Git"
layout: archive
permalink: /git
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% if site.categories.git %}
{% assign posts = site.categories.git | sort: 'order' %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endif %}
