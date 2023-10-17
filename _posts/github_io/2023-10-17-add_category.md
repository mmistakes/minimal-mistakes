---
layout: single
title : "Github.io 카테고리 기능 추가"
categories : github.io
---

# 카테고리
1. _config.yml 파일 내 `category_archive:` 항목의 다음 항목 주석 해제
```yml
jekyll-archives:
  enabled:
    - categories
    - tags
  layouts:
    category: archive-taxonomy
    tag: archive-taxonomy
  permalinks:
    category: /categories/:name/
    tag: /tags/:name/
```

2. _pages/category-archive.md 파일에 아래 내용 작성
```md
---
title: "Category"
layout: "Categories"
permalink: /categories/
author_profile: true
sidebar_main: true
---
```

3. _data/navigation.yml 에서 네비게이션 바 수정
```yml
- title: "Category"
    url: /categories/
```

4. 게시글 작성 시 카테고리에 태그를 지정해주면 끝