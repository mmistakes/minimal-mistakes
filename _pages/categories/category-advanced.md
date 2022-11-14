---
title: "advanced"
layout: archive
permalink: /advanced
author_profile: true
sidebar_main: true
sidebar:
    nav: "sidebar-category"
---


{% assign posts = site.categories.advanced %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
