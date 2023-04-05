---
title: "JavaScript 기본 문법"
categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

author_profile: true
date: 2023-04-04
---

## JavaScript 기본 문법

### 변수와 상수

#### 변수

- ##### 값을 메모리에 저장, 저장된 값을 읽어 재사용
<br/>

#### 변수의 5가지 주요 개념

##### 1. 변수 이름 : 저장된 값의 고유 이름

##### 2. 변수 값 : 변수에 저장된 값

##### 3. 변수 할당 : 변수에 값을 저장하는 행위

##### 4. 변수 선언 : 변수를 사용하기 위해 컴퓨터에 알리는 행위

##### 5. 변수 참조 : 변수에 할당된 값을 읽어오는것

```javascript
// let으로 변수 선언
let myLet = "Hello World";
console.log(myLet); // "Hello World"

// const로 상수 선언
const myConst = "Hello World";
console.log(myConst); // "Hello World"
```

## 데이터 타입과 형 변환

### 데이터 타입

- #### 숫자

  - ##### 정수형 숫자(integer)

  ```javascript
  let num1 = 10;
  console.log(num1); // 10
  console.log(typeof num1); // "number"
  ```

- ##### 실수형 숫자(Float)

  ```javascript
  let num2 = 3.14;
  console.log(num2); // 3.14
  console.log(typeof num2); // "number"
  ```

- ##### NaN(Not a Number)

  ```javascript
  let num4 = "Hello" / 2;
  console.log(num4); // NaN
  console.log(typeof num4); // "number"
  ```

- #### 문자열(String)
  - ##### 문자의 나열. 작은 따옴표(')나 큰 따옴표(")로 감싸서 표현
    ```javascript
    let name = "Alice";
    let message = "Hello, world!";
    ```
  - ##### 문자열 길이(length) 확인
    ```javascript
    let str = "Hello, world!";
    console.log(str.length); // 13
    ```
  - ##### 문자열 결합(concatenation)
    ```javascript
    let str1 = "Hello, ";
    let str2 = "world!";
    let result = str1.concat(str2);
    console.log(result); // "Hello, world!"
    ```
  - ##### 문자열 자르기(substr, slice)
    ```javascript
    let str = "Hello, world!";
    console.log(str.substr(7, 5)); // "world"
    console.log(str.slice(7, 12)); // "world"
    ```
  - ##### 문자열 검색(search)
    ```javascript
    let str = "Hello, world!";
    console.log(str.search("world")); // 7
    ```
  - ##### 문자열 대체(replace)
    ```javascript
    let str = "Hello, world!";
    let result = str.replace("world", "JavaScript");
    console.log(result); // "Hello, JavaScript!"
    ```
  - ##### 문자열 분할(split)
    ```javascript
    let str = "apple, banana, kiwi";
    let result = str.split(",");
    console.log(result); // ["apple", " banana", " kiwi"]
    ```
- #### 불리언(Boolean)

  - ##### 불리언은 참(true)과 거짓(false)을 나타내는 데이터 타입

    ```javascript
    let bool1 = true;
    console.log(bool1); // true
    console.log(typeof bool1); // "boolean"

    let bool2 = false;
    console.log(bool2); // false
    console.log(typeof bool2); // "boolean"
    ```

- #### undefined
  - ##### undefined는 값이 할당되지 않은 변수를 의미
    ```javascript
    let x;
    console.log(x); // undefined
    ```
- #### null
  - ##### null은 값이 존재하지 않음을 의미. undefined와는 다르다
    ```javascript
    let y = null;
    ```

## 연산자

### 논리 연산자(logical operators)

- #### 논리곱(&&) 연산자
  - ##### 두 값이 모두 true일 경우에만 true를 반환
    ```javascript
    console.log(true && true); // true
    console.log(true && false); // false
    console.log(false && true); // false
    console.log(false && false); // false
    ```
- #### 논리합(||) 연산자
  - ##### 두 값 중 하나라도 true일 경우 true를 반환
    ```javascript
    console.log(!true); // false
    console.log(!false); // true
    console.log(!(2 > 1)); // false
    ```
- #### 논리부정(!) 연산자
  - ##### true를 false로, false를 true로 바꾼다
    ```javascript
    console.log(!true); // false
    console.log(!false); // true
    console.log(!(2 > 1)); // false
    ```
- #### 삼항 연산자(ternary operator)
  - ##### 조건에 따라 값을 선택<br>조건식이 true일 때 [? " "의 값] false일 때 [: " "의 값] 형태로 사용
    ```javascript
    let x = 10;
    let result = x > 5 ? "크다" : "작다";
    console.log(result); // "크다"
    ```

## 함수

- ### 함수를 정의하여 코드의 재사용성을 높인다

### 함수 정의하기

- #### 함수 선언문(function declaration)

  - ##### function 키워드를 사용하여 add라는 함수를 선언

    ```javascript
    function add(x, y) {
      return x + y;
    }

    console.log(add(2, 3)); // 5
    ```

- #### 함수 표현식(function expression)

  - ##### function 키워드를 사용하여 add라는 변수에 함수를 할당<br>함수 표현식을 사용하면 함수를 변수에 할당하여 익명 함수를 생성 가능

    ```javascript
    let add = function (x, y) {
      return x + y;
    };

    console.log(add(2, 3)); // 5
    ```

- #### 함수 매개변수

  - ##### add라는 함수가 x와 y라는 두 개의 매개변수를 받아들인다<br> 함수를 호출할 때는 매개변수에 값을 전달한다

    ```javascript
    let add = function (x, y) {
      return x + y;
    };

    console.log(add(2, 3)); // 5
    ```

- #### 함수 반환값

  - ##### aadd라는 함수가 x와 y라는 두 개의 매개변수를 받아들이고<br> 이를 더한 값을 반환한다<br> 함수를 호출한 결과값을 변수에 할당하여 사용할 수 있다

    ```javascript
    function add(x, y) {
      return x + y;
    }

    let result = add(2, 3);
    console.log(result); // 5
    ```

- #### 전역 스코프(global scope)

  - ##### 변수 x를 선언하고, 함수 printX에서 변수 x를 참조<br>전역 스코프에서 선언된 변수는 어디에서든지 참조할 수 있다

    ```javascript
    let x = 10;

    function printX() {
      console.log(x);
    }

    printX(); // 10
    ```

- #### 지역 스코프(local scope)

  - ##### 변수 x를 선언하고, 함수 printX에서 변수 x를 참조<br>지역 스코프에서 선언된 변수는 해당 함수 내에서만 참조할 수 있다

    ```javascript
    function printX() {
      let x = 10;
      console.log(x);
    }

    printX(); //
    ```

- #### 블록 스코프(block scope)

  - ##### if문 내에서 변수 x를 선언하고, 이를 출력<br>if문 내에서 선언된 변수는 해당 블록 내에서만 참조할 수 있다

    ```javascript
    if (true) {
      let x = 10;
      console.log(x);
    }

    console.log(x); // ReferenceError: x is not defined
    ```

- #### 화살표 함수

  - ##### 화살표 함수를 사용하여 add라는 함수를 선언

    ```javascript
    let add = (x, y) => {
      return x + y;
    };

    console.log(add(2, 3)); // 5
    ```
