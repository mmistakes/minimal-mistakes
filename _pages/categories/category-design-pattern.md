---
title: "디자인패턴"
layout: archive
permalink: categories/design-pattern
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories['Design pattern'] %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
