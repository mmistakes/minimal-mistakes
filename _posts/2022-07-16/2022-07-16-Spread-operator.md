---
layout: single
title: "Spread operator 및 몇 가지 편의 기능"
categories: "FrontEnd"
tag: [Javascript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---

## Spread operator 및 몇 가지 편의 기능

```jsx
const name = 'mike';
const obj = {
	age : 21,
	name,
	getName() {
		return this.name;
	},
};

-----------------
// 단축속성명이 없다면

const name = 'mike';
const obj = {
	age : 21,
	name : name,
	getName : functio n getName() {
		return this.name;
	},
};
```

객체와 배열을 생성하고 수정할때 좀 더 간편한 방법이다.
단축 속성명 shorthand property names : 객체 리터럴 코드를 간편하게 작성할 목적으로 만들어짐
name과 getName이라는 속성을 단축 속성명으로 입력했다.
이렇게 기존에 있던 name이라는 변수를 그대로 입력을 한다.
그러면 변수이름 그대로 속성이름이 되고 값은 변수가 갖고 있던 값이 그대로 할당이 된다.
이렇게 함수를 입력하면 함수이름이 그대로 속성 이름이 된다.

```jsx
function makePerson1(age, name) {
  return { age: age, name: name };
}
function makePerson2(age, name) {
  return { age, name };
}
```

단축 속성명을 사용한 코드와 사용하지않은 코드를 비교!!

```jsx
const name = 'mike';
const age = 21;

----사용전--------------
console.log(name , age);
console.log('name =', name, ', age=', age);

----사용후--------------
console.log({name , age});

결과

{ name: 'mike', age: 21 }
```

단축속성명을 사용하지않으면 번거롭게 코드를 작성해야한다.

```jsx
function makeObject1(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}
function makeObject2(key, value) {
  return { [key]: value };
}
```

계산된 속성명 (computed property names) : 객체의 속성명을 동적으로 결정하기 위해서 나온 문법이다.
key, value를 입력받아서 객체를 만들어서 반환해준다.
객체를 만들면서 동시에 속성이름을 변수로 사용할 수 있다.

```jsx
Math.max(1, 3, 7, 9);

--- 사용후 ---

const numbers = [1, 3, 7, 9];
Math.max(...numbers);
```

객체와 배열의 속성값을 간편하게 가져오는 방법을 알아본다.
전개 연산자 (spread operator) : 배열이나 객체의 모든 속성을 풀어 놓을때 사용하는 문법이다.

```jsx
const arr1 = [1, 2, 3];
const obj1 = { age: 23, name: "mike" };
const arr2 = [...arr1];
const obj2 = { ...obj1 };
arr2.push(4);
obj2.age = 80;
```

전개연산자는 배열이나 객체를 복사할 때도 유용하다.
이전의 값을 복사해서 새로운 객체, 배열을 생성하고 속성을 추가해도 원래의 배열에 영향을 주지않는다.

```jsx
[1, ...[2, 3], 4]; // [1, 2, 3, 4]
new Date(...[2018, 11, 24]); // 2018년 12월 24일
```

배열의 경우 전개연산자를 사용하면 그 순서가 유지된다.
순서가 유지되기 때문에 Date 객체를 만들기 위한 매개변수를 배열로 관리할 수 있음

```jsx
const obj1 = { age: 21, name: "mike" };
const obj2 = { hobby: "soccer" };
const obj3 = { ...obj1, ...obj2 };
console.log(obj3);
```

전개연산자를 사용하면 서로 다른 두 배열이나 객체를 쉽게 합칠 수 있다.
위에 있는 두 객체를 전개연산자를 두번 사용해서 하나의 객체로 만든다.

```jsx
const obj1 = { x : 1, x: 2, y: 'a'}
const obj2 = { ...obj1, y: 'b' };
console.log({obj1, obj2});

결과

{ obj1: { x: 2, y: 'a' }, obj2: { x: 2, y: 'b' } }
```

객체 리터럴에서 중복된 속성명을 사용할 때 최종 결과는 마지막 속성명의 값이 된다.
x가 두번사용되었는데 뒤에있는 2가 사용될 것이다.
변경하고싶은 값이 있다면 변경할 수 있다.
