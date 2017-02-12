---
title: "Post: Image (Caption)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

{% include base_path %}

{% capture fig_img %}
![Foo]({{ base_path }}/images/unsplash-gallery-image-3.jpg)
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>Photo from Unsplash.</figcaption>
</figure>