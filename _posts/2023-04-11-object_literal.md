---
layout: single
title: "객체 리터럴"
categories: DeepDiveJS
tag: [JavaScript]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# 객체 리터럴

## 객체란?

자바스크립트는 객체<sup>object</sup> 기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 "모든 것"이 객체다.

원시 값을 제외한 나머지 값은 모두 객체다.

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키<sup>key</sup>와 값<sup>value</sup>으로 구성된다.

<img src="/assets/images/object/object10-1.jpg">

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 자바스크립트의 함수는 일급 객체이므로 값으로 취급할 수 있다. 따라서 함수도 프로퍼티 값으로 사용할 수 있다. **프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 <mark>메서드<sup>method</sup></mark>라 부른다.**

<img src="/assets/images/object/object10-2.jpg">

- **프로퍼티**: 객체의 상태를 나타내는 값(data)
- **메서드**: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)

## 객체 리터럴에 의한 객체 생성

C++나 자바 같은 클래스 기반 객체지향 언어는 클래스를 사전에 정의하고 필요한 시점에 new 연산자와 함께 생성자<sup>constructor</sup>를 호출하여 인스턴스를 생성하는 방식으로 객체를 생성한다.

자바스크립트는 프로토타입 기반 객체지향 언어로서 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

가장 일반적이고 간단한 방법은 객체 리터럴을 사용하는 방법이다. 객체 리터럴은 객체를 생성하기 위한 표기법이다.

객체 리터럴은 중괄호({ ... }) 내에 0개 이상의 프로퍼티를 정의한다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴을 해석해 객체를 생성한다.

```javascript
var person = {
  name: "Lee",
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  },
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: f}
```

만약 중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.

```javascript
var empty = {}; // 빈 객체
console.log(typeof empty); // object
```

객체 리터럴은 값으로 평가되는 표현식이다. 따라서 객체 리터럴의 닫는 중괄호 뒤에는 세미콜론을 붙인다.

## 프로퍼티

**객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.**

```javascript
var person = {
  name: "Lee",
  age: 20,
};
```

프로퍼티 키과 프로퍼티 값으로 사용할 수 있는 값은 다음과 같다.

- **프로퍼티 키**: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- **프로퍼티 값**: 자바스크립트에서 사용할 수 있는 모든 값

프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로서 식별자 역할을 한다. 하지만 반드시 식별자 네이밍 규칙을 따라야 하는 것은 아니다. 단, 식별자 네이밍 규칙을 준수하는 프로퍼티 키와 그렇지 않은 프로퍼티 키는 미묘한 차이가 있다.

**식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 한다.**

문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 이 경우에는 프로퍼티 키로 사용할 표현식을 대괄호([...])로 묶어야 한다.

```javascript
var obj = {};
var key = "hello";

// ES5: 프로퍼티 키 동적 생성
obj[key] = "world";
// ES6: 계산된 프로퍼티 이름
// var obj = { [key]: 'world' };

console.log(obj); // {hello: "world"}
```

프로퍼티 키에 문자열이나 심벌 값 외의 값을 사용하면 암묵적 타입 변환을 통해 문자열이 된다. 예를 들어, 프로퍼티 키로 숫자 리터럴을 사용하면 따옴표는 붙지 않지만 내부적으로는 문자열로 변환된다.

이미 존재하는 프로퍼티 키를 중복 선언하면 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어쓴다. 이때 에러가 발생하지 앟는다는 점에 주의해야 한다.

```javascript
var foo = {
  name: "Lee",
  name: "Kim",
};

console.log(foo); // {name: "Kim"}
```

## 메서드

자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값으로 사용할 수 있다. 자바스크립트의 함수는 객체(일급 객체)다. 따라서 함수는 값으로 취급할 수 있기 때문에 프로퍼티 값으로 사용할 수 있다.

```javascript
var circle = {
  radius: 5, // 프로퍼티

  // 원의 지름
  getDiameter: function () {
    // 메서드
    return 2 * this.radius; // this는 circle을 가리킨다.
  },
};

console.log(circle.getDiameter()); // 10
```

## 프로퍼티 접근

프로퍼티에 접근하는 방법은 다음과 같이 두 가지다.

