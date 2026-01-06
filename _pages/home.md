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
    padding: 3rem 1rem 2rem 1rem;
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

  .social-icons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 25px;
  }

  .social-icons a i:hover {
    transform: scale(1.2);
    transition: 0.3s ease;
  }

  /* Wrapped Section - Smaller */
  .wrapped-section {
    background-color: #f9fafb;
    padding: 2.5rem 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .wrapped-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .wrapped-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 1rem;
  }
  
  .wrapped-image-container {
    max-width: 500px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .wrapped-image-container:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }
  
  .wrapped-image-container img {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Preview Sections */
  .preview-section {
    padding: 3rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .preview-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #111;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  /* Unified Grid for all cards - 4 columns */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  /* Universal card styling */
  .card {
    background-color: #fff;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #111;
    margin-bottom: 0.5rem;
  }

  .card p {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
    flex-grow: 1;
  }

  .button-link {
    display: inline-block;
    margin: 0 auto;
    padding: 0.9rem 2rem;
    background-color: #007bff;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  }

  .button-link:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }

  /* Contact Section */
  .contact-section {
    background-color: #f8fafc;
    padding: 3rem 2rem;
    border-top: 1px solid #eaeaea;
    margin-top: 2rem;
  }

  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .contact-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 1rem;
  }

  .contact-header p {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 1000px;
  }

  .contact-card {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .contact-icon {
    font-size: 2rem;
    color: #007bff;
    margin-bottom: 1rem;
  }

  .contact-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: #111;
  }

  .contact-card p,
  .contact-card a {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .contact-card a {
    transition: color 0.3s ease;
    text-decoration: none;
    border-bottom: 1px dashed #007bff;
  }

  .contact-card a:hover {
    color: #007bff;
  }

  .join-button {
    margin-top: 2rem;
    padding: 1rem 2.5rem;
    background-color: #007bff;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  }

  .join-button:hover {
    background-color: #0056b3;
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 123, 255, 0.4);
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .tagline {
      font-size: 2.2rem;
    }
    
    .intro-text {
      font-size: 1rem;
    }

    .grid-container {
      grid-template-columns: 1fr;
    }

    .contact-details {
      grid-template-columns: 1fr;
    }

    .wrapped-section {
      padding: 2rem 1rem;
    }

    .wrapped-section h2 {
      font-size: 1.3rem;
    }

    .preview-section {
      padding: 2rem 1rem;
    }

    .preview-section h2 {
      font-size: 1.75rem;
    }
  }
</style>

<div class="intro-wrapper">
  <div class="announcement-box">
    📢 Latest: Beginner's Hypothesis for Freshers and Sophomores is Live! 
  </div>
  <h1 class="tagline">Code <span class="highlight-train">Train</span> Predict</h1>
  <p class="intro-text">
    We are a student-led community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning.
  </p>
  <div class="social-icons">
    <a href="https://github.com/dsgiitr" target="_blank">
      <i class="fab fa-github fa-2x" style="color: black;"></i>
    </a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank">
      <i class="fab fa-linkedin fa-2x" style="color: #0a66c2;"></i>
    </a>
    <a href="https://x.com/dsg_iitr" target="_blank">
      <i class="fab fa-twitter fa-2x" style="color: #1da1f2;"></i>
    </a>
    <a href="https://www.instagram.com/dsgiitr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
      <i class="fab fa-instagram fa-2x" style="color: #e4405f;"></i>
    </a>
  </div>
</div>

<section class="wrapped-section">
  <div class="wrapped-container">
    <h2>DSG 2025 Wrapped</h2>
    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" target="_blank" class="wrapped-image-container">
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
  <h2>Featured Projects & Blogs</h2>
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
    
    <a href="https://forms.gle/exampleRecruitmentForm" class="join-button">
      Contact Us
    </a>
  </div>
</section>
