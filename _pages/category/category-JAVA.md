---
title: "JAVA"
layout: category
categories: JAVA
permalink: /category/JAVA/
author_profile: true
sidebar:
    nav: "docs"
taxonomy: JAVA
---

{% assign posts = site.categories.JAVA %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
