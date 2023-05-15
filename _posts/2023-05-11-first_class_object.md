---
layout: single
title: "함수와 일급 객체"
categories: DeepDiveJS
tag: [JavaScript]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# 함수와 일급 객체

## 일급 객체

다음과 같은 조건을 만족하는 객체를 **일급 객체**라 한다.

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

```javascript
// 1. 함수는 무명의 리터럴로 생성할 수 있다. 
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
    return ++num;
};

const decrease = function (num) {
    return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = {increase, decrease};
// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
    let num = 0;
    
    return function () {
        num = aux(num);
        return num;
    };
}

// 함수는 매개변수에게 함수를 전달할 수 있다. 
const increser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수가 일급 객체이므로 함수를 값과 동일하게 다룰 수 있으며, 변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문 등에서 리터럴로 정의할 수 있다. 이는 함수형 프로그래밍을 가능케 하는 자바스크립트의 장점 중 하나이다.

함수는 호출할 수 있고, 매개변수에 전달할 수 있으며, 반환값으로 사용할 수 있는 등 객체와 비슷하지만, 함수는 고유한 프로퍼티를 가지고 있으며 호출이 가능하다는 차이점이 있다. 이러한 특징은 자바스크립트에서 함수형 프로그래밍을 구현하는 데 매우 유용하다.

## 함수 객체의 프로퍼티

함수는 객체다. 따라서 함수도 프로퍼티를 가질 수 있다. 브라우저 콘솔에서 console.dir 메서드를 사용하여 함수 객체의 내부를 들여다보자.

```javascript
function square(number) {
    return number * number;
}

console.dir(square);
```

### 함수 객체의 프로퍼티

<img src="/assets/images/first_class1.PNG">

square 함수의 모든 프로퍼티의 프로퍼티 어트리뷰트를 `Object.getOwnPropertyDescriptors` 메서드로 확인해 보면 다음과 같다.

```javascript
function square(number) {
    return number * number;
}
console.log(Object.getOwnPropertyDescriptors(square));
/*
{
	length: {value: 1, writable: false, enumerable: false, configurable: true},
	name: {value: "square", writable: false, enumerable: false, configurable: true},
	arguments: {value: null, writable: false, enumerable: false, configurable: false},
	caller: {value: null, writable: false, enumerable: false, configurable: false},
	prototype: {value: {...}, writable: true, enumerable: false, configurable: false}
}
*/

// __proto__는 square 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(square, '__proto__')); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
// square 함수는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받는다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: f, set: f, enumerable: false, configurable: true}
```

이처럼 arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이들 프로퍼티는 일반 객체에는 없는 함수 객체 고유의 프로퍼티다. 하지만 \_\_proto\_\_ 는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototype 객체의 프로퍼티를 상속받은 것을 알 수 있다. Object.prototype 객체의 프로퍼티는 모든 객체가 상속받아 사용할 수 있다. 즉, Object.prototype 객체의 \_\_proto\_\_ 접근자 프로퍼티는 모든 객체가 사용할 수 있다.
