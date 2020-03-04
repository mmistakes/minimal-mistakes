---
layout: collection
title: "Open positions"
permalink: /jobs/
author_profile: false
---

I have just completed recruitment for the 5 positions below. If you have an interest in these kinds of projects please contact me to discuss future positions.
{: .notice--info}


<div class="grid__wrapper">
  {% for post in site.jobs %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>
