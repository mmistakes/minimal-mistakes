---
layout: single
title:  "[javaScript] To-do List 만들기 (체크 기능, 내용유지 기능)"
categories: Project
tags: [javaScript, blog, miniProject, todoList] 
toc : true
author_profile : false 
---

### To-do List 만들기

저번에 만들었던 to-do List에 이어서 기능을 추가로 넣어보겠습니다.

- [css, html 보러가기](https://hidokim.github.io/project/to_do_list_first/)
- [to-do List 추가, 삭제기능 보러가기](https://hidokim.github.io/project/to_do_list_second/)

#### 주요 기능
1. '+' 버튼으로 할 일을 추가한다.
2. '-' 버튼으로 할 일을 삭제한다.
3. 완료된 할 일을 체크하거나 체크 해제한다.
4. 할 일 목록이 페이지 새로고침 후에도 유지된다.

***

### 구현하기

저번에 기능 1,2번을 구현했고 이번에는 3,4 기능을 추가해 보겠습니다.

#### 구현할 기능
- 완료된 할 일을 체크하거나 체크 해제한다.
- 할 일 목록이 페이지 새로고침 후에도 유지된다.

> 할 일이 마무리 된 것을 좀 더 명확히 표현하기 위해서 체크 됨과 동시에 할일에 가운데 줄이 추가되게 구현하겠습니다.

***
#### 사전지식

체크, 내용유지 기능을 구현할 때 미리 알아야 할 것
- LocalStorage
    - [LocalStorage 공부하기 보러가기](/study/study_localStorage/)
- toggle 함수
    - [toggle 함수 공부하기 보러가기](/study/study_toggle/)

***
#### 구현 이미지
![todoList3](/assets/images/todoList3.png)

***
### 코드

#### javaScript
```js
    document.addEventListener("DOMContentLoaded", () => { // DOM이 로드되면 실행
    const listform = document.getElementById("listform"); //할일 리스트의 <from> 요소를 저장하는 변수 
    const todoList = document.getElementById("todoList"); //추가한 할일 목록 요소 <ul>이 저장되는 변수
    const textInput = document.getElementById("textInput"); //텍스트 입력하는 요소 <input>이 저장되는 변수
    
    // LocalStorage에서 할 일 목록을 불러와 화면에 표시
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    renderTodos();

    // 추가 기능
    listform.addEventListener("submit", (e) => {//submit 버튼을 누르면 실행
        e.preventDefault(); //페이지 새로고침 방지(디폴트 행동 취소)

        const todoText = textInput.value.trim(); // 할 일을 가져오고 공백제거: trim()
        if(todoText === "") return; // 텍스트 창이 비어있으면 실행 X

        // 새로운 할 일 객체를 생성하고 배열에 추가
        const newTodo = { text: todoText, completed: false };
        todos.push(newTodo);
        saveTodos();

        // 화면에 할 일 항목 추가
        addTodoToList(newTodo);
        textInput.value = ""; // 입력 필드 초기화
    });

    // 삭제 및 체크 기능
    todoList.addEventListener("click", (e) => {// 클릭했을때
        if (e.target.classList.contains("deleteButton")){ // 삭제버튼을 클릭했다면
            const li = e.target.parentElement;
            const index = Array.from(todoList.children).indexOf(li);
            todos.splice(index, 1); // 배열에서 해당 할 일 삭제
            saveTodos(); // 변경사항 저장
            li.remove(); // 화면에서 항목 제거
        }

        // 체크 버튼 클릭 시: 체크추가, 가로줄추가
        if (e.target.classList.contains("checkButton")) {
            const li = e.target.parentElement;
            const index = Array.from(todoList.children).indexOf(li);
            const span = e.target.nextElementSibling;
            
            todos[index].completed = !todos[index].completed; // 완료 상태 토글
            saveTodos(); // 변경사항 저장

            e.target.classList.toggle("checked");
            span.classList.toggle("completed");
        }
    });

    // 할 일 목록을 화면에 표시하는 함수
    function renderTodos() {
        todoList.innerHTML = ""; // 기존 목록 초기화
        todos.forEach(addTodoToList); // 각 할 일 항목을 화면에 추가
    }

    // 할 일 항목을 <ul>에 추가하는 함수
    function addTodoToList(todo) {
        const li = document.createElement("li");
        li.innerHTML = `
            <button class="checkButton ${todo.completed ? "checked" : ""}"></button>
            <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
            <button class="deleteButton">x</button>
        `;
        todoList.appendChild(li);
    }

    // LocalStorage에 할 일 목록을 저장하는 함수
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});
```
***
#### CSS
원래의 CSS에 아래를 추가한다.

```css
.checkButton{
    width: 20px;
    height: 20px;
    border: 2px solid rgb(70, 198, 207);
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    margin-right: 10px;
}

.checkButton.checked {
    background-color:rgb(70, 198, 207);
    position: relative;
}

.checkButton.checked::after {
    content: '✔';
    color: white;
    font-size: 14px;
    position: absolute;
    left: 3px;
    bottom: 1px;
}

.completed {
    text-decoration: line-through;
    color: #6d6d6d;
}
```
***
> 중요한 to-do List의 기능을 모두 구현했지만 다음에는 추가적인 기능을 더 넣어보겠습니다.