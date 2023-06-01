---
layout: single
title:  "CSS - layout flex"
Categories: CSS
Tag: [CSS, CSS layout]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆Flex 사용방법

-CSS에서 layout을 다루기 위해 사용한다.<br/>-Flex는 배치될 컨테이너(container), 배치될 아이템(item)으로 구성되어 있으며 **display 속성을 flex**로 지정해서 사용한다.<br/>

**예제)**

```html
<!--HTML-->
<div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
</div>
```

```css
/*CSS*/
.container {
      display: flex;
    }
    
.item {
  width: 100px;
  height: 100px;
  background-color: mediumpurple;
  border: 10px solid black;
}
```

![CSS flex_1]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex_1.png){: .img-row-center}

<br/>







# ◆컨테이너 속성

## 1)flex-direction

-아이템이 가로로 배치될 것인지 세로로 배치될 것인지 결정하는 속성이다.<br/>

**flex-direction: row; = 가로정렬(기본값)**<br/>

**flex-direction: column; = 세로정렬**<br/>



## 2)justifiy-content

-메인축 방향의 아이템을 정렬을 지정하는 속성이다.<br/>



### 2_1.justify-content: center; 

-아이템을 센터로 정렬해준다.<br/>

```css
/*CSS*/
.container {
      display: flex;
      justify-content: center;
    }
```

![CSS flex center]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex center.png){: .img-row-center}



### 2_2.justify-content: space-between;

-아이템과 아이템 사이에 동일 간격을 생성해준다.<br/>

```css
/*CSS*/
.container {
      display: flex;
      justify-content: space-between;
    }
```

![CSS flex space-between]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex space-between.png)



### 2_3.justify-content: space-around;

-아이템과 아이템 사이 + 컨테이너와 아이템 사이 동일 간격 생성을 생성해준다.<br/>

```css
/*CSS*/
.container {
      display: flex;
      justify-content: space-around;
    }
```

![CSS flex space-around]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex space-around.png)

<br/>







# ◆아이템 속성

**예제)**

```html
<!--HTML-->
<div class="container">
  <div class="item box1" style="background-color: red;">1
    </div>
  <div class="item box2" style="background-color: blue;">2
    </div>
  <div class="item box3" style="background-color: orange;">3
    </div>
</div>
```

```css
/*CSS*/
.container {
      display: flex;
      height: 100vh;
    }

 .item{
   font-size: 3em;
   text-align: center;
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
 }
```

![CSS flex item_1]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex item_1.png){: .img-height .align-center}



## 1)flex-basis

-메인축이 가로일때 가로크기를, 메인축인 세로일때 세로크기를 나타낸다.<br/>

```css
/*CSS 메인축이 가로일때, 가로폭이 100px로 변경*/
.container {
      display: flex;
      height: 100vh;
    }
    .item{
    flex-basis: 100px;
    }
```

![CSS flex item basis_1]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex item basis_1.png){: .img-height .align-center}

```css
/*CSS 메인축이 세로일때, 세로폭이 100px로 변경*/
.container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .item{
    flex-basis: 100px;
    }
```

![CSS flex item basis_2]({{site.url}}/images/2023-05-30-CSS layout flex/CSS flex item basis_2.png){: .img-height .align-center}
