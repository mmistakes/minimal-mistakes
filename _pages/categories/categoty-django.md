---
title: "django"
layout: archive
permalink: /categories/django
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.django %}
{% for post in posts %}
  {% include archive-single.html %}
{% endfor %}
