---
title: "JavaScript 2주차"
categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

author_profile: true
date: 2023-04-05
---

## JavaScript ES6 문법

### 구조 분해 할당 (Destructuring)

- #### 배열 [] 이나 객체 {} 의 속성을 분해해서 그 값을<br> 변수에 담을 수 있게 해준다

  ```javascript
  // 배열의 경우
  let [value1, value2] = [1, "new"];
  console.log(value1); // 1
  console.log(value2); // "new"

  let arr = ["value1", "value2", "value3"];
  let [a, b, c] = arr;
  console.log(a, b, c); // value1 value2 value3

  // let [a,b,c] = arr; 은 아래와 동일!
  // let a = arr[0];
  // let b = arr[1];
  // let c = arr[2];

  let [a, b, c, d] = arr;
  console.log(d); // undefined

  let [a, b, c, d = 4] = arr; // d의 초기값을 잡아줄 수 있다
  console.log(d); // 4
  ```

### 단축 속성명 (property shorthand)

- #### 객체의 key와 value 값이 같다면, 생략 가능

  ```javascript
  const name = "nbc";
  const age = "30";

  // key - value
  const obj = {
    name,
    age: newAge,
  };

  const obj1 = { name, age };
  ```

### 전개 구문 (Spread)

- #### 배열이나 객체를 전개하는 문법

  ```javascript
  // 배열
  let arr = [1, 2, 3];

  let newArr1 = [...arr];
  console.log(newArr1); // 1 2 3

  let newArr2 = [...arr, 4];
  console.log(newArr2); // [1,2,3,4]

  // 객체
  let user = { name: "nbc", age: 30 };
  let user2 = { ...user };

  user2.name = "nbc2";

  console.log(user.name); // nbc
  console.log(user2.name); // nbc2
  ```

### 나머지 매개변수(rest parameter)

- #### function에 들어갈 매개변수의 개수를 정확히 모를때 사용

  ```javascript
  function func(a, b, ...args) {
    console.log(...args);
  }

  func(1, 2, 3); // 3
  func(1, 2, 3, 4, 5, 6, 7); // 3 4 5 6 7
  ```

### 템플릿 리터럴 (Template literals)

- #### 백틱(`) 과 ${}를 활용하여 javascript코드, 변수, 연산까지<br>문자열 출력 가능하게 해주고 멀티라인을 지원한다

  ```javascript
  const testValue = "안녕하세요!";
  console.log(`Hello World ${testValue}`); // Hello World 안녕하세요!
  ```
