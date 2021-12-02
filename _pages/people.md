---
title: "People"
layout: splash
permalink: /people
author_profile: false
---


<h2>{{ page.title }}</h2>


{% assign authors = site.data.authors | sort %}

<div class="grid__wrapper">

{% for f in authors %}
  {% assign author = f[1] %}
    {% include profile-single.html type="grid" author=author %}
{% endfor %}

</div>