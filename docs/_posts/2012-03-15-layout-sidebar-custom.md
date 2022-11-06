---
title: "Layout: Sidebar Custom"
excerpt: "A post with custom sidebar content."
last_modified_at: 2021-06-23T07:53:04-04:00
author_profile: false
sidebar:
  - title: "Title"
    image: "/assets/images/350x250.png"
    image_alt: "image"
    text: "Some text here."
  - title: "Another Title"
    text: "More text here."
    nav: sidebar-sample
---

This post has a custom sidebar set in the post's YAML Front Matter.

An example of how that YAML could look is:

```yaml
sidebar:
  - title: "Title"
    image: "/assets/images/your-image.jpg"
    image_alt: "image"
    text: "Some text here."
  - title: "Another Title"
    text: "More text here."
    nav: sidebar-sample
```