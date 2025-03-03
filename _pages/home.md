---
layout: splash
permalink: /
hidden: true
header:
  overlay_color: "#120052"
  overlay_filter: 0.7
  overlay_image: /assets/images/neon-header.jpg
  actions:
    - label: "Explore My Achievements"
      url: "/certificate-gallery/"
title: "The Neon Vault"
excerpt: >
  Where achievements aren't just listed - they *glow*. Dive into my collection of digital credentials and professional milestones.
feature_row:
  - image_path: /assets/images/certificates/cert-thumb-1.jpg
    alt: "Featured Certificate"
    title: "The Cloud Maestro"
    excerpt: "AWS Solutions Architect certification - because architecting clouds is cooler than watching them."
    url: "/certificates/aws-solutions-architect/"
    btn_label: "Peek Inside"
    btn_class: "btn--primary"
  - image_path: /assets/images/certificates/cert-thumb-2.jpg
    alt: "Recent Achievement"
    title: "Azure Wizard Status: Unlocked"
    excerpt: "Microsoft decided I know enough about their cloud to give me official bragging rights."
    url: "/certificates/microsoft-azure-expert/"
    btn_label: "See the Proof"
    btn_class: "btn--primary"
  - image_path: /assets/images/certificates/cert-thumb-3.jpg
    alt: "Latest Addition"
    title: "Google's Stamp of Approval"
    excerpt: "My journey through Google Cloud, where I learned to think like a Googler (but with fewer free snacks)."
    url: "/certificates/google-cloud-professional/"
    btn_label: "View Details"
    btn_class: "btn--primary"
---

{% include feature_row %}

## Welcome to My Digital Achievement Vault

I collect certifications like some people collect vintage vinyl or rare sneakers. Each one represents a learning journey, countless late-night study sessions, and perhaps a few too many cups of coffee.

This neon-lit gallery showcases the milestones in my professional development - not just as paperwork to frame on a wall, but as stepping stones in my continuous growth.

## Latest Thoughts from the Learning Journey

{% assign posts = site.posts | sort: 'date' | reverse %}
{% for post in posts limit:3 %}
  {% include archive-single.html %}
{% endfor %}

<div class="text-center">
  <a href="{{ '/blog/' | relative_url }}" class="btn btn--info">More Musings</a>
</div>