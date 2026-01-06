---
layout: splash
permalink: /
title: Home
---

<div class="hero-wrapper">
  <span class="announcement-pill">📢 Latest: Beginner's Hypothesis for Sophomores is Live!</span>
  <h1 class="hero-tagline">Code. <span class="hero-highlight">Train</span>. Predict.</h1>
  <p class="hero-intro">
    We are a student-led community at IIT Roorkee exploring the frontiers of Data Science, Artificial Intelligence, and Machine Learning.
  </p>
  <div class="hero-links">
    <a href="https://github.com/dsgiitr" target="_blank" rel="noopener">
      <i class="fab fa-github" aria-hidden="true"></i>
      GitHub
    </a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank" rel="noopener">
      <i class="fab fa-linkedin" aria-hidden="true"></i>
      LinkedIn
    </a>
    <a href="https://x.com/dsg_iitr" target="_blank" rel="noopener">
      <i class="fab fa-twitter" aria-hidden="true"></i>
      X (Twitter)
    </a>
    <a href="https://www.instagram.com/dsgiitr" target="_blank" rel="noopener">
      <i class="fab fa-instagram" aria-hidden="true"></i>
      Instagram
    </a>
  </div>
</div>

<section class="section-container">
  <div class="highlight-panel">
    <div class="highlight-panel__text">
      <h3>DSG Wrapped 2025</h3>
      <p>
        Our annual report covering 8 publications in A* conferences, multiple projects, and collaborations with leading
        universities worldwide. Discover what our club achieved this year.
      </p>
      <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" target="_blank" rel="noopener" class="view-all-link">
        Read Report →
      </a>
    </div>
    <a
      href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/"
      target="_blank"
      rel="noopener"
      class="highlight-panel__media"
    >
      <img src="{{ site.baseurl }}/assets/images/dsg_wrapped.png" alt="DSG 2025 Year in Review" />
    </a>
  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Featured Research</h2>
    <a href="{{ site.baseurl }}/research/" class="view-all-link">Explore Research →</a>
  </div>
  <div class="research-list">
    {% include research-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Featured Project and Blog</h2>
    <a href="{{ site.baseurl }}/projects/" class="view-all-link">See Projects →</a>
  </div>
  <div class="project-grid">
    {% include project-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Featured Events</h2>
    <a href="{{ site.baseurl }}/events/" class="view-all-link">Events Archive →</a>
  </div>
  <div class="events-grid">
    {% include events-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="contact-panel">
    <div class="section-header" style="margin-bottom: 1rem;">
      <h2>Contact Us</h2>
    </div>
    <p>Have questions or interested in collaborating? Reach out to our team.</p>
    <div class="contact-grid">
      <div class="contact-card">
        <i class="fas fa-envelope contact-icon" aria-hidden="true"></i>
        <h3>Email</h3>
        <p><a href="mailto:dsg@iitr.ac.in">dsg@iitr.ac.in</a></p>
      </div>
      <div class="contact-card">
        <i class="fas fa-map-marker-alt contact-icon" aria-hidden="true"></i>
        <h3>Location</h3>
        <p>Ground Floor, SAC building<br />IIT Roorkee<br />Uttarakhand, India</p>
      </div>
      <div class="contact-card">
        <i class="fas fa-comments contact-icon" aria-hidden="true"></i>
        <h3>Follow Us</h3>
        <p>Stay updated with our latest research and events on social media.</p>
      </div>
    </div>
    <a href="#" class="join-button">Contact Us</a>
  </div>
</section>
