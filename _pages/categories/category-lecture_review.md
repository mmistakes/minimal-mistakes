---
layout: archive
permalink: /categories/lecture_review/
title: "lecture_review"
author_profile: true
sidebar_main: true
search : false
sidebar:
    nav: "docs"
---
{% assign posts = site.categories.lecture_review | sort:"date" | reverse %}

{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}