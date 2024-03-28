---
layout: single
title: "깃허브(GitHub) 블로그 06 : 검색기능 추가"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: "counts"
redirect_from:
  - /blog/GitHub-blog-06st
---
### 1. Author Profile 보이기 안보이기 옵션

Front Matter 에 `author_profile`를 추가하면 된다.

```
author_profile: false
```

### 2. Sidebar Navigation 수정

`_data/navigation.yml` 파일에 추가한다

```
docs:
  - title: "대목차"
    children:
      - title: "Category"
        url: /categories/
      - title: "Tag"
        url: /tags/
```

post 파일의 Front Matter `sidebar`를 추가한다.

```
author_profile: false
sidebar:
	nav: "docs"
```

### 3. 검색 기능 추가

`_pages` 안에 `search.md` 파일을 만든다.

``` _pages/search.md
---
title: Search
layout: search
permalink: /search/
---
```

`_data/navigation.yml` 파일에 아래 코드를 추가한다.

```_data/navigation.yml
main:
 - title: "Search"
   url: /search/
```
