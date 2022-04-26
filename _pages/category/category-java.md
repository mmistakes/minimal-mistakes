---
title: "Java"
layout: archive
permalink: categories/java
author_profile: false
# sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.java %}
{% for post in posts %} {% include archive-single-list.html type=page.entries_layout %} {% endfor %}