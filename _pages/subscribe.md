---
title: "Stay Connected"
permalink: /subscribe/
layout: single
---

<div class="subscribe-container">
  <h1 class="page__title text-center">Never Miss an Update</h1>
  
  <div class="subscription-options">
    <div class="option-card">
      <div class="option-icon">
        <i class="fas fa-envelope fa-3x neon-glow"></i>
      </div>
      <h2>Email Updates</h2>
      <p>Get my latest posts, certificate announcements, and exclusive content delivered directly to your inbox.</p>
      
      {% include newsletter-signup.html %}
    </div>
    
    <div class="option-card">
      <div class="option-icon">
        <i class="fas fa-rss fa-3x neon-glow"></i>
      </div>
      <h2>RSS Feed</h2>
      <p>Prefer to use an RSS reader? Subscribe to my feed to get all updates in your favorite RSS reader.</p>
      
      <div class="text-center">
        <a href="/feed.xml" class="btn btn--primary btn--large">
          <i class="fas fa-rss"></i> Subscribe via RSS
        </a>
        
        <div class="rss-instructions">
          <p class="small text-muted">Not sure how to use RSS?</p>
          <p class="small">1. Copy this link: <code>{{ site.url }}{{ site.baseurl }}/feed.xml</code></p>
          <p class="small">2. Paste it into your favorite RSS reader (like Feedly, Inoreader, or NewsBlur)</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="social-follow">
    <h2 class="text-center">Follow Me Elsewhere</h2>
    
    <div class="social-icons">
      <a href="#" class="social-icon">
        <i class="fab fa-linkedin fa-2x"></i>
        <span>LinkedIn</span>
      </a>
      
      <a href="#" class="social-icon">
        <i class="fab fa-github fa-2x"></i>
        <span>GitHub</span>
      </a>
      
      <a href="#" class="social-icon">
        <i class="fab fa-twitter fa-2x"></i>
        <span>Twitter</span>
      </a>
      
      <a href="#" class="social-icon">
        <i class="fab fa-twitch fa-2x"></i>
        <span>Twitch</span>
      </a>
    </div>
  </div>
</div>

<style>
.subscribe-container {
  max-width: 1200px;
  margin: 0 auto;
}

.subscription-options {
  display: flex;
  gap: 2em;
  margin: 3em 0;
}

.option-card {
  flex: 1;
  padding: 2em;
  background: linear-gradient(135deg, rgba(18, 0, 82, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%);
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 
              0 0 20px rgba(255, 0, 255, 0.2);
  transition: all 0.3s ease;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), 
              0 0 30px rgba(255, 0, 255, 0.4);
  border-color: rgba(255, 0, 255, 0.6);
}

.option-icon {
  text-align: center;
  margin-bottom: 1em;
}

.text-center {
  text-align: center;
}

.btn--large {
  padding: 0.75em 1.5em;
  font-size: 1.1em;
}

.rss-instructions {
  margin-top: 1.5em;
  padding: 1em;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

code {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.social-follow {
  margin-top: 4em;
}

.social-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2em;
  margin-top: 2em;
}

.social-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5em;
}

.social-icon:hover {
  color: #ff00ff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
  transform: translateY(-3px);
}

.social-icon i {
  margin-bottom: 0.5em;
}

.small {
  font-size: 0.9em;
}

.text-muted {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .subscription-options {
    flex-direction: column;
  }
  
  .social-icons {
    gap: 1em;
  }
}
</style>