---
title: "JavaScript 배열, 객체 기초"
categories:
  - JavaScript
tags:
  - [JavaScript]

toc: true
toc_sticky: true

author_profile: true
date: 2023-04-06
---

## JavaScript 배열, 객체 기초

### 객체와 객체 메소드

#### 객체

- #### 객체(Object)를 사용하여 여러 개의 값을 하나의 변수에<br>담고 관리할 수 있다
- #### 객체 생성

  - ##### 기본적인 객체 생성

  ```javascript
  let person = {
    name: "홍길동",
    age: 30,
    gender: "남자",
  };
  ```

  - ##### 기본적인 객체 생성

  ```javascript
  let person = {
    name: "홍길동",
    age: 30,
    gender: "남자",
  };
  ```

  - ##### 생성자 함수를 사용한 객체 생성

    - ###### 생성자 함수 Person()을 사용하여 객체 person1과 person2를<br>생성한다

    ```javascript
    function Person(name, age, gender) {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }

    let person1 = new Person("홍길동", 30, "남자");
    let person2 = new Person("홍길순", 25, "여자");
    ```

- #### 객체 속성 접근

  - ##### 객체 person의 속성에 접근하여 값을 출력한다 접근할 떄 <br>점(.)을 사용

    ```javascript
    let person = {
      name: "홍길동",
      age: 30,
      gender: "남자",
    };

    console.log(person.name); // "홍길동"
    console.log(person.age); // 30
    console.log(person.gender); // "남자"
    ```

- #### 객체 메소드

  - ##### 객체 비교

    - ###### 객체를 비교할 때는 일반적으로 === 연산자를 사용할 수 없다<br> 대신 JSON.stringify() 함수를 사용하여 객체를 문자열로<br>변환한 후, 문자열 비교한다

    ```javascript
    let person1 = {
      name: "홍길동",
      age: 30,
      gender: "남자",
    };

    let person2 = {
      name: "홍길동",
      age: 30,
      gender: "남자",
    };

    console.log(person1 === person2); // false
    console.log(JSON.stringify(person1) === JSON.stringify(person2)); // true
    ```

  - ##### 객체 병합

    - ###### 객체 병합을 할 때는 전개 연산자(...)를 사용한다

    ```javascript
    let person1 = {
      name: "홍길동",
      age: 30,
    };

    let person2 = {
      gender: "남자",
    };

    let mergedPerson = { ...person1, ...person2 };

    console.log(mergedPerson); // { name: "홍길동", age: 30, gender: "남자" }
    ```

#### 배열

- #### 배열(Array)을 사용하여 여러 개의 값을 저장하고 <br>관리할 수 있다
- #### 배열 생성

  - ##### 기본적인 배열 생성

    - ###### 배열을 만들 때는 대괄호([])를 사용하고 각 요소는 쉼표(,)로 구분한다

    ```javascript
    let fruits = ["사과", "바나나", "오렌지"];
    ```

  - ##### 배열의 크기 지정

    - ###### new Array()를 사용하여 배열의 크기를 지정할 수 있다

    ```javascript
    let numbers = new Array(5);
    ```

- #### 배열 요소 접근

  - ##### 기본적인 배열 생성

    - ###### 배열의 요소에 접근할 때는 대괄호([]) 안에 인덱스 값을 넣는다

    ```javascript
    let fruits = ["사과", "바나나", "오렌지"];

    console.log(fruits[0]); // "사과"
    console.log(fruits[1]); // "바나나"
    console.log(fruits[2]); // "오렌지"
    ```
