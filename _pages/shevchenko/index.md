---
layout: archive
title: "Вшанування пам’яті Т. Г. Шевченка"
permalink: /shevchenko/
header:
  image: /assets/images/pages/shevchenko/header.jpg
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Шевченко" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
