---
layout: single
title: '타입스크립트의 기본 타입'
categories: 'TypeScript'
tag: [typescript, javascript, types]
toc: true
toc_label: 'Contents'
toc_sticky: true
author_profile: false
sidebar:
  nav: 'sidebar-category'
---

## 기본타입

타입스크립트로 변수나 함수와 같은 자바스크립트 코드에 타입을 정의할 수 있습니다.

타입스크립트의 기본 타입에는 크게 다음 12가지가 있습니다.

- Boolean
- Number
- String
- Object
- Array
- Tuple
- Enum
- any
- void
- null
- undefined
- never

## 1. String

```jsx
let car: string = 'bmw'
```

string이 아닌 타입으로 재선언하게 되면 에러가 난다.

```jsx
let car: string = 'bmw'

car = 'benz' // string으로 재선언하면 아무런 문제가 없다.

car = 1 // Type 'number' is not assignable to type 'string'.
```

> 💡 **TIP**
>
> 위와 같이 `:`를 이용하여 자바스크립트 코드에 타입을 정의하는 방식을 타입 표기(Type Annotation)라고 합니다.

## 2. Number

타입이 숫자이면 아래와 같이 선언합니다.

```jsx
let age: number = 20
```

## 3. Boolean

타입이 진위 값인 경우에는 아래와 같이 선언합니다.

```jsx
let isAdult: boolean = true
```

## 4. Object - Array

타입이 배열인 경우 간단하게 아래와 같이 선언합니다.

```jsx
let arr: number[] = [1, 2, 3]
```

또는 아래와 같이 제네릭을 사용할 수 있습니다.

```jsx
let arr: Array<number> = [1, 2, 3]
```

문자열 배열도 똑같이 적용할 수 있습니다.

```jsx
let week1: string[] = ['mon', 'tue', 'wed']
let week2: Array<string> = ['mon', 'tue', 'wed']

//문자열 배열에 숫자를 추가하며 에러가 발생한다.
week1.push(3) // Argument of type 'number' is not assignable to parameter of type 'string'.
```

## 5. Object - Tuple

튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미합니다. 인덱스 별로 타입이 다른때 사용할 수 있습니다.

```jsx
let arr: [string, number] = ['hi', 10]
```

만약 정의하지 않은 타입, 인덱스로 접근할 경우 오류가 납니다.

```jsx
arr[1].concat('!') // Error, 'number' does not have 'concat'
arr[5] = 'hello' // Error, Property '5' does not exist on type '[string, number]'.
```

## 6. Enum

이넘은 C, Java와 같은 다른 언어에서 흔하게 쓰이는 타입으로 특정 값(상수)들의 집합을 의미합니다. 비슷한 값들끼리 묶여있다고 생각하면 됩니다.

```jsx
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers.Capt;
console.log(hero); //0
```

만약 원한다면 이넘의 인덱스를 사용자 편의로 변경하여 사용할 수도 있습니다.

```jsx
enum Avengers { Capt = 2, IronMan, Thor }
let hero: Avengers = Avengers[2]; // Capt
let hero: Avengers = Avengers[4]; // Thor
```

이넘에는 숫자가 아닌 문자열도 입력할 수 있습니다.

```tsx
enum Avengers {
  Capt = 'Evan',
  IronMan = 'Robert',
  Thor = 'Chris',
}
let hero: Avengers = Avengers.Capt
console.log(hero) // Evan
```

위의 타입스크립트가 자바스크립트로 컴파일되면 아래와 같은 형태로 나타납니다.

```jsx
var Avengers
;(function (Avengers) {
  Avengers['Capt'] = 'Evan'
  Avengers['IronMan'] = 'Robert'
  Avengers['Thor'] = 'Chris'
})(Avengers || (Avengers = {}))
let hero = Avengers.Capt
console.log(hero) // Evan
```

## 7. Any

기존에 자바스크립트로 구현되어 있는 웹 서비스 코드에 타입스크립트를 점진적으로 적용할 때 활용하면 좋은 타입입니다. 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미를 갖고 있습니다.

```jsx
let str: any = 'hi'
let num: any = 10
let arr: any = ['a', 2, true]
```

## 8. Void

반환 값이 없는 함수의 반환 타입입니다. 아래와 같이 `return`이 없거나 `return`이 있더라도 반환하는 값이 없으면 함수의 반환 타입을 `void`로 지정합니다.

```jsx
function printSomething(): void {
  console.log('sth')
}

function returnNothing(): void {
  return
}
```

## 9. Never

함수의 끝에 절대 도달하지 않는다는 의미를 지닌 타입입니다. 항상 에러를 반환하거나 영원히 끝나지 않는 함수 타입에 사용할 수 있다.

```jsx
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {}
}

function showError(): never {
  throw new Error()
}
```

## 10. Null, Undefined

```jsx
let a: null = null
let b: undefined = undefined
```

### 참조

---

[https://joshua1988.github.io/ts/guide/basic-types.html#타입스크립트-기본-타입](https://joshua1988.github.io/ts/guide/basic-types.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B8%B0%EB%B3%B8-%ED%83%80%EC%9E%85)  
[코딩앙마](https://www.youtube.com/watch?v=70w82P-KiVM&list=PLZKTXPmaJk8KhKQ_BILr1JKCJbR0EGlx0&index=2)
