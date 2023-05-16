---
title : "python"
layout : archive
permalink : tags/python
author_profile : true
sidebar_main : true
---

{% assign posts = site.tags.python %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}