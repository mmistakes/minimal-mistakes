---
title: "News"
permalink: /news/
layout: posts
entries_layout: list
---

{% assign posts = site.posts | sort: "date" | reverse %}
{% for post in posts %}
  {% include archive-single.html type="posts" %}
{% endfor %}