---
layout: single
title: "제어문"
categories: DeepDiveJS
tag: [JavaScript]
toc: true
author_profile: false
sidebar:
  nav: "docs"
---

# 제어문

## 블록문

블록문<sup>block statement/compound statement</sup>은 0개 이상의 문을 중괄호로 묶은 것으로, 코드 블록 또는 블록이라고 부르기도 한다.

자바스크립트는 블록문을 하나의 실행 단위로 취급한다.

블록문은 언제나 문의 종료를 의미하는 **자체 종결성**을 갖기 때문에 블록문 끝에는 세미콜론을 붙이지 않는다.

```javascript
// 블록문
{
    var foo = 10;
}
```

## 조건문

조건문<sup>conditional statement</sup>은 주어진 조건식<sup>conditional expression</sup>의 평가 결과에 따라 코드 블록(블록문)의 실행을 결정한다.

조건식은 불리언 값으로 평가될 수 있는 표현식이다.

### if ... else 문

```javascript
if (조건식) {
    // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
    // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

else if 문과 else 문은 옵션이다. if 문과 else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용 가능하다.

```javascript
var num = 2;
var kind;

// if 문
if (num > 0) {
    kind = '양수'; // 음수는 구별할 수 없다.
}
console.log(kind); // 양수

// if ... else 문
if (num > 0) {
    kind = '양수';
} else {
    kind = '음수'; // 0은 음수가 아니다.
}
console.log(kind); // 양수

// if ... else if 문
if (num > 0) {
    kind = '양수';
} else if (num < 0) {
    kind = '음수';
} else {
    kind = '영';
}
console.log(kind); // 양수
```

**만약 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있다.** 

```javascript
var num = 2;
var kind;

if (num > 0) kind = '양수';
else if (num < 0) kind = '음수';
else kind = '영';

console.log(kind); //양수
```

## 반복문

### for 문

for 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다. 가장 일반적 형태는 다음과 같다.

```javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
    조건식이 참인 경우 반복 실행될 문;
}
```

### while 문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.

**for 문은 반복 횟수가 명확할 때 주로 사용하고 while 문은 반복 횟수가 불명확할 때 주로 사용한다.**

### do ... while 문

do ... while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한 번 이상 실행된다.



> **<span style='color: grey'>이웅모, "모던 자바스크립트 Deep Dive", 위키북스(2020), p93-107.</span>**