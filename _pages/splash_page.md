---
title: "Practice makes perfect"
layout: splash
permalink: /
date: 2016-03-23T11:48:41-04:00
author_profile: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: "Share and learn more knowledges to go even further"
intro: 
  - excerpt: "I'm a Full Stack Developer with 7 years of experience. I acquired some knowledge in different area which allow me to better understand things to go even further. I always want to learn more, that's why I created this blog in order to share my knowledge."
feature_row1:
  - image_path: /assets/images/jordan-ladikos-62738.jpg
    alt: "placeholder image 2"
    title: "Create a reactive meteo station"
    excerpt: 'Design a full reactive architecture interacting with a Raspberry PI 3'
    url: /automation/reactive-meteo-station
    btn_label: "Read More"
    btn_class: "btn--inverse"
feature_row2:
  - image_path: /assets/images/anthony-rossbach-59486.jpg
    alt: "placeholder image 2"
    title: "Create a sprinkler system"
    excerpt: 'Create and control a sprinkler system with a Raspberry PI'
    url: /automation/sprinkler
    btn_label: "Read More"
    btn_class: "btn--inverse"
---
{% include feature_row id="intro" type="center" %}

{% include feature_row id="feature_row1" type="left" %}

{% include feature_row id="feature_row2" type="right" %}

{% plantuml %}
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
{% endplantuml %}
