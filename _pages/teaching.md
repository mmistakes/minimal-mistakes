---
title: "Teaching"
layout: splash
permalink: /teaching
author_profile: false
---


<h2>{{ page.title }}</h2>

We teach master's degree courses, in the field of Automatic Control and Robotics at the specialization <strong>Robots and Autonomous Systems</strong>. Check out more at: <a href="https://risa.put.poznan.pl/">https://risa.put.poznan.pl/</a>.


<h2>Courses</h2>

{% assign courses = site.data.courses %}
<div class="grid__wrapper">
{% for f in courses %}
  {% assign course = f[1] %}
    {% include course-single.html type="grid" course=course %}
{% endfor %}

