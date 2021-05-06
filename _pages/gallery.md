---
title: "Gallery"
layout: single
permalink: /gallery/
author_profile: false
comments: true
---
<style type='text/css'>
div.gallery {
  margin: 5px;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 11em;
  height: 10em;
  float:left;
  object-fit: cover;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_LP1.jpeg">
    <img src="/pics/gallery/Udaipur_LP1.jpeg" alt="Cinque Terre" width="600" height="600">
  </a>
</div>

<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/Udaipur_GB1.jpeg" alt="Forest" width="600" height="400">
  </a>
</div>

<div class="gallery">
  <a target="_blank" href="img_lights.jpg">
    <img src="img_lights.jpg" alt="Northern Lights" width="600" height="400">
  </a>
</div>

<div class="gallery">
  <a target="_blank" href="img_mountains.jpg">
    <img src="img_mountains.jpg" alt="Mountains" width="600" height="400">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

{% include gallery caption="** **" %}
