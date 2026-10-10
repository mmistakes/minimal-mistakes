---
layout: page
title: Blog
permalink: /blog/
---
<p>Study notes and implementation logs on LLMs, HCI, instructional design, and software development.</p>

{%- assign categories = site.categories | sort %}
<nav class="blog-categories" aria-label="Categories" data-blog-categories>
  <a class="blog-category-chip is-active" href="#" data-category="">All <span class="blog-category-count">{{ site.posts.size }}</span></a>
  {%- comment -%} Most-used categories first {%- endcomment -%}
  {%- assign max_count = 0 %}
  {%- for category in categories %}{% if category[1].size > max_count %}{% assign max_count = category[1].size %}{% endif %}{% endfor %}
  {%- for n in (1..max_count) reversed %}
    {%- for category in categories %}
      {%- if category[1].size == n %}
        {%- assign slug = category[0] %}
  <a class="blog-category-chip" id="{{ slug }}" href="#{{ slug }}" data-category="{{ slug }}">{{ site.data.categories[slug] | default: slug }} <span class="blog-category-count">{{ n }}</span></a>
      {%- endif %}
    {%- endfor %}
  {%- endfor %}
</nav>

{%- assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{%- for year in posts_by_year %}
<section class="blog-year-group" data-blog-year>
  <h2 class="blog-year">{{ year.name }}</h2>
  <ul class="blog-post-list">
    {%- for post in year.items %}
    <li data-categories="{{ post.categories | join: ' ' }}">
      <span class="blog-post-date">{{ post.date | date: "%m.%d" }}</span>
      <span>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {%- for category in post.categories %}
        <a class="blog-post-category" href="#{{ category }}">{{ site.data.categories[category] | default: category }}</a>
        {%- endfor %}
      </span>
    </li>
    {%- endfor %}
  </ul>
</section>
{%- endfor %}
<div class="blog-more" data-show-more hidden>
  <button type="button">Show all {{ site.posts.size }} posts</button>
</div>
