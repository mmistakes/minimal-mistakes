---
layout: single
permalink: /volunteer/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Волонтерська допомога" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
