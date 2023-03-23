---
title: "Spring"
layout: categories
permalink: /categories/spring/
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.spring %}
{% for post in posts %}
{% include archive-single.html type=page.entries_layout %}
{% endfor %}