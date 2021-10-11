---
title: "Essay"
layout: archive
permalink: categories/essay
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.Essay %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}