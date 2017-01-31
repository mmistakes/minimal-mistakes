---
layout: archive
title: "Groups"
permalink: /group/
author_profile: true
---

{% for post in site.group.docs %}
    {% include archive-single.html %}
{% endfor %}
