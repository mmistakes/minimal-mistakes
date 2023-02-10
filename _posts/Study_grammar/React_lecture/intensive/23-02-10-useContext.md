---
layout: single
title: "useContext"
categories: lecture
tag: [React, code,conception,lecture_react,Sail99]
---



[TOC]



# useContext



## 소개와 사용이유

### 뭔가요

React기본 제공 Context

### 사용하는 이유

props driling발생 시 상태관리 어려워짐
driling은 props 사용시 컴포넌트를 거쳐서 줘야 하기 때문에 발생

하지만 Context를 사용하면?
어떤 컴포넌트에서든지 간에 전역적으로 선언되어 있는 Context에 접근이가능하다!



## Context ApI 필수개념

1. `createContext`  : 컨텍스트 생성

2. `Consumer` : Context변화감지
   setContext같은건가..?

3. `provider` : 하위 컴포로 Context전달



![KakaoTalk_20230210_193054412](../../../Img/KakaoTalk_20230210_193054412.jpg)





## 코드로 형태 구현

### 생성방법

```react
//우선 생성방법

import { createContext } from "react";
export const FamilyContext = createContext(null); // 초기값은 null

//이것을 가져다 쓰면됨

```

### 사용방법

* 우선 컴포넌트들이 받아왔던 props 또는 구조분해할당의 변수들은 필요가 없음
* 컨텍스트를 전달하기 위해 컨텍스트와 전달할 컴포넌트 import 필요

1. 다른 파일로 위의 생성방법을 통해 context생성
2. 아래와 같이 선언한 변수를 <만든컨텍스트. Provider></만든컨텍스트. Provider>의 value값을 통해 전달함
3. 전달시 만든컨텍스트 태그 사이에 전달할 컴포넌트 태그 선언

```react
import React from "react";
import { FamilyContext } from "../context/FamilyContext";
import Child from "./Child";
//G => child 데이터줘서 child가 받도록
function GrandFather() {
  const houseName = "스파르타";
  const Money = "10000";
  return (
    <FamilyContext.Provider
      value={{
        Money,
        houseName,
      }}
    >
      <Child />;
    </FamilyContext.Provider>
  );
}

export default GrandFather;

```

4. 변수를 선언하고  **useContext(만든컨텍스트)** 선언시

5. key value 형태로 전달됨 

```react
import React, { useContext } from "react";
import { FamilyContext } from "../context/FamilyContext";

function Child() {
  const style = {
    color: "red",
    fontWeight: 900,
  };
  const data = useContext(FamilyContext);
  console.log("data", data);
  return (
    <div>
      난 막내
      <br />
      할아버지가 울집 이름은 <span style={style}>{data.houseName}</span>라고함
      <br />
      용돈은<span style={style}>{data.Money}원</span>을 줌
    </div>
  );
}

export default Child;

```

6. 객체형태이기 때문에 프로퍼티 값으로 사용
   ex) 담은 변수가
   const GrandFatherLetter이면
   const GrandFatherLetter = useContext(FamilyContext) 이후

   value를 사용할 값에 GrandFatherLetter.houseName 이런 방식으로 사용







## @@@사용시 주의할점@@@

렌더링 문제로 무분별한 사용 금지
만약 Provider로 제공한 value가 달라지면 컨텍스트를 사용중인 
모든 컴포넌트가 리렌더링됨!!!  *서버도둑*





