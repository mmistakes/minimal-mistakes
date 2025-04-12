---
layout: splash
permalink: /
title: Home
---


<style>
  .tagline {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-top: 3rem;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    color: #111;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .tagline:hover {
    transform: scale(1.02);
  }

  .tagline span {
    color: #007bff;
    background-clip: text;
    -webkit-background-clip: text;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 2rem;
      padding: 1.5rem 1rem;
    }
  }
</style>


<div class="intro-wrapper">
  <div class="announcement-box">
    📢 Latest: Applications open for Spring '25 recruitment!
  </div>
  <h1 class="tagline">Code <span class="highlight-train">Train</span> Predict</h1>
  <p class="intro-text">
    We are a student-led community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning.
  </p>
</div>


<section class="preview-section">
  <h2>Featured Research</h2>
  <div class="grid-container">
    {% include research-card.html %}
  </div>
  <a href="/research/" class="button-link">Explore Research</a>
</section>

<section class="preview-section">
  <h2>Projects</h2>
  <div class="grid-container">
    {% include project-card.html %}
  </div>
  <a href="/projects/" class="button-link">See Projects</a>
</section>

<section class="preview-section">
  <h2>Blog</h2>
  <div class="grid-container">
    {% include blog-card.html %}
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
