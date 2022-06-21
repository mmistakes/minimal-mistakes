---
title: "resume"
layout: archive
permalink: categories/resume
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.resume %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}