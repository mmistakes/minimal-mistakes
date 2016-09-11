---
layout: archive
permalink: /reads/
title: "Book Notes"
date: 2014-06-02T12:26:34-04:00
modified: 2016-02-26T10:36:43-05:00
excerpt: "Thoughts and notes on books I've read."
subtitle: "Thoughts and notes on books I've read."
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
