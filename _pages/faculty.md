---
lang: en
ref: faculty
layout: archive
title: "Faculty"
permalink: /faculty/
author_profile: true
---

{% assign posts=site.faculty | where:"lang", page.lang %}
{% for post in posts %}
    {% include archive-single.html %}
{% endfor %}
