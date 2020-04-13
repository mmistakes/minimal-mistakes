---
title: "Posts by Category"
author: "Abdul"
layout: single
excerpt: "Categories Include"
permalink: /categories/
---
![Look](/assets/images/figlet_categories.png)
# All of the Main categories

  {% for pages in site.pages %}
    {% if pages.categories %}
      {% if pages.categories.size == 1 %}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl }})

      {% endif %}
    {% endif %}
  {% endfor %}


# All of the Sub-Categories

  {% for pages in site.pages %}
    {% if pages.categories %}
      {% if pages.categories.size > 1 %}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl }})

      {% endif %}
    {% endif %}
  {% endfor %}
