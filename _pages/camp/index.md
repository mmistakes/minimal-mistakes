---
layout: archive
title: "Літній табір 'Зернятко'"
permalink: /camp/
header:
  image: /assets/images/pages/camp/header.jpg
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Табір Зернятко" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
