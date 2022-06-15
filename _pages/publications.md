---
title: "Publications"
layout: archive
permalink: /publications/
hidden: false
header:
  #overlay_color: "#000"
  overlay_image: /assets/images/FiQCI-banner.jpg
excerpt: >
  The Finnish Quantum-Computing Infrastructure<br />
  <small></small>

intro: 
  - excerpt: 'Blog posts, publications, and other material of interest'
   
---

{% include feature_row id="intro" type="center" %}

<div class="row">
  <div class="column">
    <h2>Posts <a href="{{site.github.repository_url}}/blob/master/_posts"><font size="-3">Add your own post</font></a></h2>
    {% include base_path %}
    {% capture written_year %}'None'{% endcapture %}
    {% for post in site.posts %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% if year != written_year %}
        <h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
        {% capture written_year %}{{ year }}{% endcapture %}
      {% endif %}
      {% include archive-single.html %}
    {% endfor %}
    {% include feature_row %}
  </div>
  <div class="column">
    <h2>Publications <a href="{{site.github.repository_url}}/blob/master/_publications"><font size="-3">Add your own publication</font></a></h2>
    {% include base_path %}
    {% capture written_year %}'None'{% endcapture %}
    {% for post in site.publications %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% if year != written_year %}
        <h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
        {% capture written_year %}{{ year }}{% endcapture %}
      {% endif %}
      {% include archive-single.html %}
    {% endfor %}
    {% include feature_row %}
  </div>
</div>


<!-- {% include feature_row %} -->
