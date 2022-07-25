---
layout: single
title: "assertion.ts"
categories: "Typescript"
tag: [assertion.ts]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16
---

###

### assertion

```jsx
{
  /**
   * Type Assertions 💩
   */
  function jsStrFunc(): any {
    return 2;
  }
  const result = jsStrFunc();
  console.log((result as string).length);
  console.log((<string>result).length);


```

Assertions은 권장하지않는다. 내가 코딩을 하는데 Assertions를 많이 이용한다면 피하는방법을 생각해봐야한다.
타입스크립는 result은 any 타입이기때문에 문자열타입에서 사용할수있는 length를 사용할 수없다. 하지만 result은 확실하게 문자열타입이라고 생각이든다면 그때 result as string을 캐스팅하여 문자열의 메소드를 사용 할 수 있다.
하지만 문자열이아니라 숫자를 반환할경우에도 타입스크립트에서는 에러가 발생하지않는다. 결과는 undefined가 나와 다행히 어플리케이션이 죽진않는다.
Assertions은 정말 타입을 장담할때 사용한다. as가아니라 변수앞에서 < string >처럼 기호를 사용해도 동일하게 작동한다.

```jsx
const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 😱

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(2); // 😱
}
```

wrong은 숫자를 가지고있는 배열이라고 확신했다고 가정하자.
그럼 배열이기때문에 push를 사용했지만 wrong은 숫자타입이기때문에 TypeError가 뜬다. 이처럼 내가 코딩을할때 실시간으로 죽을수있기때문에 권장하지않는다.
findNumbers함수에서 number거아니라 undefined일수도 있으니 push를 사용하게 되면 error가나온다. 그럴땐 numbers!.push()를 사용하는데 !는 값을 정말확신할때 사용할 수 있다, 무조건 null이아님을 의미한다.

```jsx
const button = document.querySelector('class')!;

if(button) {
button.nodeValue
}
```

컬리셀럭터는 요소가 존재하지않는다면 null로 출력된다.
button의 nodeValue에 접근하면 버튼은 null일수도 있다고 뜬다.
만약 button이 있다면 button.nodeValue에 접근하자고 가정할수있지만
button이 무조건 있다고 확신할 수있다면 !를 사용할 수 있다.
