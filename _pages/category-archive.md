---
title: "Posts by Category"
layout: categories
permalink: /categories/
author_profile: true
---
  {% for cat in site.categories %}

  {% for post in cat[1] %}
  *   [{{post.title}}]({{post.url}})
  {% endfor %}
  {% endfor %}
