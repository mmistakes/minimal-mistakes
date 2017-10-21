---
layout: archive
title: "Новини та заходи, присвячені проведенню АТО в Україні"
permalink: /ato/
header:
  image: /assets/images/pages/ato/header.jpg
sidebar:
  nav: "sidebar-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "ATO" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
