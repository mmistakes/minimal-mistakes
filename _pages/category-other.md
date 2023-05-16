---
title : "other"
layout : archive
permalink : tags/other
author_profile : true
sidebar_main : true
---

{% assign posts = site.tags.other %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}