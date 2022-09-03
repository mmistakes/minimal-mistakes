---
title: "Today I Learned"
layout: archive
permalink: /til


author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.til %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}