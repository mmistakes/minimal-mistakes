---
title: "MySQL/MariaDB"
layout: archive
permalink: /mysql
---
**조금 이상한 부분이 있음**
![](2024-09-13-20-00-39.png)
{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}