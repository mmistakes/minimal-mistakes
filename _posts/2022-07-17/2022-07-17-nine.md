---
layout: single
title: "inference.ts"
categories: "FrontEnd"
tag: [TypeScript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---

### inference

```jsx
/**
 * Type Inference
 */
let text = "hello";
function print(message = "hello") {
  console.log(message);
}
print("hello");

function add(x: number, y: number): number {
  return x + y;
}
const result = add(1, 2);
```

타입추론이라는 의미인데, 타입을 명확하게 명시해야하는 경우보다는 자동으로 타입이 결정되는 경우가있다.
타입스크립트는 text라는 변수는 자동으로 str로 유추할 수있다.
타입을 직접 명시해도되지만 생략해도 된다.
함수안에 인자를 사용하지않으면 타입은 자동적으로 any가 된다. 그렇기 떄문에 타입을 설정해준다.
add함수에서 타입스크립트에서는 숫자 두개를 받아서 더했으니 result는 자동으로 숫자임을 추론해준다.
하지만, 이런방법은 권장하지않는다. 물론, 타입스크립트에서 자동적으로 명시해주지만 프로젝트에서 코딩을 작성할때 복잡해진다면 가독성이 낮아지므로 타입을 명시하는게 좋다.
