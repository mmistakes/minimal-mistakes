---
title: "Category: Daily"
layout: archive
permalink: /daily
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% if site.categories.daily %}
{% assign posts = site.categories.daily | sort: 'order' %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endif %}
