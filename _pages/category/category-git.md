---
title: "Git을 통한 프로젝트 관리"
layout: archive
permalink: categories/git
author_profile: false
# sidebar_main: true
sidebar:
    nav: "docs"
---

{% assign posts = site.categories.git %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}