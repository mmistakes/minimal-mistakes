---
layout: posts
title:  "All Posts"
permalink: /posts/
---

{% include base_path %}

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}