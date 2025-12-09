---
title: "Post with Gallery"
categories:
  - know-how
tags:
  - photos
 ---

{% comment %} 
The following block defines a gallery with 3 columns.
The gallery tag must be closed with {% endgallery %}
{% endcomment %}

<div class="gallery gallery--3-col">

  {% include figure image_path="/assets/images/photo1.jpg" 
    alt="first image" 
    caption="This is the first photo." 
    title="Photo 1" %}

  {% include figure image_path="/assets/images/photo2.jpg" 
    alt="second image" 
    caption="This is the second photo." 
    title="Photo 2" %}

  {% include figure image_path="/assets/images/photo3.jpg" 
    alt="third image" 
    caption="This is the third photo." 
    title="Photo 3" %}

</div>