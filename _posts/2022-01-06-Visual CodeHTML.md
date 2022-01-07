---
layout: single
title:  "Visual Code 설정 / HTML기초"
categories: foundation
tag: [foundation, HTML, Visual Studio Code]
toc: true
author_profile: false
sidebar:
    nav: "docs"
typora-root-url: ../
---

# Visual Code 설정 / HTML기초

### Visual Code Extention 9가지

1. Material Theme - VS Code의 테마를 간단하게 변경 가능

2. Material Icon Theme - 폴더 확장자의 아이콘들을 Material 디자인으로 변경

3. Auto Rename Tag - 시작 태그 변경시 끝 태그도 같이 변경

4. HTML to CSS autocompletion - html 지정한 속성을 CSS에서도 자동완성 지원

5. HTML CSS Suppoert - 4번과 반대로 css에서 지정한 속성을 html에서 자동완성 지원

   CSS Peek - 작성한 클래스를 Ctrl + 클릭으로 바로 찾아갈 수 있게함

6. Autoprefixer - vendor prefixes를 필요한 부분에 자동으로 완성

7. Bracket Pari colorizer2 - 중괄호의 색깔을 맞춰주며 가독성 향상

8. indent-rainbow - 들여쓰기의 색상을 무지개색으로 변경

9. Live Server - 테스트 해보기위해서 브라우저를 새로고침을 해줘야만 하는데, 해당 익스텐션을 설치하면 새로고침 없이 바로 적용

### HTML 태그

+ 콘텐츠가 있는 태그

  < div > , < p >, < span > 

  ex) <div>내용</div>

  항상 시작태그와 끝 태그가 같아야한다.

+ 콘텐츠가 없는 태그

  < br>, < img > < meta >

   시작태그와 끝태그 개념이 없음

+ 속성과 속성값은 태그를 의미나 기능적으로 보조해주는 역할이다.

```html
<!DOCTYPE html> <!-- html5 버전을 사용하겠다고 선언 -->
<html lang="en"> <!-- lang은 html 문서의 언어 정보, ko는 속성값 -->
<head> <!-- html 문서의 정보를 작성하는 영역 -->
    <meta charset="UTF-8"> <!-- 문서의 인코딩을 결정해주는 charset 속성 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title> <!-- 문서의 제목 -->
</head>
<body> <!-- 웹 브라우저에 표시되는 영역 -->    
    <p>
        test
    </p>
</body>

</html>
```

+ < h >태그는 주로 콘텐츠의 대제목, 중제목, 소제목과 같은 곳에 사용

  < h1 > ~ < h6 > 숫자가 낮을 수록 중요하다는 의미

  < h > 태그를 잘 사용하지 못하면 검색엔진에 불이익을 받을 수 있음

  2가지 신경써야할 점

  + < h1 > 태그는 한 번반 사용하기 (많이 쓰면 검색엔진이 무엇이 중요한지를 모름)
  + h(n)태그는 < h1> 태그부터 순차적으로 사용하기 (검색엔진은 h1부터 순차적으로 수집하기 때문)

  ```html
      <h1>1</h1>
      <h2>2</h2>
      <h3>3</h3>
      <h4>4</h4>
      <h5>5</h5>
      <h6>6</h6>
  ```

+ < p > 태그는 paragraph의 약자로 단락이라는 뜻

  p 태그는 웹 브라우저의 가로 한 줄을 사용하는 태그이다.

  공백은 웹 브라우저에서 최대 한 칸 (스페이스바로 쭉 늘려놔도 한 칸만 떨어져 있다.) / &nbsp ; 를 사용하면 띄어놀 수 있음

+ < br > 태그는 줄바꿈 태그이다.

  p태그의 유의점으로 한 줄로 이어지는 단락인데 두 줄로 출력하고 싶다면, p태그를 두 개 만들지말고, < br > 태그를 이용하여 줄을 바꿔준다.

  ```html
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, 
  <br>voluptates. Quis, architecto eaque? Atque vero, a optio perspiciatis est ab debitis sit inventore,</p>
  ```

+ < a >태그는 웹페이지에서 링크를 연결할 때 사용하는 태그 (anchor의 약자)

  a태그는 내부 링크와 외부 링크로 나눌 수 있다.

  밑에 예제처럼 해당 페이지 안에서 움직이는것이 내부 링크

  주로 목차에 많이 사용된다.

  외부링크는 다른 사이트(구글, 네이버, 다음 등..)를 연결해주는 것이다.

  target="_blank" 속성과 속성값없이 사용하면 기존 페이지에서 다른 사이트로 이동하게되는데,

  타겟과 블랭크를 사용하면 새 탭에서 사이트가 켜지게된다.

  ```html
  <!-- 내부링크 -->    
  <a href="#one">one로 이동</a>
  <a href="#two">two로 이동</a>
  <a href="#three">three로 이동</a>
  
  <p id="one" style="margin-top: 1500px;">one</p>
  <p id="two" style="margin-top: 1500px;">two</p>
  <p id="three" style="margin-top: 1500px;">three</p>
  <p style="margin-top: 2000px;"></p>
  ```

  ```html
  <!-- 외부링크 -->
  <a href="https://www.google.com" target="_blank">구글로 이동</a>
  ```


+ 1
+ 1
+ 1
+ 1