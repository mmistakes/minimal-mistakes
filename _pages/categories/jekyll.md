---
layout: archive
permalink: jekyll
title: "Jekyll"

author_profile: true
sidebar:
  nav: "docs"
---

{% assign posts = site.categories.jekyll %}
{% for post in posts %}
  {% include custom-archive-single.html type=entries_layout %}
{% endfor %}
```

`_includes` 폴더 밑에 `custom-archive-single.html` 파일을 추가한다.
```html
{% if post.header.teaser %}
  {% capture teaser %}{{ post.header.teaser }}{% endcapture %}
{% else %}
  {% assign teaser = site.teaser %}
{% endif %}

{% if post.id %}
  {% assign title = post.title | markdownify | remove: "<p>" | remove: "</p>" %}
{% else %}
  {% assign title = post.title %}
{% endif %}

<div class="{{ include.type | default: 'list' }}__item">
  <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
    <div>
      <span>
        <a href="{{ post.url }}">{{post.title}}</a>
      </span>
      <small> 
        <i class="fas fa-fw fa-calendar-alt" aria-hidden="true"> </i>{{ post.date | date: " %Y.%m.%d" }}
        {% if site.category_archive.type and post.categories[0] and site.tag_archive.type and post.tags[0] %}
          {%- include post__taxonomy.html -%}
        {% endif %}
      </small>
    </div>
  </article>
</div>
```

#### 포스팅 하기
---
포스팅 파일의 헤더부분에 카테고리를 추가한다.
```ruby
---
layout: single
title:  "사이드바 메뉴 설정"
folder: "jekyll"
categories:
  - jekyll
tags: [blog, jekyll]

author_profile: true
sidebar:
  nav: "docs"

toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true

date: 2021-07-30
---
