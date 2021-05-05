---
title: "Effective Python 2nd"
layout: archive
permalink: /categories/effectivepy
author_profile: false
sidebar:
  nav: "mainMenu"
---

{% assign posts = site.categories.effectivepy %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}