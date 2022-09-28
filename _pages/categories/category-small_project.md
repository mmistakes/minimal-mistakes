---
layout: archive
permalink: /categories/small_project/
title: "Small Project"
author_profile: true
sidebar_main: true
search : false
sidebar:
    nav: "docs"
---
{% assign posts = site.categories.small_coding %}

{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}