---
layout: single
title: "router DOM "
categories: React
tag: [React_Grammar_Intensive,Sail99,setting]
---



# Router DOM



라우터돔 패키지 설치
yarn add react-router-dom 



## 라우터돔 테스트 순서

1. 우리는 원래 단일페이지만 구성했지만
    페이지 컴포넌트작성 ==> 다중페이지 작성하기

2. Router.js 파일 생성. router를 구성하는 설정 코드  작성     

    (Redux에서 설정코드를 작성해 주입했던 것처럼)

3. 2번에서 진행한 코드들을  App.jsx에서 import하여 적용(주입과정이겠져)

4. 페이지 이동 테스트 



 local host:3000/home 
local host:3000/about
local host:3000/Works

www.sparta.com 

위 host 하나하나마다 각 컴포가 매칭되도록 만들것



2번
우선 src내에 pages폴더 내에 연결될 페이지이름.jsx 만듦(Contact, Works, About, Home)

같은 src폴더내에 shared폴더 -->  Router.js 만듦 (패키지 import할 파일) 

## 

## 기본구조

```react
//Router.js//

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Works from "../pages/Works";
import About from "../pages/About";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="works" element={<Works />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

    
    
```

```react
//App.jsx//

import React from "react";
import Router from "./shared/Router";

function App() {
  return <Router />;  //이 Router는 Router.js의 Router에 연결되야함
}

export default App;

```

