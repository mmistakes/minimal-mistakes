---
title: "Effective C++ Programming"
layout: archive
permalink: /categories/designpattern
author_profile: false
sidebar:
  nav: "mainMenu"
---

{% assign posts = site.categories.designpattern %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}