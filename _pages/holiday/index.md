---
layout: archive
permalink: /holiday/
title: "План заходів під час осінніх канікул по НВК № 125 2017-2018 н.р."
sidebar:
  nav: "sidebar-menu"
---

<ul>
  {% assign pages = site.pages | reverse %}
  {% for page in pages | reverse %}
    {% if page.categories contains "Канікули" %}
      <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endif %}
  {% endfor %}
</ul>