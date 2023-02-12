---
layout: single
title: "useMemo"
categories: React
tag: [React_Grammar_Intensive,Sail99]
---

[TOC]



# useMemo

useMemo는 **value값을 캐싱**함.

React.memo와 혼동하지 말 것.

### Ex1)

```react
//Heavaycomponent.jsx


import React, { useState, useMemo } from "react";
// 무거운 로직을 넣을거라 헤비컨포 명명
function HeavyComponent() {
  const [count, setCount] = useState(0);
  const heavywork = () => {
    for (let i = 0; i < 1000000000; i++) {}
    return 100;
  };
  const value = useMemo(() => heavywork(), []); //useMemo사용하여 value의 value값을 캐싱 
    //캐싱하면 값이 어떤 메모리주소에 저장되기 때문에 렌더링 시간도 감소
  console.log(`value는 ${value}입니다.`);
  return (
    <>
      <p>난 무겁다</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        누르면 count 증가
      </button>
      <br />
      {count}
    </>
  );
}
		
export default HeavyComponent;






//App.jsx
import React from "react";
import HeavyComponent from "./components/HeavyComponent";

function App() {
  return (
    <>
      <HeavyComponent />
    </>
  );
}

export default App;
```

해당 코드의 경우 헤비컴포의 로직이 상당히 무겁기 때문에

렌더링에 시간이 많이 걸림

==> 	useMemo를 사용해줌으로써 값을 메모리에 캐싱, 리렌더 필요없음

### Ex2)

```react
// <hr/> 태그 위와 밑은 상관없는 다른 로직
//여기서 use메모를 쓰지않고 호출을 하게 되면 







import React, { useEffect, useState, useMemo } from "react";

function ObjectComponent() {
  const [isAlive, setIsAlive] = useState(true);
  const [uselessCount, setUselessCount] = useState(0);

  const me = useMemo(() => {
    return {
      name: "Ted Chang",
      age: 21,
      isAlive: isAlive ? "생존" : "사망",
    };
  }, [isAlive]);

  useEffect(() => {
    console.log("생존여부가 바뀔 때만 호출해주세요!");
  }, [me]);

  return (
    <>
      <div>
        내 이름은 {me.name}이구, 나이는 {me.age}야!
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            setIsAlive(!isAlive);
          }}
        >
          누르면 살았다가 죽었다가 해요
        </button>
        <br />
        생존여부 : {me.isAlive}
      </div>
      <hr />
      필요없는 숫자 영역이에요!
      <br />
      {uselessCount}
      <br />
      <button
        onClick={() => {
          setUselessCount(uselessCount + 1);
        }}
      >
        누르면 숫자가 올라가요
      </button>
    </>
  );
}

export default ObjectComponent;




//App.js

위 컴포 호출





//useMemo를 통해 해당 value를 가지는 함수를 호출하고 
//isAlive가 바뀔때만 적용되도록 isAlive를 의존성배열에 넣으면,
//밑의 숫자값과 상관이 없게됨

```

