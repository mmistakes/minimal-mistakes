---
layout: splash
permalink: /
title: Home
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
  :root {
    /* Academic Palette */
    --font-heading: 'Libre Baskerville', Georgia, serif;
    --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    
    --color-text: #1a1a1a;
    --color-subtext: #555;
    --color-accent: #0056b3; /* A serious, deep blue */
    --color-border: #e0e0e0;
    --bg-color: #ffffff;
    --bg-secondary: #f9f9f9;
  }

  body {
    background-color: var(--bg-color);
    color: var(--color-text);
    font-family: var(--font-body);
    line-height: 1.6;
  }

  h1, h2, h3 {
    font-family: var(--font-heading);
    color: #111;
  }

  /* --- HERO SECTION --- */
  .hero-wrapper {
    padding: 6rem 1rem 4rem 1rem;
    max-width: 800px;
    margin: 0 auto;
    text-align: left; /* Left align feels more formal/academic */
  }

  .tagline {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }

  .intro-text {
    font-size: 1.25rem;
    color: var(--color-subtext);
    font-weight: 300;
    max-width: 650px;
    margin-bottom: 2rem;
  }

  /* Minimal Social Links */
  .social-links {
    display: flex;
    gap: 20px;
    font-family: var(--font-body);
    font-size: 0.95rem;
  }

  .social-links a {
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .social-links a:hover {
    color: var(--color-accent);
    border-bottom: 1px solid var(--color-accent);
  }

  /* --- SECTIONS --- */
  .section-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 1rem;
    border-top: 1px solid var(--color-border);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2.5rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
    margin: 0;
  }

  .view-all-link {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-subtext);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 2px;
  }

  .view-all-link:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  /* --- GRID (Clean, Wireframe style) --- */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  /* --- CARD STYLING (The "Paper" Look) --- */
  /* This targets the content coming from your includes */
  .card {
    background: transparent;
    border: 1px solid var(--color-border); /* Thin, clean border */
    border-radius: 4px; /* Slight rounding, not pill-like */
    padding: 1.5rem;
    transition: border-color 0.2s;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: none !important; /* Force remove shadows */
  }

  .card:hover {
    border-color: var(--color-accent);
    transform: none; /* No movement, just color change */
  }

  .card img {
    border-radius: 2px;
    filter: grayscale(10%); /* Slight desaturation for seriousness */
    transition: filter 0.3s;
  }
  
  .card:hover img {
    filter: grayscale(0%);
  }

  .card h3 {
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-body); /* Keep card titles readable sans-serif */
    font-weight: 600;
  }

  /* --- WRAPPED SECTION (Journal Highlight) --- */
  .wrapped-highlight {
    background-color: var(--bg-secondary);
    border: 1px solid var(--color-border);
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .wrapped-highlight img {
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .wrapped-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .wrapped-content p {
    color: var(--color-subtext);
    margin-bottom: 1rem;
  }

  /* --- FOOTER / CONTACT --- */
  .footer-simple {
    text-align: left;
    padding-top: 2rem;
    font-size: 0.9rem;
    color: var(--color-subtext);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .contact-email {
    font-size: 1.2rem;
    color: var(--color-text);
    text-decoration: none;
    font-family: var(--font-heading);
    border-bottom: 1px solid #ccc;
  }

  @media (max-width: 768px) {
    .hero-wrapper { padding-top: 3rem; }
    .tagline { font-size: 2.2rem; }
    .wrapped-highlight { flex-direction: column; text-align: left; }
    .footer-simple { grid-template-columns: 1fr; }
  }
</style>

<div class="hero-wrapper">
  <div style="font-size: 0.85rem; color: var(--color-accent); margin-bottom: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
    New Publication
  </div>
  
  <h1 class="tagline">Beginner's Hypothesis for Freshers & Sophomores is Live.</h1>
  
  <p class="intro-text">
    Code. Train. Predict. <br>
    We are the Data Science Group at IIT Roorkee, a student-led community dedicated to research in Artificial Intelligence and Machine Learning.
  </p>

  <div class="social-links">
    <a href="https://github.com/dsgiitr" target="_blank">GitHub ↗</a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" target="_blank">LinkedIn ↗</a>
    <a href="https://x.com/dsg_iitr" target="_blank">Twitter/X ↗</a>
    <a href="mailto:dsg@iitr.ac.in">dsg@iitr.ac.in ↗</a>
  </div>
</div>

<div class="section-container" style="border-top: none; padding-top: 0;">
  <div class="wrapped-highlight">
    <div class="wrapped-content">
      <h3>DSG Year in Review: 2025</h3>
      <p>A comprehensive look at our publications, workshops, and community growth over the past year.</p>
      <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" class="view-all-link">Read Full Report</a>
    </div>
    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7414305796987056128/" target="_blank">
      <img src="{{ site.baseurl }}/assets/images/dsg_wrapped.png" alt="DSG 2025 Wrapped">
    </a>
  </div>
</div>

<section class="section-container">
  <div class="section-header">
    <h2>Selected Research</h2>
    <a href="{{ site.baseurl }}/research/" class="view-all-link">View Archive &rarr;</a>
  </div>
  <div class="grid-container">
    {% include research-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Projects & Code</h2>
    <a href="{{ site.baseurl }}/projects/" class="view-all-link">View Repository &rarr;</a>
  </div>
  <div class="grid-container">
    {% include project-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Community Events</h2>
    <a href="{{ site.baseurl }}/events/" class="view-all-link">View Calendar &rarr;</a>
  </div>
  <div class="grid-container">
    {% include events-card.html %}
  </div>
</section>

<section class="section-container">
  <div class="footer-simple">
    <div>
      <p style="text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 1rem;">Contact</p>
      <a href="mailto:dsg@iitr.ac.in" class="contact-email">dsg@iitr.ac.in</a>
      <p style="margin-top: 1rem;">
        SAC Building, Ground Floor<br>
        IIT Roorkee, Uttarakhand
      </p>
    </div>
    <div>
      <p style="text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 1rem;">Navigation</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <a href="#" style="text-decoration: none; color: #555;">About DSG</a>
        <a href="#" style="text-decoration: none; color: #555;">Team Members</a>
        <a href="#" style="text-decoration: none; color: #555;">Publications</a>
      </div>
    </div>
  </div>
</section>
