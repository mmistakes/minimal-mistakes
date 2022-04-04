---
layout: single
title: "setTimeout vs setInterval"
categories: [JavaScript]
tag: [setTimeout, setInterval]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

## setTimeout과 setInterval을 이용한 호출 스케줄링

일정 시간이 지난 후에 원하는 함수를 예약 실행(호출)할 수 있게 하는 것을 '호출 스케줄링(scheduling a call)'이라고 한다.

### 호출 스케줄링을 구현하는 방법은 두 가지가 있다.

- `setTimeout`을 이용해 일정 시간이 지난 **후에** 함수를 한번만 실행하는 방법
- `setInterval`을 이용해 일정 시간 **마다** 간격을 두고 주기적으로 함수를 실행하는 방법



1. **setTimeout**

```js
function testHello() {
    console.log('Hello~');
}
testHello(); //그냥 호출(바로호출)
setTimeout(testHello, 2000); //지연 호출(2초뒤 호출)=> 시간단위는 밀리세컨드 
```

```js
function testHello(t) {
    console.log(t);
}
setTimeout(testHello, 3000, 'Hello, World~'); //함수를 호출하지말고 함수명만 기재
```

```js
setTimeout((a) => console.log(a), 4000, '안녕하세요~');
```

- 호출 스케줄링 취소하는 방법으로는 `clearTimeout`이 있다.

- setTimeout을 호출했을 때 그에 맞는 타이머 식별자 값을 숫자로 반환해준다. 

```js
const ti = setTimeout((a) => console.log(a), 2000, 'aaa');
console.log(ti); // 1
const ti2 = setTimeout((b) => console.log(b), 2000, 'bbb');
console.log(ti2); // 2
clearTimeout(ti); // bbb
```



2. **setInterval**

   setTimeout과의 차이점

   - 함수를 주기적으로 실행
   - 주기적인 실행을 중단할 때 `clearInterval`사용

```js
const tid = setInterval(() => console.log('korea'), 1000); // 1초 마다 주기적으로 korea 출력
console.log(tid); // 1

// 위와 같은 상황에서 주기적인 실행을 중지
const myStop = (tid) => {
    clearInterval(tid);
}
setTimeout(myStop, 5000, tid); // 5초 뒤에 myStop이 호출되면서 tid가 중단됨
```

- **setInterval 동작할 때 함수를 호출하지말고 함수명만 기재해야한다.**

```js
setInterval(console.log('setInterval'), 1000); // 1번만 출력
setIntercal(() => console.log('setInterval'), 1000); //1초마다 주기적으로 출력
```

- 계속 증가하는 값을 clearInterval 사용해서 중지시킨다.

```js
let cnt = 0;

let tid = setInterval(() => {
    console.log(tid); // 1
    cnt++;
    if (cnt == 10) clearInterval(tid);
}, 1000);
```

- 2초 단위로 흘러가는 시계를 출력하시오.

```js
function myClock() {
    let clock = document.getElementById("clock");
    let d = new Date();
    clock.innerText = `현재 시각은 ${d.getMonth()+1}월${d.getDate()}일${d.getHours()}시${d.getMinutes()}분${d.getSeconds()}초 입니다`;
    
    setTimeout(myClock, 2000);
}
window.onload = () => myClock();
```

