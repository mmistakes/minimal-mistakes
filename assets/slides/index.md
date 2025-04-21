---
layout: default
title: "Slides"
permalink: /slides/
---

## Available Slides

<ul>
{% assign dl_files = site.static_files | where_exp: "f", "f.path contains '/assets/slides/'" %}
{% for f in dl_files %}
  <li>
    <a href="{{ f.path | relative_url }}">
      {{ f.name }}
    </a>
  </li>
{% endfor %}
</ul>
