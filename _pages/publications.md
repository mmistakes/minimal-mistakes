---
title: "Publications"
layout: single
permalink: /publications/
author_profile: true
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/website_banner.png
classes: wide

intro: 
  - excerpt: 'Ph.D. Publications'

paper2:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "An augmented Lagrangian algorithm for recovery of ice thickness in unidirectional flow using the Shallow Ice Approximation"
    text: 'Abstract'
    url: "https://arxiv.org/abs/2108.00854"
    btn_label: "Arvix"
    btn_class: "btn--primary"

paper1:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Bedrock reconstruction from free surface data for unidirectional glacier flow with basal slip"
    text: 'Abstract'
    url: "https://link.springer.com/article/10.1007/s00707-020-02845-x"
    btn_label: "Acta Mechanica"
    btn_class: "btn--primary"
    url2: "https://arxiv.org/abs/2006.13310"
    btn_label2: "arXiv"
    btn_class: "btn--primary"
    
feature_row1-1:
  - image_path: assets/images/posts/starbucks-cluster-conversion-rates.png
    alt: "Clusterisation results based on Conversion Rates"
    title: "Target Audience for Starbucks Rewards App"
    text: "In this project, I analyzed the customer behavior in the Starbucks Rewards Mobile App. After signing up for the app, customers receive promotions every few days. The task was to identify which customers are influenced by promotional offers the most and what types of offers to send them in order to maximize the revenue. I used PCA and K-Means clustering to arrive at 3 customer segments (Disinterested, BOGO, Discount) based on Average Conversion Rates and explored their demographic profiles and shopping habits."
    url: "https://github.com/k-bosko/Starbucks_rewards"
    btn_label: "Code + Presentation"
    btn_class: "btn--primary"
    url2: "/Starbucks-Rewards-Program/"
    btn_label2: "Technical Report"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row id="paper1" type="left" %}

{% include feature_row id="paper2" type="left" %}

{% include feature_row id="feature_row1-1" type="left" %}
