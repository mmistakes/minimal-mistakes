---
layout: archive
title: "Faculty"
permalink: /faculty/
author_profile: false
---

{% for post in site.faculty.docs %}
    {% include archive-single.html %}
{% endfor %}
