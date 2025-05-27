---
layout: archive
title: "Blog Posts"
permalink: /posts/
author_profile: true
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/header-bg.jpg
---

<div class="feature__wrapper">
    <div class="feature__item">
        <div class="archive__item">
            <div class="archive__item-body">
                <h2 class="archive__item-title">Alle Blog Posts</h2>
                <div class="archive__item-excerpt">
                    <p>Hier finden Sie alle Blog-Posts chronologisch sortiert.</p>
                </div>
            </div>
        </div>
    </div>
</div>

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
