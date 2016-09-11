---
layout: archive
permalink: /reads/
title: "Book Notes"
modified: 2016-09-10T16:38:17-05:00
excerpt: "A selection of things I've read."
ads: false
fullwidth: true
tiles: true
feature:
  visible: true
  headline: "Featured Reads"
  category: reads
---

{% for post in site.categories.reads %}
  {% if post.featured != true %}
  {% include archive__item.html %}
  {% endif %}
{% endfor %}
