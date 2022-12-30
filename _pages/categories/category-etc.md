---
title: "etc"
layout: archive
permalink: categories/etc
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.Python %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}