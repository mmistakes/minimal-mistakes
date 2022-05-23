---
title: "Open mic sessions"
layout: single
permalink: open-mic
taxonomy: OpenMic

lang: en
lang-ref: open-mic
#classes: wide
author_profile: true

header:
  image: /assets/images/archive/openmic.jpg
  caption: "Photo credit: [**Matthias Wagner**](https://unsplash.com/@matwag?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"
---

Open mic session is an activity going on irregulary every other week. A member of a team or a guest presents an interesting topic to the rest of the team and anyone willig to listen.

Upcoming event:

{% for post in site.categories.["Open Mic Announcement"] limit:1 %}
  {% include archive-single.html type=entries_layout %}
{% endfor %}

Records and content of past Open mic sessions:

{% for post in site.categories.["Open Mic Session"] %}
  {% include archive-single.html type=entries_layout %}
{% endfor %}
