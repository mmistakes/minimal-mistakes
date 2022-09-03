---
layout: archive
permalink: categories/cpp
title: "C++"

author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.cpp %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}