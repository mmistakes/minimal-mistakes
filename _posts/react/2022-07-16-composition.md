---
layout: single
title: "Composition (Children prop)"
categories: "React"
tag: [Children, 재사용컴포넌트]
toc: true
toc_sticky: true
toc_label: "목차"
author_profile: false
sidebar:
  nav: "docs"
date: 2022-07-16
last_modified_at: 2022-07-16



---



## Why Compostion ?

뷰에서는 slot이 있다면 react에서는 children이 있다. 이를 왜 사용하는지 간단한 예제로 사용전 / 후로 비교하면서 설명하겠다.

### Children 사용전 Module

[![component2](https://imchanyo.netlify.app/static/28a8570f45ca5a61d40b1f3e5eec0ba0/fe486/component2.png)](https://imchanyo.netlify.app/static/28a8570f45ca5a61d40b1f3e5eec0ba0/445c6/component2.png)

위의 컴포넌트를 구성하는 코드예제를 보게될것이다. 간단한 구성을 설명하자면, ->순으로 부모 -> 자식순이다.

App.js -> Expense.js -> ExpenseItem.js -> ExpenseDate.js

```jsx
// App.js

import Expense from "./components/Expense";

function App() {
  const expense = [
    {
      id: "e1",
      title: "Toliet Paper",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 5, 28),
    },
  ];
  return (
    <div className="App">
      <h2>Let's get started!</h2>
      <Expense items={expense} />
    </div>
  );
}

export default App;
```

App.js 부모안에 props로 item을 넘겨준다.

```jsx
// ExpenseItem.js

import ExpenseItem from "./ExpenseItem";
import "./Expense.css";

function Expense(props) {
  return (
    <div className="expenses">
      <ExpenseItem
        title={props.items[0].title}
        amount={props.items[0].amount}
        date={props.items[0].date}
      />
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      />
    </div>
  );
}

export default Expense;
```

Expense 안에서 받은 props를 ExpenseItem컴포넌트로 다시 props로 전달한다. 이때 전달할때는 전처럼 한번의 props로 넘기는게 아니라 각 속성에 맞는 값들을 할당해준다.

```jsx
// ExpenseItem.js

import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  return (
    <div className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </div>
  );
}
export default ExpenseItem;
```

ExpenseItem에서 title과 amount값을 맵핑해주고 다시 ExpenseDate로 date값을 props로 넘겨준다.

### Why Sperate ?

우리는 왜이렇게 계속 작은단위까지 컴포넌트로 분리하는 것일까? 사실 App.js에서 모든것을 처리할 수있다. 앞서 1장에서 말한것처럼 작은단위까지 컴포넌트화 시키면 그만큼 유지보수하기 간편해진다. 모든 데이터를 한번에 처리하는 것보다 각컴포넌트에 맞는 데이터를 할당해주면 다른 개발자가 보더라도 가독성이 높아지고, 작은 컴포넌트에 집중할 수 있게된다.

예를들어, ExpenseDate.js는 비용부분에서도 날짜를 담당하는 컴포넌트이다. 우리는 여기서 에러가 발생했을때 날짜 부분에 문제가있는 것을 금방 알 수있고, html구조도 보다 더 간단하여 보완하기 수월하다.

이런 식으로 작은 빌딩 블록을 모아서 사용자 인터페이스를 만드는 걸 **컴포지션**이라고 합니다.

```jsx
// ExpenseDate.js

import "./ExpenseDate.css";

function ExpenseDate(props) {
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const year = props.date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
```

### 중복사용되는 HTML, CSS

바로 HTML 구조와 CSS속성이다. 이렇게 작은 컴포넌트단위로 분리해서 모듈화하여도 중복이 발생한다.

[![component2](https://imchanyo.netlify.app/static/28a8570f45ca5a61d40b1f3e5eec0ba0/fe486/component2.png)](https://imchanyo.netlify.app/static/28a8570f45ca5a61d40b1f3e5eec0ba0/445c6/component2.png)

위의 그림을 보면 박스들이 여러개있다. 전체를 감싸고있는 큰박스, 그리고 그안에 박스, 또 그안의 박스들

그리고 HTML을 살펴보면

태그의 클래스를 부여하여 style을 중복적용하고있다.

실제로 아래코드를 보면 box-shadow / border-radius가 중복 사용되고 있는 것을 볼 수 있다.

```jsx
// ExpenseItem.css

.expense-item {
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
padding: 0.5rem;
margin: 1rem 0;
border-radius: 12px;
background-color: #4b4b4b;
}
// Expense.css
.expenses {
    padding: 1rem;
    background-color: rgb(31, 31, 31);
    margin: 2rem auto;
    width: 50rem;
    max-width: 95%;
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
```

### Children 사용후 Module

<img src="https://imchanyo.netlify.app/static/2edd7ecc7f2cb321b26ef3cbc516d0a6/fe486/com4.png" width="400"/>

우린 이제 children을 사용하여 중복된 스타일링과 HTML을 공통으로 사용할 수 있는 컴포넌트를 만들것이다. 위의 모듈을 보면 UI만 담당하는 Card / 그리고 비용의 기능을 담당하는 componenets로 분리하여 모듈화하였다. 이렇게하면 실제 공통 스타일링이 되어있을때 Card하나로 해결이 가능해진다.

```jsx
// Card.js

import './Card.css';

const Card = props => {
  const classes = `card ${props.className}`;
  console.log(4, props.className, classes);
  return <div className={classes}>{props.children}</div>;
};

export default Card;
.card {
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);

}
```

이렇게 설정한다음 ExpenseItem.css / Expense.css에 있는 border-radius / box-shaodw속성을 소거한다.

그리고 Card에 props로 넘겨줘야하기때문에 공통설정을 해준다.

```jsx
// ExpenseItem.js

const ExpenseItem = props => {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
    </Card>
  );
};
export default ExpenseItem;
// Expense.js

const Expense = props => {
  return (
    <Card className="expenses">
      <ExpenseItem
        title={props.items[0].title}
        amount={props.items[0].amount}
        date={props.items[0].date}
      />
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      />
    </Card>
  );
};

export default Expense;
```

[![com5](https://imchanyo.netlify.app/static/2d41a354beb37f5b742eb0822dbed10a/fe486/com5.png)](https://imchanyo.netlify.app/static/2d41a354beb37f5b742eb0822dbed10a/3d705/com5.png)

이렇게 Card안에 컴포넌트럴 할당하면 위의 값들이 props로 넘어온다. 자세히 살펴보면 className이 expenses의 children안에 4개의 배열이 할당되었다. 이는 expenses안에 있는 ExpenseItem의 컴포넌트 4개이다. 위의 코드에서는 2개의 ExpenseItem밖에 없지만 실제 코드에선 4개로 적용했다.

똑같이 className이 expense-item도 넘어오고있다. 우리는 이를통해 Card.js에서 코드를 작성할 수있다. 즉 상수 classes안에 `card ${props.className}` 할당하면 className에 따라 동적으로 컨트롤 할 수있다. 그렇게 되면 card를 공통으로 사용하면서 각컴포넌트의 클래스를 받아 개별로 사용할 수있다. 즉, 공통 + 개별스타일링이 가능해진다.

스타일링만 가능한게 아니다. 위의 Card.js에서는 간단한 jsx였지만 더 복잡한 모달창같은 컴포넌트를 사용할때도 코드복제를 줄일 수 있다.
