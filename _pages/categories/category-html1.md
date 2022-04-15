---
title: "html"
layout: archive
permalink: categories/html1
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.html1 %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
