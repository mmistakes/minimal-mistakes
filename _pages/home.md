---
layout: splash
permalink: /
title: Home
---
<style>
  /* Global Styles */
  :root {
    --primary-color: #007bff;
    --secondary-color: #0056b3;
    --accent-color: #e6f0ff;
    --text-dark: #111827;
    --text-body: #4b5563;
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --transition: all 0.3s ease;
  }

  /* Hero Section */
  .intro-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 5rem 1.5rem 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Announcement Banner */
  .announcement-box {
    background-color: var(--accent-color);
    border-left: 4px solid var(--primary-color);
    border-radius: 8px;
    padding: 14px 24px;
    font-size: 1rem;
    margin-bottom: 3rem;
    color: var(--secondary-color);
    font-weight: 600;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    max-width: 100%;
  }
  
  .announcement-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .announcement-icon {
    margin-right: 10px;
    font-size: 1.2rem;
  }

  /* Main Tagline */
  .tagline {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(to right, var(--text-dark) 0%, var(--primary-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 0.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .tagline .highlight-train {
    color: var(--primary-color);
    font-weight: 900;
    font-style: normal;
    position: relative;
    display: inline-block;
  }

  .tagline .highlight-train::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: rgba(0, 123, 255, 0.2);
    z-index: -1;
  }

  /* Introduction Text */
  .intro-text {
    font-size: 1.25rem;
    color: var(--text-body);
    margin-top: 1.5rem;
    max-width: 700px;
    line-height: 1.6;
  }

  /* Social Icons */
  .social-icons {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    gap: 25px;
  }

  .social-icons a {
    transition: var(--transition);
    opacity: 0.85;
  }

  .social-icons a:hover {
    transform: translateY(-3px) scale(1.1);
    opacity: 1;
  }

  /* Preview Sections */
  .preview-section {
    padding: 4rem 2rem;
    background-color: #fafafa;
    margin-top: 3rem;
    border-top: 1px solid #eaeaea;
  }

  .preview-section h2 {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    color: var(--text-dark);
    position: relative;
  }

  .preview-section h2::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
  }

  .button-link {
    display: inline-block;
    margin: 2.5rem auto 0;
    padding: 0.8rem 2rem;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
  }

  .button-link:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Contact Section */
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

  .contact-header {
    text-align: center;
    margin-bottom: 3rem;
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
    gap: 2.5rem;
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

  /* Join Us Button */
  .join-button {
    margin-top: 3rem;
    padding: 1rem 2.5rem;
    background-color: var(--primary-color);
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    display: inline-block;
  }

  .join-button:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .intro-wrapper {
      padding: 3rem 1rem;
    }
    
    .tagline {
      font-size: 2.8rem;
    }
    
    .intro-text {
      font-size: 1.1rem;
    }
    
    .contact-details {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .contact-card {
      width: 100%;
    }

    .preview-section {
      padding: 3rem 1rem;
    }
  }
</style>

<div class="intro-wrapper">
  <div class="announcement-box">
    <span class="announcement-icon">🚀</span>
    Applications open for Spring '25 recruitment! Apply by April 30th
  </div>
  
  <h1 class="tagline">Code <span class="highlight-train">Train</span> Predict</h1>
  
  <p class="intro-text">
    We are a student-led research community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning through innovative projects and collaborative research.
  </p>
  
  <div class="social-icons">
    <a href="https://github.com/dsgiitr" target="_blank" aria-label="GitHub">
      <i class="fab fa-github fa-2x" style="color: #24292e;"></i>
    </a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank" aria-label="LinkedIn">
      <i class="fab fa-linkedin fa-2x" style="color: #0a66c2;"></i>
    </a>
    <a href="https://x.com/dsg_iitr" target="_blank" aria-label="Twitter/X">
      <i class="fab fa-twitter fa-2x" style="color: #1da1f2;"></i>
    </a>
    <a href="https://www.instagram.com/dsgiitr?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" aria-label="Instagram">
      <i class="fab fa-instagram fa-2x" style="color: #e4405f;"></i>
    </a>
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
    <p>Data Science Group<br>IIT Roorkee<br>Uttarakhand, India</p>
  </div>
  
  <div class="contact-card">
    <i class="fas fa-comments contact-icon"></i>
    <h3>Follow Us</h3>
    <p>Stay updated with our latest research and events on social media</p>
  </div>
  </div>
  
  <a href="https://forms.gle/exampleRecruitmentForm" class="join-button">
    Join Our Team
    </a>
  </div>
</section>
