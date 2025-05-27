---
layout: posts
title: "All Blog Posts"
permalink: /posts/
header:
  overlay_color: "#38c9c3"
  overlay_filter: "0.2"
  overlay_image: "/assets/images/hero-bg.jpg"
  cta_label: "Home"
  cta_url: "/"
  cta_class: "btn--primary"
---

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
