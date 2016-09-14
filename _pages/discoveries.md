---
layout: archive
permalink: /discoveries/
title: "Discoveries"
excerpt: "Curated selection of things I've discovered in this vast wasteland we affectionately call _the interwebs_. Always updated occasionally."
ads: false
fullwidth: true
author_profile: true
---

{{ page.excerpt | markdownify }}

---

<div class="grid__wrapper">
{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.discoveries %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}
</div>