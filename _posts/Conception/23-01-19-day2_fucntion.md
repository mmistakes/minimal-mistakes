---
layout: single
title: " 함수 "
categories: Conception
tag: [Concept, JS, Sail99]
---
# # 2023-01-18 javascript 스터디 2일차 - 개념정리

# 함수와 객체



***



> ## 함수  
>
> 주목적 : 중복코드 피하기

### 

### 지역변수 v s 외부변수

지역 : 함수 안에서만 접근 가능

외부(=전역변수) : 지역 변수가 없는 경우에만 사용가능
(내부에 같은 이름 변수 있을 시 외부변수를 무시함)

ex)

```js
function showMessage(){
  let message = "안녕하세요!" // 함수 내 : 지역변수
  alert(messge);
}
alert(message);  // 함수 밖이라 에러발생

--------------------------------------------------
  //함수 내에서 외부변수에 접근 가능
  let userName = 'John'


```

### 매개변수(=인자:parameter)



