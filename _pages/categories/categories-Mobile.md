---
layout: archive
permalink: mobile
title: "Mobile"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.mobile %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}