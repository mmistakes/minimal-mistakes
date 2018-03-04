---
layout: archive
title: "Наші таланти"
permalink: /talents/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Наші таланти" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
