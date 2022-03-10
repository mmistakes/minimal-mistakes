---
layout: single
title: "useEffect"
categories: React
tag: [TIL, React]
---

### 01. Side Effect

#### 01-1. Rendering in React

React에서 함수 컴포넌트의 `rendering`이란 state, props를 기반으로 UI 요소를 그려내는 행위이다.

렌더링의 결과물은 UI 요소, 그러니까 화면에 JSX 문법으로 무엇이 나타날지를 적어둔 컴포넌트들이라고 할 수 있다.

이를 달리 표현하면 `state, props = UI` 라고도 표현할 수 있다.

#### 01-2. Side Effect란?

side effect는 부작용, 부수 효과라고 부른다.

함수가 어떤 동작을 할 때 **input-output 이외의 다른 값을 조작한다면** 이 함수는 side effect 가 있다고 표현한다.

```js
let count = 0;

function greetWithSideEffect(name) {
  // Input
  count = count + 1; // Side Effect!

  return `${name}님 안녕하세요!`; // Output
}
```

위 코드와 같이 전역으로 선언된 `count` 변수가 `greetWithSideEffect` 함수 내에서 변경이 일어났을 때 side effect 가 일어났다 라고 표현한다.

만일 `greetWithSideEffect` 함수 인자를 count 도 받아온다면 전역변수인 `count` 를 건들이지 않게되고, `input-output`으로만 동작을 하며 그것을 **순수함수**라고 말한다.

---

### 02. useEffect

#### 02-1. useEffect란?

리액트 공식 문서에 useEffect는 `React의 순수한 함수적인 세계에서 명력적인 세계로의 탈출구로 생각하게요` 라고 설명되어 있다.

여기서 `순수한 세계`란 렌더링(input - output)을 뜻하며 렌더링 이외에 일으켜야 하는 side effect를 일으킬 탈출구로 useEffect를 사용하라는 의미이다.

```jsx
import { useEffect } from "react"

// 사용법
useEffect( 실행시킬 동작, [ 타이밍 ] )
document.addEventListener("타이밍", 실행시킬 동작) // 추상화 한 예시

// 방법1 : 매 렌더링마다 Side Effect가 실행되어야 하는 경우
useEffect(() => {
  // Side Effect
})

// 방법2 : Side Effect가 첫 번째 렌더링 이후 한번 실행 되고,
// 이후 특정 값의 업데이트를 감지했을 때마다 실행되어야 하는 경우
useEffect(() => {
  // Side Effect
}, [value])

// 방법3 : Side Effect가 첫 번째 렌더링 이후 한번 실행 되고,
// 이후 어떤 값의 업데이트도 감지하지 않도록 해야 하는 경우
useEffect(() => {
  // Side Effect
}, [])
```

위 코드는 useEffect를 활용한 3가지 방식이다. useEffect의 사용 문법을 확인하고, 함수의 첫번째 인자는 **실행시킬 동작**, 두번째 인자는 **의존성 배열(Dependancy Array)** 이다. 짧게 말해 `deps`라고 부른다.

---

### 03. Clean up Effect

**Render -> Effect Callback -> Clean Up**

`Cleanup Effect`는 이전에 일으킨 Side Effect를 정리할 때 사용한다.

```js
useEffect(() => {
  function handleScroll() {
    console.log(window.scrollY);
  }
  document.addEventListener("scroll", handleScroll);
}, []);
```

위 코드를 보면 이벤트리스너를 선언한다. 페이지에 스크롤 이벤트가 일어날 때마다 console에 현재 스크롤 위치한 좌표를 출력한다.

useEffect 안에서 사용되고 이벤트는 한번만 등록하면 되기 때문에 의존성 배열에는 빈 배열을 넣었다.

**하지만** 이 페이지를 벗어났을 때 등록한 이벤트 리스너는 더 이상 필요가 없어질 수 있다. 이 경우에 일으켰던 Effect를 정리해줘야 한다.

```js
useEffect(() => {
  function handleScroll() {
    console.log(window.scrollY);
  }

  document.addEventListener("scroll", handleScroll);
  return () => {
    document.removeEventLisnter("scroll", handleScroll);
  };
}, []);
```

위 코드의 로직을 보면 useEffect 함수 내부에 이벤트 리스너를 선언하였고 콜백함수인 `return` 함수를 선언하고 내부에 **리무브 이벤트 리스너**를 선언하였다.

그러므로 인하여 해당 컴포넌트가 사라졌을 때 이벤트 리스너를 다시 회수할 수 있게된다.

**다음 Effect가 일어나기 전에, 이전 Effect의 영향을 정리해줘야 한다는 컨셉을 기억하자**
