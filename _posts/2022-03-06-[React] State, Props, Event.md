---
layout: single
title: "State, Props, Event"
categories: React
tag: [TIL, React, Javascript]
---

### 01. Hooks?

Hook은 함수 컴포넌트에서 **state**와 **lifecycle features** (생명주기 기능)를 연동 할 수 있게 해주는 함수이다.

컴포넌트 사이에서 상태관련 로직 재사용에 용이하고, 함수마다 분리하여 실행을 할 수 있는 장점이 있다.

#### 01-1. Hook 사용규칙

1. 최상위에서만 훅을 호출해야 한다. 그리고 반복문, 조건문, 중첩된 함수 내에서 실행하지 않는다.
2. 리액트 함수 컴포넌트 내에서만 훅을 호출 해야한다. 자바스크립트 함수에서는 훅을 호출하면 안된다.

---

### 02. State & Event

state란 상태이다. 뜻 그대로 컴포넌트 내부에 가지고 있는 컴포넌트의 상태값이다. **state 는 컴포넌트 내에서 정의하고 사용하며 데이터가 변경될 수 있다.**

#### 02-1 state 사용

```jsx
import React, { useState } from "react";

function State() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>Function Component | {color}</h1>
    </div>
  );
}

export default State;
```

함수 컴포넌트 state를 선언하고 useState 훅을 사용하여 color라는 변수를 리턴 내부 컴포넌트에 추가했다.

#### 02-2 event & state 변경

```jsx
import React, { useState } from "react";

function State() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1 onClick={() => setColor("blue")}>Function Component | {color}</h1>
    </div>
  );
}

export default State;
```

h1태그 클릭 시 변수 color의 값을 blue로 변경된다. 변경 방식은 useState 훅의 두번째 인자인 setColor함수를 사용하여 변경한다.

---

### 03. Props & Event

props는 속성이다. 단어 뜻대로 컴포넌트의 속성값이다.

**부모 컴포넌트로부터 전달 받은 데이터를 지니는 객체이다.**

props는 어떤 값이든 자식 컴포넌트로 전달할 수 있다. (변수, state, event handler 등)

#### 03-1. props 사용

```jsx
import React, { useState } from "react";
import Child from "../pages/Child/Child";

function Parent() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>Parent Component</h1>
      <Child color={color} />
    </div>
  );
}

export default Parent;
```

Child 컴포넌트를 import하고 Parent 함수컴포넌트 하위 컴포넌트로 넣었다. 그리고 하위 컴포넌트 Child 컴포넌트에 props로 변수명 color에 state color 값을 넣었다.

```jsx
import React from "react";

function Child(props) {
  // console.log(props);
  // props.titleColor
  // props.contentColor

  return (
    <div>
      <h1 style={{ color: props.titleColor }}>Child Component</h1>
    </div>
  );
}

export default Child;
```

Child 컴포넌트에 props로 받아서 h1태그에 사용했다. **props** 는 값을 변경할 수 없다.

### 03-2 props & event

```jsx
import React, { useState } from 'react';
import Child from '../pages/Child/Child';

function Parent() {
  const [color, setColor] = useState('red');

  return (
    <div>
      <h1>Parent Component</h1>
			<Child titleColor={color} changeColor={() => setColor('blue')} />
    </div>
  );

export default Parent;
```

Parent 컴포넌트의 하위 컴포넌트인 child 컴포넌트에 props로 changeColor라는 변수가 useState훅인 setColor("blue"). (color 값을 blue로 변경하는 함수) 를 넣어줬다.

```jsx
import React from "react";

function Child(props) {
  return (
    <div>
      <h1 style={{ color: props.titleColor }}>Child Component</h1>
      <button onClick={props.changeColor}>Click</button>
    </div>
  );
}

export default Child;
```

child 컴포넌트는 props로 event속성인 changeColor를 받고 button 클릭 시 changecolor 함수를 실행하여 부모 컴포넌트의 color값이 변경된다.
