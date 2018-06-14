---
title: 
permalink: /content/
layout: archive
author_profile: true
---

<ul style="list-style-type:none">
  {% for post in site.posts %}
    <li>
      <b><a href="{{ post.url }}">{{ post.title }}</a></b>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>
