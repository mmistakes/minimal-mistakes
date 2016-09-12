---
layout: archive
permalink: /reads/
title: "Reads"
excerpt: "I love to read. And when a book strikes me, I like to put my thoughts down."
ads: false
fullwidth: true
author_profile: true
feature:
  visible: true
  headline: "Featured Reads"
  category: reads
---

{{ page.excerpt }}

{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.reads %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}