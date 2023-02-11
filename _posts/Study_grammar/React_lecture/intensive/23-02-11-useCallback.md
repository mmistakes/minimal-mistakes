---
layout: single
title: "useMemo"
categories: lecture
tag: [React, code,conception,lecture_react,Sail99]
---

[TOC]



# useCallback

: Reacto.memo가 컴포넌트를 캐싱했다면,
**useCallback**은 인자로 들어오는 **값** 을 캐싱함	



## 사용목적

: 값을 캐싱하는 이유를 예시로 들면,

일반적인 컴포넌트 자체는 함수형인데,

선언할 때에도 함수형으로 하기때문에 

렌더링 될 때에 Memo에 컴포가 캐싱되어 있다 하더라도

함수를 불러와 새롭게 생성되는 값은 새로운 주소값을 가지면서

리렌더링이 됨 고로 값을 캐싱하여 리렌더링 되지 않기 위해

주소값을 고정시키기 위한 목적



props로 전달이 될 때 함수자체의 로직은 변경되지 않았지만 props로 주는 시점에
함수는 값이 변경되었다고 생각하기 때문에 새로운 주소값 생성 



## 사용예시

### ex1 ) 

```react
import React, { useCallback, useState } from "react";
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
  const initCount = useCallback(() => { //useCallback 선언
    console.log(`${count}에서 0으로 변경됨`); 
    setCount(0); //useCallback은 이 initCount가 생성되는 초기State를 캐싱함
  }, [count]);
//초기state로 캐싱이된다면 count를 찍으면 무조건0이나옴
//고로 count가 변경될때 값을 initCount함수는 유지하면서 변경하고 싶다면 배열에 변경될 값적용 필요

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
        <Box3 initCount={initCount} />
      </div>
    </div>
  );
}

export default App;
```

useCallbackㅓ