---

layout: single
title: "Optional Chaining"
categories: "Javascript"
tag: [Optional Chaining]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16

---



### Optional Chaining

```js
const person = null;
const name = person.name;
```

자바스크립트에서는 객체의 속성에 접근할때 .을 찍는다.
하지만 name이 존재하지않는다면 error가 날것이다.

```js
const person = null;
const name = person && person.name;
const name2 = person?.name;
```

#### Optional Chaining의 효과

앞서 error를 방지하기위해 앤드연산자를 사용할수 도 있지만 이방식보다는 optional chaining을 사용하면 간단하게 작성할 수 있다.
이렇게 하면 자동으로 person의 유무를 검사해주어 에러를 방지한다.

```js
const name = person?.name;
const name = person === null || person === undefined ? undefined : person.name;
```

위의 두 코드는 같은 의미이다.
null또는 undefined이면 undefined가 출력이되고 그게아니면 의도한 값이 출력된다.

```js
const person = {
  getName: () => "abc",
};
const name = person.getName?.();
console.log(name);

결과;

abc;

const person = {
  //	getName : () => 'abc',
};
const name = person.getName?.();
console.log(name);

결과;

undefined;
```

함수를 호출할때도 optional chaining를 사용할 수 있다.
함수가 없다면 undefined가 출력된다.

```js
function loadData(onComplete) {
  console.log("loading...");
  onComplete?.();
}
let a = "1";
loadData(a?.name);

결과;

("loading...");
```

함수 호출시 optional chaining를 사용하는 것은 함수를 매개변수로 받아서 그것을 호출 할때 유용하게 사용할 수 있다.
이 매개변수가 optional일때 사용하면 좋을것이다. 그러면 함수를 입력하지않아도 문제없이 실행이된다. ( loadDate()가 없어도)

```js
const person = { friends: null, mother: null };
const firstFriend = person.friends?.[0];

const prop = "name";
const name = person.mother?.[prop];
```

#### 배열접근

optional chaining은 배열의 아이템에 접근 할때에도 사용될 수 있다.
0번째 인덱스에 접근할때 괄호를 열기전에 물음표와 점을 입력한다.
지금은 friends라는 배열이 없기때문에 undefined가 할당된다.
만약 optional chaining을 사용하지않았다면 런타임에 에러가 발생한다.
배열뿐만아니라 객체에서도 동적으로 속성값을 입력할때도 사용한다.

```js
const name =
	person &&
	person.friends &&
	person.friends[0] &&
	person.friends[0].mother &&
  person.friends[0].mother.name;

------적용 후 -----------------

const name2 = person?.friends?.[0]?.mother?.name;
```

optional chaining은 검사하는 단계가많을수록 효율적으로 간단하게 작성할 수 있다.

```js
const person = {};
const name = person?.friends?.[0]?.mother?.name ?? "default name";
//Nullish coalescing
```

optional chaining은 nullish coalescing과 함께 사용하기 좋다.
undefined가 되었을때 기본값으로 사용할 수 있다.
