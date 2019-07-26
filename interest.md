---
layout: page
title: Interest
comments: false
---
 
<!-- {% capture categories %}{% for tag in site.categories %}{{ tag | first }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %} -->

<!-- site_tags: {{ site_tags }} -->

{% for cate in site.categories %}
 {{ cate.title }}
{% endfor %}

{% assign tag_words = site.categories | split:',' | sort %}
<!-- tag_words: {{ tag_words }} -->
 
<div id="tags">
  <ul class="tag-box inline">
  {% for item in (0..site.categories.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
    <li><a href="#{{ this_word | cgi_escape }}">{{ this_word }} <span>{{ site.categories[this_word].size }}</span></a></li>
  {% endunless %}{% endfor %}
  </ul>
 
  {% for item in (0..site.categories.size) %}{% unless forloop.last %}
    {% capture this_word %}{{ tag_words[item] | strip_newlines }}{% endcapture %}
  <h2 id="{{ this_word | cgi_escape }}">{{ this_word }}</h2>
  <ul class="posts">
    {% for post in site.categories[this_word] %}{% if post.title != null %}
    <li itemscope><span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">{{ post.date | date: "%B %d, %Y" }}</time></span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endif %}{% endfor %}
  </ul>
  {% endunless %}{% endfor %}
</div>