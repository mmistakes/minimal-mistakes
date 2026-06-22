---
permalink: /about/
layout: page
title: "About"
---
{% assign about = site.data.about %}
{% assign career = site.data.career %}
{% assign posts = site.data.posts_external %}
{% assign social = site.data.social %}

<div class="col-760">

  <!-- Hero -->
  <section class="about-hero">
    <h1 class="display-name">{{ about.hero.name_line1 }}<br>{{ about.hero.name_line2 }}</h1>
    <div class="hero-rule"></div>
    <div class="hero-lockup">
      <div class="hero-role">{{ about.hero.role | join: "<br>" }}</div>
      <p class="hero-bio">{{ about.hero.bio }}</p>
    </div>
  </section>

  <!-- Career -->
  <section class="career-section">
    <div class="section-label">
      <span class="section-label-text">01 — Career</span>
      <span class="section-rule"></span>
    </div>
    <div>
      {% for job in career %}
      <div class="timeline-entry">
        <div class="timeline-year">{{ job.start }}<br><span class="year-end">{{ job.end }}</span></div>
        <div class="timeline-rail">
          {% unless forloop.last %}<div class="timeline-rail-line"></div>{% endunless %}
          <div class="timeline-dot{% if job.current %} current{% endif %}"></div>
        </div>
        <div>
          <div class="timeline-company">{{ job.company }}{% if job.company_sub %} <span class="timeline-company-sub">{{ job.company_sub }}</span>{% endif %}</div>
          <div class="timeline-role">{{ job.role }} · {{ job.location }}</div>
          <div class="timeline-desc">{{ job.description }}</div>
        </div>
      </div>
      {% endfor %}
    </div>
  </section>

  <!-- Writing -->
  <section class="writing-section">
    <div class="section-label">
      <span class="section-label-text">02 — Recent writing</span>
      <span class="section-rule"></span>
    </div>
    <div class="writing-list">
      {% for post in posts %}
      <a href="{{ post.url }}" class="writing-item" target="_blank" rel="noopener">
        <div>
          <div class="writing-item-title">{{ post.title }}</div>
          <div class="writing-item-source">{{ post.source }}</div>
        </div>
        <div class="writing-item-year">{{ post.date | date: "%Y" }}</div>
      </a>
      {% endfor %}
    </div>
    <div class="view-all">
      <a href="/blog/">View all writing →</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-copy">{{ about.footer.location }}</div>
    <div class="footer-socials">
      {% for link in social %}
      <a href="{{ link.url }}" title="{{ link.label }}">{% include icon.html name=link.icon %}</a>
      {% endfor %}
    </div>
  </footer>

</div>
