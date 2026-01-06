---
layout: splash
permalink: /
title: Home
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

<style>
  :root {
    --font-heading: 'Libre Baskerville', Georgia, serif;
    --font-body: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace; /* New for Data vibe */
    
    --color-text: #111;
    --color-subtext: #555;
    --color-meta: #777;
    --color-accent: #0056b3; 
    --color-border: #e5e5e5;
    --bg-secondary: #f8f9fa;
  }

  body {
    background-color: #ffffff;
    color: var(--color-text);
    font-family: var(--font-body);
    line-height: 1.6;
    margin: 0;
  }

  h1, h2, h3 { font-family: var(--font-heading); color: #111; }
  a { color: var(--color-text); text-decoration: none; transition: color 0.2s; }
  a:hover { color: var(--color-accent); }

  /* --- SUBTLE DATA PATTERN HERO --- */
  .hero-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 7rem 2rem 5rem 2rem;
    text-align: left;
    /* Subtle dot grid pattern */
    background-image: radial-gradient(#d1d5db 1px, transparent 1px);
    background-size: 24px 24px;
    /* Fade out the pattern at the bottom */
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }

  .announcement-pill {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    background: #eef2ff;
    color: var(--color-accent);
    padding: 6px 12px;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    display: inline-block;
    border: 1px solid #dbeafe;
  }

  .tagline {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    max-width: 900px;
  }

  .intro-text {
    font-size: 1.2rem;
    color: var(--color-subtext);
    font-weight: 300;
    max-width: 680px;
    margin-bottom: 2rem;
  }

  /* --- SECTIONS --- */
  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    border-top: 1px solid var(--color-border);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2.5rem;
  }

  .section-header h2 { font-size: 1.8rem; margin: 0; }

  .view-all {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-border);
  }

  /* --- COMPONENT 1: RESEARCH LIST (The "Scholar" Look) --- */
  /* Replaces cards for research */
  .research-list {
    display: flex;
    flex-direction: column;
    gap: 0; /* No gap, using borders */
  }

  .research-item {
    display: grid;
    grid-template-columns: 120px 1fr; /* Date on left, content on right */
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--color-border);
    transition: background 0.2s;
  }

  .research-item:first-child { border-top: 1px solid var(--color-border); }

  .research-date {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--color-meta);
    padding-top: 0.2rem;
  }

  .research-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    font-family: var(--font-heading);
  }
  
  .research-excerpt {
    font-size: 0.95rem;
    color: var(--color-subtext);
    margin: 0;
    max-width: 700px;
  }

  /* --- COMPONENT 2: PROJECT GRID (The "Portfolio" Look) --- */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
  }

  .project-card {
    border: 1px solid var(--color-border);
    background: white;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
    border-color: var(--color-text);
  }

  .project-img {
    width: 100%;
    height: 200px;
    background-color: #f0f0f0; /* Placeholder color */
    object-fit: cover;
    border-bottom: 1px solid var(--color-border);
  }

  .project-content { padding: 1.5rem; }
  .project-title { margin-top: 0; font-size: 1.1rem; font-weight: 600; }
  .project-desc { font-size: 0.9rem; color: var(--color-subtext); }

  /* --- FOOTER --- */
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    padding-top: 2rem;
    font-size: 0.9rem;
    color: var(--color-subtext);
  }

  @media (max-width: 768px) {
    .tagline { font-size: 2.5rem; }
    .research-item { grid-template-columns: 1fr; gap: 0.5rem; }
    .footer-grid { grid-template-columns: 1fr; }
  }
</style>

<div class="hero-wrapper">
  <div class="announcement-pill">
    UPDATE: 2025 RECRUITMENT LIVE
  </div>
  
  <h1 class="tagline">Code. Train. Predict.</h1>
  
  <p class="intro-text">
    We are the Data Science Group at IIT Roorkee. We bridge the gap between academic theory and real-world AI applications.
  </p>

  <div style="display: flex; gap: 20px; font-family: var(--font-mono); font-size: 0.9rem;">
    <a href="https://github.com/dsgiitr" style="border-bottom: 1px solid #ccc;">GitHub</a>
    <a href="https://www.linkedin.com/company/dsg-iitr/" style="border-bottom: 1px solid #ccc;">LinkedIn</a>
    <a href="mailto:dsg@iitr.ac.in" style="border-bottom: 1px solid #ccc;">Contact</a>
  </div>
</div>

<div class="section-container" style="padding-top: 0;">
  <div style="background: var(--bg-secondary); border: 1px solid var(--color-border); padding: 2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 3rem;">
    <div style="flex: 1; min-width: 300px;">
      <h3 style="font-size: 1.5rem; margin-top: 0;">DSG Wrapped 2025</h3>
      <p style="color: var(--color-subtext);">Our annual report covering 12 publications, 4 major hackathon wins, and 30+ workshops.</p>
      <a href="#" style="color: var(--color-accent); font-weight: 600;">Read Report &rarr;</a>
    </div>
    <div style="flex: 1; min-width: 300px;">
       <img src="{{ site.baseurl }}/assets/images/dsg_wrapped.png" alt="Wrapped" style="width: 100%; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
    </div>
  </div>
</div>

<section class="section-container">
  <div class="section-header">
    <h2>Recent Publications</h2>
    <a href="{{ site.baseurl }}/research/" class="view-all">Archive &rarr;</a>
  </div>
  
  <div class="research-list">
    
    <div class="research-item">
      <div class="research-date">Dec 2025</div>
      <div>
        <h3 class="research-title"><a href="#">Optimizing Sparse Autoencoders for Vision Transformers</a></h3>
        <p class="research-excerpt">Presented at NeurIPS 2025. Investigating the role of sparsity in interpretability of large vision models.</p>
      </div>
    </div>

    <div class="research-item">
      <div class="research-date">Oct 2025</div>
      <div>
        <h3 class="research-title"><a href="#">Graph Neural Networks in Molecular Discovery</a></h3>
        <p class="research-excerpt">A comparative study on GNN architectures for predicting molecular properties in drug discovery.</p>
      </div>
    </div>

     {% comment %} {% include research-list.html %} {% endcomment %}

  </div>
</section>

<section class="section-container">
  <div class="section-header">
    <h2>Open Source Projects</h2>
    <a href="{{ site.baseurl }}/projects/" class="view-all">GitHub &rarr;</a>
  </div>

  <div class="project-grid">
    {% include project-card.html %}
  </div>
</section>

<footer class="section-container" style="padding-bottom: 2rem;">
  <div class="footer-grid">
    <div>
      <h3 style="font-size: 1rem; margin-top: 0;">Data Science Group</h3>
      <p>IIT Roorkee, Uttarakhand, India.</p>
      <p><a href="mailto:dsg@iitr.ac.in">dsg@iitr.ac.in</a></p>
    </div>
    <div>
      <h3 style="font-size: 0.9rem; margin-top: 0;">Research</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <a href="#">Publications</a>
        <a href="#">Blog</a>
        <a href="#">Resources</a>
      </div>
    </div>
    <div>
      <h3 style="font-size: 0.9rem; margin-top: 0;">Social</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <a href="#">LinkedIn</a>
        <a href="#">Twitter</a>
        <a href="#">GitHub</a>
      </div>
    </div>
  </div>
</footer>
