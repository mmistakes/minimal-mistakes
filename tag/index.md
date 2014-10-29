---
layout: article
title: "Tag Index"
modified:
excerpt: "An archive of pages sorted by tag name."
share: false  
---

### An archive of pages sorted by tag.

<ul class="tag-box">
{% assign tags_list = site.tags %}  
  {% if tags_list.first[0] == null %}
    {% for tag in tags_list %}
      <li><a href="{{ site.url }}/tag/{{ tag | replace:' ','-' | downcase }}/">{{ tag }} <span>{{ site.tags[tag].size }}</span></a></li>
    {% endfor %}
  {% else %}
    {% for tag in tags_list %}
      <li><a href="{{ site.url }}/tag/{{ tag[0] | replace:' ','-' | downcase }}/">{{ tag[0] }} <span>{{ tag[1].size }}</span></a></li>
    {% endfor %}
  {% endif %}
{% assign tags_list = nil %}
</ul>
