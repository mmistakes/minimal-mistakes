---
layout: single
title: "깃허브(GitHub) 블로그 11 : 블로그 상단 배너 추가하기"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: counts
redirect_from:
  - /blog/GitHub-blog-11st
---

`_includes\top-banner.html` 을 생성
```
<p class="notice--info" style="font-size: 1rem !important;">
    <strong>Github 블로그 제작기</strong>
    <br>
    <a href="https://yoon-beom.github.io/categories/#blog">보러가기</a>
</p>
```


`_layouts\single.html` 에 코드를 추가
```
    <div class="page__inner-wrap">
      {% include top-banner.html %}
```