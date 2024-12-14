---
layout: single
title:  "[html] To-do List 만들기 (기본 디자인)"
categories: Project
tags: [html, blog, miniProject, todoList] 
toc : true
author_profile : false 
---

### To-do List 만들기

첫번째 미니 프로젝트로 To-do List를 만들어 보려고 합니다.


코딩 초보자가 만들만 한 프로젝트를 알아본 결과 아래와 같았습니다.
- To-Do List
- 날씨 앱
- 간단한 가계부
- 타이머 & 알람 앱
- 온라인 메모장
- 등등

저는 이 중 가장 많은 초보자 분들이 만들어 보는 to-do list를 선택했습니다.

#### 주요 기능
1. '+' 버튼으로 할 일을 추가한다.
2. '-' 버튼으로 할 일을 삭제한다.
3. 완료된 할 일을 체크하거나 체크 해제한다.
4. 할 일 목록이 페이지 새로고침 후에도 유지된다.


먼저 html과 css를 이용해서 To-do List의 전체적인 형태를 만들었습니다.

### 구현하기
아래와 같은 to-do List를 만들기 위한 코드 입니다.
![todolist](/assets/images/todoList1.png)
#### HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
</head>
<body>
    <div class="container">
        <h2>To-Do List</h2>
        <form id="listform">
            <input type="text" id="textInput" placeholder="Today's work">
            <button type="submit">+</button>
        </form>
        <ul id="todoList"></ul>
    </div>
</body>
</html>

```
***
#### CSS

```css
body {
    margin: 0;
    padding: 0;
    font-family: Arial, 'Courier New';
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
button {
    padding: 10px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #4cae4c;
}

```

> 다음에는 javaScript를 이용해 기능을 구현해 보겠습니다.