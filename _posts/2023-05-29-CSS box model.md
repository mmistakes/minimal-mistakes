---
layout: single
title:  "CSS - box model"
Categories: CSS
Tag: [CSS, CSS box model]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆width & height 속성

-width와 height는 content 대상으로 요소의 너비와 높이를 지정하기 위해 사용한다.<br/>-HTML요소의 height와 width 속성으로 설정된 높이와 너비는 패딩, 테두리, 마진의 크기는 포함 안된다.<br/>-width와 height는 px, % 등의 크기단위를 사용한다.<br/>

```
HTML요소의 전체 너비(width)
width + left padding + right padding + left border + right border + left margin + right margain
```

```
HTML요소의 전체 높이(height)
height + top padding + bottom padding + top border + bottom border + top margin + bottom maring
```

<br/>







# ◆margin & padding 속성

-margin 과 padding의 속성은 (top, right, left, bottom) 4개의 방향으로 지정할 수 있다.<br/>



## 1) 4개의 방향 속성값 설정

-margin과 padding은 4방향으로 속성을 각각 지정하지 않고 1개의 속성으로만 4방향으로 한번에 지정할 수 있다.<br/>-해당요소를 브라우저 중앙에 놓고 싶으면, **margin: 0 auto;** 로 설정하면 된다.<br/>

```
.4개의 방향을 지정할 때
-margin-top : 25px;
-margin-right : 50px;
-margin-bottom : 75px;
-margin-left : 100px;

=> margin : 25px 50px 75px 100px;
```

```
.3개의 방향을 지정할 때
-margin-top : 25px;
-margin-right : 50px;  
-margin-left : 50px;
-margin-bottom : 75px;

=> margin : 25px 50px 75px;
```

```
.2개의 방향을 지정할 때
-margin-top : 25px; 
-margin-bottom : 25px;  
-margin-right : 50px;  
-margin-left : 50px;

=> margin : 25px 50px;
```

```
.1개의 값을 지정할 때
-margin-top : 25px; 
-margin-bottom : 25px;  
-margin-right : 25px;  
-margin-left : 25px;

=>margin : 25px;
```

<br/>







# ◆border 속성

-border은 border-width, boder-style, border-color 속성으로 테두리의 스타일을 설정한다.<br/>



## 1)border-style

-border-style 속성은 테두리선의 스타일을 지정한다.<br/>

```html
<!--HTML-->
 <p class="dotted">dotted</p>
 <p class="dashed">dashed</p>
 <p class="solid">solid</p>
 <p class="double">double</p>
 <p class="groove">groove</p>
 <p class="ridge">ridge</p>
 <p class="inset">inset</p>
 <p class="outset">outset</p>
 <p class="none">none</p>
 <p class="hidden">hidden</p>
```

```css
/*CSS*/
 p.dotted { border-style: dotted; }
 p.dashed { border-style: dashed; }
 p.solid  { border-style: solid; }
 p.double { border-style: double; }
 p.groove { border-style: groove; }
 p.ridge  { border-style: ridge; }
 p.inset  { border-style: inset; }
 p.outset { border-style: outset; }
 p.none   { border-style: none; }
 p.hidden { border-style: hidden; }
```

![CSS box model border img]({{site.url}}/images/2023-05-29-CSS box model/CSS box model border img.jpg)



## 2)border-width

-border-width는 테두리의 두께를 지정한다.

```html
<!--HTML-->
 <p class="one">thin: 1px</p>
 <p class="two">medium: 3px</p>
 <p class="three">thick: 5px</p>
 <p class="four">15px</p>
 <p class="five">2px 10px 4px 20px</p>
```

```css
/*CSS*/    
 p.one {
   border-width: thin; /* 1px */
 }
 p.two {
   border-width: medium; /* 3px */
 }
 p.three {
   border-width: thick; /* 5px */
 }
 p.four {
   border-width: 15px;
 }
 p.five {
   border-width: 2px 10px 4px 20px;
 }
```

![CSS border width img]({{site.url}}/images/2023-05-29-CSS box model/CSS border width img.jpg)



## 3)border-color

-border-color는 테두리의 색상을 지정한다.

```html
<!--HTML-->
 <p class="one">border-color: red</p>
 <p class="two">border-color: red green blue yellow</p>
```

```css
/*CSS*/ 
 p.one {
   border-color: red;
 }
 p.two {
   border-color: red green blue yellow;
 }
```

![CSS border color img]({{site.url}}/images/2023-05-29-CSS box model/CSS border color img.png)



## 4)border shorthand

-border은 border-width, boder-style, border-color를 각각 속성을 쓰지않고 1가지의 속성으로 설정할 수 있다.<br/>**-border: border-width border-style border-color;**

```css
/*CSS*/
p{
    border: 5px solid red;
}

/*border-width : 5px
  border-style : 실선
  border-color : red
*/
```



## 5) border-radius

-border-radius는 테두리 모서리를 둥글게 표현하도록 지정한다.<br/>-단위는 길이를 나타내는 (px, em 등)와 %를 사용한다.<br/>

```html
<!--HTML-->
 <div class="border-rounded">rounded</div>
 <div class="border-circle">circle</div>
```

```css
/*CSS*/
 .border-rounded {
    border-radius: 5px;
  }
  .border-circle {
    border-radius: 50%;
  }
```

![css border radius img]({{site.url}}/images/2023-05-29-CSS box model/css border radius img.png){: .align-center}

