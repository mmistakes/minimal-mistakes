---
layout: single
title: "Component & Props"
categories: React
tag: [TIL, React]
---

### 01. Component란?

컴포넌트란 **재사용 가능한 UI 단위이다.**

예를들면 한 컴포넌트에 리뷰전용 input 태그를 만들고 스타일을 적용했을 때 리뷰 input 태그를 넣어야 하는 모든 페이지에 일일히 input 태그를 만들고 스타일을 생성하지 않고 리뷰전용 input 태그를 만들었던 컴포너트를 사용하면 된다.

---

### 02. Component 만들기

#### 02-1 함수로 컴포넌트 만들기

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### 02-2 클래스로 컴포넌트 만들기

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

위에 두 방법은 모두 Hello name을 출력하기 위한 컴포넌트지만 사용하는 방법에 따라 사용되는 방식이 조금씩 다르다.

클래스로 컴포넌트를 만들면 **렌더링 순서를 세밀하게 분할하여 렌더**할 수 있고 함수로 만든 컴포넌트는 **빠르고 간단하게 컴포넌트를 생성**할 수 있다는 각각의 장담점이 존재한다.

함수로된 컴포넌트가 나중에 등장했고 현재는 함수로된 컴포넌트를 많이 사용한다.

---

### 03. Component 사용

```jsx
// 1. Welcome 컴포넌트 정의
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 2. App 컴포넌트 정의
function App() {
  return (
    <div>
      <Welcome name="wecoder" />
      <Welcome name="John" />
      <Welcome name="Sara" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

매인 컴포넌트인 App 함수 컴포넌트의 return 부분이 렌더링 되고 리턴 내부에 Welcome 컴포넌트를 3번 선언했다.

Welcome 함수 컴포넌트는 다른 props의 name값을 3번 받게 되고 각각 다른 이름으로 화면에 3번 출력하게 된다.
