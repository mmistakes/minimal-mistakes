---
layout: archive
permalink: cs
title: "CS"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.cs %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}