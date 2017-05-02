---
title: "Projects "
excerpt: "Foo Bar design system including logo mark, website design, and branding applications."
header:
  image: /assets/images/unsplash-gallery-image-1.jpg
  teaser: /assets/images/unsplash-gallery-image-1.jpg
sidebar:
  - title: "Role"
    image: http://placehold.it/350x250
    image_alt: "logo"
    text: "Helping you market with data and automation."
gallery:
  - url: /assets/images/unsplash-gallery-image-1.jpg
    alt: "placeholder image 1"
  - url: /assets/images/unsplash-gallery-image-2.jpg
    alt: "placeholder image 2"
  - url: /assets/images/unsplash-gallery-image-3.jpg
    alt: "placeholder image 3"
permalink: /projects/
---

# Currently Making

# Completed Projects

{% for post in site.completed %}
  {% include archive-single.html %}
{% endfor %}

Want to know what I've read? I keep a list of [book summary here]({{ baseurl }}/books).

