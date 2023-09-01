---
title: Authors
layout: single
share: false
author_profile: false
permalink: /authors/
classes: wide authorpage
toc: false
toc_label: All site authors
toc_icon: user-edit
toc_sticky: true
---
{% for authormap in site.data.authors %}
  {% assign author=authormap[1] %}
  {% include author-profile.html author=author longbio=true %}
{% endfor %}