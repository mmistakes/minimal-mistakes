---
title: "Category: AWS"
layout: archive
permalink: /aws
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% if site.categories.aws %}
{% assign posts = site.categories.aws | sort: 'order' %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endif %}
