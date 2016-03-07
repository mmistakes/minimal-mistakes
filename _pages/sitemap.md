---
layout: archive
title: "Sitemap"
permalink: /sitemap/
---
{% include absolute-url.liquid %}

A list of all the posts and pages found on the site. For you robots out there is an [XML version]({{ absurl }}/sitemap.xml) available for digesting as well.

<h3>Pages</h3>
{% for post in site.pages %}
  {% include archive-list-single.html %}
{% endfor %}

<h3>Posts</h3>
{% for post in site.posts %}
  {% include archive-list-single.html %}
{% endfor %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == 'posts' %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h3>{{ label }}</h3>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == 'posts' %}
  {% include archive-list-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}