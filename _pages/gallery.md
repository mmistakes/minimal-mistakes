---
title: "Gallery"
layout: single
permalink: /gallery/
author_profile: true
comments: true
---
<style type='text/css'>
div.gallery {
  margin: 10px;
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
div.page__inner-wrap{
  width:800px!important;
}
div.desc {
  padding: 15px;
  text-align: center;
}
</style>
  {% for image in pics.gallery %}
    <div class="gallery">
      <a target="_blank" href="{{image.url}}">
       <img src="{{image.url}}">
      </a>
</div>
  
  {% endfor %}
<!-- img 1-->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_LP1.jpeg">
    <img src="/pics/gallery/Udaipur_LP1.jpeg" alt="Lake">
  </a>
</div>
<!-- img 2 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Powai_Lake.jpeg">
    <img src="/pics/gallery/Powai_Lake.jpeg" alt="Garden">
  </a>
</div>

<!-- img 3 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/GymkhanaIITB.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 4 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 5 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 6 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 7 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 8 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 9 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 10 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 11 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

<!-- img 12 -->
<div class="gallery">
  <a target="_blank" href="/pics/gallery/Udaipur_GB1.jpeg">
    <img src="/pics/gallery/GymkhanaIITB.jpeg" alt="Garden">
  </a>
</div>

{% include gallery caption="** **" %}
