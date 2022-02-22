---
title:  "[Vanilla JS] 크롬 앱 만들면서 새로 배운 것들 - 1"
excerpt: "기본 개념, 리팩토링 과정 등 클론 코딩하며 배운 것들"

categories:
- JavaScript
tags:
- [vanillaJS, clonecoding]
last_modified_at: 2022-01-25
---

<br>

## .querySelector()

- 똑같은 게 여러 개 있어도 하나의 first element만 반환한다.

```javascript
// HTML
<div class="hello">
    <h1>첫 번째</h1>
</div> 
<div class="hello">
    <h1>두 번째</h1>
</div> 

// JS
const test = document.querySelector(".hello h1"); 
console.log(test); //<h1>첫 번째</h1>
```
두 개 모두 가져오고 싶다면 `.querySelectorAll`을 사용하면 된다.

<br>

- CSS selector를 사용하여 element를 검색할 수 있다. 

```javascript
const test = document.querySelector(".hello h1:first-child");
```

<br>

## element의 style을 변경하는 방법 두가지

요구사항: h1 클릭 시 tomato 색으로 변경하고, 다시 클릭하면 blue로 색을 변경하자

```javascript
// HTML
<div class="hello">
   <h1 class="sexy">Click me!</h1> 
</div>

// CSS
h1 {
    color: cornflowerblue;
    transition: color 0.5s ease-in-out;
}
.clicked {  /* class name */
    color: tomato;
}
```
```javascript
// 좋지 않은 방법

const h1 = document.querySelector(".hello h1");

function handleh1Click() {
    const clickedClass = "clicked"; // CSS안의 clicked class

    if (h1.className == clickedClass){
        h1.className = "";
    } else{
        h1.className = clickedClass;
    }
}

h1.addEventListener("click", handleh1Click); 
```
좋지 않은 방법이라고 한 이유는 h1 태그 안에 class name이 있는 지 없는 지, 어떻게 생겼는 지 신경쓰지 않고 교체해버리기 때문이다. 이런 코드를 짜면 날아간 이전의 class name인 "sexy"를 복구시키기 위해 자바스크립트와 CSS까지 업데이트를 해줘야 하는 번거로움이 생긴다.

<br>

```javascript
// 개선한 코드

// HTML
<div class="hello">
   <h1 class="sexy">Click me!</h1> 
</div>

// JS
const h1 = document.querySelector(".hello:first-child h1");

function handleh1Click() {
    const clickedClass = "clicked";

    if (h1.classList.contains(clickedClass)) { // 명시한 class name이 HTML element의 class에 포함되어 있는 게 있다면
        h1.classList.remove(clickedClass);
    } else {
        h1.classList.add(clickedClass);
    }
}

h1.addEventListener("click", handleh1Click); 
```
개선한 방법은 작성한 class name을 유지하면서 요구사항도 만족한다.

<br>

### toggle - DOMTokenList.toggle(token [,force]) - web API ??

위 문제를 더 간단하게 요구사항을 처리할 수 있는데, 이벤트 처리 함수 안에 `h1.classList.toggle("clicked");`를 작성하는 방법이고 개선한 코드와 똑같은 작업을 한다. token으로 설정한 class name이 존재한다면 toggle은 class name을 제거하고, 존재하지 않는다면 toggle은 class name을 추가한다.

이 문제에서 CSS에 정의된 class name으로 HTML element에서 숨기고 표시하는 방법과 toggle 사용 방법을 이해했다.

<br>

## ㅇㅇ






<br>

---
## 정리 
- 자바스크립트가 오타를 찾을 수 있도록 중복되거나 String을 저장해야 하는 경우, 변수에 저장하는 습관을 들이자 
