---
title: "JPA"
layout: archive
permalink: /categories/jpa/
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.jpa %}
{% for post in posts %}
{% include archive-single.html type=page.entries_layout %}
{% endfor %}