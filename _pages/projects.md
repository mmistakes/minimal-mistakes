---
layout: archive
author_profile: true
title: Projects
permalink: /projects/
header:
  image: /images/sunshine-skyway-bridge-3.jpeg
  #overlay_filter: 0.5 # same as adding an opacity of 0.5 to a black background
---

## Projects

<ul class="posts">
  {% for post in site.posts %}
    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>