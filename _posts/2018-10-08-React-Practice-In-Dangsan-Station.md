---
title: React Practice In Dangsan Station
key: 20181008
tags: reactjs nodejs practice
excerpt: "당산역에서 React 연습"
---

- Summaries

React 를 연습한다. 이전 까지는 Redux 를 열심히 연습하였다. 그런데, Component 의 라이플싸이클 개념이 필요해지면서 주요 개념을 보강한 뒤에 Redux Board 앱을 수정하려고 한다.

중요한 것은 이 기술이 도대체 왜 필요하냐이다. 보안에 도움이되는가? 사실 그런것도 아니다. 그렇기 보다는 새로운 기술을 받아들이고 내 분야에 잘적용하는 것이 목적이 아닌가 싶다.

또한, Django Restframework 와 잘 섞어 두면 편리하게 사용할 수 있을 것 같은 예감이든다. 이는 추후에 Docker Django 시리즈에서 다룬다. 지금은 산발적으로 보이지만 점점 강줄기가 합쳐지고 있다.

- Objectives

React 주요 개념을 문서화 하여 정리하고 각 개념을 증명하는 PoC 코드를 작성한다.

<!-- more -->

목차

0. 시작하기 전에 ...
1. React 주요 개념 정리
2. 단어 뜻 정리


# 시작하기 전에 ...

## React 를 간편하게 테스트하기

React 를 간편하게 테스트하기 위해 "Add React in One Minute" 절을 참조할 필요가 있다. 일단 우리는 git 에 코드를 싣는 것이 목적이며 개념 증명을 위한 코드를 사용할 것이므로 webpack 을 따로 구성하지 않고 진행할 것이므로 이는 필요가 없다. 그러나 정말 간단한 테스트를 목적으로 한다면 부담없이 하기에 좋으므로 추후에 참조가 필요할 것이다.

### 참조

- [Add React in One Minute][2]


# React 주요 개념 정리

## JSX 이란?

아래의 선언이 곧 JSX 이다. 태그 문자를 javascript 코드상에서 사용할 수 있음이다.

```
const element = <h1>Hello, world!</h1>;
```

React는 렌더링 로직은 고유하게(본래) 다른 UI 로직과 결합되어 있다는 사실을 받아들였다.

- 이벤트를 처리하는 방법 (how events are handled)
- 시간의 흐름에 따라 상태(state)의 변경 방법 (how the state changes over time)
- 데이터가 전시(display)를 위해 준비되는 방법 (how the data is prepared for display)

그 결과 마크업(markup) 언어와 로직(logic) 을 별도의 파일로 분리시키는 대신에 component 라는 단위(unit)를 사용하여 concern들을 분리 시켰다(SoC).

> Separation of Concern (SoC) 에 대한 내용은 https://en.wikipedia.org/wiki/Separation_of_concerns 위키에서 자세히 살필 수 있다. 여기에서는 생략하고 추후에 정확한 개념을 다루어 보겠다.

React 를 할 때 JSX 가 필수는 아니다. 그러나 편리하다. 자세한 내용은 react 홈페이지의 code snippet 으로 충분하니 여기에서는 꼭 기억해야 할 간단한 룰을 정리한다.

### Jsx Attribute(속성) 작성하기

jsx 의 attribute 에 string literal 을 지정할 때의 문법 샘플

- quotes (쌍따움표) 를 사용한다.

*tabIndex 속성(attribute)에 집중하라.*

```
const element = <div tabIndex="0"></div>;
```

대괄호({}, curly braces) 기호를 사용해서 Javascript 표현식을 속성(attribute)에 사용할 수 있다.

- 대괄호(curly braces) 주변에 쌍따옴표(quotes)를 놓지 않는다.

```
const element = <img src={user.avatarUrl}></img>;
```


### JSX Prevents Injection Attk

아래의 내용을 요약하자면 기본적으로 XSS 과 같은 인젝션 계열 공격을 방어한다는 점이다. 원리는 딱히 알 필요없다.

> By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

### Babel 과 Jsx

아래의 JSX 문법을 Babel 은 변환한다. 이때, React.createElement()를 호출한다.

Before Transforming JSX using Babel
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

After Transforming JSX using Babel
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

## Rendering element

