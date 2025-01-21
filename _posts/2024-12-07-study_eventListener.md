---
layout: single
title:  "[study] [javaScript] 이벤트리스너 공부하기"
categories: study
tags: [javaScript, blog, study] 
toc : true
author_profile : false 
---

### EventListener
***

#### EventListener란?

- 목적
    - 발생한 이벤트에 대처하기 위해 작성된 JavaScript 코드
- 종류
    - 이벤트의 종류는 70여가지, 이벤트 리스너는 이벤트 앞에 'on'을 덧붙임
        - onmousedown : mousedown의 이벤트 리스너

***
### 이벤트 리스너 만들기

#### HTML 태그 내 작성
HTML 태그의 이벤트 리스너 속성에 리스너 코드 직접 작성
```html
<p onmouseover="this.style.backgroundColor='red'" onmouseout="this.style.backgroundColor='white'">
    마우스 올리면 배경색을 red 색으로 변경 
</p>
```
#### DOM 객체의 이벤트 리스너 프로퍼티에 작성
DOM 객체의 이벤트 리스너 프로퍼티에 이벤트 리스너 작성
```html
<p id="p"> 마우스 올리면 배경색을 red 색으로 변경 </p>
```
```js
let p;
function init(){
    p = document.getElementById("p");
    p.onmouseover = over;
    p.onmouseout = out;
}
function over(){
    p.style.backgroundColor="red";
}
function out(){
    p.style.backgroundColor="white";
}
```
#### DOM 객체의 addEventListener() 메소드 이용
- addEventListener(eventName, listener[, useCapture])
    - eventName : 이벤트 타입
        - click, load, keydown 등
    - listener : 이벤트 리스너로 등록할 함수 이름
    - useCapture (생략 가능)
        - true : 캡쳐단계에서 실행
        - false : 버블단계에서 실행 -> 디폴트

```html
<p id="p"> 마우스 올리면 배경색을 red 색으로 변경 </p>
```
```js
let p;
function init(){
    p = document.getElementById("p");
    p.addEventListener("mouseover", over);
    p.addEventListener("mouseout", out);
}
function over(){
    p.style.backgroundColor="red";
}
function out(){
    p.style.backgroundColor="white";
}
```
#### 익명함수로 작성
익명함수(anonymous function)
- 함수의 이름 없이 필요한 곳에 함수의 코드 바로 작성
- 코드가 짧거나 한 곳에서만 필요한 경우 사용

```js
p.onmouseover = function(){
    this.style.backgroundColor="red";
};
```
```js
p.addEvenrListener("mouseover", function(){this.style.backgroundColor="red";}
);
```

### 이벤트 객체 (event object)
발생한 이벤트의 정보를 담은 객체
- mousedown : 마우스의 좌표, 버튼 번호 등

이벤트가 처리되면 이벤트 객체는 소멸

#### 이벤트 객체 전달받기
이벤트 객체는 이벤트 리스너 함수의 첫번째 매개변수에 전달
1. 이름을 가진 이벤트 리스너
```js
function f(e){ // 매개변수 e에 이벤트 객체를 전달 받음
...
}
obj.onclick = f; // obj객체의 onclick 리스너로 함수 f 등록
```
2. 익명 함수의 경우
```js
obj.onclick = function(e){ // 매개변수 e에 이벤트 객체를 전달 받음
...
}
```
3. html태그에 이벤트 리스너

```html
<script>
    function f(e){
        ...
    }
</script>
<button onclick="f(event)">버튼</button> <!--event 라는 이름으로 이벤트 객체 전달받음-->
<div onclick="alert(event.type)">버튼</div> <!--event종류 출력-->
```

#### 이벤트 객체에 들어 있는 정보
현재 발생한 이벤트에 관한 다양한 정보
- 객체의 프로퍼티와 메소드로 알 수 있음
- 이벤트 객체의 공통 멤버
    - 프로퍼티
        - type : 현재 발생한 이벤트의 종류
        - target : 이밴트를 발생시킨 객체(DOM객체 / HTML 태그)
        - currentTarget : 현재 이벤트 리스너를 실행하고 있는 DOM 객체
        - defaultPrevented : 이벤트의 디폴트 행동이 취소되었는지를  나타내는 True/False 값
    - 메소드
        - preventDefault() : 이벤트의 디폴트 행동을 취소시키는 메소드

### 이벤트 흐름
1. 이벤트 발생
2. window 객체 도달
3. DOM트리를 따라 이벤트 타겟에 도착
4. 다시 반대 방향으로 플러 window객체 도달
5. 사라짐

#### 캡쳐 단계(capturing phase)
- 이벤트 발생
- window 객체 도달
- DOM트리를 따라 이벤트 타겟에 도착

#### 버블 단계(bubbling phase)
- 다시 반대 방향으로 플러 window객체 도달
- 사라짐