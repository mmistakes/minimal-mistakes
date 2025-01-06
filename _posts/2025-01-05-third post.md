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

![alt text](image.png)

## 1. 동기(synchronous)
- 직렬적으로 테스크를 수행하는 방식
- 요청을 보낸 후 응답을 받아야지만 다음 동작이 이루어지는 방식이다. 즉 한 테스크를 처리하는 동안 나머지 테스크는 대기한다.

---
## 2. 비동기(asynchronous)
- 벙렬적으로 테스크를 처리하는 방식
- 요청을 보낸 후 응답의 수락 여부와는 상관없이 다음 테스크가 동작하는 방식
- 자원을 효율적으로 사용 가능
- 해당 테스크 완료 시 `콜백 함수` 호출 