---
layout: collection
title: "Positions in the group"
permalink: /jobs/
author_profile: false
---

## Open positions

<div class="grid__wrapper">
  {% for post in site.jobs %}
    {% if post.tags contains "open" %}
    {% include archive-single.html type="list" %}
    {% endif %}
  {% endfor %}
</div>


## Closed positions


<div class="grid__wrapper">
  {% for post in site.jobs %}
    {% if post.tags contains "closed" %}
    {% include archive-single.html type="list" %}
    {% endif %}
  {% endfor %}
</div>