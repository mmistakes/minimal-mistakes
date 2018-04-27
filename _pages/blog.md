---
title: "Blog"
layout: single
excerpt: "Blog posts for DevCycle."
sitemap: false
author_profile: true
permalink: /blog/
---

{% include base_path %}

<h3></h3>

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts }}</h3>

<div class="grid-wrapper">
{% for post in site.posts %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>

{% include paginator.html %}
