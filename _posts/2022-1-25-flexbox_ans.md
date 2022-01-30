---
layout: single
title: "CSS flex & position"
categories: HTML&CSS
tag:
  [
    HTML,
    CSS,
    blog,
    github,
    input,
    CSS,
    flex,
    flexbox,
    relative,
    absolute,
    position,
    특징,
    차이,
    태그,
    label,
    속성,
    attribute,
    type,
    필수,
  ]
toc: true
sidebar:
  nav: "docs"
---

## 1. 구현화면

![image-20220125160258773](https://user-images.githubusercontent.com/67591105/150957963-ef5b48b4-4915-4a7f-a194-fc17e04a440c.png)

## 2. HTML 코드

### 태그 정리하기 (위에서부터 순서대로 )

    - body
    - section(1) : width:50%; 으로 화면을 2개로 나누기 (div 좌우로 나누기)
    - article(4) : 페이지에 독립적으로 구성할 수 있는 태그
    - div class='bg'(4) : 배경색을 가진 div
    - div class='info'(4) : 텍스트박스를 가진 div

### 코드

```python
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>repl.it</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>The Best Colors</h1>
    <section>
      <article class="color">
        <div class="color__bg"></div>
        <div class="color__info">
          <h3>Tomato</h3>
          <h5>#FF6347</h5>
        </div>
      </article>
       <article class="color">
        <div class="color__bg"></div>
        <div class="color__info">
          <h3>Teal</h3>
          <h5>#008080</h5>
        </div>
      </article>
       <article class="color">
        <div class="color__bg"></div>
        <div class="color__info">
          <h3>Burlywood</h3>
          <h5>#DEB887</h5>
        </div>
      </article>
       <article class="color">
        <div class="color__bg"></div>
        <div class="color__info">
          <h3>Thistle</h3>
          <h5>#D7BFD7</h5>
        </div>
      </article>
    </section>
  </body>
</html>
```

## 3. CSS

### 내용정리

```
1. flex
- flex가 바로 위 부모에 적용되야 자식태그에 flex 가 적용
- flex 에선 태그들의 위치와 정렬, 간격 등을 훨씬 유연하게 조정가능
	> padding, margin, flex-direction, align-items, justify-content 등

2. 의사클래스 (HTML 요소의 특별한 '상태(state)'를 명시)
- 태그들의 순서, 상태 등을 통해 꾸며줄 대상을 더 쉽게 특정
- nth-child(n) 형제들 사이에 n번째 요소를 선택할 수 있는 의사선택자

3. position
- absolute : 가장 상위 태그(body)를 기준으로 위치를 조정
	단, 상위 태그에 relative가 잡혀있으면 그 태그 기준으로 조정됨

4. padding vs margin
- margin: 경계선 외부의 여백
- padding: 경계선 안쪽의 여백
```

### 코드

```css
/* 
- flex 적용하여 h1, section 태그에도 적용할 준비
- direction:column, align:center 적용 
	-> 열 방향으로 반전(기본값은 행), 가운데 정렬 
	-> h1, div 가운데 / 위에서부터 정렬
- h1 에 margin-bottom 으로 다른 태그와 분리
*/

body {
  height: 100vh;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 50px;
}

/* 
- width: 50% : div가 들어있는 section의 크기가 페이지 50%
- margin: 0 auto 는 좌우 여백을 동일하게 만드는 기능
- flex를 적용하여 자식태그(div)에 flex 기능 적용 준비
- space-between : section 안에서 공간을 분할 (div들이 띄어짐)
- wrap: 창의 크기가 감소되면 여러 행으로 나뉘어 표시
*/

section {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 
- width: 48%로 해서 3개 째 페이지 공간이 초과되며 두줄로 바뀜 
- color클래스는 article 태그에 적용된 클래스로, 
  position: relative를 줘서 자식(div)태그가 자신을 기준으로 움직이도록 설정 
*/
.color {
  width: 48%;
  position: relative;
  margin-bottom: 20px;
}

/*
- 의사선택자를 적용해서 4가지 색을 각각 적용함 
- 첫번 째 color클래스의 자식이 가진 color__bg 클래스에 적용
*/
.color:first-child .color__bg {
  background-color: tomato;
}

.color:nth-child(2) .color__bg {
  background-color: teal;
}

.color:nth-child(3) .color__bg {
  background-color: burlywood;
}

.color:last-child .color__bg {
  background-color: thistle;
}

/* 
div태그에 크기를 정해줘야 위에서 정한 배경색이 적용됨
border(경계선)
*/
.color__bg {
  height: 300px;
  border: 5px solid white;
}

/* 
position: absolute; 로 형제 div태그 위에 표시되도록 정함
box-sizing:border-box; 로 패딩으로 삐져나온 div 조정해줌
*/
.color__info {
  position: absolute;
  width: 100%;
  background-color: white;
  top: 20px;
  padding: 0px 10px;
  box-sizing: border-box;
}
```
