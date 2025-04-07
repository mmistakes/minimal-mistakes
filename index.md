---
layout: home
author_profile: true
---
<div class="intro-text">
 Welcome to my portfolio! I am Oladayo, a data enthusiast passionate about data engineering and data science. I recently graduated from the University of Nottingham with a Master degree in Data Science. <br> <br> As I navigate the current job market, I am dedicated to continuously developing my skills in areas like Python, SQL, and cloud technologies through projects and sharing my learnings here. Explore my projects below to see my work.
</div>

<div class="tabs">
 <button class="tab-button active" data-category="data-engineering">Data Engineering</button>
 <button class="tab-button" data-category="data-science">Data Science</button>
</div>

<div class="projects">
 {% assign data_engineering_posts = site.posts | where: "category", "data-engineering" %}
 {% assign data_science_posts = site.posts | where: "category", "data-science" %}

 {% for post in data_engineering_posts %}
  <div class="project data-engineering">
  <h3>{{ post.title }}</h3>
   {{ post.content | truncatewords: 50 }}
  </div>
 {% endfor %}

 {% for post in data_science_posts %}
  <div class="project data-science" style="display: none;">
   <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
   {{ post.content | strip_html | truncatewords: 50 }}
  </div>
 {% endfor %}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const projects = document.querySelectorAll('.project');

    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;

        // Deactivate all tabs and hide all projects
        tabButtons.forEach(btn => btn.classList.remove('active'));
        projects.forEach(project => project.style.display = 'none');

        // Activate the clicked tab and show relevant projects
        this.classList.add('active');
        projects.forEach(project => {
          if (project.classList.contains(category)) {
            project.style.display = 'block';
          }
        });
      });
    });

    // Initially show the Data Engineering tab
    document.querySelector('.tab-button[data-category="data-engineering"]').click();
  });
</script>