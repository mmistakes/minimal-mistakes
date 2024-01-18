---
layout: single
title: "블로그 카테고리 추가하는법"
category: github
---
**오늘은 블로그 카테고리 추가하는법을 알아보겠습니다^^**



먼저 config.yml 260번라인밑으로 아래와 같이 주석을 해제하면서 동일하게 만들어준다

![screenshot_1.png](../images/2024-01-18-how to add category/screenshot_1.png)

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

![screenshot_2.png](../images/2024-01-18-how to add category/screenshot_2.png)



```html
\---

title: "Category"

layout: categories

permalink: /categories/

author_profile: true

sidebar_main: true

\---
```
