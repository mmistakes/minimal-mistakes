---
layout: archive
permalink: categories/error&bug
title: "Error&Bug"

author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.error&bug %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}  