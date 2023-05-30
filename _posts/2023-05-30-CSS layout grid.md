---
layout: single
title:  "CSS - layout grid"
categories: HTML
tag: [CSS, layout]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆그리드(grid) 사용방법

-CSS에서 layout을 다루기 위해 사용한다.<br/>-그리드는 배치될 컨테이너(container), 배치될 아이템(item)으로 구성되어 있으며 **display 속성을 gird**로 지정해서 사용한다.<br/>

**예제)**

```html
<!--HTML-->
<div class="container">
   <div class="item box1">1</div>
   <div class="item box2">2</div>
   <div class="item box3">3</div>
   <div class="item box4">4</div>
   <div class="item box5">5</div>
   <div class="item box6">6</div>
 </div>
```

```css
/*CSS*/
.container{
          display: grid;
         }
.box1{
      background-color: red;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .box2{
      background-color: aqua;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .box3{
      background-color: blueviolet;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .box4{
      background-color: green;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .box5{
      background-color: blue;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .box6{
      background-color: orange;
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
```

![CSS gird_1]({{site.url}}/images/2023-05-30-CSS layout grid/CSS gird_1.png)

<br/>





# ◆컨테이너 속성

### 1)gird-template-culumns

-그리드 열 크기 속성을 나타낸다.<br/>-왼쪽부터 열 폭값이 100px 200px 300px로 지정된다.<br/>

```css
/*CSS*/
.container{
      display: grid;
      grid-template-columns: 100px 200px 300px;
    }
```

![CSS gird-template-columns img]({{site.url}}/images/2023-05-30-CSS layout grid/CSS gird-template-columns img.png)



### 2)grid-template-rows

-그리드 행 크기 속성을 나타낸다.<br/>-왼쪽 상단부터 행 폭값이 100px 200px로 지정된다.<br/>

```css
.container{
      display: grid;
      grid-template-columns: 100px 200px 300px;
      grid-template-rows: 100px 200px;
    }
```

![CSS gird-template-rows img]({{site.url}}/images/2023-05-30-CSS layout grid/CSS gird-template-rows img.png)



### 3)크기 적용 단위 및 함수

1)1fr 단위<br/> -각각 1:2:3 비율로 조정되며 고정된 크기가 아닌 브라우저의 창크기에 따른 **가변크기**를 지니게 된다.<br/>

```css
/*CSS*/
.container{
      display: grid;
      grid-template-columns: 1fr 2fr 3fr;
    }
```

2)refeat(반복함수)<br/> -1fr씩 고정된 비율로 열의 크기를 지정할 때, 하나의 속성값으로 표현할 수 있다.<br/> -grid-template-columns: refeat(3, 1fr) 표현할 수 있으며, grid-template-columns: 1fr 1fr 1fr 과 동일한 효과가 적용된다.<br/>



## ◆아이템 속성

### 1)grid-column-start & grid-column-start

-grid-column-start & grid-column-start : 열 폭의 시작과 끝을 지정.<br/>-box2의 열의 폭이 2열부터 4열까지 차지하게 된다.<br/>

```css
/*CSS*/
box2 {
      grid-column-start: 2;
      grid-column-end: 4;
      }
```

![CSS grid-coulmn]({{site.url}}/images/2023-05-30-CSS layout grid/CSS grid-coulmn.png)

### 2)grid-row-start & grid-row-end

 -grid-row-start & grid-row-end : 행 폭의 시작과 끝을 지정.<br/> -box2의 행의 폭이 1행 부터 3행까지 차지하게 된다.<br/>

```css
/*CSS*/
.box2 {
      grid-column-start: 2;
      grid-column-end: 4;
    /*= gird-column: 2/4;*/
      grid-row-start:1;
      grid-row-end: 3;
    /*= gird-row: 1/3*/
      }
```

![CSS grid-row]({{site.url}}/images/2023-05-30-CSS layout grid/CSS grid-row.png)
