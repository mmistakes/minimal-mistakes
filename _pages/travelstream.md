---
layout: archive
title: "Travel"
permalink: /travelstream/
author_profile: true
---

{% for post in site.posts limit: 5 %}
  {% if post.category == "Travel"%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}