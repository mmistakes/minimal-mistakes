---
layout: single
title: "프로토타입의 객체의 속성"
categories: [JavaScript]
tag: [prototype]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

## 프로토타입 객체의 속성

- constructor 속성은 함수를 가리킵니다(참조).  즉, 참조를 값으로 가지는 속성입니다.

- 서로가 참조합니다. 이 말은 서로가 **연결고리** 역할을 합니다.

  ``` js
  function Animal(name, age) {
      this.name = name;
      this.age = age;
  }
  Animal.prototype.aaa = function() {console.log('aaa');}
  
  function Animal2(name, age) {
      this.name = name;
      this.age = age;
  }
  Animal2.prototype.bbb = function() {console.log('bbb');}
  
  let a1 = new Ainmal('tiger', 20);
  a1.aaa(); // aaa
  a1.__proto__ = Animal2.prototype;
  a1.bbb(); // bbb
  ```

- new 연산자에 의해 새롭게 생선된 객체를 인스턴스라고 합니다. 즉 new연산자가 생성자 함수를 이용해서 새로운 객체를 생성합니다. 하지만 이렇게 생성된 객체들의 원형(부모)는 "프로토타입 객체" 입니다. 즉, **프로토타입 체인**이 어떻게 연결되는지를 잘 기억하는게 중요하다.

- new 연산자로 새롭게 만들어진 인스턴스(객체)는 자신의 부모격인 원형(프로토타입 객체)에서 특성(속성, 메서드)을 상속 받으므로, 당연히 "프로토타입 객체"의 constructor 속성을 참조 가능합니다.

  ```js
  function A() {}
  
  const testObj = new A();
  
  console.log(testObj.constructor); // 무엇을 가리키는가? ==> function A() {}
  console.log(A.prototype.__proto__); // 무엇을 가리키는가? ==> Object( Object.prototype ) ==> null
  ```

- 인스턴스(객체)가 어떤 함수로 생성된 것인지를 판별하는 방법으로는 `instanceof` 연산자를 사용합니다.

  - 사용법으로는 객체명 instanceof 생성자 함수명

  - instanceof 연산자는 객체와 생성자 2개가 필요하므로 이항 연산자입니다.

    ```js
    function A() {}
    const testObj = new A();
    const testObj2 = {
    	name: '홍길동',
        age: 20
    };
    console.log(testObj instanceof A); // true;
    console.log(testObj2 instanceof A); // false;
    console.log(testObj2 instanceof Object); // true;
    ```

  - 즉, instanceof 연산자는 특정 객체가 그 객체와 연결된 프로토타입 체인에 연결(포함)되어 있는지를 체크하는 방법 중 하나입니다.