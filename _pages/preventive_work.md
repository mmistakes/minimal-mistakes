---
layout: single
permalink: /preventive_work/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Профілактична робота" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
