---
layout: archive
permalink: til
title: "Today I Learned"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.til %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}