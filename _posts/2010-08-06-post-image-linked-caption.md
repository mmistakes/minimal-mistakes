---
title: "Post: Image (Linked with Caption)"
categories:
  - Post Formats
tags:
  - image
  - Post Formats
---

{% capture fig_img %}
[![Foo](http://wpthemetestdata.files.wordpress.com/2012/06/dsc20040724_152504_532.jpg)](http://wpthemetestdata.files.wordpress.com/2012/06/dsc20040724_152504_532.jpg)
{% endcapture %}

<figure>
  {{ fig_img | markdownify }}
  <figcaption>Chunk of resinous blackboy husk, Clarkson, Western Australia. This burns like a spinifex log.</figcaption>
</figure>