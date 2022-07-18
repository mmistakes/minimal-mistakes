---
layout: single
title: "discriminated.ts"
categories: "FrontEnd"
tag: [TypeScript]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
---

### discriminated

```jsx
// function: login -> success, fail ⏱
type SuccessState = {
  result: "success",
  response: {
    body: string,
  },
};
type FailState = {
  result: "fail",
  reason: string,
};
type LoginState = SuccessState | FailState;

function login(): LoginState {
  return {
    result: "success",
    response: {
      body: "logged in!",
    },
  };
}
```

discriminated은 구분할 수 있는 뜻입니다.
result란 타입은 success의 값이있고, FailState은 fail값이 가지고있습니다.
login함수안에 reslut는 success라는 것을 볼 수있다. 타입이 보장되면서 서로 다른 state를 만들수있습니다.

```jsx
// printLoginState(state: LoginState)
// success -> 🎉 body
// fail -> 😭 reason
function printLoginState(state: LoginState) {
  if (state.result === "success") {
    console.log(`🎉 ${state.response.body}`);
  } else {
    console.log(`😭 ${state.reason}`);
  }
}
```

state가 어떤 state인지 상관없이 SuceessState, FailState에 동일하게 result라는 타입이 있으므로 state가 인식할 수 있게되어 result를 사용할 수 있게된다.
