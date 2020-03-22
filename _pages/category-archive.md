---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
#layout: post
permalink: /categories/
---
Page url:
{{page.url}}


  {% for pages in site.pages %}
    {% if pages.categories %}

  *   [{{pages.title}}]({{pages.url}})

    {% endif %}
  {% endfor %}
