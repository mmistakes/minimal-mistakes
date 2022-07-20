---

layout: single
title: "Destructuring"
categories: "Javascript"
tag: [비구조화]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16

---



## 비구조화 문법

비구조화는 배열이나 객체의 여러 속성값을 변수로 쉽게 꺼낼 수 있는 문법이다.

```jsx
const arr = [1, 2];
const [a, b] = arr;
console.log(a);
console.log(b);

결과;

1;
2;
```

### 배열 비구조화

이미 선언된 변수에도 정의할 수 있다.

```jsx
let a, b;
[a, b] = [1, 2];
```

#### 기본값 정의

비구조화 문법에서는 기본값을 정의할 수 있다. 해당 속성값이 undefined면 정의된 기본값이 설정되고 그렇지않으면 원래 속성값이 할당이된다.
배열의 아이템이 하나밖에없기때문에 두번째 아이템은 undefined가 되어 기본값인 20이 된다

```jsx
const arr = [1];
const [a = 10, b = 20] = arr;
console.log({ a, b });

결과

{ a: 1, b: 20 }
```

비구조화 문법을 사용하면 두변수의 값을 쉽게 교환할 수 있다.
순서를 바꿔서 할당해준다.
보통은 두 변수의 값을 바꾸려면 제 3의 변수가 필요한데 간단하게 표현이 가능하다.

```jsx
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log({ a, b});

결과

{ a: 2, b: 1 }
```

일부 속성값을 무시하고 싶다면 건너뛰고싶은 개수만큼 쉼표를 입력하면 된다.

```jsx
const arr = [1, 2, 3];
const [a, , c] = arr;
console.log({ a, c });

결과

{ a: 1, c: 3 }
```

왼쪽에 쉼표개수만큼을 제외하고 나머지 모두를 새로운 배열로 만들 수 있다.
첫번째 아이템만 제외하고 나머지가 rest1 배열에 담길것이다. [2, 3]
두번째는 모두 쉼표가 있으므로 빈배열이 rest2 배열에 담긴다

```jsx
const arr = [1, 2, 3];
const [first, ...rest1] = arr;
console.log(rest1);
const [a, b, c, ...rest2] = arr;
console.log(rest2);

결과

[ 2, 3 ]
[]
```

### 객체비구조화

객체 비구조화는 중괄호를 입력한다.
해당하는 속성이름을 입력해준다.
age에는 21이들어가고 name에는 mike가 들어간다.

```jsx
const obj = { age : 21, name : 'mike' };
const { age, name } = obj;
console.log({ age, name});

결과

{ age: 21, name: 'mike' }
```

배열에는 순서 정보가 중요하지만, 객체 비구조화에서는 순서 정보는 중요하지않다.
근데 만약 이와같이 존재하지않는 이름을 사용하면 각각 undefined가 할당된다.

```jsx
const obj = { age: 21, name: "mike" };
const { age, name } = obj;
const { name, age } = obj;
const { a, b } = obj;
```

객체 비구조화에서는 원래 속성이름과 다른 이름으로 변수를 생성할 수 있다.
콜론을 입력하고 오른쪽에 원하는 이름을 작성하면된다.
이는 중복된 변수명을 피하거나 사용할 당시에 어울리는 좀 더 구체적인 변수명으로 만들 때 좋다.
지금은 theAge라는 변수만 만들어지고 age라는 변수는 안만들어지므로 age는 콘솔 에러난다.

```jsx
const obj = { age: 21, name: "mike" };
const { age: theAge, name } = obj;
console.log(theAge);
console.log(age);

결과;

21;
error;
```

#### 기본값 정의

객체 비구조화에서도 기본값을 정의할 수 있다.
지금 모든 속성의 기본값을 정의했는데, 원래 값이 undefined인경우만 기본값이 할당되고 null인경우에는 할당되지 않는다.

```jsx
const obj = { age: undefined, name: null, grade: 'A' };
const { age = 0, name = 'noName', grade = 'F' } = obj;
console.log({ age, name, grade});

결과

{ age: 0, name: null, grade: 'A' }
```

