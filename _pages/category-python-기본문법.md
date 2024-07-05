---
title: "Python 기본 문법"
layout: archive
permalink: /python-basic/
author_profile: true
sidebar:
    nav:
      - main
---

{% assign posts = site.categories.python-basic %}
{% for post in posts %} 
  {% include archive-single.html type=page.entries_layout %} 
{% endfor %}
