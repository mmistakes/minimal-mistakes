---
title: "Post: Image (Linked with Caption)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

{% capture fig_img %}
[![Foo](https://farm5.staticflickr.com/4134/4940462712_7c28420b27_b.jpg)](https://flic.kr/p/8wzarA)
{% endcapture %}

{% capture fig_caption %}
Stairs? Were we're going we don't need no stairs.
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>