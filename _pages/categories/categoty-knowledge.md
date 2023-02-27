---
layout: archive
permalink: /categories/knowledge/
title: "IT Knowledge"
author_profile: true
sidebar_main: true
search : false
sidebar:
    nav: "docs"
---
{% assign posts = site.categories.knowledge | sort:"date" | reverse %}

{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}