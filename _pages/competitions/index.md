---
layout: archive
title: "Posts by Collection"
permalink: /competitions/
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Змагання" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
