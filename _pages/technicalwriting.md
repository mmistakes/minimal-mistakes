---
layout: archive
permalink: /technicalwriting/
title: "Portfolio"
excerpt: "I like to write. I like technology. I like to help. Technical 
writing combines those passions. See my **[resume here](/resume/)**."
author_profile: true
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
