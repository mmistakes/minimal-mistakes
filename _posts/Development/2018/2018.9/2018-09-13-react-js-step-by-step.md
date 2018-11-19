---
title: Front 개발
key: 20180913
tags: react django
---

끝장을 낸다.

<!--more-->

# React 프로젝트 생성

## Front-End Package 구성

- Material UI
 - `yarn add @material-ui/core`
 - see following link
   - https://material-ui.com/getting-started/installation/
 - prebuilt SVG Material icons
   - `yarn add @material-ui/icons`
 - Roboto Font
   - material-ui was designed with the Roboto font in mind.
   - `yarn add typeface-roboto`
- asdf


## React 시작하기

1) react 프로젝트를 생성한다.

```
create-react-app kago-front-basic-setup
yarn start
```

## React 구조잡기

### re-duck

- re-duck 발의자의 샘플 프로젝트
 - https://github.com/FortechRomania/react-redux-complete-example

### duck

- duck
 - see following link
   - https://github.com/erikras/ducks-modular-redux

### feature-first

### function-first


### GOOD MATERIALS

- 이 정도면 바이블?
  - http://slides.com/jenyaterpil/redux-from-twitter-hype-to-production#/42


### redux 개념 정리

- 동기 (motivation)
 - https://redux.js.org/introduction/motivation
 - 코드는 더많은 상태를 관리해야 한다.
   - 상태는 ``서버 응답``, `캐시 데이터`, `로컬 생성 데이터`, `UI 상태` 가 있다.
 - Front-end 제품에 새로운 요구사항 대두
   - 하나의 상태 변화로 인해 일어나는 연쇄적인 변화를 관리하기 어렵다.
   - optimistic updates, server-side rendering, fetching data, route transition
 - mutation 과 asynchronicity (멘토스와 콜라)
   - 복잡성 (정확히 이해는 되지 않는다.)
   - 단, redux 는 데이터의 상태를 관리한다.
 - 상태 변화(mutations)를 예측 가능하게 만든다.
   - 이를 위해 세가지 원칙(Three Principles) 가 등장 한다.

- 핵심 개념 (core concept)
 - https://redux.js.org/introduction/coreconcepts
 - action 을 디스패칭한다.
   - **일종의 이벤트이다. 이벤트의 이름과 파라미터가 포함되는 오브젝트이다.**
   - action 과 state 를 묶어 내기 위해서 reducer 라고 불리는 함수를 작성한다.
     - 단순히 reducer 함수는 action 과 state 를 파라미터로 받으며 앱의 다음 상태를 반환한다.

- 세 원칙 (Three Principles)
 - 전체 어플리케이션의 상태는 단일 store 에서 하나의 객체 트리에 저장된다.
   - The state of your whole application is stored in an object tree within a single store.
 - 상태는 읽기 전용 (State is read-only)
   - 상태를 변경하는 유일한 방법은 action 을 emit 하는 것이다.
 - 변경은 순수 함수를 통해 이루어진다.
   - 상태 트리가 action 에 의해서 어떻게 변하는지 지정하려면 pure reducer 를 작성하라.
 -

*모델(model) 예*
```
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```

*Action 예*
```
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

*reducer 의 작업을 돕는 helper 함수*
```
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index) =>
          action.index === index
            ? { text: todo.text, completed: !todo.completed }
            : todo
      )
    default:
      return state
  }
}
```

*reducer 함수 todos 와 visibilityFilter 함수를 당겨씀*
```
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```



#### 용어 정리

route transition

mutation
change 정도로 이해하면 될 듯
ex. Redux attempts to make state mutations predictable

---

If you like the essay, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
