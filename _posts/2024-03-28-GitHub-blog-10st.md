---
layout: single
title: "깃허브(GitHub) 블로그 10 : 사이드바에 카테고리, 태그 숫자 카운트"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: "counts"
redirect_from:
  - /blog/GitHub-blog-10st
---

`_data\navigation.yml` 파일에 아래 코드 추가

```
counts:
  - title: "카테고리"
    use: true
  - title: "태그"
    use: true
```

`_includes\nav_list` 파일에 아래 코드 추가

```
{% assign navigation = site.data.navigation[include.nav] %}

{% assign categories_max = 0 %}
{% for category in site.categories %}
  {% if category[1].size > categories_max %}
    {% assign categories_max = category[1].size %}
  {% endif %}
{% endfor %}

{% assign tags_max = 0 %}
{% for tag in site.tags %}
  {% if tag[1].size > tags_max %}
    {% assign tags_max = tag[1].size %}
  {% endif %}
{% endfor %}

<nav class="nav__list">
  {% if navigation[0].use %}
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label | default: "Toggle Menu" }}</label>
  <ul class="nav__items">
    <span class="nav__sub-title">{{ navigation[0].title }}</span>
    <li>
      {% for i in (1..categories_max) reversed %}
        {% for category in site.categories %}
          {% if category[1].size == i %}
            <ul style="padding-top: 0px; padding-bottom: 0px;">
              <a href="/categories/#{{ category[0] | slugify }}">
                <strong style="font-size: 16px;">{{ category[0] }}</strong> <span class="taxonomy__count" style="font-size: 14px;">{{ i }}</span>
              </a>
            </ul>
          {% endif %}
        {% endfor %}
      {% endfor %}
    </li>
  </ul>
  {% endif %}

  {% if navigation[1].use %}
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label | default: "Toggle Menu" }}</label>
  <ul class="nav__items">
    <span class="nav__sub-title">{{ navigation[1].title }}</span>
    <li>
    {% for i in (1..tags_max) reversed %}
      {% for tag in site.tags %}
        {% if tag[1].size == i %}
          <ul style="padding-top: 0px; padding-bottom: 0px;">
            <a href="/tags/#{{ tag[0] | slugify }}">
              <strong style="font-size: 16px;">{{ tag[0] }}</strong> <span class="taxonomy__count" style="font-size: 14px;">{{ i }}</span>
            </a>
          </ul>
        {% endif %}
      {% endfor %}
    {% endfor %}
    </li>
  </ul>
  {% endif %}
</nav>
```

포스트 안에 프론트매터에 값을 입력해준다.
```
sidebar:
  - nav: "counts"
```