이렇게 속성값 이름을 변경하면서 동시에 기본값도 정의할 수 있다.

```jsx
const obj = { age: undefined, name: "mike" };
const { age: theAge = 0, name } = obj;
```

기본값으로 함수의 반환값을 넣을 수 있다. 기본값이 사용될 때만 함수가 호출된다.
지금은 age가 undefined가 아니기 때문에 함수가 호출되지않는다.
hello가 출력이안된다.

```jsx
function getDefaultAge() {
  console.log("hello");
  return 0;
}
const obj = { age: 21, grade: "A" };
const { age = getDefaultAge(), grade } = obj;
console.log(age);

결과;

21;
```

age를 undefined로 설정하면 함수가 호출되고 기본값도 적용된다.

```jsx
function getDefaultAge() {
  console.log("hello");
  return 0;
}
const obj = { age: undefined, grade: "A" };
const { age = getDefaultAge(), grade } = obj;
console.log(age);

결과;

("hello");
0;
```

#### rest 객체

객체 비구조화에서도 …을 입력하면 사용되지않는 속성들을 별도의 객체로 생성할 수 있음
지금은 age만 사용하기때문에 나머지 속성이 rest 객체로 들어간다.

```jsx
const obj = { age: 21, name: 'mike', grade : 'A'};
const { age, ...rest } = obj;
console.log(rest);

결과

{ name: 'mike', grade: 'A' }
```

#### 예시살펴보기

for문에서 객체 비구조화를 사용하고 있다.
이렇게 배열의 아이템이 객체인 경우에 비구조화 문법을 사용하면 상당히 편리하다.
for문안에서는 age와 name을 바로사용할 수 있다.

```jsx
const people = [
  { age: 21, name: "mike" },
  { age: 51, name: "sara" },
];
for (const { age, name } of people) {
  // ...
}
```

비구조화 문법은 이렇게 중첩되어있는 경우에도 사용할 수 있다.
mother안에 또다른 객체가 있다.
name은 mike가 들어가고 mother는 콜론을 사용하기때문에 오른쪽을 사용하겠다는의미이다.
mother안에 있는 name을 motherName으로 별칭을 줌
그런데 여기서 mother는 변수로 할당되지않기 떄문에 에러가 난다

```jsx
const obj = { name : 'mike' , mother: { name: 'sara' } };
const {
	name,
	mother : { name : motherName},
} = obj;

console.log({ name, motherName });
console.log(mother);

결과

{ name: 'mike', motherName: 'sara' }
error
```

비구조화 문법에서 기본값정의는 변수로 한정되지 않는다.
왼쪽에있는 것은 배열의 첫번째 아이템을 가리키는데, 아이템이 없기때문에 기본값이 사용되어 x에는 123이 들어간다.
그다음에 있는 코드는 아이템이 하나가 있기때문에 기본값이 사용되지않는다.
하지만 prop이라는 속성이 없기때문에 undefined라는 속성이 할당된다.

```jsx
const [{ prop: x } = { prop: 123 }] = [];
console.log(x);
const [{ prop: x } = { prop: 123 }] = [{}];
console.log(x);
```

#### 계산된 속성명

객체 비구조화에서도 계산된 속성명을 활용할 수 있다.
비구조화에서 계산된 속성명을 사용할때는 반드시 별칭을 사용해야한다.

```jsx
const index = 1;
const { [`key${index}`]: valueOfTheIndex } = { key1: 123 };
console.log(valueOfTheIndex);

결과: 123;
```

비구조화에서 별칭을 사용할때 단순히 변수명만 입력할 수 있는 것은 아니다.

{ foo: 123, bar: true} 객체에 대해서 비구조화를 사용했는데, 별칭을 사용할 때, 어떤 객체의 특정 속성값을 입력했다. 그리고 배열의 특정인덱스를 입력하면 prop이라는 속성에 값이 들어가고 배열의 첫번째 인덱스에 값이 들어간다.

```jsx
const obj = {};
const arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
console.log(obj);
console.log(arr);

결과;

{
  prop: 123;
}
[true];
```
