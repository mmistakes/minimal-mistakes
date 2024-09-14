---
title: "MySQL/MariaDB"
layout: archive
permalink: categories/mysql
author_profile: true
types: posts
---

{% assign posts = site.categories['embedded_c_optimization']%}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}