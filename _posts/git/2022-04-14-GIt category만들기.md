---
title: "GitHub 블로그 카테고리 만들기"
escerpt: "minimal-mistake 블로그 카테고리 만들기, 전체 글수 기능 넣기"

categories:
  - Git
tags:
  - [Git, Blog, GitHub, minimal-mistake]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2022-04-13
last_modified_at: 2022-04-14

comments: true

---

## 개요

  <p align="center"><img src="https://github.com/OC-JSPark/oc-jspark.github.io/blob/0488e9b8a6a1e6577894c6eac4787d5df63d2a15/assets/images/001.png"></p>

  minimal-mistake 테마에서 위와 같은 UI 로 카테고리를 나열하는 방법에 대해 써보고자 한다. 

  들어가기에 앞서 <https://ansohxxn.github.io/blog/jekyll-directory-structure/> minimal-mistake 의 디렉터리 구조에 대해 포스팅 한적이 있으니 이 포스트를 참고하면 도움이 될 것이다.

- ### 구조

  - 같은 카테고리의 글들을 모아둔 페이지 
  - 이 페이지들을 모아둔 사이드바

<br>

## 1. 포스팅시 카테고리 등록

- 포스트를 쓸 땐 머릿말에 아래와 같은 카테고리를 기록해야 한다. 예를 들어 나는 C++ 프로그래밍에 관한 포스트를 올릴 땐 `Cpp` 이라는 이름의 카테고리로 분류되도록 부여하였다.

```yaml
categories:
  - GIT
```

<p align="center"><img src="https://user-images.githubusercontent.com/46878973/163540414-f9e50d90-1a6b-40de-87fe-ab06b806def2.png"></p>

그러면 이렇게 글을 올릴 때 해당 글에 카테고리가 `GIT`로 부여된 것을 확인할 수 있다.

<br>

## 2. 같은 카테고리만 모아두는 페이지

<p align="center"><img src="https://user-images.githubusercontent.com/42318591/109408436-3175ea80-79cd-11eb-8765-bc1d6fc4dc58.png"></p>

- ### category-Git.md

```liquid
---
title: "Git & GitHub"
layout: archive
permalink: categories/Git
author_profile: true
sidebar_main: true
---

{% raw %}
{% assign posts = site.categories.Git %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endraw %}
```

`Git` 라는 카테고리를 가진 포스트들만 모아서 한번에 보여줄 수 있는 위 사진같은 페이지를 만든다. 
pages > categories 폴더 생성 > category-git.md, category-kubernetes.md 등 카테고리들만 가진 포스트들을 나열하여 보여 줄 수 있는 md파일 생성

- ### 머릿말설정

  - title : 이 페이지의 이름은 `Git & GitHub` 가 된다.
  - layout : 이 페이지의 layout은 `archive` 방식이다.
    - minimal-mistake 사용자라면 기본적으로 제공하는 카테고리
    - 태그 레이아웃 페이지 방식이 `archive`이다.
    - 같은 카테고리의 글들을 나열하는 아카이브로 쓸 것이기 때문에 이와 같은 레이아웃을 설정한 것이다.
  - permalink : 이 페이지의 링크는 `categories/Git`가 된다. 
    - 상대주소이기 때문에 이 페이지의 주소는 내 블로그로 예를 들자면 <https://oc-jspark.github.io/categories/Git> 가 된다.
  - author_profile : 이 페이지에서 나의 프로필을 보이게 할것인지 유무
  - sidebar_main : 

  ```liquid
  {% raw %}
  {% assign posts = site.categories.Cpp %}
  {% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
  {% endraw %}
  ```

minimal-mistake 는 📜archive-single.html 에서 같은 카테고리, 태그를 모아두는 역할을 하고 있다. 사실 나는 외적인 모습에 조금 변화를 주기 위해 📜archive-single2.html 파일을 따로 만들어 개인적으로 다르게 코딩을 하긴 했지만, 일반 minimal-mistake 를 그대로 사용하시는 분이라면 📜archive-single.html 를 for문 안에서 인클루딩 하면 된다.


<br>

## 제목, 날짜, 카테고리, 태그 나열방법

