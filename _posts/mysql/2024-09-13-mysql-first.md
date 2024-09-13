---
title: "MySQL/MariaDB"
layout: archive
permalink: /mysql
---

내용을 한번 써봐야겠다.

{% assign posts = site.categories.blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}