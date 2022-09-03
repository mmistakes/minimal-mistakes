---
title: "Today I Learned"
layout: archive
permalink: /TIL


author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.TIL %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}