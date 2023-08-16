---
title: "엄1"
layout: archive
permalink: categories/categories1
author_profile: true
sidebar_main : true
---

{% assign posts = site.categories['categories1']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}