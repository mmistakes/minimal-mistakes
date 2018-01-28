---
layout: archive
permalink: /
title: "Data"
author_profile: true
---

*Data speaks, if you listen carefully enough.*

{% for post in site.categories.data-works %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}


