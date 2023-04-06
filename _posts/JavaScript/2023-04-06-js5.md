---
title: "JavaScript 일급 객체로서의 함수"
categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

author_profile: true
date: 2023-04-06
---

## JavaScript 일급 객체로서의 함수

### 일급 객체로서의 함수

- #### 다른 객체들에 일반적으로 적용 가능한 연산을 <br>모두 지원하는 객체[위키백과]
- #### 함수가 일급 객체 취급되기 때문에 우리는 함수를 매우 <br>유연하게 사용할 수 있다 즉, 코드를 더 간결하고 모듈화<br> 된 형태로 작성할 수 있게 해준다 (_매우 중요한 개념!_)

### 일급 객체로 취급되는 5가지 경우

1. #### 변수에 함수를 할당

   - ##### 함수는 값으로 취급되기 때문에 다른 변수와 마찬가지로 <br>변수에 할당할 수 있다

     ```javascript
     const sayHello = function () {
       console.log("Hello!");
     };

     sayHello(); // "Hello!" 출력
     ```

2. #### 함수를 인자로 다른 함수에 전달

   - ##### 다른 함수에 인자로 전달될 수 있다(콜백함수 or 고차함수)

     - ###### 콜백 함수 : 어떠한 함수의 매개변수로 쓰이는 함수
     - ###### 고차 함수 : 함수를 인자로 받거나 함수를 출력으로 <br>반환(return)하는 함수

     ```javascript
     function callFunction(func) {
       // 매개변수로 받은 변수가 사실, 함수(고차 함수)
       func();
     }

     const sayHello = function () {
       console.log("Hello!");
     };

     callFunction(sayHello); // "Hello!" 출력
     ```

3. #### 함수를 반환

   - ##### 다른 함수에서 반환될 수 있다 함수는 값으로 취급되기 때문에, <br>다른 함수에서 반환할 수 있다

     ```javascript
     function createAdder(num) {
       return function (x) {
         return x + num;
       };
     }

     const addFive = createAdder(5);
     console.log(addFive(10)); // 15 출력
     ```

4. #### 객체의 프로퍼티로 함수를 할당

   - ##### 함수는 객체의 프로퍼티로 할당될 수 있다 객체의 메소드로 <br>함수를 호출할 수 있다

     ```javascript
     const person = {
       name: "John",
       sayHello: function () {
         console.log(`Hello, my name is ${this.name}`);
       },
     };

     person.sayHello(); // "Hello, my name is John" 출력
     ```

5. #### 배열의 요소로 함수를 할당

   - ##### 함수는 배열의 요소로 할당될 수 있다

     ```javascript
     const myArray = [
       function (a, b) {
         return a + b;
       },
       function (a, b) {
         return a - b;
       },
     ];

     console.log(myArray[0](5, 10)); // 15 출력
     console.log(myArray[1](10, 5)); // 5 출력
     ```

     ```javascript
     function multiplyBy(num) {
       return function (x) {
         return x * num;
       };
     }

     function add(x, y) {
       return x + y;
     }

     const multiplyByTwo = multiplyBy(2);
     const multiplyByThree = multiplyBy(3);

     const result = add(multiplyByTwo(5), multiplyByThree(10));
     // 35 출력
     ```
