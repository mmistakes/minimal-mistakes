---
layout: posts
title: "All Blog Posts"
permalink: /posts/
header:
  overlay_color: "#38c9c3"
  overlay_filter: "0.2"
  overlay_image: "/assets/images/hero-bg.jpg"
  cta_label: "Home"
  cta_url: "/"
  cta_class: "btn--primary"
---

<div class="feature__wrapper">
    <div class="feature__item">
        <div class="archive__item">
            <div class="archive__item-body">                <h2 class="archive__item-title">All Blog Posts</h2>
                <div class="archive__item-excerpt" style="max-width: 900px; margin: 0 auto 2rem auto; font-size: 1.15rem;">
                    <p>Discover all PowerPlatform tips, insights, and solutions. Each post follows a structured format with challenges, solutions, and practical implementation steps.</p>
                </div>
            </div>
        </div>
    </div>
</div>

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
