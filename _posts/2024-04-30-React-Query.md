---
layout: single
title: "React Query란"
published: true
---

# React Query란

프론트 개발을 하며 API 호출 이후에 데이터를 효과적으로 관리하기 위한 방법을 찾던 중, React Query를 찾았다.
이에 대해 몇 번 스쳐들었을 뿐이기에 이번 포스트를 통해 정확히 어떤 개념인지 알아보자.

<!-- 이미지 -->
![ReactQuery](../assets/img/ReactQuery.png)

[공식문서](https://tanstack.com/query/v5/docs/framework/react/overview)에선 React Query를 다음과 같이 설명하고 있다.

> React Query는 fetching, caching, 서버 데이터와의 동기화를 지원하는 라이브러리

즉, React 환경에서 서버와 지속적으로 동기화 하도록 지원한다.

비동기 데이터를 불러오는 과정에서 발생하는 문제를 해결하는 건데, 어떤 문제들을 어떻게 해결하는지 확인해보자.

# 1. 캐싱

React Query는 여러가지 장점이 있는데, 먼저 캐싱을 알아보자.

> 캐싱이란, 이전에 사용한 데이터를 임시로 저장하고 동일한 데이터에 대한 접근 속도를 높이는 것

캐싱을 통하여 동일한 데이터에 대한 비동기 호출을 방지하며, 서버에 대한 부담감을 덜어줄 수 있다.

하지만 아래의 의문점을 가질 수 있는데,

👤 **현재 데이터가 최신인지 어떻게 구분할 수 있는지지?**

만약 캐싱된 데이터를 사용하고 있던 중, 서버 상의 데이터가 변경되었다면 사용자는 잘못된 정보를 제공받게 된다.

장점이 단점으로 전환되는 상황을 방지하기 위해서는 적절한 시기에 데이터를 갱신하는 것이 중요하다.

## a. 데이터 갱신

> fresh: (신선한) 캐싱한 데이터를 사용 <br />
> stale: (신선하지 않은) fetching이 필요한 상태

기본적으로 React Query는 캐시된 데이터를 stale로 간주한다.

즉, 최신화가 필요한 데이터라는 의미이며 아래와 같은 시점에 데이터를 갱신한다.

* 화면을 이탈했다가 다시 포커스를 가졌을 때
* 새로운 Query 인스턴스가 마운트 될 때
* 네트워크 재연결이 발생했을 때

예를 들어 정보 변경이 잦지 않은 **유저 정보**에 대해 캐싱한다고 치자.

현재 서버 부담은 크고, 호출하는 API가 많다.

심지어 유저 페이지에 진입할 때마다 get 요청을 보내 불필요한 API 호출이 생기게 된다.

이러한 상태 값을 캐싱하기 위해선 staleTime과 cacheTime을 알아야 하는데,

## b. staleTime? cacheTime?

> * staleTime은 데이터가 fresh에서 stale 상태로 변경되는 데 걸리는 시간 <br />
> * cacheTime은 데이터가 inactive한 상태일 때 캐싱된 상태로 남아있는 시간
> * inactive란 해당 쿼리가 현재 활성화 되지 않은 상태. <br /> 사용자가 화면에 포커스를 두지 않을 때 inactive 라고 한다. 쿼리가 캐시에 남아있지만, 자동으로 재요청하지 않는다.

staleTime에 의해 데이터가 fresh 상태인 경우엔, 위의 데이터 갱신 (refetch) 트리거가 발생해도 재요청을 하지 않는다.
cacheTime이 지난 이후 캐싱되었던 데이터는 가비지 콜렉터로 수집되어 메모리에서 해제된다.

결국 staleTime과 cacheTime이 뭐가 다른지 궁금할 수 있는데, 

만약 staleTime이 지나 데이터가 stale 상태가 되었지만, cacheTime은 지나지 않은 상태에서 <br />
해당 데이터를 사용하는 화면에 다시 포커스가 잡힌 경우에 (mount) 

**새로운 데이터를**  fetch 하는 동안 임시로 캐싱된 데이터를 보여준다.

이외에 사용자가 원하는 시점마다 직접 refetching을 하도록 설정할 수도 있다.

# 2. 간단한 비동기 데이터 관리

React Query는 API 호출과 비동기 데이터 관리를 간편하게 처리할 수 있도록 도와준다. <br />

React 개발 초창기 (2015-2018), Redux와 같은 라이브러리를 사용하여 이러한 작업을 처리했다. Redux는 Flux 패턴을 활용하여 상태를 관리하며, redux-thunk, redux-saga 등의 미들웨어를 사용하여 비동기 작업을 처리했다.

그러나 Redux를 사용하며 겪은 단점이 존재했는데, **장황한 Boilerplate 코드**이다.

아래는 간단한 Todo 샘플 코드이다.

```javascript
// src/store.js
import { createStore } from 'redux';

// 초기 상태
const initialState = {
  todos: []
};

// 액션 타입
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

// 액션 생성자
export const addTodo = text => ({
  type: ADD_TODO,
  payload: { text }
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  payload: { id }
});

// 리듀서 함수
function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload.text }]
      };
    case REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
}

// Redux 스토어 생성
const store = createStore(reducer);

export default store;

```

```javascript
// src/App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from './store';

function App() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleRemoveTodo = id => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```

위 코드는 최소한의 기능을 구현했을 뿐, 만약 하나의 API를 처리하기 위해 위해 여러 개의 액션과 리듀서를 사용하게 된다면 복잡도가 높아진다.

이는 앞서 설명했듯, Redux가 API 통신 및 비동기 상태 관리 라이브러리가 아니기 때문이다.

비동기 상태 관리를 위한 redux-thunk, redux-saga 등 프로젝트에 참여하는 개발자 성향에 맞춰야 하며, <br />
러닝 커브 이슈로 생산성이 낮아지는 경우도 있다.

이러한 이슈를 해결하기 위해 redux-toolkit가 등장하였음에도 불구하고, 여전히 Boilerplate의 복잡도는 높았다.

위와 같은 상황을 해결하기 위해 React Query를 도입하면 이러한 복잡성을 줄일 수 있다.

## a. Query와 Mutation

React Query에서 비동기 데이터 요청을 Query와 Mutation이라는 2가지 유형으로 나누어 생각한다.

제공되는 useQuery훅을 통해 수행되는 Query 요청은 GET Method로, 서버에 저장된 상태를 불러올 때 사용한다.

```javascript
// React Query useQuery 기본 사용 예시
const { data } = useQuery(
  queryKey, // Required
  fetchFn, // The function that the query will use to request data.
  options
)
```

> 이 외에 단 건 요청인 useQuery와 다르게 병렬로 요청하는 useQueries, 무한 스크롤 구현에 용이한 useInfiniteQuery 훅도 제공된다.

useQuery 훅은 요청마다 고유값 Unique Key (Query Key)를 필요로 한다. 해당 Unique Key로 서버 상태를 로컬에 캐시하고 관리한다. (재호출 등)

아래는 유저 정보를 가져오는 샘플 코드이다.

```javascript

const User = () => {
  const { isLoading, error, data } = useQuery(
    'userInfo', // Key, 다른 컴포넌트에서 해당 키를 사용한 hook이 있으면, 캐시된 데이터를 우선 사용함
    () => axios.get('/user').then(({ data }) => data)
  );

  if (isLoading) return <div> 로딩중 </div>
  if (error) return <div> 에러 {error.message} </div>
  if (!data) return <div> 데이터가 존재하지 않음 </div>

  return (
    <div>
      {data.name}
    </div>
  )
}

```
useMutation을 통해 수행되는 Query 요청은 POST, PUT, DELETE Method로, Side Effect를 발생시켜 서버의 상태를 변경시킬 때 사용한다.

> Side Effect: 결과를 예측할 수 없는 것. 외부의 상태를 변경

```javascript
// React Query useMutation 기본 사용 예시
const { mutate } = useMutation(
  mutationFn, // Required
  options
)
```

Side Effect를 발생시킨 후, 요청의 성공 여부에 따라 수행할 함수를 지정할 수 있다.

> onSuccess: 쿼리 요청 성공시 실행되는 함수
> onError:   쿼리 요청 실패시 실행되는 함수
> onSettled: 성공/실패 관계 없이 쿼리 요청시 실행되는 함수
