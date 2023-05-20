---
layout: archive
permalink: /categories/
title: "Category Archive"
author_profile: true
sidebar_main: true
---

카테고리를 클릭하여 관련 게시물을 확인하세요.

{% for category in site.categories %}
  <h2 id="{{ category | first }}">{{ category | first }}</h2>
  <ul>
    {% for post in category.last %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
{% endfor %}