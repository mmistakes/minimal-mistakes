---
title: "Practice makes perfect"
layout: splash
permalink: /
date: 2016-03-23T11:48:41-04:00
author_profile: true
header:
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
excerpt: "Share and learn more knowledge to go even further"

intro:
  - show_avatar: true
  - excerpt: "I'm a Full Stack Developer with 9 years of experience. I acquired some knowledge in different area which allow me to better understand things to go even further. I always want to learn more, that's why I created this blog in order to share my knowledge."
feature_row1:
  - image_path: /assets/images/jordan-ladikos-62738.jpg
    alt: "placeholder image 2"
    title: "Create a reactive weather station"
    excerpt: 'Design a full reactive architecture interacting with a Raspberry PI 3'
    url: /automation/reactive-weather-station
    btn_label: "Read More"
    btn_class: "btn--inverse"
feature_row2:
  - image_path: /assets/images/anthony-rossbach-59486.jpg
    alt: "placeholder image 2"
    title: "Create a sprinkler system"
    excerpt: 'Create and control a sprinkler system with a Raspberry PI (In progress...)'
    url: /automation/sprinkler
    btn_label: "Read More"
    btn_class: "btn--inverse"
feature_row3:
  - image_path: /assets/images/maico-amorim-57141.jpg
    alt: "placeholder image 2"
    title: "NextRun"
    excerpt: 'Create and plan your sport workout'
    url: /project/nextrun
    btn_label: "Read More"
    btn_class: "btn--inverse"
feature_row4:
  - image_path: /assets/images/alarming.jpg
    alt: "placeholder image 2"
    title: "Security alarm"
    excerpt: 'Alarming system with Raspberry PI (Coming Soon)'
    url: /project/alarming-system
    btn_label: "Read More"
    btn_class: "btn--inverse"
---
{% include feature_row id="intro" type="center" %}

{% include feature_row id="feature_row1" type="left" %}

{% include feature_row id="feature_row2" type="right" %}

{% include feature_row id="feature_row3" type="left" %}

{% include feature_row id="feature_row4" type="right" %}
