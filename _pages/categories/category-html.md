---
title: "HTML"
layout: archive
permalink: categories/html
author_profile: true
sidebar_main: true
sidebar:
  nav: 'docs'
---
{% assign posts = site.categories.HTML %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
