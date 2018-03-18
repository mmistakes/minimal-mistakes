---
layout: single
permalink: /excursions/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Екскурсії" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
