---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 5. 카테고리, 태그, 검색, 댓글(Utterances) 기능 추가'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True  # 좌측 프로필 여부
publish: False
---

## 카테고리, 태그, 서치 기능
![category1](/assets/blog_img/category1.png)
1. _pages 폴더에 category-archive.md, tag-archive.md, search.md 생성

```m
## category-archive.md 파일에 작성
---
title: "Category"
layout: "categories"
permalink: "/categories/"
author_profile: true
sidebar_main: true
---

# tag-archive.md 파일에 작성
---
title: "Tag"
layout: "tags"
permalink: "/tags/"
author_profile: true
sidebar_main: true
---

# search.md 파일에 작성
---
titls: Search
layout: search
permalink: /search/
---
```

2. _data/navigation.yml 경로로 이동 후 기존에 있던 Quuick-Start-Guide 제거 후 main 하단에 다음과 같이 작성


```m
main:
  - title: 'Category'
    url: /categories/
  - title: 'Tag'
    url: /tags/
  - title: 'Search'
    url: /search/
```

![search](/assets/blog_img/search.png)

- Search 기능 추가됨


3. 각각의 포스팅 파일(마크다운 파일) 상단에 다음과 같은 형식 추가

```m
---
layout: single      # Layout
title: '깃허브 블로그 만들기 for Mac OS: 5. 댓글(Utterances), 카테고리, 태그, 검색, '      # title 
categories: 'GitHubBlog'        # 추가한 카테고리 기능 보통 한개만 사용
tags: ['GitHub Pages', 'Jekyll']        # 추가한 태그 기능 여러개 태그해도 상관없음
toc: true   # 우측 목차 여부
author_profile: true  # 좌측 프로필 여부
---
```

4. 결과 확인
- 하단에 다음과 같은 태그와 카테고리가 생김
![category2](/assets/blog_img/category2.png)


# 댓글 폰트 변경

## 페이지 설정 (404까지)

