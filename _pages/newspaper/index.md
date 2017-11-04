---
layout: archive
title: "Випуски газети 'Шкільна орбіта'"
permalink: /school-newspaper/
header:
  image: /assets/images/pages/school-newspaper/header.jpg
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Газета" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
