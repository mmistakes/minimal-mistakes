---
title: "Category: Docs"
layout: archive
permalink: /docs
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% if site.categories.docs %}
{% assign posts = site.categories.docs | sort: 'order' %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endif %}
