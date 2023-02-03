---
title: "자기개발"
layout: archive
permalink: categories/Develop
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.Develop %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
