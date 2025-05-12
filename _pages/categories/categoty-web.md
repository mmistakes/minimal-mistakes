---
title: "WEB"
layout: archive
permalink: categories/web
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.web %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}