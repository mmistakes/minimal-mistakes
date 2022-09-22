---
layout: page
title: Collections
permalink: /my_collections/
---

These are my courses:

<ol>
{% for course in site.my_collections %}
  <li><a href="{{course.url}}">{{course.title}}</a></li>
{% endfor %}
</ol>
