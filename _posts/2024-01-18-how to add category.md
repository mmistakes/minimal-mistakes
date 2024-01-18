---
layout: single
title: "블로그 카테고리 추가하는 법"
category: github
--- 



**먼저 config.yml 253번라인밑으로 아래와 같이 주석을 해제하면서 동일하게 만들어준다**

```html
category_archive:
  type: liquid
  path: /categories/
tag_archive:
  type: liquid
  path: /tags/
# https://github.com/jekyll/jekyll-archives
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







**특히 jekyll-archives를 들여쓰기 하지않도록 주의한다. 이거때문에 반영이 안되서 찾고 해결한다고 하루걸렸던건 비밀,,,**

![SC_1](../images/2024-01-18-how to add category/SC_1.png)









**그리고 pages 폴더를 새로 생성하고 아래와 같은  category-archive.md파일을 만들어 주고 내용은 아래와 같이 입력한다**

![SC_2](../images/2024-01-18-how to add category/SC_2.png)





```html
---
title: "Category"
layout: categories
permalink: /categories/
author_profile: true
sidebar_main: true
---
```

