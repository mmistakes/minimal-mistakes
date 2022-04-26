---
layout: single
title:  "DAY-38 Event 이용"
categories: JAVASCRIPT
tag: [JAVASCRIPT, 자바스크립트, Event]
toc: true
author_profile: false
sidebar:
  nav: "docs"
---

## 🚀 Event 이용

# 2022-04-26

<!--Quote-->
> ❗ 수업을 듣고, 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음


## 형변환


### 1) String, boolean to Number

문자열이나 불리언을 숫자로 형변환하는 방법
1. parseInt(정수 문자열), parseFloat(실수 문자열)
2. Number(문자열 or 불리언)
3. (문자열 or 불리언) * 1


### 2) Number to String
숫자나 불리언을 문자열로 형변환하는 방법은 3가지 정도다.

1) (숫자 or 불리언).toString()
2) String(숫자 or 불리언)
3) "" + (숫자 or 불리언)


<details>
<summary>출처</summary>
<div markdown="1">
 [형변환](https://curryyou.tistory.com/186)
</div>
</details>



## 비교


1. == : 값 자체만 가지고 equal 비교 -> null, undefined에 자주 사용
2. === : 값 + 타입 equal 비교


## 이벤트 종류

<details>
<summary>이벤트</summary>
<div markdown="1">
 [이벤트](https://yoonjong-park.tistory.com/entry/addEventListener-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A6%AC%EC%8A%A4%EB%84%88-%EC%A2%85%EB%A5%98)
</div>
</details>

### hover 기능 이벤트

- css의 hover 기능을 자바스크립트에서 구현
- event 발생시mouseover, mouseout 사용
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="xxpogXm" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/xxpogXm">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


### keyboard 이벤트
- keydown : 키보드의 키를 누르면 keydown 이벤트가 시작
- keypress : 방금 누른 키를 놓으면 keyup 이벤트가 시작
- keyup : 문자 (문자, 숫자 등)를 표시하는 키를 누를 때만 발생


<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBpzXWW" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/qBpzXWW">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


### onfocus 이벤트

- focus : input창에 커서가 깜빡이고 있는 상태
- blur : focus가 풀린상태


<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="qBpzrxZ" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/qBpzrxZ">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


### mouseover : 마우스 이동

- 마우스 이동 시 마우스 포인터에 색을 주거나 모양을 준다


💡 원리 :
1. 마우스가 움직일 때마다 발생하는 x축과 y축의 좌표를 얻어온다
2. 원이 이동할때 즉 addEventListener("mouseover") 시에 이동하는 이벤트를 준다
3. 이때 x축의 이동 좌표와 y축의 이동 좌표는 마우스의 좌표를 활용한다


1️⃣ 다음을 코드를 활용해 현재 마우스의 좌표를 얻어올 수 있다.


```javascript
window.addEventListener("mouseover",function(e) {
 console.log(e.pageX);
 console.log(e.pageY);
 console.log(e.clientX);
 console.log(e.clientY);
})
```
<details>
<summary>출처</summary>
<div markdown="1">
 [DelftStack](https://www.delftstack.com/ko/howto/javascript/javascript-mouse-position)
</div>
</details>




<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNdqpWP" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/WNdqpWP">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>