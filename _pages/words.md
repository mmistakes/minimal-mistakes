---
layout: archive
permalink: /words/
title: "Words Written"
date: 2014-06-02T12:26:34-04:00
modified: 2016-02-26T10:36:43-05:00
excerpt: "Basically, a blog."
subtitle: "Basically, a blog."
feature:
  visible: false
  headline: "Featured Words"
  category: words
---

{% for post in site.categories.words %}
  {% if post.featured != true %}
  {% include archive__item.html %}
  {% endif %}
{% endfor %}
