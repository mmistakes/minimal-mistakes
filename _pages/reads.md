---
layout: archive
permalink: /reads/
title: "Book Notes"
excerpt: "A selection of things I've read."
ads: false
fullwidth: true
tiles: true
feature:
  visible: true
  headline: "Featured Reads"
  category: reads
---

{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    <h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}

And based on Category=reads

{% for post in site.categories.reads %}
  {% if post.featured != true %}
  {% include archive__item.html %}
  {% endif %}
{% endfor %}
