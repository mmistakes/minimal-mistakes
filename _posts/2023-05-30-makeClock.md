---
layout: single
title: "makeClock"
categories: Problem_Solving
tag: [HTML, JavaScript]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# Date Object를 통해 현재시간 나타내기

## new Date()

저는 웹 페이지에 시간을 00:00:00 형식으로 실시간으로 시간을 업데이트 하고자 했습니다.

우선 **JavaScript**에서 사용되는 내장 생성자(constructor) 함수 중 하나인 `new Date()`가 필요합니다.

`new Date()`는 현재 날짜와 시간을 나타내는 Date 객체를 생성하는 데 사용됩니다.

한 번 콘솔에서 실행해보겠습니다.

<img src="/assets/images/console1.PNG">

Date 객체는 위 사진에 나오는 메서드 이외에도 날짜와 시간을 다루는 다양한 메서드를 제공합니다.

우선 제가 원하는 시간, 분, 초를 얻을 수 있게되었습니다.

<img src="/assets/images/console2.PNG">

그렇지만 여기서 문제가 있습니다. 1초마다 현재 시간을 업데이트하고, 업데이트된 시간을 보여줘야 하는데 위 코드로는 업데이트는 힘들어 보입니다. 어떻게 해야 할까요? 바로 `setInterval()`함수가 있습니다.

## setInterval()

`setInterval()`은 JavaScript에서 제공하는 내장 함수로, 주어진 시간 간격마다 반복적으로 함수를 실행하는 타이머를 설정하는 데 사용됩니다.

`setInterval()` 함수는 다음과 같은 구문을 가집니다.

```javascript
setInterval(callback, delay, arg1, arg2, ...)
```

- `callback`: 지정된 시간 간격마다 반복적으로 호출되는 함수입니다.
- `delay`: 함수를 호출하는 간격을 나타내는 시간(ms, 밀리초)입니다.
- `arg1, arg2, ...`: 선택적으로 전달되는 매개변수들로, 콜백 함수에 전달됩니다.

`setInterval()`을 통해서 한 번 콘솔에 현재 시간을 출력해보겠습니다.

<img src="/assets/images/console3.gif">

위의 코드는 1초마다 현재 시간을 업데이트합니다. 이를 사용하여 웹 페이지에 실시간으로 시간을 표시할 수 있습니다.

이제 위 코드를 활용하여 현재시간을 실시간으로 업데이트해 주는 코드를 작성해 보겠습니다.

## 현재시간을 실시간으로 나타내는 코드

### html Code

```html
...
<body>
    <h2 id='clock'>
        00:00:00
    </h2>
</body>
...
```

### JavaScript Code

```javascript
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
setInterval(getClock, 1000);
```

## 문제점 발생

위 코드를 실행해보면 2가지 문제점이 보입니다. 

* 첫 번째 문제점 : 코드가 실행되고 1초 동안은 00:00:00이 유지된다는 점

* 두 번째 문제점 : 시간, 분, 초의 자릿수가 한자리면 그냥 한자리로 표현된다는 점

  예를들어 현재시간이 오전 1시 10분 1초일 경우 => 1:10:1

  <img src="/assets/images/console4.gif">

## 해결방법

### 첫 번째 문제점  해결하기

`setInterval()`을 호출한 직후에 한 번 함수를 실행하여 초기 출력을 확인할 수 있도록 하겠습니다.

```javascript
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// 초기 출력을 바로 확인하기 위해 함수를 한 번 실행
getClock()

setInterval(getClock, 1000);
```

이렇게  "코드가 실행되고 1초 동안은 00:00:00이 유지된다"는 점인 첫 번째 문제를 해결하였습니다. 

### 두 번째 문제점 해결하기

우선 JavaScript의 문자열 메서드인 `padStart()`에 대해서 알아보겠습니다.

`padStart()`는 자바스크립트 문자열 메서드로, 문자열의 시작 부분에 지정된 길이만큼 다른 문자열을 삽입하여 원하는 길이의 문자열을 만드는 데 사용됩니다.

`padStart()` 함수는 다음과 같은 구문을 가집니다.

```javascript
str.padStart(targetLength, padString)
```

- `str`: 현재 문자열을 나타냅니다.
- `targetLength`: 결과 문자열의 목표 길이를 나타냅니다. 이 길이에 현재 문자열의 길이를 포함하여 결과 문자열의 전체 길이가 됩니다.
- `padString` (선택적): 원하는 경우 목표 길이에 도달하기 위해 현재 문자열의 시작 부분에 삽입할 다른 문자열입니다. 기본값은 빈 문자열(`""`)입니다.

`padStart()`를 활용하여 두 번째 문제점을 해결하는 코드를 작성해보도록 하겠습니다.

```javascript
...
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);
```

`padStart()` 메서드를 사용하여 시간, 분, 초가 한 자리일 경우 앞에 0을 추가하여 두 자리 수로 표현하도록 수정되었습니다. 이렇게 수정하면 예를 들어 현재 시간이 "오전 1시 10분 1초"인 경우에도 "01:10:01" 형식으로 정확히 표현됩니다.

<img src="/assets/images/console5.gif">

## 정리

다시한번 문제점 두가지를 정리하겠습니다.

첫 번째 문제는 "코드가 실행되고 1초 동안은 00:00:00이 유지된다는 점"입니다. 이 문제를 해결하기 위해 코드를 수정하여 `getClock()` 함수를 최초 호출한 후에 `setInterval()`을 사용하여 1초마다 함수를 호출하도록 했습니다. 이렇게 함으로써 코드가 실행되자마자 현재 시간을 바로 출력할 수 있게 되었습니다.

두 번째 문제는 "시간, 분, 초의 자릿수가 한 자리면 그냥 한 자리로 표현된다는 점"입니다. 이 문제를 해결하기 위해 `padStart()` 메서드를 사용하여 시간, 분, 초를 두 자리로 맞추었습니다. 예를 들어, `getHours()`, `getMinutes()`, `getSeconds()` 메서드로 얻은 값들을 `String()` 함수로 문자열로 변환한 후에 `padStart(2, '0')`를 호출하여 두 자리로 맞추었습니다. 이렇게 함으로써 시간, 분, 초가 한 자리 수일 때에도 앞에 0이 추가되어 두 자리로 표현되게 되었습니다.

## 최종 Code

### html Code

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Momentum</title>
    <link rel="stylesheet" href="/css/style.css" />
  </head>
  <body>
    <form class="hidden" id="login-form">
      <input
        required
        maxlength="15"
        type="text"
        placeholder="What is your name?"
      />
      <input type="submit" value="Log In" />
    </form>
    <h2 id="clock">00:00:00</h2>
    <h1 id="greeting" class="hidden"></h1>
    <script src="js/clock.js"></script>
    <script src="js/greetings.js"></script>
  </body>
</html>
```

### JavaScript Code

```javascript
const clock = document.querySelector("h2#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
setInterval(getClock, 1000);
```

