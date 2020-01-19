---
title: "About"
layout: splash
permalink: /about/
date: 2016-03-23T11:48:41-04:00
header:
  overlay_color: "#73857f"
  overlay_filter: "0"
  overlay_image: /assets/eyebanner.png
  actions:
    - label: "Learn More"
      url: "/terms/"
intro: 
  - excerpt: 'transparent, neutral data about the cloud computing landscape
'
feature_row:
  - image_path: assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Cloudmap"
    excerpt: "Browse public cloud regions and edge sites around the world."
    btn_label: "Read More"
    btn_class: "btn--primary" 
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "CloudWatch"
    excerpt: "Real time aggregated feed of public cloud status updates."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row2:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Left Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Left aligned with `type="left"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row3:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Right Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Right aligned with `type="right"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row4:
  - image_path: 
    alt: "placeholder image 2"
    title: "Placeholder Image Center Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Centered with `type="center"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row id="feature_row4" type="center" %}

## About the Data
The initial dataset covers all of the major cloud providers and their regions around the world. In the future, I will work to include regional and niche providers. Here is a list of coverage for the initial dataset:

![alibaba](/assets/64px/alibaba-icon-64) 
* Alibaba Cloud
* Amazon Web Services
* Microsoft Azure
* Digitalocean
* Google Cloud Platform
* IBM Cloud
* Oracle
* Packet
* Tencent

## Project Info and Disclaimer
investigate.cloud is a project created to provide geospatial data about cloud providers in a transparent, neutral way. 

So far, the majority of the data collected for investigate.cloud has been collected manually via publicly available information from cloud providers websites. More and more, I am working towards collecting data programmatically via APIs. I am not a developer by trade, and am looking for help. If you are interested in contributing to the project send me an email.

My long term goal is to make the project open source and provide programmatic access to the data sources via API.

investigate.cloud is not affiliated with any cloud providers and will not accept any compensation in return for improving data. In the future, I will look into monetizing the project to cover costs via sponsorships. If you are concerned with practices and metrics used in this benchmark feel free to contact me via mail or Twitter.
