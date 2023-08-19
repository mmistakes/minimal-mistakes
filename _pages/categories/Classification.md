---
title: "분류"
layout: archive
permalink: categories/Classification
published: true
author_profile: true
sidebar_main : true
sidebar:
        nav: "categories_"
---

{% assign posts = site.categories['Classification']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}