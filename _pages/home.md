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
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
  }
  .announcement-box {
    background-color: 
#e6f0ff;
    border-radius: 12px;
    padding: 10px 20px;
    font-size: 0.95rem;
    margin-bottom: 2rem;
    color: 
#004080;
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

  .social-icons a img:hover {
    transform: scale(1.2);
    transition: 0.3s ease;
  }

  /* Contact Section */
  .contact-section {
    background-color: #f8fafc;
    padding: 3rem 2rem; /* Reduced padding */
    border-top: 1px solid #eaeaea;
    margin-top: 0; /* Remove margin */
  }

  .contact-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 2rem; /* Reduced margin */
  }

  .contact-header h2 {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
  }

  .contact-header p {
    font-size: 1.1rem;
    color: var(--text-body);
    max-width: 600px;
    margin: 0 auto;
  }

  .contact-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem; /* Reduced gap */
    margin-top: 1rem;
    width: 100%;
  }

  .contact-card {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-width: 250px;
    flex: 1;
  }

  .contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .contact-icon {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .contact-card h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    color: var(--text-dark);
  }

  .contact-card p, .contact-card a {
    color: var(--text-body);
    line-height: 1.5;
  }

  .contact-card a {
    transition: var(--transition);
    text-decoration: none;
    border-bottom: 1px dashed var(--primary-color);
  }

  .contact-card a:hover {
    color: var(--primary-color);
  }

 .join-button {
  margin-top: 2rem;
  padding: 1rem 2.5rem;
  background-color: #007bff; /* Blue */
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.4); /* Subtle glow */
}

.join-button:hover {
  background-color: #339dff; /* Lighter blue on hover */
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(0, 123, 255, 0.4); /* Stronger glow */
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
  <div class="social-icons" style="margin-top: 20px;">
  <div style="margin-top: 20px; display: flex; justify-content: center; gap: 25px;">
  <a href="https://github.com/dsgiitr" target="_blank">
    <i class="fab fa-github fa-2x" style="color: black;"></i>
  </a>
  <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank">
    <i class="fab fa-linkedin fa-2x" style="color: 
#0a66c2;"></i>
  </a>
  <a href="https://x.com/dsg_iitr" target="_blank">
    <i class="fab fa-twitter fa-2x" style="color: 
#1da1f2;"></i>
  </a>
  <a href="https://www.instagram.com/dsgiitr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank">
    <i class="fab fa-instagram fa-2x" style="color: 
#e4405f;"></i>
  </a>
</div>
</div>
</div>
<section class="preview-section">
  <h2>Featured Research</h2>
  <div class="grid-container">
    {% include research-card.html %}
  </div>
  <a href="https://dsgiitr.github.io/dsg-website/research/" class="button-link">Explore Research</a>
</section>
<section class="preview-section">
  <h2>Projects</h2>
  <div class="grid-container">
    {% include project-card.html %}
  </div>
  <a href="https://dsgiitr.github.io/dsg-website/projects/" class="button-link">See Projects</a>
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
