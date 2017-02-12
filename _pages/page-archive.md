---
layout: archive
title: "Page Archive"
permalink: /page-archive/
---
{% include absolute-url.liquid %}
{% for post in site.pages %}
<article itemscope itemtype="http://schema.org/CreativeWork">
{% if post.link %}
  <h2 class="link-post" itemprop="headline"><a href="{{ absurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> <a href="{{ post.link }}" target="_blank" title="{{ post.title }}"><i class="fa fa-link"></i></a></h2>
{% else %}
  <h2 itemprop="headline"><a href="{{ absurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></h2>
  {% if post.excerpt %}<p itemprop="description">{{ post.excerpt | markdownify | strip_html | strip_newlines | escape_once }}</p>{% endif %}
{% endif %}
</article>
{% endfor %}