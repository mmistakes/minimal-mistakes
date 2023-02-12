---
layout: single
title: "숙련주차 Question"
categories: React
tag: [React,React_Grammar_Intensive,Sail99,Question]
---



1. useEffect 의존배열에 조건도 들어갈 수 있나..?

```react
import React, { useEffect, useRef, useState } from "react";

function App() {
  const idRef = useRef("");
  const pwRef = useRef("");
  const [user, setUser] = useState("");
  const idInput = (event) => {
    setUser(event.target.value);
    console.log(user.length);
  };
  //화면 렌더링시 어떤 작업 필요? : useEffect

  useEffect(() => {
    //포커싱을 위해 ID인풋을 타겟하는법? :
    //ref를 가지고 있어야 하기 때문에 useref 사용 : idRef에 선언
    idRef.current.focus(); // idRef의 current값의 focus() API사용해 포커싱
  }, []);

    //state적용하여 idRef가 10이되면 자동으로 pw로 넘어가게 구현
  useEffect(() => {
    if (user.length === 10) {
      pwRef.current.focus();
    }
  }, [user]);
    //위에 if조건문 또는 나는 아래와 같이 진행했는데 warning뜸 이유는..?
     useEffect(() => {
      pwRef.current.focus();
  }, [user.length === 10 ]);

  return (
    <div>
      <div>
        {/* input 내 ref속성에 Ref변수 적용해 타게팅  */}
        ID: <input value={user} type="text" ref={idRef} onChange={idInput} />
      </div>
      <div>
        Pw: <input type="password" ref={pwRef} />
      </div>
    </div>
  );
}

export default App;

//id 10자리 입력시 비번이 포커싱

// 렌더링 되었을 때 id 포커싱

```



