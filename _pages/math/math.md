---
title: "Math"
author: "Abdul"
layout: single
excerpt: "category math"
categories: math
permalink: /categories/math/
---
## Below are some Mathematical Articles
  {% for post in site.categories.math %}

  *   [{{post.title}}]({{post.url}})
  {% endfor %}

## Below are some Topics within Mathematics
  {% for pages in site.pages %}
    {% if pages.url contains page.categories and pages.permalink != page.permalink %}

  *   [{{pages.title}}]({{pages.url}})

    {% endif %}
  {% endfor %}
