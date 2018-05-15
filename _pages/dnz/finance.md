---
layout: single
title: "Фінансові звіти"
permalink: /dnz/finance/
sidebar:
  nav: "dnz-menu"
---

<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Фінансовий звіт ДНЗ" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>