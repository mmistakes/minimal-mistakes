---
title: "ALGORITHM"
layout: archive
categories: ALGORITHM
permalink: /category/ALGORITHM/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: ALGORITHM
---

{% assign posts = site.categories.ALGORITHM %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}