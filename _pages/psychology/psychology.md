---
title: "Psychology"
author: "Abdul"
layout: single
excerpt: "category Psych"
categories: psychology
permalink: /categories/Psychology/
---
## Below are some Psychology Articles
  {% for post in site.categories.psychology %}

  *   [{{post.title}}]({{post.url | prepend:site.baseurl }})
  {% endfor %}

## Below are some Topics within Psychology
  {% for pages in site.pages %}
    {% if pages.url contains page.categories and pages.permalink != page.permalink %}

    {{pages}}

  *   [{{pages.title}}]({{pages.url | prepend:site.baseurl  }})

    {% endif %}
  {% endfor %}
