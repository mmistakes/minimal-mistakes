---
title: "Web"
layout: archive
permalink: categories/web
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.web %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}

웹페이지를 만드는데 back-end 관련 정보들입니다