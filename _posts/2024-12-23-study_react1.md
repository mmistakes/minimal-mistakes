---
layout: single
title:  "[study] React 공부하기 (사용목적, 기능)"
categories: study
tags: [react, blog, study] 
toc : true
author_profile : false 
---

### React
***

#### React란?
**목적**
- 자바스크립트 라이브러리, 사용자 인터페이스(UI)를 구축할때 사용
- SPA(Single Page Application)을 만들때 사용
    - SPA: 새로고침 없이 부드럽게 동작하는 앱

**기능**
- Virtual DOM
- JSX(JavaScript XML)
- Component
- state, props
- React Hooks
- Routing

***

### React 기능
React의 기능에 대해 자세히 알아보자

***
#### [VDOM(Virtual DOM)]
DOM 대신 Virtual DOM을 사용해 UI를 업데이트함
- 실제 DOM과의 차이를 계산한 후 최소한의 변경 사항만 적용
- 성능 향상 가능 

***
#### [JSX(JavaScript XML)]
JavaScript와 XML/HTML을 합친 문법
- HTML과 유사한 문법을 JavaScript코드 안에서 사용 가능하게 함
- 가독성 향상 가능

***
#### [Component]
리액트 앱의 핵심 요소, UI의 독립적이고 재사용 가능한 작은 조각
- 계층구조로 부모 컴포넌트와 자식 컴포넌트가 존재함
- 특정 데이터를 기반으로 UI를 렌더링하며 데이터가 변경되면 자동으로 UI를 업데이트함

***
##### 컴포넌트의 종류
함수형과 클래스형이 존재하지만 클래스형은 잘 사용되지 않기 때문에 함수형만 알아보겠다.

***

**함수형 컴포넌트**

javaScript 함수처럼 정의됨, 상태와 생명주기를 관리하기 위해 React Hooks을 사용함

간결하고 가벼움
- React Hooks
    - 예: useState, useEffet, useContext

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}
```

***
#### [State(속성), Props(상태)]
데이터를 관리하고 전달할 때 사용한다.

***
##### Props
- 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달 할 때 사용
- 읽기 전용
- 자식 컴포넌트는 ```props```를 변경할 수 없음

```jsx
function Greeting(props) {
    return <h1>Welcome, {props.user}!</h1>;
}

// 사용
<Greeting user="Kim" />
```
##### State
- 컴포넌트의 동적인 데이터를 관리함
- 상태가 변경되면 해당 컴포넌트가 자동으로 리렌더링됨

```jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
}
```
#### [React Hooks]
함수형 컴포넌트에서도 상태와 생명주기 기능을 사용할 수 있도록 돕는 기능

##### useState
- 컴포넌트에 **state 변수**를 추가함
- state를 업데이트 하는 함수를 반환함

```jsx
const [state, setState] = useState(initialState) //초기값
```

##### useEffect
- 외부 시스템과 컴포넌트를 동기화함

컴포넌트의 최상위 레벨에서 useEffect를 호출하여 Effect를 선언할 수 있음

- 추가기능 
    - 사이드 이펙트(side effect)를 처리함
    - 데이터 가져오기 수행
    - DOM 업데이트 수행

```jsx
useEffect(setup, dependencies?) //setup: 실행할 함수
```
- dependencies: 이 값이 변경될 때만 setup 실행

##### useContext
Context API를 쉽게 사용가능하게 함
- Context API: 컴포넌트 트리에서 전역적으로 데이터를 공유할 때 사용

```jsx
const value = useContext(SomeContext)
```

#### [Routing]
- React Router를 통해 페이지 간의 이동을 관리
- Single Page Application(SPA)에서 페이지를 새로고침하지 않아도 URL에 따라 내용이 바뀌게 해줌
