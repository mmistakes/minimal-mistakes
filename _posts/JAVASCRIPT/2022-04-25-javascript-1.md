---
layout: single
title:  "DAY-37 자바스크립트 시작"
categories: JAVASCRIPT
tag: [JAVASCRIPT, 자바스크립트]
toc: true
author_profile: false
sidebar:
  nav: "docs"
---

## 🚀 자바 스크립트 시작

# 2022-04-25

<!--Quote-->
> ❗ 수업을 듣고, 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음


## 🔔변수 선언

var : function level scope


let,const : block level scope



```javascript
// 에러 발생
console.log(num1); // 실행
console.log(num2); // 에러 발생
console.log(num3); // 에러 발생

var num1 = 1;
let num2 = 2;
const num3 = 3;


// 에러 발생 x
var num4 = 1;
let num5 = 2;
const num6 = 3;

console.log(num4); // 실행
console.log(num5); // 실행
console.log(num6); // 실행

// 변수에 값의 재할당
num4 = "string1";
num5 = "string1";

console.log(num4);
console.log(num5);

// 중복된 변수명 사용
var num1 = true;
// let num2 = false; -> 에러 발생(위에서 num2를 let으로 이미 선언)
```

### scope

- function level scope : 하나의 함수 내에서 선언한 변수는 해당 함수 내에서 공유되는 경우
- block level scope : 하나의 블록 내에서 선언한 변수는 그 블록 내에서만 공유가 가능한 경우 (자바에서의 지역변수)

```javascript
// var를 이용하면 지역변수여도 사용 가능하다
function test1() {
  if(true) {
    var test = 'TEST_VAR';  //
  }

  console.log(test);
}

// let은 오류가 발생한다
function test2() {
  if(true) {
    let test = 'test_var';
  }

  console.log(test);
}
```

## 🔔type
자바스크립트에서의 자료형
- String, boolean, number, Bright, null, undefined, Symbol(고유한 값을 만들고자 할 때 사용하는 자료형)
  - undefined : 변수를 선언하고 그 변수에 값이 대입되지 않았을 경우
  - null : 값 자체가 없는 경우

```javascript
let a;
console.log(a); // undefined
console.log(typeof a); // undefined

let b = null;
console.log(b); // null
console.log(typeof b); // object

let c = "c";
console.log(c); // c
console.log(typeof c); // string

let d = 0;
console.log(d); // 0
console.log(typeof d); // number

let sym1 = Symbol("abc");
let sym2 = Symbol("abc");
console.log(sym1); // Symbol(abc)
console.log(sym2); // Symbol(abc)
console.log(sym1 == sym2); // false

//BigInt 형으로 값을 넣어주고 싶으면 숫자 뒤에 n을 붙여준다
let num = 10n;
console.log(typeof num); //bigint

console.log(1/0); // Infinity

console.log("문자"/1);// NaN = Not a Number

```


## 🔔basicFunction

### 알림창
1) alert

- 기본적인 알림창(확인 버튼 하나가 뜬다)


```javascript
alert('hello');
```


1) confirm

- 알림창(확인 버튼과 취소 버튼이 나옴)


```javascript
confirm('hello2');

let check = confirm("정말 삭제하시겠습니까?");
console.log(check);
// 확인을 누르면 true
// 취소를 누르면 false
```


3) prompt

- 알림창(확인과 취소, 입력창을 띄워준다)
- 입력한 결과값을 return 해줌



```javascript
// 알림창(확인과 취소, 입력창을 띄워준다)
  let input = prompt("hello");
  console.log(input);
```

## 🔔selector

### getElementById
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="PoEvRgj" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/PoEvRgj">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


1. value : input, textarea, select 태그들은 value를 통해서 값에 접근 가능
2. innerHTML : innerHTML을 통해 input, textarea, select 태그들을 제외하고 값에 접근 가능

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="RwxmyNp" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/RwxmyNp">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



## 🔔함수

- 자바스크립트에서 함수는 값처럼 사용가능

```javascript
function plus(num1, num2) {
  return num1 + num2;
}

let result = plus(3,4);
console.log(result);

// 함수를 값처럼 사용한다
let temp = plus; // plus라는 함수 자체가 temp에 들어간다
console.log(temp); // ƒ plus(num1, num2) {return num1 + num2;} 출력 //
console.log(temp(5,7)); // 12 출력

```

### 익명함수


- 이름이 없는 함수

```javascript
let temp2 = function(a, b) {
  return a + b;
}

console.log(temp2); // ƒ (a, b) {return a + b;} 출력
console.log(temp2(5,10)); // 15 출력

```
### 매개변수로 함수를 넘기기

```javascript
// 매개변수로 함수를 넘기는 상황
function func(f) {
  return f(5,10);
}

function add(a, b) {
  return a+b;
}

func(add);

console.log(func(add)); // 15출력

```


## 이벤트

- 이벤트 : 브라우저 안에서 사용자가 취하는 모든 액션
(클릭, hover, drag, 스크롤, 크기조절..)

- call back function : 함수안의 파라미터로 다른 함수를 호출

- event listener(이벤트 감시자)
: 특정한 이벤트가 발생했을 때 그 이벤트를 감지하는 역할

- event handler(이벤트 처리자)
: 특정한 이벤트가 감지됐을 때 그에 따른 처리코드를 수행하는 역학

- e-> 일어난 이벤트에 대한 정보

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOYopmG" data-user="kimyeong96" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/kimyeong96/pen/jOYopmG">
  Untitled</a> by kimyeong96 (<a href="https://codepen.io/kimyeong96">@kimyeong96</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



```javascript

<button type="button" id="btn">버튼</button>
const btn = document.getElementById('btn');

function printA() {
  alert("A");
}

function printB() {
  alert("B");
}

// 이벤트는 마지막에 셋팅된 함수만 호출된다
btn.onclick = printA();
btn.onclick = printB();

// addEventListener를 사용시 여러개를 한번에 사용가능
btn.addEventListener("click", printA);
btn.addEventListener("click", printB);

```