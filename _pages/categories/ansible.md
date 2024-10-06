---
title: "Ansible"
layout: archive
permalink: categories/ansible
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.Ansible %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}