---
title: "Post: Image (Caption)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
  - shortcode
---

{% capture fig_img %}
![Foo](http://wpthemetestdata.files.wordpress.com/2008/06/100_5478.jpg?w=604)
{% endcapture %}

<figure>
  {{ fig_img | markdownify }}
  <figcaption>Bell on wharf in San Francisco</figcaption>
</figure>