---
layout: default      # or your preferred layout
title: "Downloads"
permalink: /slides/
---

## Available downloads

<ul>
{% comment %}
  Grab every static file whose path starts with "/assets/downloads/"
{% endcomment %}
{% assign dl_files = site.static_files | where_exp: "f", "f.path contains '/assets/downloads/'" %}
{% for f in dl_files %}
  <li>
    <a href="{{ f.path | relative_url }}">
      {{ f.name }}
    </a>
  </li>
{% endfor %}
</ul>