- 마침표 프로퍼티 접근 연산자(.)를 사용하는 **마침표 표기법<sup>dot notation</sup>**
- 대괄호 프로퍼티 접근 연산자([...])를 사용하는 **대괄호 표기법<sup>bracket notation</sup>**

```javascript
var person = {
  name: "Lee",
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person["name"]); // Lee
```

대괄호 표기법을 사용하는 경우 **대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싼 문자열**이어야 한다. 따옴표로 감싸지 않은 이름을 프로퍼티 키로 사용하면 식별자로 해석한다.

```javascript
var person = {
  name: "Lee",
};

console.log(person[name]); // ReferenceError: name is not defined
```

**객체에 존재하지 않는 프로퍼티에 접근하면 undefined를 반환한다.** 이때 ReferenceError가 발생하지 않는데 주의하자!

```javascript
var person = {
  name: "Lee",
};

console.log(person.age); // undefined
```

프로퍼티 키가 식별자 네이밍 규칙을 준수하지 않는 이름, 즉 자바스크립트에서 사용 가능한 유효한 이름이 아니면 반드시 대괄호 표기법을 사용해야 한다. 단, 프로퍼티 키가 숫자로 이뤄진 문자열의 경우 따옴표를 생략할 수 있다. 그 외의 경우 대괄호 내에 들어가는 프로퍼티 키는 반드시 따옴표로 감싼 문자열이어야 한다는 점을 잊지 말자 !

## 프로퍼티 값 갱신

이지 존재하는 프로퍼티에 값을 할당하면 프로퍼티 값이 갱신된다.

```javascript
var person = {
  name: "Lee",
};

// person 객체에 name 프로퍼티가 존재하므로 name 프로퍼티의 값이 갱신된다.
person.name = "Kim";

console.log(person); // {name: "Kim"}
```

## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성되어 추가되고 프로퍼티 값이 할당된다.

```javascript
var person = {
  name: "Lee",
};

// person 객체에는 age 프로퍼티가 존재하지 않는다.
// 따라서 person 객체에 age 프로퍼티가 동적으로 생성되고 값이 할당된다.
person.age = 20;

console.log(person); // {name: "Lee", age: 20}
```

## 프로퍼티 삭제

delete 연산자는 객체의 프로퍼티를 삭제한다. 만약 존재하지 않는 프로퍼티를 삭제하면 아무런 에러 없이 무시된다.

```javascript
var person = {
  name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

delete person.age;

// person 객체에 address 프로퍼티가 존재하지 않는다.
// 따라서 delete 연산자로 address 프로퍼티를 삭제할 수 없다. 이때 에러가 발생하지 않는다.
delete person.address;

console.log(person); // {name: "Lee"}
```

## ES6에서 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

객체 리터럴의 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 구성된다. 프로퍼티 값은 변수에 할당된 값, 즉 식별자 표현식일 수도 있다.

```javascript
// ES5
var x = 1,
  y = 2;

var obj = {
  x: x,
  y: y,
};

console.log(obj); // {x: 1, y: 2}
```

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략<sup>property shorthand</sup>할 수 있다. 이때 프로퍼티 키는 변수 이름으로 자동 생성된다.

```javascript
// ES6
let x = 1,
  y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

### 계산된 프로퍼티 이름

문자열 또는 문자열로 타입 변환할 수 있는 값으로 평가되는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수도 있다. 단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다. 이를 계산된 프로퍼티 이름<sup>computed property name</sup>이라 한다.

ES5에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법을 사용해야 한다.

```javascript
// ES5
var prefix = "prop";
var i = 0;

var obj = {};

// 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성

obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;
obj[prefix + "-" + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

ES6에서는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

```javascript
// ES6
const prefix = "prop";
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

### 메서드 축약 표현

ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다.

```javascript
// ES5
var obj = {
  name: "Lee",
  sayHi: function () {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```

ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다.

```javascript
// ES6
const obj = {
  name: "Lee",
  // 메서드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```

ES6의 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.

> **<span style='color: grey'>이웅모, "모던 자바스크립트 Deep Dive", 위키북스(2020), p124-136.</span>**
