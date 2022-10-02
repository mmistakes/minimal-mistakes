---
layout: archive
permalink: categories/problem
title: "problem"

author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.problem %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}