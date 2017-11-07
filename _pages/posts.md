---
layout: archive
permalink: /posts/
title: "Posts by Year"
author_profile: false
header:
  overlay_color: "#000"
  overlay_filter: "0.3"
  overlay_image:  /assets/images/jacalyn-beales-381796.jpg
  caption: "Photo credit: [*Jacalyn Beales*](https://unsplash.com/@jacalynbeales)"
excerpt: "Thoughts on methods, papers and statistics"
---

{% capture written_year %}'None'{% endcapture %}
{% for post in site.posts %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% if year != written_year %}
<h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
{% capture written_year %}{{ year }}{% endcapture %}
{% endif %}
{% include archive-single.html %}
{% endfor %}
