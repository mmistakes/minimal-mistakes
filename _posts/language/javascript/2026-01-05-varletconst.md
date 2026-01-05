---
layout: single
title: "📘 JS의 변수 선언"
toc: true
toc_sticky: true
toc_label: "목차"
categories: javascript
excerpt: "var let const 차이"
tag: [javascript]
---

너무 기본적인 JS 기초지만 헷갈리는 경우도 있으니 작성해본다.
</br>
우선 변수 선언 부터 알아보자

### 변수 선언?
- 값을 저장하기 위해 이름을 만들고 메모리 공간을 확보하는 것이다
- JS의 변수 선언 방법으로는 var, let, const 3가지 방법이 있다

var, let, const의 차이점을 알아보기 전에 **재선언, 재할당, 호이스팅** 이라는 용어에 대해 먼저 알아볼 필요가 있다.
### 재선언
- 이미 존재하는 변수를 같은 이름으로 다시 선언하는 것
```
var x = 1;
var x = 2;
```
### 재할당
- 이미 선언된 변수에 새로운 값을 다시 넣는 것
```
var y = 1;
y = 2;
```
### 호이스팅
- 변수 선언을 코드 맨 위로 끌어올린 것처럼 처리하는 JS 동작
- 쉽게 설명하면 시험 보기전에 이름을 먼저 적고 문제를 나중에 푸는것과 같다
```
console.log(x);
var x = 5;

// 이런식으로 짜도 에러가 나지 않는데 JS엔진은 이 코드를 아래와 같이 해석하기 때문이다

var x;           // 선언 먼저
console.log(x); // undefined
x = 5;           // 값 할당

이게 바로 호이스팅이다!
```

</br>
다음은 var, let, const의 차이점이다

### var
- 함수 스코프 
    - 변수를 선언하면 함수 안에서는 다 접근할 수 있음 (블록 무시)
    ```
    if (true) {
    var x = 10;
    }
    console.log(x); // 10 
    ```
- 재선언 가능
    ```
    var x = 10;
    var x = 20;
    console.log(x); // 20
    ```

- 재할당 가능 
  ```
    var n = 5;
    n = 10;

    console.log(n); // 10
  ```

  ```
    // 타입 또한 자유롭게 변경 가능
    var value = 1;
    value = "hello";
    value = true;

    console.log(value); // true
  ```
- 호이스팅 
    - 선언 + undefined 초기화까지 호이스팅
    ```
    console.log(v); // undefined
    var v = 5;
    ```
    - 선언 전에 사용해도 오류가 안나지만 버그가 조용히(undefined)숨어버림 -> 위험, 디버깅의 어려움
    - **함수 표현식의 호이스팅**
        ```
        add(2,3); // TypeError

        var add = function (a,b) {
            return a + b;
        }
         ```
         - var는 호이스팅은 되지만 이런식으로 함수 안에 적으면 undefined기 때문에 에러가 난다

---

### let
- 블록 스코프
    - {}안에서만 유효
    ```
    if (true) {
    let y = 10;
    }
    console.log(y); // ReferenceError
    ```
- 재선언 불가능
    ```
    let x = 10;
    let x = 20; // 에러
    ```

- 재할당 가능 
  ```
    let n = 5;
    n = 10;

    console.log(n); // 10
  ```

  ```
    // 타입 또한 자유롭게 변경 가능
    let value = 1;
    value = "hello";
    value = true;

    console.log(value); // true
  ```
- 호이스팅 
    - 선언 만 호이스팅
    ```
    console.log(l); // ReferenceError
    let l = 5;
    ```
    - 선언이 호이스팅 되지만 초기화 전까지는 TDZ(Temporal Dead Zone)으로
접근 시 에러 발생 -> 디버깅 쉬움 (즉시 에러)

---

### const
- 블록 스코프
    - {}안에서만 유효
    ```
    if (true) {
    const y = 10;
    }
    console.log(y); // ReferenceError
    ```
- 재선언 불가능
    ```
    const x = 10;
    const x = 20; // 에러
    ```

- 재할당 불가능 
  ```
    const n = 5;
    n = 10; // 에러
  ```
- 호이스팅 
    - 선언 만 호이스팅 (let과 동일)
    ```
    console.log(l); // ReferenceError
    const l = 5;
    ```
    - 선언이 호이스팅 되지만 초기화 전까지는 TDZ(Temporal Dead Zone)으로
접근 시 에러 발생 -> 디버깅 쉬움 (즉시 에러)

---

### 마무리
var, let과 달리 const는 재선언도 재할당도 안되는데 그럼 왜 사용할까? 라는 의문이 생겼다.
하지만 반대로 생각하면 const는 의도하지 않은 변경을 컴파일 단계에서 막기 위해 사용한다라는 것을 알 수 있다. 즉 제한이 많을 수록 안전하다는 뜻이다.
</br>
반대로 var는 재선언도 재할당도 모두 가능하기 때문에 코드가 커질수록 변수의 변경 흐름을 추적하기 어려워진다.
이러한 특성은 디버깅을 어렵게 만들고, 협업 환경에서는 치명적인 버그로 이어질 가능성이 크다. (그러므로 사용 권장 x)
</br>
let은 이러한 문제를 일부 해결해 재선언을 막고 블록 스코프를 제공하지만, 여전히 재할당은 허용한다.
따라서 값이 변경되어야 하는지, 아니면 실수로 변경된 것인지 코드를 읽는 사람이 매번 판단해야 한다는 한계가 있다.