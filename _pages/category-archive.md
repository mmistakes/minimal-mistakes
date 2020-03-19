---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
#layout: post
permalink: /categories/
---

  {% for cat in site.categories %}

    {% for pages in site.pages %}
      {% if pages.categories == cat[0] %}

  *   [{{pages.title}}]({{pages.url}})

      {% endif %}
    {% endfor %}

  {% endfor %}
