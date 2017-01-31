---
layout: archive
title: "Courses"
permalink: /courses/
author_profile: true
---

{% capture label %}{{ site.courses.label }}{% endcapture %}
<h2 id="{{ label | slugify }}" class="archive__subtitle">{{ label }}</h2>
{% for post in site.courses.docs %}
    {% include archive-single.html %}
{% endfor %}
