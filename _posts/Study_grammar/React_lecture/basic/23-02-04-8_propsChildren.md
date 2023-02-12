---
layout: single
title: "Props Children"
categories: React
tag: [Sail99, React_Grammar_Basic]
---

# props Children

부모 -> 자식 내려가는 형태가 props 

children도 똑같지만 내려가는 전달되는 형태가 다름

### 기본형태

```react
//Children 문법
//일반 props는 클로즈 태그 children props는 여다는 태그사이에 값 넣어줌

import React from "react";
import Layout from "Layout";
//상위 컴포
function App() {
  return <User>안녕하세요!</User>; //1.하위컴포 태그사이에 출력값 지정
}

//하위컴포
function User(props) {
  // 2. props로 받기
  //3. chilren이면 props.children으로 출력
  return <div>{props.children}</div>;
}

export default App;

```

### children활용

```react
// 다른 react파일
function Layout(props) {
  return (
    <>
      <header
        style={{
          margin: "10px",
          border: "1px solid red",
        }}
      >
        항상 출력되는 머릿글
      </header>
      {props.children}
    </>
  );
}

export default Layout;

```



