---
layout: single
title: "Redux toolkit 흐름 및 설정"
categories: React
tag: [Redux,Sail99]
---





# Redux Toolkit



> ### 들어가기전 리덕스흐름

1. configstore 에서 rootreducer 만듦

(rootreducer안에는 == modules에서 만든 reducer들이 묶임)

변수 roodreducer의 리듀들을 combine 리듀서하여

그 묶인 리듀서로 store를 만듦(CreateStore) 

ddd



2. 이 store는 index.js에서 import 하여
   Provider API를 통해 App컴포로 주입되면 App에서 store 사용가능(전역으로)

+ 리듀서에 액션크리에이터 만들게 되는데 이는 휴먼에러를 줄이기 위함

3. 고로 이렇게 연결된 상태에서 reducer에 swtich - case 에 따른 로직을 만들어 사용





# counter App  Toolkit으로 축소

## 설치

yarn add @reduxjs/toolkit
npm install @reduxjs/toolkit



## 차이점

### store 작업

```react
//일반 store와의 차이

import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux"; //스토어를 만드는 API
import { combineReducers } from "redux"; //reduxer들을 한번에 묶는 API
import counter from "../modules/counter";

//일반리듀서
// const rootReducer = combineReducers({
//   counter: c unter,
// });
// const store = createStore(rootReducer);

//redux 툴킷//
const store = configureStore({
  //객체 리듀서가 들어감(key-value페어)
  reducer: {
    counter: counter,
  },
});

export default store;
```

### 

### Reducer 작업 

```react
import { createSlice } from "@reduxjs/toolkit";

//action value
// const MINUS_ONE = "MINUS_ONE";
// const PLUS_ONE = "PLUS_ONE";

//action.creator :
//slice에 다들어있음
// export const plusNum = (payload) => {
//   return { type: PLUS_ONE, payload };
// };
// export const minusNum = (payload) => {
//   return { type: MINUS_ONE, payload };
// };

const initialState = {
  number: 0,
};

//밑에서 리듀서 만들었으니 해당 리듀서는 불필요
// const counter = (state = initialState, action) => {
//   switch (action.type) {
//     case PLUS_ONE:
//       return {
//         number: state.number + action.payload,
//       };
//     case MINUS_ONE:
//       return {
//         number: state.number - action.payload,
//       };
//     default:
//       return state;
//   }
// };

//counterSlice에는 action creator와 reducer가 모두 들어있음
//아래 방식으로 리듀서 새로만들기
const counterSlice = createSlice({
  //key value객체 인자로
  name: "counter",
  initialState,
  reducers: {
    //보면 toolkit은 initailState에 직접 접근
    // 불변성을 신경쓰지 않아도됨 :  immer라는 애가 관리해줌
    plusNum: (state, action) => {
      state.number = state.number + 1;
    },
    minusNum: (state, action) => {
      state.number = state.number - 1;
    },
  },
});

//만든 리듀서를 이렇게 내보내고
export default counterSlice.reducer;
//action도 만들어 구조분해할당으로 내보냄
//이 actions는 아래 plusNum, minsNum 이 가진 객체를 가지고있음
//즉 action은 리듀서들을 의미
export const { plusNum, minusNum } = counterSlice.actions;

//action creator와 reducer가 한번에 해결!

//원래는 이렇게 내보냈쥬
// export default counter;

```



---

## Todolist --> Redux Toolkit으로

```react
import { createSlice } from "@reduxjs/toolkit";

// Action value
// const ADD_TODO = "ADD_TODO";
// const DELETE_TODO = "DELETE_TODO";
// const DONE_TODO = "DONE_TODO";

// Action Creator
// export const addTodo = (payload) => {
//   return { type: ADD_TODO, payload };
// };
// export const deleteTodo = (payload) => {
//   return { type: DELETE_TODO, payload };
// };
// export const doneTodo = (payload) => {
//   return { type: DONE_TODO, payload };
// };

// 초기값 initialState 
//===============================> 초기값만 있으면 됨
export const initialState = {
  counter: 0,
  todos: [{}],
};


//===============================> 필요없음
// 리듀서파트
// const todos = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         counter: state.counter + 1,
//         todos: [...state.todos, { ...action.payload, id: state.counter }],
//       };
//     case DELETE_TODO:
//       return {
//         counter: state.counter,
//         todos: [
//           ...state.todos.filter((value) => {
//             if (value.id !== action.payload.id) return value;
//           }),
//         ],
//       };
//     case DONE_TODO:
//       console.log(action.payload);
//       return {
//         counter: state.counter,
//         todos: [
//           ...state.todos.map((value) => {
//             if (value.id === action.payload.id) {
//               return { ...value, isDone: !value.isDone };
//             } else {
//               return value;
//             }
//           }),
//         ],
//       };

//     default:
//       return state;
//   }
// };




const counterSlice = createSlice({
  //key value객체 인자로
  name: "todos",
  initialState,
  reducers: {
    //보면 toolkit은 initailState에 직접 접근
    // 불변성을 신경쓰지 않아도됨 :  immer라는 애가 관리해줌
//===============================> 위의 로직 복붙
    addTodo: (state, action) => {
      return { 
          //여기에 기본 로직
        counter: state.counter + 1,
        todos: [...state.todos, { ...action.payload, id: state.counter }],
      };
    },
    deleteTodo: (state, action) => {
      return {
        counter: state.counter,
        todos: [
          ...state.todos.filter((value) => {
            if (value.id !== action.payload.id) return value;
          }),
        ],
      };
    },
    doneTodo: (state, action) => {
      return {
        counter: state.counter,
        todos: [
          ...state.todos.map((value) => {
            if (value.id === action.payload.id) {
              return { ...value, isDone: !value.isDone };
            } else {
              return value;
            }
          }),
        ],
      };
    },
  },
});

//만든 리듀서를 이렇게 내보내고
export default counterSlice.reducer;
//action도 만들어 구조분해할당으로 내보냄
//이 actions는 아래 addTodo, deleteTodo, doneTOdo 가 가진 객체를 가지고있음
//즉 action은 리듀서들을 의미
export const { addTodo, deleteTodo, doneTodo } = counterSlice.actions;

```

## 결론적으로,

redux toolkit의 특징 및 기본 redux와의 차이점

1. store내 API를 한개만 이용
2. reducer의 축소
   : 초기 state와 action값 export만으로 상태관리가능
3. Slice문법의 리듀서값은 불변성을 신경쓰지 않아도 됨





## Devtools



 
