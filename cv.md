---
layout: default
title: CV
permalink: /cv/
---
{%- assign cv = site.data.profile.cv -%}
{%- if cv.google_doc %}
{%- assign doc_base = "https://docs.google.com/document/d/" | append: cv.google_doc %}
<div class="cv-actions">
  <a href="{{ doc_base }}/export?format=pdf">Download PDF</a>
</div>
<iframe class="cv-embed" src="{{ doc_base }}/preview" title="CV"></iframe>
{%- elsif cv.url %}
<p><a href="{{ cv.url }}" target="_blank" rel="noopener">Open the CV</a></p>
{%- else %}
<p>CV will be available soon.</p>
{%- endif %}
