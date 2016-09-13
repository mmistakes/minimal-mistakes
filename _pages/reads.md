---
layout: archive
permalink: /reads/
title: "Reads"
excerpt: "I love to read. Here are some thoughts on books I've read."
fullwidth: true
author_profile: true
---

{{ page.excerpt }}

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

{% include paginator.html %}
</div>

