---
layout: single
title:  "Javascript - Event"
categories: Javascirpt
tag: [Javascirpt]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆Event

-event는 어떤 사건을 의미하며 사용자가 클릭했을 때, 스크롤 했을 때, 무언가 입력했을 때 등의 상호작용으로인해 일어나는 사건을 의미한다.<br/>-event는 일반적으로 함수에 연결되며 이 함수를 이벤트 헨들러(event handler)라고 한다.

<br/>





# ◆Event 종류

## 1) 마우스 이벤트

|   이벤트    | 설명                                                         |
| :---------: | :----------------------------------------------------------- |
|    click    | 요소에 마우스를 클릭했을 때 이벤트가 발생                    |
|   dbclick   | 요소에 마우스를 더블클릭했을 때 이벤트가 발생                |
|  mouseover  | 요소에 마우스를 오버했을 때 이벤트가 발생                    |
|  mouseout   | 요소에 마우스를 아웃했을 때 이벤트가 발생                    |
|  mousedown  | 요소에 마우스를 눌렀을 때 이벤트가 발생                      |
|   mouseup   | 요소에 마우스를 떼었을 때 이벤트가 발생                      |
|  mousemove  | 요소에 마우스를 움직였을 때 이벤트가 발생                    |
| contextmenu | context menu(마우스 오른쪽 버튼을 눌렀을 때 나오는 메뉴)가 나오기 전에 이벤트 발생 |



## 2)키 이벤트

|  이벤트  | 설명                             |
| :------: | :------------------------------- |
| keydown  | 키를 눌렀을 때 이벤트가 발생     |
|  keyup   | 키를 떼었을 때 이벤트가 발생     |
| keypress | 키를 누른 상태에서 이벤트가 발생 |



## 3)폼 이벤트

| 이벤트 | 설명                                                         |
| :----: | :----------------------------------------------------------- |
| focus  | 요소에 포커스가 이동되었을 때 이벤트 발생                    |
|  blur  | 요소에 포커스가 벗어났을 때 이벤트 발생                      |
| change | 요소에 값이 변경 되었을 때 이벤트 발생                       |
| submit | submit 버튼을 눌렀을 때 이벤트 발생                          |
| reset  | reset 버튼을 눌렀을 때 이벤트 발생                           |
| select | input이나 textarea 요소 안의 텍스트를 드래그하여 선택했을 때 이벤트 발생 |



## 4) 로드 및 기타 이벤트

| 이벤트 | 설명                                       |
| :----: | :----------------------------------------- |
|  load  | 페이지의 로딩이 완료되었을 때 이벤트 발생  |
| abort  | 이미지의 로딩이 중단되었을 때 이벤트 발생  |
| unload | 페이지가 다른 곳으로 이동될 때 이벤트 발생 |
| resize | 요소에 사이즈가 변경되었을 때 이벤트 발생  |
| scroll | 스크롤바를 움직였을 때 이벤트 발생         |

<br/>





# ◆Event handler 등록

-Event handler : 이벤트 속성을 사용하여 이벤트 핸들러 함수를 개별 타겟에 대입하는 과정을 말한다.<br/>



## 1) 고전방식



### 1_1. 인라인 방식

-HTML에서 inline방식으로 이벤트를 등록할 수 있다.<br/>

**형식**

```
<div 이벤트명 = "실행할 이벤트속성"></div>
```

**예제**

```html
<div onclick="alert('hello');">click</div>
```



### 1_2. javascript 에 등록

**형식**

```
타겟.on이벤트명 = 이벤트핸들러함수
```

**예제**

```html
<!--HTML-->
<body>
    <input type="text" id="typing"/>
    <input type="button" id="push" value="PUSH"/>
    <script src = "script.js"></script>
</body>
</html>
```

