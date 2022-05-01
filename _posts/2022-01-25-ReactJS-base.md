---
title:  "[React] 영화 웹 서비스 만들면서 새로 배운 것들"
excerpt: "기본 개념, 리팩토링 과정 등 클론 코딩하며 배운 것들"

categories:
- JavaScript
tags:
- [react, clonecoding]
last_modified_at: 2022-01-25
---

## 리액트의 핵심, 상호작용 방식


React JS는 UI를 interactive 하게 만들어준다. 이는 웹사이트에 interactivity(상호작용) 를 만들어 준다는 얘기이다.

바닐라 JS는 먼저 HTML을 만들고, JS를 이용하여 찾아서 가져오고, 그리고 업데이트 하는 형태이다. React JS는 JS를 이용해 생성한 element를 HTML로 번역하고, 결과물인 HTML을 업데이트 할 수 있다. 

### React JS가 훌륭한 이유 & interactivity를 위해 제작됐다고 볼 수 있는 증거

property object에 event listener를 등록할 수 있다는 점이다. vanilla.html 처럼 addEventListener를 여러번 쓰지 않고, property에서 event를 등록할 수 있게 됨 

1. vanilla.html

```
<!DOCTYPE html>
<html>
    <body>
        <span>Total clicks: 0</span>
        <button id="btn">Click me!</button>
    </body>
    <script>
        let counter = 0;
        const span = document.querySelector("span");
        const button = document.querySelector("#btn");
        function handleClick(event) {
            counter += 1;
            span.innerText = `Total clicks: ${counter}`;
        }
        button.addEventListener("click", handleClick);
    </script>
</html>
```

<br>

2. index.html - 어려운 버전

```
<!-- <!DOCTYPE html>
<html>
    <body>
         <div id="root"></div> //이 비어있는 div는 reactDOM이 react element 들을 가져다 놓을 곳. react-dom은 library 또는 package인데, 모든 react element들을 HTML body에 둘 수 있도록 해줌 (=react element를 가져다가 HTML로 바꾸는 역할) 
    </body>
    <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
    <script>
        const root = document.querySelector("#root"); 

        // const span = React.createElement("span", {id: "sexy-span" }, "Hello"); // "태그명", 태그의 property(id, class, event listener 등), 태그의 content(내용)
        // react JS가 훌륭한 이유는 property object에 event listener를 등록할 수 있다는 점 **
        // 그리고 property object의 일부는 HTML로 가는 것도 배움 - <button style="background-color: tomato;">

        const h3 = React.createElement(
            "h3", 
            {
                id: "title",
                onMouseEnter: () => console.log("mouse enter")
            }, 
            "Hello I'm a title."
        ); 

        const btn = React.createElement(
            "button", 
            {
                onClick: () => console.log("Clicked!"),
                style: {
                    backgroundColor: "tomato",
                },
            }, 
            "Click me !"
        ); // button.addEventListener 대신임

        const container = React.createElement("div", null, [h3, btn]) // h3을 먼저, button을 그 다음으로 render하기 위함
        
        ReactDOM.render(container, root); // React element를 HTML에 만들어 배치함 - h3, button element를 root div 안에 배치해줘
    </script>
</html> -->

```

