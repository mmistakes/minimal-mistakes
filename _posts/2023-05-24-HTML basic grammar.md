---
layout: single
title:  "HTML - 기본개념"
categories: HTML
tag: [HTML, Hyperlink, 주석, 부모와 자식 tag]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆HTML이란?

HyperText Markup Language의 약자로 웹페이지와 그 내용을 구성하는 마크업 언어이다.<br/>
(확장자는 .html)

------

<br/>





# ◆Tag(태그)

-태그는 <>(꺾쇠 괄호)로 둘러싸인 키워드이며, 웹페이지의 디자인이나 기능을 결정하는데 사용된다.<br/>
-태그는 목적에 맞게 사용하여야 된다. (목차를 만들려면 order list를 사용해야하지, 줄바꿈기능을 사용하면 안된다) <br/>
-예외로 img, br, input 태그는 끝태그 없이 사용가능하다.

```html
<strong></strong> : 글씨 진하게 생성하는 기능
<U></U> : 밑줄 생성하는 기능
<h1></h1> : 제목을 나타내며 글씨크기와 줄바꿈 기능
<br/> : 줄바꿈 기능
<img/> : 이미지 삽입기능
<input/> : 사용자의 입력을 받기 위해 type에 따라 상호작용 컨트롤를 생성하는 기능
<p></p> : 문장을 단락으로 나누는 기능
```



## 1)부모와 자식 tag

-밖을 감싸고 있는 ul,ol태그를 부모요소라고 하고 내부의 li 태그를 자식요소라고 한다.<br/>-참고 :  <a href="https://pueser.github.io/html/parent-and-childern-tag/" target="blank" title="부모와 자식 tag">부모와 자식 tag 참조</a> <br/>

-unorderd list(목차기능)

```html
<ul>
  <li> HTML</li>
  <li> CSS</li>
  <li> JavaScript</li>
</ul>
```

-orderd list(넘버링 목차기능)

```html
<ol>
  <li> HTML</li>
  <li> CSS</li>
  <li> JavaScript</li>
</ol>
```



## 2)img tag

```html
<img scr="coding.jpg" width="500" height="300">
```

-src : source의 약자로 이미지가 위치하는 URL을 설정한다.<br/>
-width : 이미지의 가로 크기를 설정한다.<br/>
-height : 이미지의 세로 크기를 설정한다.<br/>



## 3)a tag

-현재 페이지에서 다른 페이지를 연결할 때 사용하는 Hyperlink(하이퍼링크)를 정의할 때 사용한다.<br/>  아래와 같이 작성하면 <a href="https://pueser.github.io/" target="_parent" title="github blog">HTML 링크</a> 가 생성된다.<br/>

```html
<a href="https://pueser.github.io/" target="_blank" title="github blog">HTML 링크</a>
```

-href : 연결할 페이지나 사이트의 주소를 넣어주면 된다.<br/>
-title : 마우스를 링크 위에 올려두면 나오는 설명이다.<br/>
-target : 링크로 연결된 문서를 어디에서 열지를 설정한다.<br/>

**target 속성값**<br/>

|  종류   | 설명                                                         |
| :-----: | :----------------------------------------------------------- |
|  _self  | 현재브라우저에 링크연결 (기본값으로 생략 가능)               |
| _blank  | 새창에서 링크연결                                            |
|  _top   | 현재의 창이 프레임으로 구성된 경우, 모든 프레임이 사라지고 하나의 화면에서 링크연결 |
| _parent | 링크된 문서를 현재 프레임의 부모 프레임에서 연결             |

<br/>





# ◆Elelment(요소)

-요소는 여는태그로 시작해서 닫는태그로 끝나며, 태그와 내용으로 구성되어 있다.<br/>

![HTML요소 이미지]({{site.url}}/images/2023-05-24-first/HTML요소 이미지.png){: text-justify .img-width-entire}

<br/>





# ◆Attribut(속성)

-태그의 이름으로는 정보가 부족하기 때문에 속성을 사용하여 보조하는 역할한다.<br/>-주로 이미지의 제목, css 효과를 담당한다.<br/>

```html
<img src="coding.jpg" width="90%" >
```

 -속성명 : src, width<br/> -속성값 : "coding.jpg", "90%"<br/>

```html
<p style="color : blue;">파란색</p>
```

-속성명 : style<br/> -속성값 : "color : blue;"<br/>

<br/>





# ◆HTML의 기본구조

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>제목</title>
</head>
<body>
    <p>내용</p>
</body>
</html>
```

-!DOCTYPE html : HTML5 버전을 사용함을 선언하는 태그로써 해당 파일이 무슨 버전을 사용했는지 브라우저에 알리는 역할이다.<br/> -meta charset="utf-8" : 웹페이지가 어떤 파일로 열어야 하는지 설정하는 태그이다.<br/> -title : 웹페이지 이름을 설정하는 태그이다.<br/> -body : 웹페이지에 나오는 정보를 작성하는태그이다. (본문은 body로 묶어야함)<br/> -head : 웹페이지의 제목을 작성하는태그이다.(제목은 head로 묶어야함)<br/> -html : 독타입 선언 태그를 제외하고 전체를 둘러싸는 태그이다.<br/>
<br/>





# ◆주석

-주석은 코드를 이해하는데 도움을 주며 웹 페이지에는 표시되지 않는다.<br/>

**HTML 주석**

```html
<!--안녕하세요--> : HTML소스 보기에서 확인가능
<%--안녕하세요--%> : HTML소스 보기에서 확인불가능
```

**CSS 주석**

```css
/*안녕하세요*/
```

**Javascript 주석**

```javascript
//안녕하세요
:한줄만 주석처리 하는 경우에 사용
```

```javascript
/*안녕     
  하세요
*/
:문단 전체를 주석처리 하는 경우에 사용
```

```javascript
/**안녕     
  *하세요
  *반갑
  *습니다
*/ 
:문서화 주석처리 하는 경우에 사용
```
