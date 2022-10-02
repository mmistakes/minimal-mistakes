---
layout: archive
permalink: categories/mobile
title: "Mobile"

author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.mobile %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}