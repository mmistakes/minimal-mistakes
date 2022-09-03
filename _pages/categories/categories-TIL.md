---
title: "Today I Learned"
layout: archive
permalink: /Today-I-Learned


author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.Today-I-Learned %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}