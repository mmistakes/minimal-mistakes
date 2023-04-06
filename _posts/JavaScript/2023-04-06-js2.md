---
title: "JavaScript 조건문, 반복문"
categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

author_profile: true
date: 2023-04-06
---

## JavaScript 조건문, 반복문

### 조건문

#### if문

- ##### 조건이 참인 경우 코드 실행

  ```javascript
  let x = 10;

  if (x > 0) {
    console.log("x는 양수입니다.");
  }
  ```

#### if-else문

- ##### 조건이 참인 경우와 거짓인 경우 각각 다른 코드 실행

  ```javascript
  let x = -10;

  if (x > 0) {
    console.log("x는 양수입니다.");
  } else {
    console.log("x는 음수입니다.");
  }
  ```

#### if-else if-else문

- ##### 여러 개의 조건을 순서대로 비교하여 해당하는 조건에 맞는 코드를 실행

  ```javascript
  let x = 0;

  if (x > 0) {
    console.log("x는 양수입니다.");
  } else if (x < 0) {
    console.log("x는 음수입니다.");
  } else {
    console.log("x는 0입니다.");
  }
  ```

#### switch문

- ##### 변수의 값에 따라 여러 개의 경우(case)중 하나를 선택하여 해당하는 <br>코드를 실행

  ```javascript
  let fruit = "사과";

  switch (fruit) {
    case "사과":
      console.log("사과는 빨간색입니다.");
      break;
    case "바나나":
      console.log("바나나는 노란색입니다.");
      break;
    case "오렌지":
      console.log("오렌지는 주황색입니다.");
      break;
    default:
      console.log("해당하는 과일이 없습니다.");
      break;
  }
  ```

#### 삼항 연산자

- ##### if문과 비슷한 역할을 하며 조건이 참인 경우와 거짓인 경우 각각 <br>다른 값을 반환
  ```javascript
  let age = 20;
  let message = age >= 18 ? "성인입니다." : "미성년자입니다.";
  console.log(message); // "성인입니다."
  ```

#### 조건문의 중첩

- ##### 중첩된 if문을 사용하여 성별에 따라 성인 여부를 판별한다<br>조건문 안에 또다른 조건문을 사용하여 복잡한 조건을 판별할 수 있다

  ```javascript
  let age = 20;
  let gender = "여성";

  if (age >= 18) {
    if (gender === "남성") {
      console.log("성인 남성입니다.");
    } else {
      console.log("성인 여성입니다.");
    }
  } else {
    console.log("미성년자입니다.");
  }
  ```

### 반복문

#### 기본적인 for문

- ##### 초기값, 조건식, 증감식을 사용하여 반복 횟수를 제어

  ```javascript
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
  ```

#### 배열과 함 꼐 사용하는 for문

- ##### 배열 numbers와 함께 for문을 사용하여 배열의 요소를 출력하고<br>배열의 요소 개수만큼 반복하여 실행한다

  ```javascript
  let numbers = [1, 2, 3, 4, 5];

  for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
  }
  ```

#### for...in문

- ##### 객체 person의 프로퍼티를 출력하고 객체의 프로퍼티를 순서대로<br>접근할 수 있다

  ```javascript
  let person = { name: "John", age: 30, gender: "male" };

  for (let key in person) {
    console.log(key + ": " + person[key]);
  }
  ```

#### while문

- ##### 조건식이 참인 경우에만 코드를 반복해서 실행한다

  ```javascript
  let i = 0;

  while (i < 10) {
    console.log(i);
    i++;
  }
  ```

#### do...while문

- ##### 일단 한 번은 코드를 실행하고 그 후에 조건식을 체크하여 반복 여부를<br> 결정한다

  ```javascript
  let i = 0;

  do {
    console.log(i);
    i++;
  } while (i < 10);
  ```

#### break문

- ##### break문은 반복문을 종료한다

  ```javascript
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      break;
    }
    console.log(i);
  }
  //0, 1, 2, 3, 4 출력
  ```

#### continue문

- ##### continue문을 사용하여 5를 제외한 0부터 9까지의 숫자를 출력한다

  ```javascript
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      continue;
    }
    console.log(i);
  }
  ```
