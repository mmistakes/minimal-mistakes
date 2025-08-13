---
layout: home
author_profile: true
---
<div class="intro-text">
 Welcome to my portfolio! I am Oladayo, a data engineer passionate about building and maintaining data pipelines. I recently graduated from the University of Nottingham with a Master's degree. <br> <br> As I navigate the current job market, I am dedicated to continuously developing my skills in areas like Python, SQL, and cloud technologies through projects and sharing my learnings here. Explore my projects below to see my work.
</div>

<div class="projects-grid">
  {% for post in site.posts %}
    <a href="{{ post.url | relative_url }}" class="project-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content | strip_html | truncatewords: 20 }}</p>
      <span class="arrow-link">&#8594;</span>
    </a>
  {% endfor %}
</div>