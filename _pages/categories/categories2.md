---
title: "엄엄엄2"
layout: archive
permalink: categories/categories2
author_profile: true
sidebar_main : true
---

{% assign posts = site.categories['categories2']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}