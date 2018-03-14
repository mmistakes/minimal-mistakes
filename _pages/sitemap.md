---
layout: archive
title: "Sitemap"
excerpt: "Einen Überblick über unsere Inhalte."
permalink: /sitemap/
author_profile: false
---

Hier finden Sie eine Auflistung aller unserer Inhalte auf unserer Website. Wir
sind auch freundlich zu unseren automatisierten Besuchern (z.B. google suche und
co), denn für dich gibt es auch eine [XML version]({{ "sitemap.xml" |
relative_url }}) zum einfacheren verdauen.

<h2>Seiten</h2>
{% for post in site.pages %}
  {% include archive-single.html %}
{% endfor %}

{% if site.posts.size > 0 %}
<h2>Posts</h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}
{% endif %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
