---
layout: archive
permalink: /coding/
title: "Coding"
author_profile: true
---

*Just some random babbling about programming things, mainly Python.*

{% for post in site.categories.coding %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}


