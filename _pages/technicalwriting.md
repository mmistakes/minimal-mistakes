---
layout: archive
permalink: /technicalwriting/
title: "Technical Writing"
modified: 2016-02-26T10:36:43-05:00
excerpt: "I like to write. I like technology. I like to help. Technical writing combines those passions."
author_profile: false
feature:
  visible: false
  headline: "Featured works"
  category: technicalwriting
---

{{ page.excerpt | markdownify }}

---

<div class="grid__wrapper">
{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.technicalwriting %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}
</div>