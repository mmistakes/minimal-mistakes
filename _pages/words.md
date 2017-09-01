---
layout: archive
permalink: /words/
title: "Words"
excerpt: "Getting the words out. My writings on topics ranging from parenting to technology to just about anything that pops into my head."
ads: false
fullwidth: true
author_profile: true
---

{{ page.excerpt | markdownify }}

---

<div class="grid__wrapper">
{% include base_path %}
{% capture written_year %}'None'{% endcapture %}
{% for post in site.categories.words %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}
</div>