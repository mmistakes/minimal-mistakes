---
title: "Post: Image (Linked with Caption)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

[View source on GitHub](https://raw.githubusercontent.com/mmistakes/minimal-mistakes/master/docs/_posts/2010-08-06-post-image-linked-caption.md)

{% capture fig_img %}
[![Foo](https://images.unsplash.com/photo-1541943869728-4bd4f450c8f5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjF9)](https://unsplash.com/)
{% endcapture %}

{% capture fig_caption %}
Image with a caption.
{% endcapture %}

<figure>
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>{{ fig_caption | markdownify | remove: "<p>" | remove: "</p>" }}</figcaption>
</figure>
