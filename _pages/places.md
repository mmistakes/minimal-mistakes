---
layout: archive
permalink: /places/
title: "Places"
author_profile: true
---

*Places is a collection of things that exist around, small or big. Their story is narrated and decorated with pics, rigorously mine and rigorously subjected to filters (or not).*

{% for post in site.categories.places %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}
