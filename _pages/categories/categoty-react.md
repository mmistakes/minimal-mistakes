---
title: "WEB"
layout: archive
permalink: categories/react
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.react %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}