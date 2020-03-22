---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
#layout: post
permalink: /categories/
---


  {% for pages in site.pages %}
    {% if pages.categories %}
      {{pages}}

  *   [{{pages.title}}]({{pages.url}})

    {% endif %}
  {% endfor %}
