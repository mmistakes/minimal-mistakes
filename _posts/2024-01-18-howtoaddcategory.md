---
layout: single
title: "블로그 카테고리 추가하는법"
category: github
---
**오늘은 블로그 카테고리 추가하는법을 알아보겠습니다 :)**



먼저 config.yml 260번라인밑으로 아래와 같이 주석을 해제하면서 동일하게 만들어준다

<img width="377" alt="screenshot_1" src="https://github.com/mmistakes/minimal-mistakes/assets/156207656/a4840e54-c212-4892-9584-8915bc993ce1" style="zoom: 150%;" >

```html
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





그리고 pages 폴더를 새로 생성하고 아래와 같은 category-archive.md파일을 만들어 주고 내용은 아래와 같이 입력한다



<img width="509" alt="screenshot_2" src="https://github.com/mmistakes/minimal-mistakes/assets/156207656/c7d4fff1-f6ff-4670-94bb-1577ee15d7cd" style="zoom:150%;"   >

```html
\---

title: "Category"

layout: categories

permalink: /categories/

author_profile: true

sidebar_main: true

\---
```
