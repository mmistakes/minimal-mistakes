---
title: "PROGRAMMERS"
layout: archive
categories: PROGRAMMERS
permalink: /category/PROGRAMMERS/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: PROGRAMMERS
---

{% assign posts = site.categories.PROGRAMMERS %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}