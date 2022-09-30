---
title: "개념정리"
layout: archive
permalink: categories/basic
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.basic %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
