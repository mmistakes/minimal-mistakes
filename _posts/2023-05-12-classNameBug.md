---
layout: single
title: "classNameBug"
categories: Problem_Solving
tag: [HTML, JavaScript, CSS]
toc: true
author_profile: false
sidebar:
  nav: "counts"
---

# className에서 나타날 수 있는 버그

## 기존 코드

```html
<body>
    <div class="hello">
        <h1>
            Click me!
        </h1>
    </div>
</body>
```

```css
h1 {
    color: cornflowerblue;
    transition: color 0.5s ease-in-out;
}
.clicked {
    color: tomato;
}
```

```javascript
const h1 = document.querySelector(".hello h1");

function handleTitleClick() {
  const clickedClass = "clicked";
  if (h1.className === clickedClass) {
    h1.className = "";
  } else {
    h1.className = clickedClass;
  }
}

h1.addEventListener("click", handleTitleClick);
```

위 코드는 Click me! 라는 텍스트를 눌렀을 때 TextColor가 바뀌게 해주는 코드이다. 

<img src="/assets/images/className/noclass.gif">

JavaScript 코드에 있는 **handleTitleClick** 함수는 다음과 같이 작동한다.

1. **clickedClass**라는 변수에 **clicked**라는 문자열을 할당한다. 
2. **h1** 요소의 현재 클래스 이름을 확인한다.
3. **h1** 요소의 클래스 이름이 **clickedClass**와 같으면, 클래스 이름을 빈 문자열로 변경한다.
4. 그렇지 않으면, **clickedClass**를 클래스 이름으로 추가한다.

즉, 사용자가 **h1** 요소를 클릭하면, **clicked**라는 클래스가 추가되거나 제거된다. 이 클래스는 CSS를 사용하여 특정 스타일을 적용할 수 있다.

**하지만 위 코드에는 버그가 하나 숨어들 수 있다.**

## 기존 코드의 문제점

기존 HTML 코드에서 **h1**은 class가 없는 상태로 시작했는데, 만약 **h1**이 class가 있는 상태면 어떻게 될까?

우선 **h1**에 my-font라는 class를 추가해 보겠다. 그리고 CSS 코드도 수정해 보겠다.

```html
<body>
    <div class="hello">
        <h1 class="my-font">
            Click me!
        </h1>
    </div>
</body>
```

```css
h1 {
    color: cornflowerblue;
    transition: color 0.5s ease-in-out;
}
.clicked {
    color: tomato;
}
.my-font {
    font-family: fantasy;
}
```

<img src="/assets/images/className/bug.gif">

처음에는 분명 class가 my-font로 시작되지만 click 하는 순간 최초의 class name은 없어진다. 난 꼭 폰트를 적용하고 싶은데 말이다.

사실 해결방법은 간단하다 JavaScript 코드에 my-font라는 클래스도 추가해 주면 금방 문제는 해결이 된다. 하지만 이건 좋은 방법이 아닌 거 같다. 만약에 내가 새로운 class 하나를 추가한다던지 조금만 변경을 하게 되면 JavaScript는 물론이고 CSS까지 업데이트해줘야 하기 때문이다.

그래서 정말로 더 나은 해결방법이 무엇일까? 

## classList를 사용한 해결방법

### add(), remove() 활용

바로 `classList` 를 쓰는 방법이다. `classList`는 `add()`, `remove()`, `toggle()`과 같은 메소드를 가지며, 이를 통해 클래스 이름을 추가, 제거, 전환할 수 있다. 

```javascript
function handleTitleClick() {
    const clickedClass = "clicked";
    if(h1.classList.contains(clickedClass)){
        h1.classList.remove(clickedClass)
    } else {
        h1.classList.add(clickedClass)
    }
}
```

<img src="/assets/images/className/solve.gif">

자 이제 my-font 클래스가 그대로 유지되고 clicked만 추가/제거가 된다!!

이전의 코드와는 달리, 이 코드에서는 `classList`의 `contains()`메소드를 사용해 클래스의 존재 여부를 확인한다.

이 함수는 다음과 같은 작업을 수행한다.

1. "clickedClass"라는 변수에 "clicked"라는 문자열을 할당한다.
2. `classList`의 `contains()` 메소드를 사용하여 "h1" 요소의 클래스에 "clickedClass"가 포함되어 있는지 확인한다.
3. "clickedClass"가 포함되어 있으면, `classList`의 `remove()` 메소드를 사용하여 "clickedClass"를 제거한다.
4. "clickedClass"가 포함되어 있지 않으면, `classList`의 `add()` 메소드를 사용하여 "clickedClass"를 추가한다.

이전 코드와 비교하여, 이 코드는 `className` 대신 `classList`를 사용하여 요소의 클래스를 조작한다. 이를 통해 코드가 더 간결하고 가독성이 좋아지며, 클래스를 추가하거나 제거할 때 불필요한 공백이나 기존 클래스를 덮어쓰는 오류를 방지할 수 있다.

이 정도만 수정해도 사실 이전 코드보다는 확실히 가독성과 오류를 방지할 수 있어보인다. 그렇지만 좀 더 간결하게 바꿔보자 !!

### toggle() 활용

바로 `toggle()` 메소드를 사용하는 것이다.

```javascript
function handleTitleClick(){
    h1.classList.toggle("clicked");
}
```

이전의 두 코드와 달리, 이 코드에서는 `toggle()`메소드를 사용하여 클래스를 추가하거나 제거할 수 있다.

이 함수는 다음과 같은 작업을 수행한다.

1. `classList`의 `toggle()`메소드를 사용하여 "clicked" 클래스를 "h1" 요소에 추가하거나 제거한다.
2. `toggle()`메소드는 클래스가 이미 존재하면 제거하고, 존재하지 않으면 추가한다.

`toggle()` 메소드를 사용하면 코드가 더 간결하고 가독성이 좋아지며, `add()`와 `remove()` 메소드를 사용하여 클래스를 추가하거나 제거하는 것보다 더욱 편리하다. 이 메소드는 `if...else` 구문을 사용하지 않으므로 코드의 길이를 줄이고, `classList`에서 클래스 이름을 찾을 필요가 없으므로 코드가 더욱 간결해진다.
