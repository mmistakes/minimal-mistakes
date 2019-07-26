---
layout: page
permalink: /categories/
title: Categories
---

<div id="archives">
  
  {% for post in site.posts %}
  {% capture categories %} {{ post | first }} {% endcapture %}
    <div class="archive-group">
      <div> {% capture category_name %}{{ post.categories | first }} {% endcapture %}</div>
      <div class="" id="#{{ category_name | slugize }}"></div>
      <p></p>
      <h4> {{ category_name }} </h4>
      <article class="archive-item">
        <h4><a href="{{ post.url }}">{{post.title}}</a></h4>
      </article>
    </div>

  {% endfor %}
  <!-- 
  {% for category in site.categories %}
    <div class="archive-group">
      {% capture category_name %}{{ category | first }}{% endcapture %}
      <div class="" id="#{{ category_name | slugize }}"></div>
      <p></p>

      <div class="tag-box inline category-head">
        {{ category_name }}
      </div>
      <a name="{{ category_name | slugize }}"></a>
      {% for post in site.categories[category_name] %}
      <article class="archive-item">
        <h4><a href="{{ post.url }}">{{post.title}}</a></h4>
      </article>
      {% endfor %}
    </div>
  {% endfor %} -->
</div>