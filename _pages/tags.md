---
layout: single
title: "Project Tags"
permalink: /tags/
---

{% assign all_tags = site.projects | map: "tags" | compact | flatten | uniq | sort %}

<h2>Tags Used in Projects</h2>
<ul>
  {% for tag in all_tags %}
    <li><a href="#{{ tag | slugify }}">{{ tag }}</a></li>
  {% endfor %}
</ul>

<hr>

{% for tag in all_tags %}
  <h3 id="{{ tag | slugify }}">{{ tag }}</h3>
  <ul>
    {% for project in site.projects %}
      {% if project.tags contains tag %}
        <li><a href="{{ project.url }}">{{ project.title }}</a></li>
      {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
