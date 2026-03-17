---
layout: splash
permalink: /
title: Home
---

<style>
  /* --- GENERAL STYLES --- */
  .intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 3rem 1rem 2rem 1rem; /* Added bottom padding back for spacing */
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

  /* --- REFACTORED WRAPPED SECTION (Smaller & Side-by-Side) --- */
  .wrapped-section {
    background-color: #f9fafb;
    padding: 3rem 1rem;
    margin-bottom: 3rem;
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
  }

  .wrapped-container {
    max-width: 900px; /* Fits perfectly with your intro width */
    margin: 0 auto;
    display: flex; /* This makes it side-by-side */
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    text-align: left; /* Resets the center alignment */
  }

  .wrapped-content {
    flex: 1; /* Takes up remaining space */
  }

  .wrapped-content h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .wrapped-content p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .wrapped-link {
    color: #007bff;
    font-weight: 600;
    text-decoration: none;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
  }

  .wrapped-link:hover {
    text-decoration: underline;
  }

  /* The Image Container - Now constrained to a smaller size */
  .wrapped-image-card {
    flex-shrink: 0;
    width: 320px; /* Fixed width prevents it from getting too big */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .wrapped-image-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .wrapped-image-card img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* --- EXISTING PREVIEW SECTIONS --- */
.preview-section {
    padding: 3rem 1rem;
    max-width: 1400px; /* Changed from 1200px to 1400px to fit 4 cards */
    margin: 0 auto;
    text-align: center;
  }

  .preview-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 2rem;
  }

.grid-container {
    display: grid;
    /* Changed 280px to 250px so 4 cards fit easily */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .button-link {
    display: inline-block;
    padding: 0.8rem 2rem;
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
    padding: 3rem 2rem;
    border-top: 1px solid #eaeaea;
  }
  .contact-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .contact-header { text-align: center; margin-bottom: 2rem; }
  .contact-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    width: 100%;
  }
  .contact-card {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 250px;
    flex: 1;
  }
  .contact-icon { font-size: 2rem; color: #007bff; margin-bottom: 1rem; }
  .join-button {
    margin-top: 2rem;
    padding: 1rem 2.5rem;
    background-color: #007bff;
    color: white;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 768px) {
    .tagline { font-size: 2.2rem; }
    
    /* Wrap the flexbox on mobile so image stacks */
    .wrapped-container {
      flex-direction: column-reverse; /* Puts image above or below? Usually below text on mobile looks good, or above. Let's do column so Image is bottom or Text is top. */
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }
    
    .wrapped-image-card {
      width: 100%;
      max-width: 400px;
    }

    .wrapped-content { padding-right: 0; }
  }
</style>

<div class="intro-wrapper">
<div class="announcement-box">
  📢 Latest: <a href="https://www.instagram.com/p/DUNTVudAAU4/" target="_blank" style="color: #007bff; font-weight: 600;">Recruitment Post is Live!</a>
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
