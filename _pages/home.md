---
layout: splash
permalink: /
title: Home
---


.announcement-box {
  background-color: #e6f0ff;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.95rem;
  display: inline-block;
  margin: 1rem 0;
  color: #004080;
  font-weight: 600;
}

.tagline {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.highlight-train {
  color: #007bff; // DSG blue
}

.intro-text {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin: 0 auto 2rem;
  max-width: 700px;
}

.preview-section {
  margin: 3rem 0;
  text-align: center;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.grid-container .card {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card h3 {
  padding: 0.8rem;
  font-size: 1.1rem;
  text-align: left;
}

.button-link {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  background-color: #004080;
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.button-link:hover {
  background-color: #0059b3;
}



<div class="announcement-box">
  📢 Latest: Applications open for Spring '25 recruitment!
</div>

<h1 class="tagline">
  Code <span class="highlight-train">Train</span> Predict
</h1>

<p class="intro-text">
  We are a student-led community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning.
</p>

<section class="preview-section">
  <h2>Featured Research</h2>
  <div class="grid-container">
    {% include_relative _includes/research-card.html %}
  </div>
  <a href="/research/" class="button-link">Explore Research</a>
</section>

<section class="preview-section">
  <h2>Projects</h2>
  <div class="grid-container">
    {% include_relative _includes/project-card.html %}
  </div>
  <a href="/projects/" class="button-link">See Projects</a>
</section>

<section class="preview-section">
  <h2>Blog</h2>
  <div class="grid-container">
    {% include_relative _includes/blog-card.html %}
  </div>
  <a href="/blogs/" class="button-link">View Blog</a>
</section>

<section class="contact-section">
  <h2>Contact Us</h2>
  <p>Email: <a href="mailto:datasciencegroup.iitr@gmail.com">datasciencegroup.iitr@gmail.com</a></p>
  <p>Location: IIT Roorkee</p>
  <p>
    Follow us: 
    <a href="https://linkedin.com">LinkedIn</a> |
    <a href="https://twitter.com">Twitter</a> |
    <a href="https://instagram.com">Instagram</a>
  </p>
</section>
