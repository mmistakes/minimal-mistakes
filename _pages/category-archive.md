---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
permalink: /categories/
---

Test 2

  {% for pages in site.pages %}
    {% if pages.categories %}
      {{pages.url}}
      
  *   [{{pages.title}}]({{pages.url}})

    {% endif %}
  {% endfor %}