- React-DOM: library 또는 package인데, 모든 React element들을 HTML body에 둘 수 있도록 해줌 (=React element를 가져다가 HTML로 바꾸는 역할
- .createElement()
- React JS가 훌륭한 이유
- render

<br>

3. index.html - 쉬운 버전 

```javascript
<html>
    <body>
         <div id="root"></div> 
    </body>
    <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script> <!--Babel은 JSX로 적은 코드를 브라우저가 이해할 수 있는 형태(createElement로 했던 방식)로 바꿔줌 - 브라우저는 JSX를 invalid하다고 생각함, 이 방식은 느리기 때문에 더 나은 방식이 있음 -->
    <script type="text/babel">
        const root = document.querySelector("#root"); 

        function Title() { // 렌더할 때, Title이나 Button을 포함시키기 위해 함수로 만들어야 함
            return (
                <h3 id="title" onMouseEnter={() => console.log("mouse enter")}> 
                    Hello I'm a title
                </h3>
            );
        }
        const Button = () => ( // allow function, 이 함수는 button React element를 반환하고 있음 - 위처럼 함수를 만들어서 return 해주는 거랑 같음
            <button 
                style={{
                    backgroundColor: "tomato"
                }} 
                onClick={() => console.log("Clicked!")}>
                Click me !
            </button>
        );

        const Container = () => (
            <div>
                <Title /> 
                <Button />
            </div> 
        ); 
        // Title, Button 함수를 렌더링하고 있는 Container. 여러 컴포넌트들이 합쳐진 구성을 만들고 있음 - React element를 함수로 만들었기 때문에 원하는 만큼 사용할 수 있게 된 것. 원하는 만큼 <Button /> <Button /> <Button /> 처럼 n번 렌더링 가능 
        // div 태그를 렌더링하고 있는 컴포넌트가 하나 있는데 Title에 관련된 코드를 포함시키고 있음
        // <Title /> 는 <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>Hello I'm a title</h3> 코드를 복사 붙여넣기 해주는 것과 똑같다
        // React, JSX가 HTML 태그와 컴포넌트를 구분할 수 있도록, 직접 만든 컴포넌트를 렌더링해서 다른 곳에서 사용할 때는 컴포넌트의 첫 글자가 대문자여야 한다
        
        // JSX는 어플리케이션을 여러 작은 요소로 나누어 관리할 수 있게 해줌, 보기 쉽게 여러 요소로 잘게 쪼개서 합쳐주기만 하면(렌더링) 됨
        // React element를 생성하는 방법과 JSX, React element를 함수 내에 담으면 원하는 만큼 사용할 수 있게 된다는 것, 컴포넌트를 다른 컴포넌트 안에 넣는 방법을 배움

        ReactDOM.render(<Container />, root); 
    
    </script>
</html>
```
- JSX: JS를 확장한 문법임 (syntax extension), createElement를 대체할 수 있는 방법 
- Babel
- 컴포넌트

<br>

## 변수를 업데이트하는 방법 - 리렌더링 

요구사항: 변수가 0인 시점에서 최초로 렌더링을 하고, 변수의 값을 증가시킬 때 리렌더링 하려고 함

1. 안좋은 방법 - counter 같은 변수를 JSX에 전달하는 방법 

```javascript
const root = document.querySelector("#root"); 
let counter = 0;

function countUp() {
    counter += 1;
    reder(); // countUp 호출할 때마다 실행 - Container 리렌더링
}

function reder() {
    ReactDOM.render(<Container />, root); // Container 리렌더링
}

const Container = () => ( 
// React element를 생성하고 있는데, 이는 곧 div 태그이고 h3, button 태그를 담고 있음
//코드가 변환된 걸 찾아보면 React element를 만들고 있는 Container에서 또 다른 두개의 React element인 h3, button을 만들고 있음, 여기저기서 createElement하고 있지만 보기엔 편함
    <div>
        <h3>Total clicks: {counter}</h3> 
        <button onClick={countUp}>Click me !</button>
    </div> 
); // vanilla.html에선 span.innerText를 이용해서 span 텍스트를 바꿔줬었어 - 여기선 단지 중괄호를 열고 변수 이름 담으면 끝 & button에 이벤트 리스너 추가 
여기까지 하면 브라우저에서 `console.log(counter)`로 이벤트리스너는 동작하지만, UI가 업데이트 되지 않는 것을 확인함. 왜? 컴포넌트를 단 한번만 렌더링하고 있으니까 UI가 업데이트되지 않는 것임

render(); // 이 코드가 제일 먼저 실행되는 코드, 실행되면 Container 컴포넌트가 렌더링될텐데 (= 이 코드가 React Element가 될텐데), 렌더링한 상태에서 counter 값은 0을 가짐, Container를 리렌더링하지 않아서 문제 발생

```

결과 - 데이터가 바뀔 때마다 다시 렌더링하는 것을 잊어선 안되는 불편함 - 값을 직접 업데이트하고 리렌더링도 직접 함

리액트가 좋은 점 - (브라우저에서 HTML이 어떤 식으로 변하는 지 확인하며,,) vanill.html에선 버튼 클릭마다 body랑 span이 업데이트(재생성)되고 있는 걸 바로바로 보여줌
여기선 버튼을 클릭하면 Container 컴포넌트 전체를 리렌더링하는 거지만, HTML 코드에서는 UI에서 바뀐 부분만 업데이트 해주고, h3, button, div는 업데이트되지 않는 것을 확인함
이유는 React.js가 이전에 렌더링된 컴포넌트와 그 다음에 렌더링될 컴포넌트를 확인하고 다른(바뀐) 부분만 파악하여 업데이트 해줌
여러가지 요소들을 리렌더링하려고 해도 전부 다 새로 생성하지 않고 바뀐 부분만 새로 생성해줌 - 굉장히 인터랙티브한 어플을 만들 수 있다는 뜻

배운 것 - 컴포넌트나 JSX에 변수를 추가하는 방법(중괄호), UI를 업데이트하는 방법(reder() 재호출)

<br>

2. 개선한 코드 - 리렌더링을 발생시킬 좋은 방법
React.js 어플 내에서 데이터를 보관하고 업데이트하는 것, 자동 리렌더링하는 방식에 대하여

```javascript
const root = document.querySelector("#root"); 

        function Container() {
            const [counter, setCounter] = React.useState(0); // 배열의 요소들에 이름 부여하기 - return문 전에 생성, 초기값은 0, .useStage() [0, f] 반환 - [data(초기값 설정 전엔 undefined), data를 바꿀 때 사용하는 함수(보통 set(data명)으로 이름 지음)] - 블로그엔 나눠서 설명적기
        
            const countUp = () => {
                // setCounter(counter + 1); // 부여한 값으로 업데이트하고 리렌더링을 일으킴, 현재 counter state를 이용해서 새로운 counter state를 계산 - counter가 다른 곳에서 update 될 수 있기 때문에 좋지 않는 방법
                // 현재 state를 기반으로 다음 state를 계산하고 싶다면 함수를 이용해라
                setCounter((current) => current + 1); // 이 current는 현재 값이란 걸 리액트가 보장함
            };

            return (
                <div>
                    <h3>Total clicks: {counter}</h3>
                    <button onClick={countUp}>Click me !</button>
                </div>
            );
        }   

        ReactDOM.render(<Container />, root);
```
배운 것 - React 어플리케이션을 다룰 때, 어디에 데이터를 담으면 되는지 - state: 기본적으로 데이터가 저장되는 곳
vanill.html과 비교했을 때 - HTML 요소를 생성하거나 찾을 필요도 없고, 이벤트리스너를 더해줄 필요도 UI를 업데이트 해줄 필요도 없음

사용자들의 input을 어떻게 얻는지, form을 만들었을 때 state는 어떻게 작용하는 지

## Minute & Hours - state
깃허브에..