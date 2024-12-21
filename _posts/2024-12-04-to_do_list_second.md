---
layout: single
title:  "[javaScript] To-do List 만들기 (추가,삭제 기능)"
categories: Project
tags: [javaScript, blog, miniProject, todoList] 
toc : true
author_profile : false 
---

### To-do List 만들기

저번에 만들었던 to-do List에 이어서 기능을 넣어보겠습니다.

[css, html 보러가기](https://hidokim.github.io/project/to_do_list_first/)

#### 주요 기능
1. '+' 버튼으로 할 일을 추가한다.
2. '-' 버튼으로 할 일을 삭제한다.
3. 완료된 할 일을 체크하거나 체크 해제한다.
4. 할 일 목록이 페이지 새로고침 후에도 유지된다.

***

### 구현하기

6개월 만에 다시 자바스크립트를 하려니 어려운 것이 많았습니다..
그래서 오늘은 기본적인 기능인 추가, 삭제 기능만 구현하려고 합니다.

#### 구현할 기능
1. '+' 버튼으로 할 일을 추가한다.
2. 'x' 버튼으로 할 일을 삭제한다.

    - text창의 today's work 부분을 클릭해 할 일을 입력한 후
    - '+' 버튼을 누르면 아래에 할 일이 추가되도록 할 것입니다.
    - 추가된 할 일 옆의 'x' 버튼을 누르면 할 일이 삭제되도록 할 것입니다.

*** 
#### 사전지식

추가, 삭제 기능을 구현할 때 미리 알아야 할 것
- HTML DOM 
    - [HTML DOM 공부하기 보러가기](/study/study_html_DOM/)
- 이벤트 기초 및 활용
    - [이벤트 리스너 공부하기 보러가기](/study/study_eventListener/)

***
#### 구현 이미지

![todolist2](/assets/images/todoList2.png)


***
### 코드


#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>To-Do List</h2>
        <form id="listform">
            <input type="text" id="textInput" placeholder="Today's work">
            <button type="submit" class="submitButton">+</button>
        </form>
        <ul id="todoList"></ul>
    </div>
    <script src="script.js"></script> <!--스크립트 위치 변경-->

</body>
</html>
```
***
#### javaScript
```js
document.addEventListener("DOMContentLoaded", () => { //DOM이 로드되면 실행
    const listform = document.getElementById("listform"); //할일 리스트의 <from> 요소를 저장하는 변수 
    const todoList = document.getElementById("todoList"); //추가한 할일 목록 요소 <ul>이 저장되는 변수
    const textInput = document.getElementById("textInput"); //텍스트 입력하는 요소 <input>이 저장되는 변수
    
    // 추가기능
    listform.addEventListener("submit", (e) => { //submit 버튼을 누르면 실행
        e.preventDefault(); //페이지 새로고침 방지

        const todoText = textInput.value.trim(); // 할 일을 가져오고 공백제거
        if(todoText === "") return; // 텍스트 창이 비어있으면 실행 X

        const li = document.createElement("li"); // 새로운 <li>요소 생성

        li.innerHTML = `
            <span>${todoText}</span>
            <button class="deleteButton">x</button>
        `; //<li>에 HTML 내용 추가

        todoList.appendChild(li); //새록 생성된 <li>을 <ul>목록에 추가
        textInput.value = ""; //입력 필드 초기화

        });

    // 삭제기능
    todoList.addEventListener("click", (e)=>{ // 클릭했을때
        if (e.target.classList.contains("deleteButton")){ // 삭제버튼을 클릭했다면
            e.target.parentElement.remove(); // 삭제 버튼의 부모인 <li> 요소를 삭제
        }
    });
});

```

***
#### CSS
```css
body {
    margin: 0;
    padding: 0;
    font-family: Arial, 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(236, 236, 236);
    height: 80vh;
}
.container { 
    background-color: white;
    margin: 50px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 600px;
}
h2 { 
    color:white;
    background-color: rgb(70, 198, 207);
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 100px;
    margin-right: 100px;
    padding: 10px;
    border-radius: 30px;

}


input {
    flex: 1;
    padding: 10px;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 5px;
}

.submitButton {
    padding: 10px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.submitButton:hover {
    background-color: #4cae4c;
}

li .deleteButton{ 
    background-color:salmon;
    color: white;
    border: none;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius: 5px;
    cursor: pointer;
}

li .deleteButton:hover {
    background-color: rgb(255, 113, 98);
}

ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
}

li {
  font-family: Arial;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgb(199, 199, 199);
}

```
> 다음에는 체크기능과 새로고침 후에도 내용이 유지되게 하는 기능을 넣어보겠습니다.