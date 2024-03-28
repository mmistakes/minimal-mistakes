---
layout: single
title: "깃허브(GitHub) 블로그 09 : 연도별 포스팅 아카이브 생성하기"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: "counts"
redirect_from:
  - /blog/GitHub-blog-09st
---

<a href="https://mmistakes.github.io/minimal-mistakes/docs/navigation/" class="btn btn--primary">navigation</a>

`test/_pages/year-archive.md`를 `_pages/year-archive.md`로 복사

```_pages/year-archive.md
---
title: "By Year"
permalink: /year-archive/
layout: posts
author_profile: true
---
```

`_data\navigation.yml`에 코드를 추가

```_data\navigation.yml
# main links
main:
 - title: "By Year"
   url: /year-archive/
```

### Grid 형 포스트 나열

`test/_pages/year-archive-grid.md`를 `_pages/year-archive-grid.md`로 복사

`_data\navigation.yml`에 코드를 추가

```_data\navigation.yml
# main links
main:
 - title: "By Year"
   url: /year-archive-grid/
```