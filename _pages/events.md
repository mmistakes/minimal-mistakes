---
layout: single
permalink: /events/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Заходи" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
