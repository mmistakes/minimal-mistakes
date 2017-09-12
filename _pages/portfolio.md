---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

{% include base_path %}

<div class="grid__wrapper">
  {% for post in site.portfolio %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
