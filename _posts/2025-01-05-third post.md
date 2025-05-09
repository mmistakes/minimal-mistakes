---
layout: single
title: "📘[Web] 동기와 비동기에 대해서..."
toc: true
toc_sticky: true
toc_label: "목차"
categories: web
excerpt: "동기, 비동기기란?"
tag: [web]
---
# 📘 동기 vs 비동기

![image](https://cdn.frontoverflow.com/document/first-met-redux/images/chapter_10/sync_and_async_in_redux.jpg)

## 1️⃣ Synchronous (동기 처리)

🔁 **순차적 처리 방식**  
요청을 보낸 후, 응답이 올 때까지 **기다린 뒤 다음 작업을 수행**합니다.

### ✅ 특징
- 작업이 **직렬(serial)** 로 처리됨
- 응답을 기다리는 동안 **다음 작업은 대기**
- 코드가 **예측 가능하고 단순**
- 하지만 **느림** (병목 발생 가능)

### 📌 예시

```js
function taskA() {
  console.log("A done");
}

function taskB() {
  console.log("B done");
}

taskA();
taskB();
// 결과:
// A done
// B done
```

## 2️⃣ Asynchronous (비동기 처리)
⚡ 비차단 방식, 비순차 처리 가능
요청을 보낸 후, 응답과 무관하게 다음 작업을 수행합니다.

### ✅ 특징
응답을 기다리지 않고 다음 작업으로 넘어감

자원을 효율적으로 활용

복잡하지만 빠르고 유연

Promise, async/await 등으로 처리

📌 예시
```js
function taskA(callback) {
  setTimeout(() => {
    console.log("A done");
    callback();
  }, 1000);
}

function taskB() {
  console.log("B done");
}

taskA(() => {
  taskB();
});
// 결과:
// (1초 후) A done
// B done
```

## 🔍 요약 비교

| 항목      | 동기 (Synchronous) | 비동기 (Asynchronous) |
| ------- | ---------------- | ------------------ |
| 처리 방식   | 순차적 처리           | 병렬 또는 비순차적 처리      |
| 다음 작업   | 이전 작업 완료 후 시작    | 이전 작업과 상관없이 진행 가능  |
| 코드 복잡성  | 단순               | 상대적으로 복잡           |
| 성능 및 효율 | 느릴 수 있음          | 빠르고 자원 활용 효율적      |


