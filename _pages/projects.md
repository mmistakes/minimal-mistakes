---
layout: archive
author_profile: true
permalink: /projects/
header:
  image: /images/sunshine-skyway-bridge-night.jpeg
---

## Projects

<ul class="posts">
  {% for post in site.posts %}
    <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>