---
layout: splash
permalink: /
title: Home
---


<style>
  .intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3rem 1rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .announcement-box {
    background-color: #e6f0ff;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 0.95rem;
    margin-bottom: 2rem;
    color: #004080;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .tagline {
    font-size: 3rem;
    font-weight: 800;
    color: #111;
    margin: 0;
    line-height: 1.2;
  }

  .tagline .highlight-train {
    color: #007bff;
    font-weight: 800;
    font-style: normal;
  }

  .intro-text {
    font-size: 1.1rem;
    color: #444;
    margin-top: 1.5rem;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 2.2rem;
    }

    .intro-text {
      font-size: 1rem;
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
