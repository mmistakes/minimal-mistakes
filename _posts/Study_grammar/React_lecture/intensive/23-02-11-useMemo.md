---
layout: single
title: "useMemo"
categories: lecture
tag: [React, code,conception,lecture_react,Sail99]
---

[TOC]



# useMemo



##  리렌더링 발생조건

- state 변경
- props변경 
- 부모컴포넌트의 리렌더링시 자식컴포가 리렌더링



## 최적화

리렌더링 줄이기 위해 최적화가 필요함 

### 최적화 방법 3가지

1. memo(React.memo) : 컴포넌트를 캐싱함
2. useCallback : 함수를 캐싱함
3. useMemo : 값을 캐싱함



### 1. useMemo란

#### Ex) 

예를 들어 스타일 다른 컴포넌트 박스3개,
`+` 와 `-` 로 카운팅 버튼이 있고
각 box컴포에 콘솔을 넣었을 때,
카운팅이 될떄 값이 렌더링되기 때문에 
전체가 렌더링이 되버리는데,

 이를방지하기 위해 
useMemo라는 메모리에 **React.memo**를 이용하여
**캐싱(:임시저장)**을 함

```react
//App.jsx

import React, { useState } from "react";
import Box1 from "./components/Box1";
import Box2 from "./components/Box2";
import Box3 from "./components/Box3";

function App() {
  console.log("App 컴포렌더링");
  const [count, setCount] = useState(0);
  const addnumbtn = () => {
    setCount(count + 1);
  };
  const minusnumbtn = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h3>카운트 예제</h3>
      <p>현재카운트 {count}</p>
      <button onClick={addnumbtn}>+</button>
      <button onClick={minusnumbtn}>-</button>
      <div
        style={{
          display: "flex",
          marginTop: 20,
        }}
      >
        <Box1 />

        <Box2 />
        <Box3 />
      </div>
    </div>
  );
}

export default App;

```



```react
//컴포넌트 Box3

import React from "react";

function Box3() {
  const style = {
    width: "100px",
    height: "100px",
    backgroundColor: "red",
    color: "white",
  };
  console.log("box3렌더링");
  return <div style={style}>Box3</div>;
}

export default React.memo(Box3); // 여기 가져올 컴포에 React.memo(컴포)만해주면 캐싱가능

```

