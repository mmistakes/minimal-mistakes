---

layout: archive
title: "openstack"
permalink: categories/devops
author_profile: true
sidebar_main: true

---

{% assign posts = site.categories.devops %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}