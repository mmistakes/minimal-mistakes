---
title: "JAVA_SCRIPT"
layout: archive
categories: JAVASCRIPT
permalink: /category/JAVASCRIPT/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: JAVASCRIPT
---

{% assign posts = site.categories.JAVASCRIPT %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}