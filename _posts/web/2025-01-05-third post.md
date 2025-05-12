---
layout: single
title: "📘[Web] 동기와 비동기에 대해서..."
toc: true
toc_sticky: true
toc_label: "목차"
categories: web
excerpt: "동기, 비동기기란?"
tag: [web, python]
---
# 동기 vs 비동기

![image](https://cdn.frontoverflow.com/document/first-met-redux/images/chapter_10/sync_and_async_in_redux.jpg)

## 1️⃣ Synchronous (동기 처리)

**순차적 처리 방식**  
요청을 보낸 후, 응답이 올 때까지 **기다린 뒤 다음 작업을 수행**합니다.

### ✅ 특징
- Django 기본 방식
- 처리 흐름이 단순하고 직관적
- 응답을 기다리는 동안 **다른 요청은 대기**
- 많은 트래픽에선 **성능 저하** 발생 가능

### 📌 예시

```python
import requests
from django.http import JsonResponse

def sync_view(request):
    response = requests.get("https://api.example.com/data")
    data = response.json()
    return JsonResponse(data)
```

## 2️⃣ Asynchronous (비동기 처리)
비차단 방식, 응답과 관계없이 다음 작업을 바로 실행할 수 있습니다.

### ✅ 특징
- I/O 작업 중 다른 작업을 동시에 수행 가능
- 높은 동시 처리량, 빠른 응답
- 복잡한 흐름 제어 필요

📌 예시
```python
import httpx
from django.http import JsonResponse

async def async_view(request):
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/data")
    data = response.json()
    return JsonResponse(data)

```

## 🔍 요약 비교

| 항목      | 동기 (Synchronous) | 비동기 (Asynchronous) |
| ------- | ---------------- | ------------------ |
| 처리 방식   | 순차적 처리           | 병렬 또는 비순차적 처리      |
| 다음 작업   | 이전 작업 완료 후 시작    | 이전 작업과 상관없이 진행 가능  |
| 코드 복잡성  | 단순               | 상대적으로 복잡           |
| 성능 및 효율 | 느릴 수 있음          | 빠르고 자원 활용 효율적      |


