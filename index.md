---
layout: single
title: "Christopher Motola"
permalink: /
sidebar: false
author_profile: false
read_time: false
---
This site exists to help explain what I do. I wear a fair number of different hats professionally, and it can be difficult to paint a coherent picture of my skill set and personality through my resume. Needless to say, sales is not my strong point.

### 📂 Featured Work  
- **[Data Journalism](portfolio/economic-trends/)** – Data analysis for mass audiences  
- **[Game Design](portfolio/game-design/)** – Experimental puzzle game based on musical chords
- **[SEO-focused Writing](portfolio/small-business-writing/)** - Revenue-generating posts and reviews 

### ✍️ Latest Blog Posts  
{% for post in site.posts limit:3 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

