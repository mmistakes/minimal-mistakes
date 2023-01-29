---
layout: single
title: "setTimeout"
categories : code
tag: [codingApple, JS, code, Method]
---

# SetTimeOut 타이머 기능 + @ setInterval 



```js
setTimeOut(function(){
  $('.class명').hide();
}, 1000)

// 1000 ms후에 콜백내 코드 실행


setInterval(function(){
   alert('2초경과')
}, 2000)
//msg 2초 '마다' 알림

setTimeout(함수, 5000);

      function 함수() {
        console.log("안녕");
      }

//이런식으로 코드복잡하면 콜백자리에 함수"이름만!"
//넣어 쓸수도 있음

//+@ addEventListener같은 경우도 
//콜백자리에 동일하게 집어넣으면됨
```





