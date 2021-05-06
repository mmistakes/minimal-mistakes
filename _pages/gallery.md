---
title: "Gallery"
layout: single
permalink: /gallery/
author_profile: false
comments: true
gallery:
  - url: /pics/gallery/Udaipur_LP1.jpeg
    image_path: /pics/gallery/Udaipur_LP1.jpeg
    title: "Lake Pichola, Udaipur"
  - url: /pics/gallery/Udaipur_GB1.jpeg
    image_path: /pics/gallery/Udaipur_GB1.jpeg
    title: "Rose Garden, Udaipur"
    
  - url: /pics/gallery/GymkhanaIITB.jpeg
    image_path: /pics/gallery/GymkhanaIITB.jpeg
    title: "Gymkhana Grounds, IIT Bombay"
  - url: /pics/gallery/Udaipur_GB1.jpeg
    image_path: /pics/gallery/Udaipur_GB1.jpeg
    title: "Rose Garden, Udaipur"
    
  - url: /pics/gallery/Udaipur_LP1.jpeg
    image_path: /pics/gallery/Udaipur_LP1.jpeg
    title: "Lake Pichola, Udaipur"
  - url: /pics/gallery/Udaipur_GB1.jpeg
    image_path: /pics/gallery/Udaipur_GB1.jpeg
    title: "Rose Garden, Udaipur"
    
  - url: /pics/gallery/eastrock.jpg
    image_path: /pics/gallery/eastrock.jpg
    title: "Mountain top of East Rock"
---
The images below
(setq markdown-xhtml-header-content
      "<style type='text/css'>
div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
}

div.gallery:hover {
  border: 1px solid #777;
}

div.gallery img {
  width: 100%;
  height: auto;
}

div.desc {
  padding: 15px;
  text-align: center;
}
</style>")
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/Udaipur_GB1.jpeg" alt="Cinque Terre" width="600" height="600">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/Udaipur_GB1.jpeg" alt="Forest" width="600" height="400">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

<div class="gallery">
  <a target="_blank" href="img_lights.jpg">
    <img src="img_lights.jpg" alt="Northern Lights" width="600" height="400">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

<div class="gallery">
  <a target="_blank" href="img_mountains.jpg">
    <img src="img_mountains.jpg" alt="Mountains" width="600" height="400">
  </a>
  <div class="desc">Add a description of the image here</div>
</div>

{% include gallery caption="** **" %}
