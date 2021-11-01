---
title: "정보보안기사"
layout: archive
permalink: categories/Gisa
author_profile: true
sidebar_main: true
---

<!-- 공백이 포함되어 있는 카테고리 이름의 경우 site.categories['a b c'] 이런식으로 설정 -->

{% assign posts = site.categories.Gisa %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
