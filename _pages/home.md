---
layout: splash
permalink: /
title: Home
---

<style>
  /* --- FIX FOR THE "WHITE BOX" EFFECT --- */
  /* This targets the theme's container to ensure the background is seamless */
  .layout--splash .page__content {
    background: transparent !important;
    padding: 0 !important;
  }

  /* --- GENERAL STYLES --- */
  .intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 1rem 3rem 1rem;
    max-width: 900px;
    margin: 0 auto;
    /* Forces removal of any theme-applied card styling */
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
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
    font-size: 4rem; /* Increased size for a cleaner look */
    font-weight: 800;
    color: #111;
    margin: 0;
    line-height: 1.1;
    background: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  .tagline .highlight-train {
    color: #007bff;
    font-weight: 800;
    font-style: normal;
  }
  
  .intro-text {
    font-size: 1.2rem;
    color: #444;
    margin-top: 1.5rem;
    max-width: 750px;
    line-height: 1.6;
  }

  /* --- REFACTORED WRAPPED SECTION (Seamless) --- */
  .wrapped-section {
    background-color: transparent; 
    padding: 5rem 1rem;
    margin-bottom: 2rem;
    border: none; 
  }

  .wrapped-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    text-align: left;
  }

  .wrapped-content {
    flex: 1;
  }

  .wrapped-content h2 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 1rem;
    margin-top: 0;
    letter-spacing: -0.02em;
  }

  .wrapped-content p {
    font-size: 1.15rem;
    color: #444;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .wrapped-link {
    color: #007bff;
    font-weight: 600;
    text-decoration: none;
    font-size: 1.05rem;
    display: inline-flex;
    align-items: center;
  }

  .wrapped-link:hover { text-decoration: underline; }

  .wrapped-image-card {
    flex-shrink: 0;
    width: 350px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }

  .wrapped-image-card:hover { transform: translateY(-5px); }

  .wrapped-image-card img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* --- EXISTING PREVIEW SECTIONS --- */
  .preview-section {
    padding: 4rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
  }

  .preview-section h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 2rem;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 1.5rem;
    margin-bottom: 2rem;
    align-items: stretch;
  }

  /* Keep Featured Events cards visually aligned despite different copy lengths. */
  .grid-container .event-card {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
    text-align: left;
    height: 100%;
  }

  .grid-container .event-images {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .grid-container .event-images img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .grid-container .event-card h3 {
    margin: 0;
    padding: 0.9rem 0.9rem 0.45rem;
    font-size: 1.1rem;
    line-height: 1.35;
    min-height: 3.4rem;
    color: #111;
  }

  .grid-container .event-card p {
    margin: 0;
    padding: 0 0.9rem 1rem;
    line-height: 1.55;
    color: #444;
  }

  .button-link {
    display: inline-block;
    padding: 0.8rem 2.2rem;
    background-color: #007bff;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .button-link:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  /* --- CONTACT SECTION --- */
  .contact-section {
    background-color: #f8fafc;
    padding: 5rem 2rem;
    border-top: 1px solid #eaeaea;
  }
  .contact-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact-header { text-align: center; margin-bottom: 3rem; }
  .contact-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
  .contact-card {
    background-color: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 250px;
    flex: 1;
  }
  .contact-icon { font-size: 2.5rem; color: #007bff; margin-bottom: 1rem; }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .tagline { font-size: 2.8rem; }
    .wrapped-container {
      flex-direction: column;
      text-align: center;
      gap: 2.5rem;
    }
    .wrapped-image-card { width: 100%; max-width: 400px; }
  }
</style>

<div class="intro-wrapper">
<div class="announcement-box">
  📢 Latest: <a href="{{ site.baseurl }}/projects/DL_playground/" target="_blank" style="color: #007bff; font-weight: 600;">Build PyTorch Model visually with DL-Playground!</a>
</div>

  <h1 class="tagline">Code <span class="highlight-train">Train</span> Predict</h1>
  <p class="intro-text">
    We are a student-led community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning.
  </p>
  
  <div style="margin-top: 20px; display: flex; justify-content: center; gap: 25px;">
    <a href="https://github.com/dsgiitr" target="_blank"><i class="fab fa-github fa-2x" style="color: black;"></i></a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank"><i class="fab fa-linkedin fa-2x" style="color: #0a66c2;"></i></a>
    <a href="https://x.com/dsg_iitr" target="_blank"><i class="fab fa-twitter fa-2x" style="color: #1da1f2;"></i></a>
    <a href="https://www.instagram.com/dsgiitr" target="_blank"><i class="fab fa-instagram fa-2x" style="color: #e4405f;"></i></a>
  </div>
</div>

<section class="wrapped-section">
  <div class="wrapped-container">
    <div class="wrapped-content">
      <h2>DSG Wrapped 2025</h2>
      <p>Our annual report covering 8 publications in top-tier conferences, multiple projects and collborations with world famous universities and institutes. Discover what our club achieved this year.</p>
      <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" target="_blank" class="wrapped-link">
        See Post &rarr;
      </a>
    </div>
    
    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" target="_blank" class="wrapped-image-card">
      <img src="{{ site.baseurl }}/assets/images/dsg_wrapped.png" alt="DSG 2025 Year in Review">
    </a>
  </div>
</section>

<section class="preview-section">
  <h2>Featured Research</h2>
  <div class="grid-container">
    {% include research-card.html %}
  </div>
  <a href="https://dsgiitr.github.io/dsg-website/research/" class="button-link">Explore Research</a>
</section>

<section class="preview-section">
  <h2>Featured Project and Blog</h2>
  <div class="grid-container">
    {% include project-card.html %}
  </div>
  <a href="https://dsgiitr.github.io/dsg-website/projects/" class="button-link">See Projects</a>
</section>

<section class="preview-section">
  <h2>Featured Events</h2>
  <div class="grid-container">
    {% include events-card.html %}
  </div>
  <a href="https://dsgiitr.github.io/dsg-website/events/" class="button-link">Check Out Our Events</a>
</section>

<section class="contact-section">
  <div class="contact-container">
    <div class="contact-header">
      <h2>Contact Us</h2>
      <p>Have questions or interested in collaborating? Reach out to our team.</p>
    </div>
    
    <div class="contact-details">
      <div class="contact-card">
        <i class="fas fa-envelope contact-icon"></i>
        <h3>Email</h3>
        <p><a href="mailto:dsg@iitr.ac.in">dsg@iitr.ac.in</a></p>
      </div>
      <div class="contact-card">
        <i class="fas fa-map-marker-alt contact-icon"></i>
        <h3>Location</h3>
        <p>Ground Floor, SAC building<br>IIT Roorkee<br>Uttarakhand, India</p>
      </div>
      <div class="contact-card">
        <i class="fas fa-comments contact-icon"></i>
        <h3>Follow Us</h3>
        <p>Stay updated with our latest research and events on social media</p>
      </div>
    </div>
    
    <a href="#" class="join-button">Contact Us</a>
  </div>
</section>



