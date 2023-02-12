---
layout: single
title: "Redux_Counter"
categories: React
tag: [React_Grammar_Intensive,Sail99,check]
---



# 들어가기전 Redux의 흐름

[흐름도식화](https://velog.io/@annahyr/%EB%A6%AC%EB%8D%95%EC%8A%A4-%ED%9D%90%EB%A6%84-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)

1. View 에서 액션이 일어난다.
2. dispatch 에서 action이 일어나게 된다.
3. action에 의한 reducer 함수가 실행되기 전에 middleware가 작동한다.
4. middleware 에서 명령내린 일을 수행하고 난뒤, reducer 함수를 실행한다.
5. reducer 의 실행결과 store에 새로운 값을 저장한다.
6. store의 state에 subscribe 하고 있던 UI에 변경된 값을 준다.







```react
# redux start 환경설정

### 설치

터미널
yarn add redux react-redux

### configStore.js == 중앙데이터관리소

1. redux:리덕스 관련 코드를 모두 몰아넣음
2. config : 리덕스 설정 관련파일 전부
3. configStore.js : 중앙 state 관리소 -> 설정 코드(.js)
4. modules : state의 그룹 (중앙state에서 관리하는 state의 그룹이 여기로)
   ex) Todolist app을 만들면
   => 이것에 필요한 state들이 모두 모여있을 todo.js같은걸 만들어 넣을것

### step1. 폴더생성 

src/redux/config 폴더생성
config안에다가
configStore.js파일 생성

src/redux/modules 폴더 생성

### import

// 중앙 데이터 관리소(store)를 설정하는 부분
import { createStore } from "redux"; //스토어를 만드는 API
import { combineReducers } from "redux"; //reduxer들을 한번에 묶는 API

const rootReducer = combineReducers({});

//변수들이 객체형태로 들어감
//값들은 modules의 애들이 전부들어감

const store = createStore();
리턴값을 계속 스토어에 넣어줌

//위 reducer가지고 store를 생성
//인자에는 reducer묶음 즉, rootReducer가 들어가야함

export default store;

### index.js

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
// App이 provider영향권 내에 들어옴
<Provider store={store}>  
<App />
</Provider>
// App컴포넌트 이하에서는 store를 사용할 준비가됨
);

reportWebVitals();

### module에 state의 그룹인 counter.js를 만들어 state그룹 이 파일이 reducer

//초기상태값이 필요
//보통 변수명 initialState
//객체형태로 만들것
const initialState = {
number: 0,
};

//리듀서 : state에 변화를 일으키는 함수
//즉, state를 action의 type에따라 변경시키는 함수

//** input은 어떤 인자를 받냐 : state와 action ** 중요
//redux팀에서 무조건 이렇게 받게 만듦
//
//state의 초깃값은 initial state
//action은 객체형태로도 있고, action은 타입이라는게 있고 밸류라는게 있다.
//action은 state를 어떻게 수정할건지
const counter = (state = initialState, action) => {
switch (action.type) {
default:
return state;
}
};
//위 코드는 해석
//counter를 할당하는데 state는 제일위에 만든 기본값이고
//action은 switch를 통해서 설정이되는데 action의 type에 따라 바뀌는 값이 있다
//밑에 작업 수행
//아무것도 없을경우 default: 만 넣어주자
//return state를 하면 initialState에서 받은 counter의 초기값이 리턴됨
//
//
//counter내보내기
export default counter;

### configstore에 import

// 중앙 데이터 관리소(store)를 설정하는 부분
import { createStore } from "redux"; //스토어를 만드는 API
import { combineReducers } from "redux"; //reduxer들을 한번에 묶는 API
import counter from "./modules/counter";

//위엔 변수들이 객체형태로 들어감
//값들은 modules의 애들이 전부들어감
const rootReducer = combineReducers({
counter: counter
});

const store = createStore();
//위 reducer가지고 store를 생성
//리턴값을 계속 스토어에 넣어줌
//인자에는 reducer묶음 즉, rootReducer가 들어가야함

export default store;

#### 위의 counter를 선언하면 비로소 App이 중앙에 접근할 수 있게됨

### 접근을 위해서는 redux훅을 사용해야함

# 작업시작 : 접근하는 법 : App.jsx 에서 작업시작

import React from "react";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
//여기서 store에 접근해, counter의 값을 읽어오고 싶으면,
//useSelector를 사용해 가져올 수 있음
//return한 state를 사용가능

const data = useSelector((state) => {
return state;
});
console.log("data", data);
return <div>Redux!</div>;
}

export default App;

콘솔에
data {counter: {…}, users: {…}}
counter: number: 0
users:
userId: 123]
이렇게 배열형태로 찍힌것을 인수로 받아 사용 가능함.
```

---

```react
    //리덕스로 카운터 앱만들기

import React from "react";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  //여기서 store에 접근해, counter의 값을 읽어오고 싶으면,
  //useSelector를 사용해 가져올 수 있음(리덕스의 훅이라생각)
  //return한 state를 사용가능

  const counter = useSelector((state) => {
    return state.counter;
  });
  console.log("counter->", counter.number);
  return (
    <>
      <div>현재카운트:{counter.number}</div>;
      {/* setState는 바로 넣어주면되지만
    redux는 disptch가 action을 던져주는 작업이 필요! 
    고로 이벤트발생시 dispatch로 action을 보내야함 
    
    아래에서는 onClick시 +1을 더해주어야 하는데 
    module에서 로직을 가져와야해서 module수정
    */}
      <button
        onClick={() => {
          alert(1);
        }}
      >
        +
      </button>
    </>
  );
}

export default App;

```

