---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 5. 카테고리, 태그, 서치기능, 에러페이지 추가'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True  # 좌측 프로필 여부

---

## 카테고리, 태그, 서치 기능
![category1](/assets/blog_img/category1.png)
<span style="background-color:#C0FFFF"> _pages </span> 폴더에 <span style="background-color:#C0FFFF"> category-archive.md, tag-archive.md, search.md</span> 를 다음과 같이 생성한다. 

```m
# category-archive.md 파일에 작성
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

<span style="background-color:#C0FFFF"> _data/navigation.yml</span>  경로로 이동 후 기존에 있던 Quick-Start-Guide 제거 후 main 하단에 다음과 같이 작성한다. 

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

- Search 기능 추가된 결과
- 같은 방법으로 자신의 소개 페이지 (About)을 남기는 것도 가능하다

이후 각각의 포스팅 파일(마크다운 파일) 상단에 다음과 같은 형식 추가

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
![category2](/assets/blog_img/category2.png)
- 하단에 다음과 같은 태그와 카테고리 생성

## 404 에러페이지
원리와 방법은 이전의 카테고리, 태그 생성과 똑같다. <span style="background-color:#C0FFFF"> _pages </span> 폴더에 404.md 파일을 생성한 후 다음과 같은 코드를 집어넣는다. 이때 에러창에 띄우고 싶은 사진 링크도 하나 복사해둔다

```m
---
title: "Page Not Found"
excerpt: "Page not found. Your pixels are in another canvas."
sitemap: false
permalink: /404.html
---

![](사진링크){: width="100%" height="100%"}
```
![error](/assets/blog_img/error.png)
- 존재하지 않는 블로그 경로로 이동하면 다음과 같은 결과를 반환




