---
layout: single
title: "Object-Oriented Programming"
categories: "FrontEnd"
tag: [Javascript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---



###  getPrototypeOf

```jsx
const person = {
  name: 'mike',
};
const prototype = Object.getPrototypeOf(person);
console.log(typeof prototype);
console.log(person.__proto__ === prototype);

결과;

('object');
true;
```

자바스크립트에서 모든 오브젝트에는 프로토타입이라는 숨겨진 속성이 있다. getPrototypeOf 함수로 프로토타입을 가져올 수 있다. 프로토타입은 null또는 object type이다. 많은 자바스크립트 엔진에서는 **proto** 라는 이름으로 프로토타입 속성에 접근 할 수 있다. 하지만 프로토타입에 안전하게 접근하는 방식은 getPrototypeOf 함수이다.



### setPrototypeOf

```jsx
const person = {
  name: 'mike',
};
const programmer = {
  language: 'javascript',
};

Object.setPrototypeOf(programmer, person);
// programer.__proto__ = person;
console.log(Object.getPrototypeOf(programmer) === person);
console.log(programmer.name);

결과;

true;
('mike');
```

프로토타입을 변경할때는 setPrototypeOf함수로 할 수있다. 이는 programer.**proto** = person와 같은역할을 한다. 프로토타입은 이렇게 속성값을 읽을 때 사용한다. 프로그래머에는 name이라는 속성이 없다. 이렇게 자기 자신에 없는 속성이 있을 때 프로토타입에서 그 속성을 찾는다. 지금 프로그래머의 프로토타입은 person이기 때문에 person에서 name을 찾아서 mike가 출력된다.



###  프로토타입을 여러 단계로 연결

```jsx
const person = {
	name : 'mike',
};
const programmer = {
	language : 'javascript',
};
const frontendDev = {
	framework : 'react',
};

Object.setPrototypeOf(programmer, person);
Object.setPrototypeOf(frontendDev, programmer);
console.log(frontendDev.name, programmer.language);
console.log(
	frontendDev.__proto__.__proto__.name,
	frontendDev.__proto__.language,
);

결과

'mike' 'javascript'
```

프로토타입을 여러 단계로 연결할 수도 있다. frontendDev를 programmer로 연결했습니다. 그러면 frontendDev의 프로토타입은 programmer이고 또 그 프로토타입은 person이 된다. 이렇게 두단계로 연결했다.

frontendDev에는 name과 language가 없지만 이것을 출력해보면 ‘mike’ ‘javascript’ 이처럼 값을 잘 찾아온다. 사실 이코드는 아래처럼 **proto**와 같다. 이렇게 체인을 따라가면서 속성값을 찾아낸다.



```jsx
const person = {
  name: 'mike',
};
const programmer = {
  language: 'javascript',
};

Object.setPrototypeOf(programmer, person);
programmer.name = 'jane';
console.log(programmer.name);
console.log(person.name);

결과;

('jane');
('mike');
```



### 자기자신에게 속성추가

이렇게 프로토타입의 속성을 추가할때는 자기 자신에게 이 속성을 추가한다. 그래서 person의 프로토타입의 값을 수정하는게 아니고 각자의 값을 유지하고있다.



```jsx
const person = {
  name: 'mike',
  sayHello() {
    console.log('hello!');
  },
};
const programmer = {
  language: 'javascript',
};

Object.setPrototypeOf(programmer, person);
programmer.sayHello();

결과;

('hello!');
```

프로토타입은 일반적인 객체이기 때문에 함수를 정의해서 공통 로직을 추가할 수 있다. 프로그래머에는 sayHello함수가 없지만 호출할 수 있다.



###  속성사용

```jsx
const person = {
  name: 'mike',
};
const programmer = {
  language: 'javascript',
};

Object.setPrototypeOf(programmer, person);
for (const prop in programmer) {
  console.log(prop);
}

결과;

('language');
('name');
```

프로토타입에 있는 속성까지 사용이가능하다. 두가지 속성이 모두 출력이 된다.



### hasOwnProperty

```jsx
const person = {
  name: 'mike',
};
const programmer = {
  language: 'javascript',
};

for (const prop in programmer) {
  if (programmer.hasOwnProperty(prop)) {
    console.log(prop);
  }
}

결과;

('language');
```

자기자신의 속성만 사용하고싶으면 hasOwnProperty를 사용한다.



### Object.keys

```jsx
const person = {
  name: 'mike',
};
const programmer = {
  language: 'javascript',
};

for (const prop of Object.keys(programmer)) {
  console.log(prop);
}

결과;
('language');
```

또다른 방법은 Object.keys함수를 이용한다.



### 생성자 함수

```jsx
function Person(name) {
  // this = {};
  this.name = name;
  // return this;
}

const person = new Person('mike');
console.log(person.name);

결과;

('mike');
```

이렇게 new 키워드를 사용해서 객체를 만들때 사용하는 함수를 생성자 함수라고한다. 자바스크립트 엔진은 내부적으로 this에 빈객체를 할당해준다. 그리고 함수가 종료하기직전에 this를 반환해준다. 여기서 반환된 person은 함수에서 반환된 this이다.



### 리터럴 문법

```jsx
const obj = new Object({ a: 123 });
const arr = new Array(10, 20, 30);
const num = new Number(123);
const str = new String('abc');

console.log({ obj, arr, num, str });
```

자바스크립트의 기본 타입은 이런 생성자 함수를 가지고있다. 하지만 이런 생성자 함수로 해당 값을 생성할 필요는 없다. 각각의 리터럴 문법을 이용하면 된다.



### prototype 속성

```jsx
function Person(name) {
	this.name = name;
}
const person = new Person('mike');

console.log(Person.prototype);
console.log(Object.getPrototypeOf(person) === Person.prototype);

결과

Person {}
true
```

모든 함수는 prototype 속성을 가지고 있다. new 키워드로 생성된 객체의 프로토타입은 그 생성자 함수의 프로토타입 속성을 가리킨다.