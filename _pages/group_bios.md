---
layout: single
permalink: /group/bios/
title: "Group Bios"
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
---

## Group Biographies

{% for p in site.pages %}
   {% if p.categories contains "Bio" %}
- [{{ p.title }}]({{ p.url | absolute_url }})
  - <small>{{ p.content | strip_html | truncatewords: 50 }}</small>
   {% endif %}
{% endfor %}
