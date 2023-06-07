---
layout: single
title:  "CSS - Media Query"
categories: CSS
tag: [CSS]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>



# ◆Media Query(미디어 쿼리)

-뷰포트(viewport) 너비에 따라 유연하게 컨텐츠를 배치하는 문법이다.<br/>-형식``@media screen and (조건){}``<br/>

-데스크탑 : 1025px ~<br/> -테블릿 : 769px ~ 1024px<br/> -모바일 : 320px ~ 768px

<br/>





## 2)min-width

-뷰포트의 최소 가로너비

```css
/*CSS*/
@media screen and (min-width:1025px){
  .div{
    display:none;
  }
}
/*뷰포인트 가로너비가 1025px 이상인 경우 div태그의 요소를 없앤다.*/
```

<br/>



## 3)max-width

-뷰포트의 최대 가로너비

```css
/*CSS*/
@media screen and (max-width:1025px){
  .div{
    display:none;
  }
}
/*뷰포인트 가로너비가 1025px 이하인 경우 div태그의 요소를 없앤다.*/
```

