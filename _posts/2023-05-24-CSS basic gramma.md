---
layout: single
title:  "CSS - 기본개념"
categories: CSS
tag: [CSS, CSS box modle, layout]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆CSS 란?

-CSS는 HTML이나 XML과 같은 구조화 된 문서를 화면, 종이 등에 어떻게 렌더링할 것인지를 정의하기 위한 언어이다. (외부파일 확장자는 .CSS)<br/>

-HTML의 tag을 쓰지 않고 굳이 CSS의 언어를 써야하는 이유는, HTML의 tag는 변경해야될 때마다 모든 HTML을 변경해야되지만 CSS의 언어를 사용함으로써 중복코드를 없애고 많은 태그들을 한번에 변경가능해서 더욱 효율적으로 표현이 가능하기 때문이다.<br/>

<br/>





# ◆CSS 구성요소

-CSS는 선택자(selector)와 선언부(declaration)로 구성된다.

```css
a{
  color:red;
}
```

|     예     | 구성요소          | 설명                                     |
| :--------: | ----------------- | :--------------------------------------- |
|     a      | 선택자(selector)  | 스타일을 적용할 대상을 정한다.           |
|   color    | 속성(property)    | 어떤 스타일을 부여할 지 정한다.          |
|    red     | 값(vlue)          | 속성에 따라 지정하고 싶은 값을 부여한다. |
| color:red; | 선언(declaration) | 속성과 값을 합친것을 선언이라고 한다.    |

<br/>





# ◆CSS 적용방법

** 스타일 순위 : 브라우저 디자인 정의 > 외부 스타일시트 > 내부 스타일시트> 인라인 스타일시트<br/>



## 1)내부 스타일 시트_internal

-HTML파일의 head 태그에 style 태그를 사용하여 CSS 스타일을 적용하는 방법이다.<br/>

```html
<!--HTML-->
<head>
<style>
a{
  color:red;
}
</style>
</head>
```



## 2)외부 스타일시트_External

-별도의 파일에 CSS문서를 작성하고 해당 CSS를 필요로 하는 html 문서에서 불러와 사용하는 형식이다.<br/>

```css
/*CSS*/
body { 
background-color: lightyellow; 
}
```

**-외부스타일 시트** : 스타일을 적용할 웹 페이지의 head태그에 외부스타일 시트를 포함해야지 스타일이 적용된다.<br/>

```html
<!--HTML-->
<head>
 <link rel="stylesheet" href="style.css">
</head>
```



## 3)인라인 스타일_lnline

-HTML 태그 내에 style 속성을 사용하여 CSS 스타일을 적용하는 방법이다.<br/>

```html
<!--HTML-->
<body>
    <a href="https://pueser.github.io/" style="color:red">CSS</a>
</body>
```

<br/>





# ◆CSS 선택자(selector)

**선택자의 순위 : id선택자 >class선택자 >tag선택자

## 1)class 선택자

-class 선택자는 특정 집단의 여러 요소를 한 번에 선택할 때 사용하며, 속성값을 두개 이상 가질 수 있다.<br/>-class 선택자을 사용할 때 앞에 **.(마침표)**를 작성해야 된다.<br/>-class선택자의 단점은 class의 속성에 여러개의 속성값을 넣을 수 있는데, 속성값이 중복이 되면, 마지막에 작성된 선택자의 속성값만 설정된다.<br/>

-아래와 같이 CSS에서 saw의 선택자가 2번 언급이 되었더라도 마지막에 선언된 color:red; 스타일이 적용된다.<br/>

```html
<!--HTML-->
<body>
  <a href="HTML.html" class="saw active">HTML</a>
  <a href="CSS.html" class="saw">CSS</a>
</body>
```

```css
/*CSS*/
.saw{
  color:gray;
}
.active{
  color:red;
}
.saw{
  color:red;
}
```



## 2)id 선택자

-id선택자는 특정 아이디 이름을 가지는 요소만을 선택하여 유일한 특성을 정의해 준다. 그렇기 때문에 id의 속성값이 중복되면 안된다.<br/>-id선택자를 사용할 때 앞에 **#**을 작성해야 된다.<br/>-id 선택자가 class 선택자보다 우선순위가 높기 때문에 아래와 같이 마지막에 작성된 saw선택자의 속성값이 아닌 active의 속성값이 설정된다.<br/>

```html
<!--HTML-->
<body>
 <a href="CSS.html" class="saw" id=“active”>CSS</a>
</body>
```

```css
/*CSS*/
#active{
  color:black;
}
.saw{
   color:red;
}
```

<br/>





# ◆CSS box model

-모든 HTML 요소는 Box 형태의 영역을 가지고 있다.<br/>-박스모델은 패딩(padding), 테두리(border), 마진(margin), 내용(content)로 구성된다.<br/>-참고 :<a href ="https://pueser.github.io/html/CSS-box-model/" target="_blank" title="box model">CSS box model 참고</a><br/>

![CSS box model img]({{site.url}}/images/2023-05-24-second/CSS box model img.jpg)

|      요소      | 설명                                                         |
| :------------: | :----------------------------------------------------------- |
| 패딩(padding)  | 내용과 테두리 사이의 간격이며, 눈에 보이지 않는다.           |
| 테두리(border) | 내용에 패딩을 더한 영역의 경계를 나타내며 테두리 역할을 한다. |
|  마진(margin)  | 테두리와 이웃하는 요소의 간격이다.                           |
| 내용(content)  | 텍스트 또는 이미지가 들어있는 박스의 내용이다.               |

<br>



# ◆플렉스(flex)&그리드(grid) 문법

-플렉스(flex) : 가로세로 단일 방향레이아웃 배치할 때 사용. 참고 : <a href="https://pueser.github.io/html/CSS-layout-flex/" target='_blank' title="layout flex">플렉스 참고</a><br/>-그리드(grid) : 행과 열로 구성된 레이아웃 배치할 때 사용. 참고 : <a href="https://pueser.github.io/html/CSS-layout-grid/" target="_blank" title="layout grid">그리드 참고</a> <br/>
