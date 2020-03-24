---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
#layout: post
permalink: /categories/
---
![Look](../assets/images/figlet_categories.png)
## Below you will find all my main categories

  {% for pages in site.pages %}
    {% if pages.categories %}
      {% if pages.categories.size == 1 %}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl }})

      {% endif %}
    {% endif %}
  {% endfor %}


## Below you will find all my sub categories

  {% for pages in site.pages %}
    {% if pages.categories %}
      {% if pages.categories.size > 1 %}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl }})

      {% endif %}
    {% endif %}
  {% endfor %}
