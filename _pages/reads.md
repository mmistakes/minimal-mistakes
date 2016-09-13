---
layout: archive
permalink: /reads/
title: "Reads"
excerpt: "Books I've read. Not quite reviews, more like thoughts and notes."
fullwidth: true
author_profile: true
---

{{ page.excerpt | markdownify }}

<div class="grid__wrapper">
{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.reads %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}
</div>

