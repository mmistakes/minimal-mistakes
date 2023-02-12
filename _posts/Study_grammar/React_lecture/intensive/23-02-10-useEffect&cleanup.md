---
layout: single
title: "useEffect & cleanup"
categories: React
tag: [React_Grammar_Intensive,Sail99]
---



[TOC]

---



# useEffet 

## 필요 개념 : 의존성 배열(dependency array ) 





## useEffet 

: 렌더링 시 어떤 작업을 수행할 때 설정하는 훅

### useEffect 는 언제사용하나



**렌더링시**

1. 어떤 값이 화면에서 사라질때

2. 어떤 값이 화면에 나올 때 또는 입력이 될 때

   위와 같은 상황일 때 **어떤 것을 실행시키고 싶을 때 사용**



### 흐름

```react
1. return에 input값 입력을 했을때에 =
2.value(state)가 변경
3.state바뀌었기 때문에 --> App컴포가 리렌더링
4. 리렌더링되면 useEffect실행
5. 1~4 반복
```

: 반복적인 리렌더 해결위해 **의존성 배열** 필요




### 의존성 배열

: 이 배열에 값을 넣으면, 그 값이 바뀔 때만 
useEffect를 실행!





### 형태

#### - 값안넣었을때

```react
function App() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log("hello useEffect");
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}
```

위 useEffect 내 배열 형태가 dependency array
dependency array(이하 의존성배열)에다가 
어떤 값이 바뀔지를 넣고 바뀌어서 **렌더링 되면** console.log실행  

위 코드의 경우, [ ]에 아무것도 없기 때문에
처음 렌더링 될때만 실행이되고,
이후 변경된 값에는 설정이 없으므로 어떠한 변경도 일어나지 않음

#### - 값넣었을때

```react
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(`hello useEffect ${value}`);
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
}

export default App;

```

위 코드에서는  **의존성배열**에 value 그리고 콘솔엔 백틱으로 string과 value변수 추가
그럼 value값이 바뀌어서 렌더링 될때마다 console.log의 값이 콘솔에 출력이 될 것







위는 화면에 값이 나올때의 예시
여기는 화면에서 사라질 때의 예시

## useEffet  - Clean up

```react
function App() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(`hello useEffect ${value}`);
     
       // 여기에 리턴문 작성
     return () => {
      console.log("나 사라짐");
    };
      
  }, [value]);
```

위 상황에서 return을 작성하면 해당로직 즉, 콘솔로그가 컴포넌트가 사라질 때에 작동을 하게됨

`const nav = useNavigate()`를 사용

### 

















​	

