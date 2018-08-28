---
layout: archive
title: "Tech Stream"
permalink: /techstream/
author_profile: true
---

{% assign custom_category = 'Tech' %}
{% for post in site.posts limit: 5 %}
  {% if post.category == "custom_category"%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
