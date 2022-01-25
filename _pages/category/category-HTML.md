---
title: "HTML"
layout: archive
categories: HTML
permalink: /category/HTML/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: HTML
---

{% assign posts = site.categories.HTML %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}