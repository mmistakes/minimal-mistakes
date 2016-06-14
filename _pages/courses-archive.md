---
permalink: /courses/
title: "Courses"
modified: 2016-06-10T15:25:37-04:00
---

{% include base_path %}

<div class="grid__wrapper">
  {% for post in site.courses %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
