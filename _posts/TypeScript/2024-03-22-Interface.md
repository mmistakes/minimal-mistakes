---
layout: single
title: '인터페이스'
categories: 'TypeScript'
tag: [typescript, interface]
toc: true
toc_label: 'Contents'
toc_sticky: true
author_profile: false
sidebar:
  nav: 'sidebar-category'
---

## 인터페이스

타입스크립트의 인터페이스는 두개의 시스템 사이에 상호 간에 정의한 약속 혹은 규칙을 포괄하여 의미한다. 혹은 객체의 껍데기 또는 설계도라고 할 수 있다.

즉, 프로그래밍에서 클래스 또는 함수의 '틀' 을 정의하는 것처럼, 타입의 '틀'로서 사용할 수 있는 것이 인터페이스 인 것이다.여러 함수가 특정한 시그니처를 동일하게 가져야 할 경우 또는 여러 클래스가 동일한 명세를 정의해야하는 경우 인터페이스를 통해서 정의할 수 있다. 그래서 인터페이스에 선언된 프로퍼티 또는 메소드의 구현을 강제하여 각 클래스와 함수간의 일관성을 유지할 수 있도록 하는 것이다.

타입스크립트에서의 인터페이스는 보통 다음과 같은 범주에 대해 약속을 정의할 수 있습니다.

- 객체의 스펙(속성과 속성의 타입)
- 함수의 파라미터
- 함수의 스펙(파라미터, 반환 타입 등)
- 배열과 객체를 접근하는 방식
- 클래스

## 인터페이스 사용하기


```jsx
let user:object;

user = {
  name: "DO",
  age: 30
}

console.log(user.name); //Property 'name' does not exist on type 'object'.
```

user라는 오브젝트에 name이라는 프로퍼티가 없다는 에러가 발생합니다.. 프로퍼티를 정의해서 오브젝트를 표현하고자 할 때는 인터페이스를 사용합니다.

```ts
interface User {
  name: string,
  age: number
}

let user:User =  {
  name: "DO",
  age: 30
}

console.log(user.name); // "DO"
```

인터페이스를 사용하면 더이상 에러가 발생하지 않습니다.

## 옵션 속성, Ootional Property

인터페이스를 사용할 때 인터페이스에 정의되어 있는 속성을 모두 다 사용해야 하는데, 있어도 되고 없어도 되는 옵셔널한 속성을 설정하려면 `?` 를 붙이면 됩니다.

```ts
interface 인터페이스_이름 {
  속성?: 타입;
}
```

### 📌 인터페이스가 가진 속성을 다 사용하지 않아 에러발생

```ts
interface User {
  name: string,
  age: number,
  gender: string,
}

let user:User =  {
  name: "DO",
  age: 30
} 
// Property 'gender' is missing in type '{ name: string; age: number; }' 
// but required in type 'User'.
```

```ts
interface User {
  name: string,
  age: number,
  gender?: string,
}

let user:User =  {
  name: "DO",
  age: 30
}
```

⇒ 옵션 속성으로 에러 해결

## 읽기전용 속성, Readonly Property

읽기 전용 속성은 인터페이스로 객체를 처음 생성할 때만 값을 할당하고 그 이후에는 변경할 수 없는 속성을 의미합니다. 문법은 다음과 같이 `readonly` 속성을 앞에 붙입니다. 값에 접근할 수 있지만 수정은 불가능합니다..

```ts
interface User {
  readonly birthYear: number
}
```

최초에 생성할 때만 할당이 가능하고 이 후에는 수정할 수 없습니다. 인터페이스로 객체를 선언하고 나서 수정하려고 하면 아래와 같이 오류가 납니다. 

```ts
let user:User =  {
  birthYear: 2000
}
user.birthYear = 1999; // Cannot assign to 'birthYear' because it is a read-only property.
```

## **읽기 전용 배열**


배열을 선언할 때 `ReadonlyArray<T>` 타입을 사용하면 읽기 전용 배열을 생성할 수 있습니다.

```ts
let arr: ReadonlyArray<number> = [1,2,3];
arr.splice(0,1); // error
arr.push(4); // error
arr[0] = 100; // error
```

위처럼 배열을 `ReadonlyArray`로 선언하면 배열의 내용을 변경할 수 없습니다. 선언하는 시점에만 값을 정의할 수 있으니 주의해서 사용하세요.

## Index signature


때로는 타입의 모든 속성 이름을 미리 알 수 없지만 값의 형태는 알고 있는 경우 사용됩니다. 즉, 모든 속성의 이름과 타입을 정확히 알지 못해도 그 형태만을 알고 있다면 해당 형태에 대한 타입을 지정할 수 있는 것을 의미합니다.

