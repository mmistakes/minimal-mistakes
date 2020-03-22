---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
#layout: post
permalink: /categories/
---
![Look](../assets/images/figlet_categories.png)
## Below you will find all my categories

  {% for pages in site.pages %}
    {% if pages.categories %}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl }})

    {% endif %}
  {% endfor %}
