---
title: "Effective C++ Programming"
layout: archive
permalink: /categories/effectcpp
author_profile: false
sidebar:
  nav: "mainMenu"
---

{% assign posts = site.categories.effectcpp %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}