```ts
interface SomeType {
  [key: number]: string;
}
```

위 예시에서 **`[key: string]`**는 Index Signature로, 이는 **`SomeType`**의 모든 속성 이름이 숫자형이고, 그 속성의 값은 문자열임을 나타냅니다. 이를 통해 모든 속성의 이름은 숫자이지만 그 값을 문자열로 제한함으로써 유연성을 유지할 수 있습니다.

Index Signatures는 TypeScript에서 객체의 속성을 동적으로 정의하는 데 유용하게 사용됩니다.

### 📌 학년별 성적을 저장한다면?

1~3학년의 학생들이 있다면 1학년은 1학년 성적만, 2학년은 1,2학년 성적이, 3학년은 1,2,3 학년 성적을 반영되게 하려고 합니다. number를 key로 하고, string을 value로 받는 프로퍼티로 설정해줄 수 있습니다.

```ts
interface User {
  [grade: number]: string,
}

let user:User =  {
  1: 'A',
  2: 'B'
}
```

## Literal Types


TypeScript에 문자열이나 숫자에 정확한 값을 지정하여 더 엄격한 타입을 지정하는 것으로, 지정한 값 자체를 타입으로 지정하는 기능입니다. 

위에 예제에서 성적을 string으로 하기에는 너무 광범위하므로, 성적을 A, B, C, F 로 지정해 줄 수 있습니다.

```ts
type Score = 'A' | 'B' | 'C' | 'F';

interface User {
  [grade: number]: Score,
}

let user:User =  {
  1: 'A',
  2: 'B',
  3: 'D' //Type '"D"' is not assignable to type 'Score'.
}
```

Score에서 지정한 문자열 외에 다른 문자열을 사용하게 되면 에러가 발생한다.

## 함수 타입


인터페이스로 함수를 정의할 수도 있다. 함수형 인터페이스를 사용하여 함수의 형태를 명시하고, 해당 형태를 따르는 함수를 구현할 수 있습니다.

### 📌 예제 1 : 숫자를 더하는 함수

```ts
interface Add {
    (num1: number, num2: number) : number 
}
```

Add 인터페이스는 두 개의 숫자를 입력으로 받아들이고, 숫자를 반환하는 함수의 형태를 나타냅니다. 이제 이 인터페이스를 구현하는 함수는 다음과 같이 정의할 수 있습니다:

```ts
const add: Add = function(x, y) {
    return x + y;
}

add(10, 20)
```

### 📌 예제 2: 나이 값을 받아서 boolean을 리턴하는 함수

```ts
interface IsAdult {
    (age: number):boolean
}

const a: IsAdult = (age) => {
    return age > 19
}

a(33); // true
a(10); // false
```

## 클래스 타입


C#이나 자바처럼 타입스크립트에서도 클래스가 일정 조건을 만족하도록 타입 규칙을 정할 수 있습니다.

Car 라는 인터페이스를 정의하고, 이 Car 인터페이스를 통해서 BMW 라는 클래스를 만들어 볼 수 있습니다.

📌 예제 1.

```ts
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

class Bmw implements Car {
    color = "pink";
    wheels = 4;
    start(){
        console.log('Go...')
    }
}

const b = new Bmw;
console.log(b); // Bmw: { "color": "pink", "wheels": 4} 
b.start(); // "Go..." 
```

📌 예제 2. 생성될 때 색상 입력받기

```ts
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(c: string){
        this.color = c;
    }
    start(){
        console.log('Go...')
    }
}

const b = new Bmw('pink');
console.log(b); // Bmw: { "wheels": 4, "color": "pink"} 
b.start(); // "Go..."
```

## 인터페이스 확장(extends)


클래스와 마찬가지로 인터페이스도 인터페이스 간 확장이 가능합니다.

```ts
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

interface Benz extends Car {
    door: number,
    stop():void
}

const benz: Benz = {
    color: 'purple',
    wheels: 4,
    start(){
        console.log('Go...')
    },
    door: 4,
    stop(){
        console.log('Stop...')
    }
}
```

혹은 아래와 같이 여러 인터페이스를 상속받아 사용할 수 있습니다.

```ts
interface Car {
    color: string,
    wheels: number,
    start(): void,
}

interface Toy {
    name: string
}

interface ToyCar extends Car, Toy {
    price: number
}

const mini: ToyCar = {
    color: 'pink',
    wheels: 4,
    start(){ console.log('Go!')},
    name: 'Cooper',
    price: 5000
}
```