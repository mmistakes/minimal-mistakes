---
title: "전자기학"
layout: archive
permalink: categories/electromagnetism
published: true
author_profile: true
sidebar_main : true
sidebar:
        nav: "categories_"
---

{% assign posts = site.categories['electromagnetism']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}