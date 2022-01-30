---
layout: single
title: "CSS Animation"
categories: HTML & CSS
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
    animation,
    transform,
    rotate,
    화면 가운데 위치,
    justify-content,
    align-items,
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

![SuVjwwv](https://user-images.githubusercontent.com/67591105/151110135-d81f4fe7-6aed-4330-bfc1-466d48d0d57a.gif)

## 2. HTML 코드

### 태그 정리하기 (위에서부터 순서대로 )

    - body
    - div class='dots'(1) : 3개의 dots을 가진 div(block)
    - span class='dot'(3) : 1개의 dot을 가진 span(inline)
    - div class='lines' 와 span class='line' 도 위와 같음

### 코드

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>repl.it</title>
    <link href="style.css" rel="stylesheet">
</head>
<body>
  <div class='dots'>
    <span class='dot' ></span>
    <span class='dot'></span>
    <span class='dot'></span>
  </div>
  <div class='lines'>
    <span class='line'></span>
    <span class='line'></span>
    <span class='line'></span>
    <span class='line'></span>
    <span class='line'></span>
  </div>
</body>

```

## 3. CSS

### 내용정리

```
1. div 가운데 위치시키기 (부모태그 body에 flex 적용)
  display: flex;				flex-direction: column;
  justify-content: center;		 align-items: center;

2. animation 만들기
- @keyframes {{}} 안의 내용은 코드 참고

3. 태그마다 따로 animation-delay 등으로 효과를 다채롭게 표현 가능
```

### 코드

```css
html,
body {
  height: 100%;
}
/* 
> display, direction, justify, align 옵션을 
> 아래와 같이 설정하면, 콘텐츠들이 화면 가운데 위치 
*/
body {
  font-family: sans-serif;
  background-color: #76c4c6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 
  > div에 rotate(0.5turn)으로 회전효과를 줌 
    - span에 각각 주는게 아님!! 
  > space-around로 간격을 띄워줌 
*/
.dots {
  width: 200px;
  display: flex;
  justify-content: space-around;
  animation: dotAnim 1s ease-in-out infinite;
}

.dot {
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.lines {
  width: 150px;
  margin-top: 200px;
  display: flex;
  justify-content: space-around;
}

/* 각각의 line에 animation 주기 */
.line {
  width: 20px;
  height: 80px;
  background-color: white;
  animation: LineAnim 1s ease-in-out infinite;
}

/* 
rotate에 0.5turn으로 반바퀴 돌아가게 설정
*/
@keyframes dotAnim {
  50% {
    transform: rotate(0.5turn);
  }
  100% {
    transform: rotate(0.5turn);
  }
}

/* 
none 설정으로 크기 고정시켜야 깔끔하게 나옴
*/
@keyframes LineAnim {
  0% {
    transform: none;
  }
  25% {
    transform: scaleY(2);
  }
  50%,
  100% {
    transform: none;
  }
}

/* line 들에 각각 다른 딜레이 주기 */
.line:nth-child(2) {
  animation-delay: 0.1s;
}

.line:nth-child(3) {
  animation-delay: 0.2s;
}

.line:nth-child(4) {
  animation-delay: 0.3s;
}

.line:nth-child(5) {
  animation-delay: 0.4s;
}
```
