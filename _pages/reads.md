---
layout: archive
permalink: /reads/
title: "Reads"
excerpt: "I love to read. And when a book strikes me, I like to put my thoughts down."
fullwidth: true
author_profile: true
---

{{ page.excerpt }}

{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.reads %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html type="grid" %}
{% endfor %}