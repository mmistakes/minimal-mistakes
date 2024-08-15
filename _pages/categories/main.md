---
title: "Category"
layout: archive
permalink: /categories/
author_profile: true
types: posts
---

# AI
{% assign posts = site.categories['AI']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}

# 기타
{% assign posts = site.categories['etc']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}
