---
title: "Git을 통한 블로그 관리"
layout: archive
permalink: categories/blog
author_profile: false
# sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single-list.html type=page.entries_layout %} {% endfor %}