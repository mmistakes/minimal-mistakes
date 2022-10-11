---
layout: archive
permalink: /categories/coding/
title: "Coding"
author_profile: true
sidebar_main: true
search : false
sidebar:
    nav: "docs"
---
{% assign posts = site.categories.coding | sort:"date" | reverse %}

{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}