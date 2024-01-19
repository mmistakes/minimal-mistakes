---
layout: single
title: "블로그 카테고리 추가하는법"
category: github
---
**오늘은 블로그 카테고리 추가하는법을 알아보겠습니다^^**



## 주석해제(글자앞에 #지우기)





먼저 config.yml 260번라인밑으로 아래와 같이 주석을 해제하면서 동일하게 만들어준다

*jekyll-archives 들여쓰기를 안하게 주의해야한다 이것때문에 반영이 안되서 찾는다고 하루정도 걸렸다는,,,,*

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



## 폴더 및 md생성 

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



## 네비게이션 수정

Navigation.yml파일로 들어가서 아래와 같이 title 및 url에 입력을 한다

*tag도 같이 사용할거면 동일하게 추가해주면된다*

<img width="790" alt="스크린샷 2024-01-19 오후 1 05 55" src="https://github.com/mmistakes/minimal-mistakes/assets/156207656/c147afa8-8727-4dcd-ada3-c6abd904946d">





```html
 \# main links

main:

   \- title: "Category"

​     url: /categories/

   \- title: "Tag"

​     url: /tags/
```





## 포스트글에 카테고리 추가

포스트폴더로 내려와 작성글 title 밑에 category를 추가하고 원하는 카테고리를 입력하면된다

tag도 마찬가지로 원하는 태그를 입력해주면 된다



<img width="646" alt="image" src="https://github.com/mmistakes/minimal-mistakes/assets/156207656/60afcdf5-b2d5-4b3e-a5bc-bd278516145e">





```html
---
layout: single
title: "블로그 카테고리 추가하는법"
category: github
---
```





## 완성

아래와 같이 우측 상단에 카테고리가 변경된걸 확인할수 있다

<img width="1350" alt="image" src="https://github.com/mmistakes/minimal-mistakes/assets/156207656/98f72ede-0adb-40b1-b8e9-577add156b45">
