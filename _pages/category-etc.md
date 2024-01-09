---
title: "Category: ETC"
layout: archive
permalink: /etc
breadcrumbs: false
author_profile: true
sidebar:
  nav: sidebar-category
---

{% if site.categories.etc %}
{% assign posts = site.categories.etc | sort: 'order' %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endif %}
