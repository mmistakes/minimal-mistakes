---
layout: splash
title: Contact
permalink: /contact/
---

<style>
  /* Base Layout */
  .contact-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: inherit;
  }
  .contact-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  /* Social / Follow Section */
  .social-section {
    text-align: center;
    margin-bottom: 4rem;
  }
  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
  .btn-social {
    padding: 0.75rem 1.5rem;
    background-color: #f1f3f5;
    color: #333;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  .btn-social:hover {
    background-color: #0056b3;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 86, 179, 0.2);
  }

  /* Interactive Contact Cards */
  .contact-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  .contact-card {
    background: #ffffff;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .contact-card:hover {
    border-color: #0056b3;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
  .contact-card h3 {
    margin-top: 0;
    color: #1a1a1a;
  }
  .contact-card p {
    color: #6c757d;
    font-size: 0.95rem;
    margin-bottom: 0;
  }
</style>

<div class="contact-wrapper">
  
  <div class="contact-header">
    <h2>Get in Touch</h2>
    <p>Whether you're a student, researcher, academic, or industry professional, we’d love to hear from you.</p>
  </div>

  <div class="social-section">
    <h3>Follow & Connect</h3>
    <div class="social-buttons">
      <a href="https://www.linkedin.com/company/dsg-iitr/posts/?feedView=all" class="btn-social" target="_blank">LinkedIn</a>
      <a href="https://www.instagram.com/dsgiitr/" class="btn-social" target="_blank">Instagram</a>
      <a href="https://github.com/dsgiitr" class="btn-social" target="_blank">GitHub</a>
    </div>
  </div>

  <h3 style="text-align: center; margin-bottom: 1.5rem;">How can we help you?</h3>
  <div class="contact-categories">
    <div class="contact-card" onclick="openForm('reachout')">
      <h3>👋 Reach Out</h3>
    </div>
    <div class="contact-card" onclick="openForm('feedback')">
      <h3>💡 Feedback</h3>
    </div>
    <div class="contact-card" onclick="openForm('inquiries')">
      <h3>💼 Inquiries</h3>
    </div>
  </div>

</div>

<script>
  function openForm(type) {
    const forms = {
      reachout: "https://docs.google.com/forms/d/e/1FAIpQLScDvtgKTujMtU_18Mqus_5X8uUzEX38GNB_8B3tnQKsT_IHyg/viewform",
      feedback: "https://docs.google.com/forms/d/e/1FAIpQLScDvtgKTujMtU_18Mqus_5X8uUzEX38GNB_8B3tnQKsT_IHyg/viewform", 
      inquiries: "https://docs.google.com/forms/d/e/1FAIpQLScDvtgKTujMtU_18Mqus_5X8uUzEX38GNB_8B3tnQKsT_IHyg/viewform" 
    };

    if(forms[type]) {
      window.open(forms[type], '_blank');
    }
  }
</script>