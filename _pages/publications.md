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

feature_row1:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "An augmented Lagrangian algorithm for recovery of ice thickness in unidirectional flow using the Shallow Ice Approximation"
    excerpt: 'A key parameter in ice flow modelling is basal slipping at the ice-bed interface as it can have a large effect on the resultant ice thickness. Unfortunately, its contribution to surface observations can be hard to distinguish from that of bed undulations. Therefore, inferring the ice thickness from surface measurements is an interesting and non-trivial inverse problem. This paper presents a method for recovering dually the ice thickness and the basal slip using only surface elevation and speed measurements. The unidirectional shallow ice approximation is first implemented to model steady state ice flow for given bedrock and basal slip profiles. This surface is then taken as synthetic observed data. An augmented Lagrangian algorithm is then used to find the diffusion coefficient which gives the best fit to observations. Combining this recovered diffusion with observed surface velocity, a simple Newton's method is used to recover both the ice thickness and basal slip. The method was successful in each test case and this implies that it should be possible to recover both of these parameters in two-dimensional cases also.'
    url: "https://arxiv.org/abs/2108.00854"
    btn_label: "Arvix"
    btn_class: "btn--primary"

feature_row2:
  - title: "Bedrock reconstruction from free surface data for unidirectional glacier flow with basal slip"
    excerpt: 'Abstract'
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

{% include feature_row id="feature_row2" type="left" %}

{% include feature_row id="feature_row1" type="left" %}

{% include feature_row id="feature_row1-1" type="left" %}