```javascript
//javascript

let inputType = document.getElementById("typing");
let inputclick = document.getElementById("push");

let handlerTyping = function(){
    console.log("타이핑 되고 있어요!");
}
let handlerClick = function(){
    console.log("클릭되고 있어요");
}

inputType.onkeydown = handlerTyping
inputclick.onclick = handlerClick
   //inputclick.onclick = function(){
   //console.log("클릭되고 있어요");} -> inputclick.onclick = handlerClick와 같은 의미이다.
```

<img src="{{site.url}}/images/2023-06-03-javascript - Event/on event.png" alt="on event" style="zoom:200%;" />

<br/>





## 2)addEventListener

-addEventListener 메소드를 활용하여 이벤트 핸들러를 등록할 수 있다.<br/>

### 2_1. addEventListener

-같은 타겟에 대해 다수의 eventhandler 등록이 가능하다.(이벤트속성(고전방식)을 활용하는 경우에는 마지막에 작성된것만 출력됨)<br/>

**형식**

```
타겟.addEventListener('이벤트명', 이벤트핸들러함수)
```

**예제**

```html
<!--HTML-->
<body>
    <input type="button" id="one" value="버튼1"/>
    <input type="button" id="two" value="버튼2"/>
    <input type="button" id="three" value="버튼3"/>
    <script src = "script.js"></script>
</body>
```

```javascript
//Javascript
let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");

let handlerclick = function(){
    console.log("나를 클릭했어요??");
}

btn1.addEventListener("click", handlerclick);
btn1.addEventListener("click", function(){
    console.log("다른 핸들러가 추가 등록되었습니다.")
})  
// 익명함수로 이벤트 핸들러를 등록할 수 있으며 다수의 이벤트 핸들러 등록이 가능하다.
```

<img src="{{site.url}}/images/2023-06-03-javascript - Event/addEventListener.png" alt="addEventListener" style="zoom:200%;" />



### 2_2. removeEventListener

-이전에 추가한 이벤트 핸들러를 제거할 수 있는 대응 메소드가 존재한다.<br/>

**예제**

```javascript
//Javascript
let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");

let handlerclick = function(){
    console.log("나를 클릭했어요??");
}

btn1.addEventListener("click", handlerclick);
btn1.addEventListener("click", function(){
    console.log("다른 핸들러가 추가 등록되었습니다.")
})

btn1.removeEventListener("click", handlerclick)
  //handlerclick이 제거되어 버튼1을 클릭시 "나를 클릭했어요??" 안뜬다.
```

<img src="{{site.url}}/images/2023-06-03-javascript - Event/addEventListener 2.png" alt="addEventListener 2" style="zoom:200%;" />

<br/>





## 3)이벤트 객체

-이벤트 객체는 추가적인 기능과 정보를 제공하기 위해 이벤트 핸들러에 자동으로 전달되는 데이터이다.<br/>-이벤트 발생 시에 이벤트 핸들러가 호출될 때 이벤트 객체가 전달되는데, 이때 이벤트 핸들러 함수의 매개변수를 통해 이벤트 객체를 받을 수 있다.<br/>

**형식**

```
타겟.addEventListener('이벤트명', 이벤트핸들러함수(evnet))
```

 **예제**

```html
<!--HTML-->
<body>
    <input type="button" id="one" value="버튼1"/>
    <input type="button" id="two" value="버튼2"/>
    <input type="button" id="three" value="버튼3"/>

    <script src = "script.js"></script>
</body>
```

```javascript
//javascript
let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");

let handlerclick = function(event){
    console.log(event.target);
}

btn1.addEventListener("click", handlerclick);
btn2.addEventListener("click", handlerclick);
btn3.addEventListener("click", handlerclick);
```

<img src="{{site.url}}/images/2023-06-03-javascript - Event/eventhandler 객체.png" alt="eventhandler 객체" style="zoom:200%;" />

위와같이 event.target의 경우 지금 이벤트가 발생한 타겟을 알려주기 때문에 같은 이벤트 핸들러를 넣어도 값이 다른것을 확인할 수 있다.<br/>