![image](https://user-images.githubusercontent.com/42318591/116509550-7e5b3c00-a8fe-11eb-9e18-46450c18e633.png)


- ### include > archive-single2.html 

  ```html
  {% raw %}
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

  <div class="{{ include.type | default: "list" }}__item">
      <article class="archive-item">
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
  {% endraw %}
  ```

- ### post__taxonomy.html (새로 만들기)

  ```html
  {% raw %}
  <!--Archive page 용-: (post -> page)-->
  <!--page__taxonomy.html에서 가져 옴-->

  {%- if site.category_archive.type and post.categories[0] -%}
      {%- case site.category_archive.type -%}
          {%- when "liquid" -%}
          {%- assign path_type = "#" -%}
          {%- when "jekyll-archives" -%}
          {%- assign path_type = nil -%}
      {%- endcase -%}

      {% case site.tag_archive.type %}
          {% when "liquid" %}
              {% assign path_type = "#" %}
          {% when "jekyll-archives" %}
              {% assign path_type = nil %}
      {% endcase %}

      {%- if site.category_archive.path and site.tag_archive.path -%}
          {%- capture post_categories -%}{%- for category in post.categories -%}{{ category | downcase }}|{{ category }}{%- unless forloop.last -%},{%- endunless -%}{%- endfor -%}{%- endcapture -%}
          {%- assign category_hashes = post_categories | split: ',' | sort -%}
          {% capture post_tags %}{% for tag in post.tags %}{{ tag | downcase }}|{{ tag }}{% unless forloop.last %},{% endunless %}{% endfor %}{% endcapture %}
          {% assign tag_hashes = post_tags | split: ',' | sort %}
          <span class="page__taxonomy">
              <span itemprop="keywords">
                  {%- for hash in category_hashes -%}
                      {%- assign keyValue = hash | split: '|' -%}
                      {%- capture category_word -%}{{ keyValue[1] | strip_newlines }}{%- endcapture -%}
                      <a href="{{ category_word | slugify | prepend: path_type | prepend: site.category_archive.path | relative_url }}" class="page__taxonomy-item-category" rel="tag">{{ category_word }}</a>{%- unless forloop.last -%}<span class="sep"> </span>{%- endunless -%}
                  {%- endfor -%}
                  {% for hash in tag_hashes %}
                      {% assign keyValue = hash | split: '|' %}
                      {% capture tag_word %}{{ keyValue[1] | strip_newlines }}{% endcapture %}
                      <a href="{{ tag_word | slugify | prepend: path_type | prepend: site.tag_archive.path | relative_url }}" class="page__taxonomy-item-tag" rel="tag">{{ tag_word }}</a>{% unless forloop.last %}<span class="sep"> </span>{% endunless %}
                  {% endfor %}
              </span>
          </span>
      {%- endif -%}
  {%- endif -%}
  {% endraw %}
  ```

- ### 카테고리 페이지

  ```liquid
  {% raw %}
  {% assign posts = site.categories.Git %}
  {% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}
  {% endraw %}
  ```


<br>

## 위 페이지들을 모아 사이드바로 띄우자.

- ### nav_list_main

> 이 곳에 `2. 같은 카테고리만 모아두는 페이지` 모두 나열하기

- minimal-mistake의 **_include > nav_list_main** 문서를 만든다. (마크다운파일, html 파일 아니다.그냥 파일이다.) 
  - `_include` 폴더에 만든 이유는 사이드바를 담당하는 `sidebar.html`에서 이를 "포함"시켜 화면에 나타내기 위해서다. 

```html
<!--전체 글 수를 세기 위한 연산. sum 변수에 전체 글 수 저장-->
{% raw %}
{% assign sum = site.posts | size %}

<nav class="nav__list">
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label }}</label>
  <ul class="nav__items" id="category_tag_menu">
      <!--전체 글 수-->
      <li>
            📂 <span style="font-family:'Cafe24Oneprettynight';">전체 글 수</style> <span style="font-family:'Coming Soon';">{{sum}}</style> <span style="font-family:'Cafe24Oneprettynight';">개</style> 
      </li>
      <li>
        <!--span 태그로 카테고리들을 크게 분류 ex) C/C++/C#-->
        <span class="nav__sub-title">C/C++/C#</span>
            <!--ul 태그로 같은 카테고리들 모아둔 페이지들 나열-->
            <ul>
                <!--Cpp 카테고리 글들을 모아둔 페이지인 /categories/cpp 주소의 글로 링크 연결-->
                <!--category[1].size 로 해당 카테고리를 가진 글의 개수 표시--> 
                {% for category in site.categories %}
                    {% if category[0] == "Cpp" %}
                        <li><a href="/categories/cpp" class="">C ++ ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "STL" %}
                        <li><a href="/categories/stl" class="">C++ STL & 표준 ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
        <span class="nav__sub-title">Coding Test</span>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "Algorithm" %}
                        <li><a href="/categories/algorithm" class="">알고리즘 구현 (with C++) ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
            <ul>
                {% for category in site.categories %}
                    {% if category[0] == "Programmers" %}
                        <li><a href="/categories/programmers" class="">프로그래머스 ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
      </li>
  </ul>
</nav>
{% endraw %}
``` 


<p align="center"><img src="https://user-images.githubusercontent.com/42318591/109409965-342b0c80-79da-11eb-8d2f-556619d0bf90.png"></p>

- `<ul class = "nav__items">`
  - 이 태그 안에 카테고리들을 모아둔 페이지들 링크를 나열하게 될 것이다. (위에서 페이지마다 설정했던 permalink)
  - CSS 에서 "nav__items" 영역을 꾸미도록 하면 된다.
- `<li>` 태그로 영역을 나눈다.
  - 나같은 경우엔 3 개의 영역으로 나누었다.
    - 전체 글 수
    - 카테고리 사이드바
    - 방문자수 
- `<span class="nav__sub-title">` 태그로 카테고리들을 분류하는 큰 제목을 표시했다.
  - CSS 에서 "nav__sub-title" 영역을 폰트, 색상 등등을 꾸미도록 하면 된다.
- `<ul>`
  - 이 `ul` 태그 하나하나로 텍스트에다가 2️⃣에서 만들었던 같은 카테고리의 글들을 나열해 모아두었던 그 페이지로 가는 링크를 건다. 설정해뒀었던 permalink 로!
    - {% raw %}{{category[1].size}}{% endraw %} 로 해당 카테고리를 가진 글의 개수를 표시할 수도 있다.
      ```html
            {% raw %}
            <ul>
                
                {% for category in site.categories %}
                    {% if category[0] == "STL" %}
                        <li><a href="/categories/stl" class="">C++ STL & 표준 ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
            {% endraw %}
      ```

<br>

- ### 전체 글 수

  ```html
  {% raw %}
  {% assign sum = site.posts | size %}

        <li>
              📂 <span style="font-family:'Cafe24Oneprettynight';">전체 글 수</style> <span style="font-family:'Coming Soon';">{{sum}}</style> <span style="font-family:'Cafe24Oneprettynight';">개</style> 
        </li>
  {% endraw %}
  ```

  `site.posts | size`로 전체 포스트 수를 구할 수 있다. 이를 `sum` 변수에 저장한다. 그리고 "전체 글 수", "개" 텍스트 사이에 {% raw %}{{sum}}{% endraw %}을 넣어주면 끝! 폰트가 저리 지저분한 이유는 내가 "전체 글 수", "개" 텍스트에만 다른 폰트를 지정했기 때문이다. 그냥 CSS 에서 안하고 여기서 바로 해줌..

<br>

- ### sidebar.html

  ```liquid
  {% raw %}
  {% if page.author_profile or layout.author_profile or page.sidebar %}
    <div class="sidebar sticky">
    {% if page.author_profile or layout.author_profile %}{% include author-profile.html %}{% endif %}
    {% if page.sidebar %}
      {% for s in page.sidebar %}
        {% if s.image %}
          <img src="{{ s.image | relative_url }}"
              alt="{% if s.image_alt %}{{ s.image_alt }}{% endif %}">
        {% endif %}
        {% if s.title %}<h3>{{ s.title }}</h3>{% endif %}
        {% if s.text %}{{ s.text | markdownify }}{% endif %}
        {% if s.nav %}{% include nav_list nav=s.nav %}{% endif %}
      {% endfor %}
      {% if page.sidebar.nav %}
        {% include nav_list nav=page.sidebar.nav %}
      {% endif %}
    {% endif %}

    {% if page.sidebar_main %}
      {% include nav_list_main %}
    {% endif %}

    </div>
  {% endif %}
  {% endraw %}
  ```

minimal-mistake 에서 제공하는 사이드바에 관한 html 문서이다. 이 곳에 

```html
  {% raw %}
  {% if page.sidebar_main %}
    {% include nav_list_main %}
  {% endif %}
  {% endraw %}
```

코드를 넣는다. 위에서 작성한 📜nav_list_main 을 사이드바에 반영하는 것이다. `sidebar_main` **값이 True 라면 이 사이드 바를 활성화시키도록 할 것이다.** (그래서 위에서 sidebar_main : true 가 등장했던 것이다!)

<br>

- ### _config.yml

```yaml
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
      mathjax: true
      sidebar_main: true
```

📜_config.yml 에 `sidebar_main: true`를 추가하여 블로그 전체 페이지에서 위에서 만든 사이드바가 활성화되게끔 해주면 끝!

### 📜index.html

```yaml
layout: home
sidebar_main: true    # 요거 추가
author_profile: true
```

혹시 메인 페이지에 사이드바가 반영이 안된다면 메인 페이지를 담당하는 📜index.html 의 머릿말에 `sidebar_main: true` 를 추가해주면 된다. 참고로 📜index.html 는 📜_config.yml 가 있는 가장 상위 폴더에 있다. 

***
<br>


[맨 위로 이동하기](#)