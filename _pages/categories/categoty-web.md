---
title: "web"
layout: archive
permalink: /categories/web
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.web %}
{% assign layout_type = page.entries_layout | default: "list" %}

{% for post in posts %}
  {% include archive-single2.html post=post layout_type=layout_type %}
{% endfor %}
<!-- 
{% for post in posts %}
  {% include archive-single.html %}
{% endfor %} 
-->