React 가 엘리먼트를 렌더링하는 원리를 간단히 다룬다. 알아두면 좋을 것으로 생각된다. 핵심만 기억하고 나머지는 버린다.

### React elements are immutable

immutable 에 놀라지 말자. 그저 이러이러한 성격을 용어화 한 것이다. 기억하기 싫은 용어는 풀어서 사용하면된다.

- 한 번 생성하면 변경되지 않는다.
- 영화의 한 프레임과 유사하다. 특정 시간에 UI 를 보여준다.
  - 갱신은 다른 시점에(?)

> Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

이 장에서는 setInterval 이라는 Javascript API 를 사용하여 UI 를 1초(1000ms) 간격으로 갱신시키는데 딱히 흥미롭지 않다.


## Component 와 Prop

위에서 Component 를 단위로 하여 concern 을 분리 시켰다고 한다.

Component 는 개념적으로 자바스크립트 함수이다. 임의의 입력값(props 라고 부름)을 받고 React Element 를 반환한다. 즉, 어떻게 보여줄지를 반환해야만(should) 하는 함수이다.

두 가지 형태가 존재한다.

- 함수형 컴포넌트(function Component)
- 클래스 컴포넌트(class Component)


함수형 컴포넌트 (적당히 인자를 받고 엘리먼트를 출력한다.)
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

클래스 컴포넌트 (es6의 클래스를 사용한다.)
*사실 이 문서의 목적이기도 한 내용이다.*
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 중요 체크
 - **[!] Component 의 이름은 대문자로 항상 시작할 것**
 - **props 는 모두 Read-Only 이다!**
   - pure 함수 개념이 적용된다.

### Pure 함수

별건 없고 동일한 입력 값에 대한 동일한 결과를 리턴하는 함수이며 입력 값에 대한 변경을 하지 않는 함수이다. *이는 데이터 흐름 관리를 편하게 하기 위한 수단이다.* (적어도 지금의 나는 이정도의 의미로만 해석한다.)

## 상태와 라이프사이클(State and Lifecycle)

이전의 타이머 샘플에서는 `setInterval` 함수를 이용해서 `ReactDOM` 의 `render` 함수를 `1초(1000ms)` 마다 호출하였다.

그러나 가장 이상적인 형태의 코드는 render 함수를 반복적으로 호출하는 것이 아닌 아래와 같은 형태의 코드일 것이다. 전체 페이지를 1초 마다 렌더링하는 것은 매우 비효율적이다. 그렇다면 왜 React 를 쓰겠는가?

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

위와 같이 앱을 만들기 위해서는 어떻게 해야하는지 알아보자.

- `state` 개념을 Clock Component 에 추가 해야한다.
  - 아래의 `State 란?` 을 참조해본다.

개선 코드 (es6 class, constructor)
*공간 낭비를 최소화 하기 위해 생략을 ... 으료 표기*
```
... Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
        ....
      );
  }
}
```

### Lifecycle 등판

많은 컴포넌트를 다루는 어플리케이션의 경우 컴포넌트의 리소스를 반환하는 관리가 필요하다.

즉, 컴포넌트가 생성 될 떄 타이머를 설정하고 컴포넌트가 제거 될 때 타이머를 해제해야 한다.

- timer 설정이 필요하다.
- timer 종료가 필요하다.

필요한 개념:
*아래는 특수 함수로서 constructor 와 같이 예약된 함수이다.*
- componentDidMount()
  - 컴포넌트가 마운트 되었을 때 호출
- componentWillUnmount()
  - 컴포넌트가 마운트 해제 되었을 때 호출

```
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}

componentWillUnmount() {
  clearInterval(this.timerID);
}

tick() {
  this.setState({
    date: new Date()
  });
}
```

여기서 문법 한가지 인라인 함수(inline function) 정의
*setInterval 함수의 첫 번째 인자는 함수이다.*
```
() => this.tick()
```

### 중요 체크

- **setState가 호출되면 UI 가 업데이트 된다.**

- **절대 아래와 같은 코드를 작성하지 말라**

```
this.state.comment = 'hello'; // Wrong
```

- **아래와 같이 작성하라.**
```
this.setState({comment: 'Hello'}); // Correct
```

- **비동기적인 State 갱신(Update)에 대비하라**

