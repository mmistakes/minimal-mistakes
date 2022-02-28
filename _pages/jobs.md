---
layout: collection
title: "Positions in the group"
permalink: /jobs/
author_profile: false
---

<div class="grid__wrapper">
  {% for post in site.jobs %}
    {% if post.tags contains "open" %}
    {% include archive-single.html type="grid" %}
    {% endif %}
  {% endfor %}
</div>
