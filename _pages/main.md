---
title: "Main Page"
layout: main
permalink: /main/
show_date: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/unsplash-image-1.jpg
  actions:
    - label: "Learn More"
      url: "/portfolio/"
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: 메인 화면
intro: 
  - excerpt: 코딩스킬도표 첨부

feature_row:
  - title: "Placeholder 1"
    btn_label: "Read More"
    btn_class: "btn--primary"

feature_row2:
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Introduce"
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
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder Image Center Aligned"
    excerpt: 'This is some sample content that goes here with **Markdown** formatting. Centered with `type="center"`'
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}