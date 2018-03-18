---
layout: single
permalink: /contests/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Акції" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