setState 의 두번째 형태(a second form)을 사용하여 비동기적인 상태 업데이트에 대비할 수 있다. 그 결과 개발자가 의도한 대로 동작할 것이다.

아래는 React 의 setState 의 내부 동작이다. 내부 동작은 가려져 있어 종종 이를 사용하는 개발자가 그 결과를 예측하지 못하는 경우가 있으므로 이와 같은 팁은 매우 중요하다고 할 수 있다.

> React May batch multiple setState() calls into a single update for performance.

결론적으로 아래와 같은 코딩을 하라.

```
// wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

```
// arrow function, correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

// regular function, Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### 부분적인 state 변경

한줄 요약: 관심있는 상태만 변경하여도 된다.

아래의 코드에서 맨 마지막 comments 의 상태를 변경하는 구문은 posts 를 전혀 건드리지 않고 this.state.comments 를 완전히 교체한다.

```
this.state = {
  posts: [],
  comments: []
};

componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });  // leaves this.state.posts intact, but completely replaces this.state.comments.
  }
```

### 음 너무 빠른데... 속도 조절점 님아...

너무 빨리 해집는 느낌인데... 정리는 제대로 되긴하지만.. 좀 천천히 하자. 머리 아프다.

### Data Flows Down 개념

한 문장 요약: 상태(state) 를 폭포수 처럼 아래로 내려보낼 수 있다.

그리고 이를 top-down 혹은 unidirectional 데이터 흐름이라고 부른다.


### State 란?

State 는 Props 와 유사하지만, 전적으로 private 이고 component 에 의해서만 통제된다. 이는 클래스 컴포넌트에만 적용되는 개념이다.

## 이벤트 처리 (Handling Events)

### 이벤트 명명 규칙 (Naming Convention)

- 이벤트는 camelCase 로 이름지어져야 한다.
- JSX 에서 함수를 이벤트 핸들러로 전달한다. 문자열로 전달하지 않는다.

일반 HTML 코드
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React 코드
*여기서도 curly braces 가 사용되었다.*
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### preventDefault 사용하기

일반 HTML 에서 default 링크 동작인 `새로운 페이지 열기` 를 방지하기 위해서 false 를 리턴해야 하나, React 에서는 preventDefault 를 명시적으로 호출한다.

일반 HTML 에서 새로운 페이지 열기 방지 코드 (return false)
```
<!-- return false 를 명시적으로 지정함으로써 새로운 페이지가 열리는 것을 방지할 수 있다.-->
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

React 에서 새로운 페이지 열기 방지 코드 (preventDefault)
```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
### 이벤트 핸들러 코드 사용 패턴

클래스형 컴포넌트에 사용되는 이벤트 핸들러(`event handler`) 의 코드 패턴은 아래와 같다. 요약해 본다.

1. constructor 에서 this binding 을 행한다.
2. 이벤트 핸들러를 함수의 메서드 형태로 정의한다.
3. JSX 에서 curly braces 를 사용해서 이벤트를 정의한다.

```
constructor(props) {
  super(props);
  this.state = {isToggleOn: true};

  // This binding is necessary to make `this` work in the callback
  this.handleClick = this.handleClick.bind(this);
}

handleClick() {
  this.setState(state => ({
    isToggleOn: !state.isToggleOn
  }));
}

render() {
  return (
    <button onClick={this.handleClick}>
      {this.state.isToggleOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

위와 같은 코딩을 하는 이유는 다음의 이유에서 이다. 중요할지도 모르니 나중에 참조하라.

1. Javascript 에서 클래스의 메서드는 기본적으로 바인딩 되지 않는다. 따라서 binding 절차 없이 this.handleClick 과 같은 호출을 하는 경우 undefined 를 호출하는 것과 같은 결과를 낼 것이다.

#### 바인딩 절차를 피하는 법(?)

본인은 바인딩을 해주는 게 좋지 않은가 하고 생각한다. 그러나 다른 방법이 있음을 굳이 알려주기에 기록만한다.

**공식 문서 권고 사항** : 쓰지마라.

유형 1. 일반 메서드 처럼 정의 후 arrow function 사용

JSX 에서 arrow function 문법을 사용하면 this 가 handleClick 에 바인딩 되어 잇음을 확신할 수 있다더라....
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

유형 2. 실힘적인 문법을 사용하기 (피하자 무조건)

```
// This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
```

### 인자를 Event Handler 에 전달하기

아래의 두 표현은 동일하다.
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 조건부 렌더링(Conditional Rendering)

한줄 요약: 변수에 Element 를 저장하고 분기 로직을 이용해 조건부 컴포넌트 렌더링이 가능하다.

```
render() {
   const isLoggedIn = this.state.isLoggedIn;
   let button;

   if (isLoggedIn) {
     button = <LogoutButton onClick={this.handleLogoutClick} />;
   } else {
     button = <LoginButton onClick={this.handleLoginClick} />
   }

   return (
     <div>
       <Greeting isLoggedIn={isLoggedIn} />
       {button}
     </div>
   );
 }
