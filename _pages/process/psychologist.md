---
layout: archive
title: "Сторінка психолога"
permalink: /process/psychologist/
sidebar:
  nav: "sidebar-menu"
---
16 днів проти насильства

<iframe src="https://drive.google.com/file/d/1g6VaeVdTJRALE7qHIUKMBh7pTFgG3uMV/preview" width="640" height="480"></iframe>


<div class="grid__wrapper">
  {% for post in site.posts %}
    {% if post.categories contains "Сторінка психолога" %}
      {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
