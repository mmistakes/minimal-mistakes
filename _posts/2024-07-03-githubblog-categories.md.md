---
title: "Jekyll Github blog 사이드바 네비게이션 추가하기(2024)"
date: 2024-07-03
categories: github-blog
---
[참고 자료](https://x2info.github.io/minimal-mistakes/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EB%A7%8C%EB%93%A4%EA%B8%B0/)

### 1. navigation.yml 설정

- 형식
```
main:
  - title: [메뉴 제목]
    children:
      - title: [하위 메뉴 제목]
        url: [하위 메뉴 URL]

```

- 예시
```
main:
  - title: Programming 
    children:
      - title: "Data Structure and Algorithm" 
        url: /datastructure-and-algorithm/
  - title: AI 
    children:
      - title: "Machine Learning"
        url: /machine-learning/
  - title: 기타
    children:
      - title: "GitHub Blog"
        url: /github-blog/

```

### 2. 카테고리의 포스트들을 모아 보여주는 페이지를 생성
	1. 루트 디렉토리에 "_pages" 폴더 생성 후 각각의 카테고리 페이지 파일 생성.
- 형식
```
---
title: [페이지 제목]
layout: archive
permalink: [페이지 URL]
---

{% assign posts = site.categories.[카테고리 이름] %}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}

```
- 예시(파일 경로: \_pages/category-datastructure-and-algorithm.md)
```
---
title: "Data Structure and Algorithm"
layout: archive
permalink: /datastructure-and-algorithm/
---

{% assign posts = site.categories.datastructure-and-algorithm %}
{% for post in posts %}
  {% include archive-single.html type=page.entries_layout %}
{% endfor %}

```

### 3. 업로드 할 포스트에 카테고리 추가
- 업로드할 포스트의 front matter에 카테고리를 추가한다

- 형식
```
---
title: [포스트 제목]
date: [작성 날짜]
categories: [카테고리 이름]
---

```
- 예시
```
---
title: "Data Structure and Algorithm"
date: 2024-07-03
categories: datastructure-and-algorithm
---

```

### 4.  \_config.yml , index.html 수정

- \_config.yml 수정
![image](https://i.imgur.com/scXMEGa.png)

- index.html
```
---
layout: home
author_profile: true
sidebar:
    nav:
      - main
---
```

나는 카테고리를 언제나 보이게 만들고 싶기 때문에 위와 같이 수정해준다.