```

### Inline 유형 정리

인라인으로 조건절을 작성하는 여러 방법이 있다. 정리한다.

#### 유형 1. && 연산자를 이용한 Inline If 구현

특징 요약: Curly Braces 로 감싸야 하며 앞절에는 출력할 조건을 달고 && 이후에는 렌더링할 Element 혹은 Component 를 기술한다.

코드 해석 : unreadMessages.length 가 0 보다 클 경우에만 <h2> 엘리먼트를 비춘다.
```
render (
  ...
  {unreadMessages.length > 0 &&
    <h2>
      You have {unreadMessages.length} unread messages.
    </h2>
  }
  ...
)
```

#### 유형 2. Inline If-Else 구현

우리는 아래의 구문을 C 등에서 많이 보았다. 설명하지 않는다.

`condition ? true : false`

#### 유형 3. 렌더링 방지

한줄 요약: 보여주고 싶을 때도 있지만 숨기고 싶을 때도 있기에 `return null` 을 사용한다.

**주의 하기**: null 을 리턴하는 것은 lifecycle 메서드의 호출을 막을 수 없다. `componentDidUpdate` 는 여전히 호출될 것이다.

```
unction WarningBanner(props) {
  if (!props.warn) {
    return null; // Render 하지 말라는 강한 표시!!!
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

## 이 정도로 마무리

이 정도면 대충 마무리 된 듯 하다.

이제 컴포넌트와 Redux 를 연결하고 Middleware 를 통해서 로깅과 APi 호출을 만들어준다. 나머지는 굳이 지금할 필요는 없다. 작업의 진척을 확인하기 위해서는 "https://github.com/code-machina/react-reducer-board-app" 를 체크해본다.

이상으로 오늘 스터디는 종료한다. 오전 2시 30분 시작하여 오전 5시 12분 완료!


# 단어 뜻 정리

## Sprinkles of interactivity (?)

## Verb: embrace

**(formal) to accept something enthusiastically ...**

*ex. This was an opportunity that he would embrace.*

> React embraces the fact that the rendering logic is ......

## Adj: intact

**complete and in the original state**

*ex. He emerged from the investigation with his reputation largely intact (=not damaged).*

## Adj: syntactic

**(language) relating to the grammatical arrangement of words in a sentence**

*ex. Readers use their syntactic and semantic knowledge to decode the text.*

**(Computer) relating to the structure of statements or elements in a computer language**

*ex. Markup and content may be distinguished by the application of simple syntactic rules.*

## Adj: synthetic

**Synthetic products are made from artificial substances, often copying a natural product**

React 내용과 연관지어서 설명한다. synthetic 은 인공적인이라는 의미로 쓰이는 듯하다. *Oxford Dictionary 참조* 이를 react 내용에 응용해보면 아래와 같은 해석이 가능하다.

> event Handler 에 전송되는 e 파라미터는 일종의 인공적인 이벤트이다. React 는 이 이벤트를 W3C 스펙에 따라서 정의한다. 따라서 호환성에 대한 걱정은 접어두어도 된다.

> Here, e is a synthetic event. React defines these synthetic events according to the W3C spec, so you don’t need to worry about cross-browser compatibility. See the SyntheticEvent reference guide to learn more.



# 참조

- [React Start][1]
- [Add React In One Minute][2]

<!-- References Link -->

<!--
This is a sample code to write down reference link in markdown document.
[1]: https://docs.docker.com/compose/django/ "compose django"
-->

[1]: https://reactjs.org/docs "react start"
[2]: https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute "Add React In One Minute"
<!-- Images Reference Links -->

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
