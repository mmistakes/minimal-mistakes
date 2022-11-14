---
title: "Basics 🌱"
layout: archive
permalink: /basics
author_profile: true
sidebar_main: true
sidebar:
    nav: "sidebar-category"
---


{% assign posts = site.categories.basics %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
