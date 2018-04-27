---
title: "Blog"
layout: single
excerpt: "Blog posts for DevCycle."
sitemap: false
author_profile: true
permalink: /posts/
---

{% include base_path %}

<h3></h3>

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts }}</h3>

{% for post in paginator.posts %}
  {% include archive-single.html %}
{% endfor %}

{% include paginator.html %}
