---
title: "school"
layout: archive
permalink: /categories/school
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.school %}
{% assign layout_type = page.entries_layout | default: "list" %}

{% for post in posts %}
  {% include archive-single2.html post=post layout_type=layout_type %}
{% endfor %}
