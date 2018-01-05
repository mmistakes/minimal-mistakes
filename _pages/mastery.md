---
layout: archive
permalink: /mastery/
title: "Mastery"
author_profile: true
---

*Mastery is a series of "interviews" (more "conversations") with people I know or I meet that do something interesting. It's people who have a passion, of any sort, spend time and effort on it, and agree to tell the world, just for fun. It can be people who made a profession of their interest, or people who do things in their free time. What fascinates me is their drive.*

{% for post in site.categories.mastery %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% if year != written_year %}
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% include archive-single.html %}
{% endfor %}


