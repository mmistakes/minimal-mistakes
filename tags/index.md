---
layout: page
title: ""
date:
modified:
excerpt:
tags: []
image:
  feature:
---

{% capture site_tags %}{% for tag in site.tags %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
{% assign tags_list = site_tags | split:',' | sort %}

{% for item in (0..site.tags.size) %}{% unless forloop.last %}
  {% capture this_word %}{{ tags_list[item] | strip_newlines }}{% endcapture %}
  <article>
  <h3 id="{{ this_word }}">{{ this_word }}</h3>
    <ul>
    {% for post in site.tags[this_word] %}{% if post.title != null %}
      <li class="entry-title"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time>&raquo;
      <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}
      </a></li>
    {% endif %}{% endfor %}
    </ul>
  </article>
{% endunless %}{% endfor %}
