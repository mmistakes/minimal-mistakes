---
layout: single
title: "Function.ts"
categories: "FrontEnd"
tag: [TypeScript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---





### Function.ts

```jsx
// JavaScript 
  function jsAdd(num1, num2) {
    return num1 + num2;
  }
```

함수가 긴경우에는 어떤값을 전달해야할지 헷갈릴 수 있고, 어떤값을 리턴해야할지 불확실할 수 있다.



```jsx
// TypeScript 
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }
```

맨위에 있는 함수를 통해 타입스크립트 처럼 바꿔보자.

num1을 number, num2 number 타입을 지정해주면 숫자를 입력하는 것을 파악할 수 있다.



```jsx
// JavaScript 
  function jsFetchNum(id) {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }
```

페치작업을하다 프로미스를 리턴하는 함수이다. 많은 함수들이 있다면 어떤 함수들을 리턴하는지 파악해야한다.



```jsx
// TypeScript 
  function fetchNum(id: string): Promise<number> {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }
```

id는 string으로 인자로 받아서 리턴값은 Promise이고 Promise중에서도 숫자로 리턴한다.  fetchNum함수는 숫자를 fetch하는 함수인데 인자론 str인 id를 받아서 Promise를 리턴한다. Promise는 페치가 완료된 후, 숫자의 Data를 리턴한다는 것을 파악할 수 있다.

**자바스크립트가아니라 타입스크립트로 사용하면 타입기입을 하므로서 좀더 높은 문서화 효과를 볼 수있고, 보다 더 직관적으로 생겨 가독성이 높아진다.**



#### Optional parameter

```jsx
// JavaScript  => TypeScript
  // Optional parameter
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName); // undefined
  }
  printName('Steve', 'Jobs');
  printName('Ellie');
  printName('Anna');

결과
Jobs
Ellie
undefined
Anna
```

이름과 성을 받아서 출력하는 함수 printName

여기서 printName을 사용하려면 꼭 이름과 성을 같이 인자로 전달해야한다.

하지만 항상 이름과 성 모두 전달하는게 아니라 둘중에 하나라도 전달하면 실행이되게 해주고싶다면 optional parameter를 사용한다.

?을 사용하면 전달받을 수도있고 전달받지않을 수도있다.

이름은 꼭 문자열로 받아야하지만, 성은 받아도되고 안받아도된다.

결과적으로 옵션널을 사용하면 더이상 undefined를명시해주지 않아도된다.



#### Default parameter

```jsx
 // Default parameter
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage();

결과
default message
```

기본적인 default값을 지정해주면 옵셔널 파라미터처럼 default 값을 설정해줄수있다.



#### Rest parameter

```jsx
// Rest parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));

결과

3
10
15
```

내가 원하는 숫자만큼 , 갯 수 상관없이 보낼 수 있다.

받아온 모든 숫자들을 배열의 형태로 받아온다는 의미이다.

만약 숫자가아니라 다른타입을 전달하게되면 error가 발생한다.