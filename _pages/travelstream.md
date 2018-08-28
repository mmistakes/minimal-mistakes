---
layout: archive
title: "Travel Stream"
permalink: /travelstream/
author_profile: true
---
{% assign custom_category = 'Travel' %}
{% for post in site.posts limit: 5 %}
  {% if post.category == custom_category %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}