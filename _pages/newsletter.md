---
title: "Join the Neon Newsletter"
permalink: /newsletter/
layout: single
---

<div class="neon-signup text-center">
  <h2><span class="neon-glow">Get the Glow</span> in Your Inbox ✨</h2>
  
  <p class="lead">Stay up to date with my latest certification adventures and tech discoveries!</p>
  
  <div class="feature-row">
    <div class="feature-item">
      <i class="fas fa-certificate fa-2x neon-glow"></i>
      <h3>Certificate Guides</h3>
      <p>Detailed insights and study tips for the latest tech certifications</p>
    </div>
    
    <div class="feature-item">
      <i class="fas fa-lightbulb fa-2x neon-glow"></i>
      <h3>Learning Resources</h3>
      <p>Curated lists of the best tools, courses, and study materials</p>
    </div>
    
    <div class="feature-item">
      <i class="fas fa-puzzle-piece fa-2x neon-glow"></i>
      <h3>Project Templates</h3>
      <p>Downloadable templates for your own productivity systems</p>
    </div>
  </div>
  
  <div class="newsletter-highlight">
    <p>⚡ <strong>Be the first to know</strong> when I add new certificates to my collection</p>
    <p>⚡ <strong>Exclusive content</strong> not published on the blog</p>
    <p>⚡ <strong>Early access</strong> to my project templates and resources</p>
  </div>
  
  {% include newsletter-signup.html %}
  
  <p class="small text-muted">I typically send 1-2 emails per month. Your inbox is sacred, and I treat it with respect.</p>
</div>

<style>
.lead {
  font-size: 1.2em;
  margin-bottom: 2em;
}

.feature-row {
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
  gap: 1.5em;
}

.feature-item {
  flex: 1;
  padding: 1.5em;
  background: rgba(18, 0, 82, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 0, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 
              0 0 20px rgba(255, 0, 255, 0.3);
  border-color: rgba(255, 0, 255, 0.5);
}

.feature-item i {
  margin-bottom: 0.5em;
}

.newsletter-highlight {
  margin: 2em 0;
  font-size: 1.1em;
}

.text-center {
  text-align: center;
}

.text-muted {
  opacity: 0.7;
}

.small {
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .feature-row {
    flex-direction: column;
  }
}
</style>