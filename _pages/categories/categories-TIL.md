---
layout: archive
permalink: categories/til
title: "Today I Learned"

author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.til %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}