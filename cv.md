---
layout: default
title: CV
permalink: /cv/
---
{%- assign cv = site.data.profile.cv -%}
{%- if cv.pdf %}
<object class="cv-embed" data="{{ cv.pdf | relative_url }}" type="application/pdf">
  <p><a href="{{ cv.pdf | relative_url }}">Open the CV (PDF)</a></p>
</object>
{%- elsif cv.url %}
<p><a href="{{ cv.url }}" target="_blank" rel="noopener">Open the CV</a></p>
{%- else %}
<p>CV will be available soon.</p>
{%- endif %}
