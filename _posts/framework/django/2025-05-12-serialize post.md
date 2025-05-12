---
layout: single
title: "📘 [Django] Serialize란? "
toc: true
toc_sticky: true
toc_label: "목차"
categories: python
excerpt: "직렬화(Serialization)의 개념과 실제 Python 웹 개발에서의 활용"
tag: [django]
---

# Serialize란?

## 1️⃣ 직렬화(Serialization)란?

`직렬화`는 데이터 구조나 객체를 **전송하거나 저장하기 위해 문자열이나 바이트로 변환하는 과정**입니다.  
예를 들어, Python의 객체를 JSON 문자열로 바꾸는 것이 대표적인 직렬화입니다.

> 즉, "컴퓨터 내부의 복잡한 객체 → 네트워크를 통해 주고받을 수 있는 형태로 변환"하는 작업입니다.

### ✅ 왜 필요한가?

- **API 통신** 시, Python 객체를 JSON 형식으로 응답하기 위해
- 데이터베이스에 **저장하거나 읽을 때**, 직렬화/역직렬화 필요
- 프론트엔드와의 **데이터 교환 형식 통일**

---

### Python에서의 직렬화 예시
```python
import json

data = {"name": "Tom", "age": 20}
json_data = json.dumps(data)  # 파이썬 dict → JSON 문자열로 변환
print(json_data)  # {"name": "Tom", "age": 20}
```

## 2️⃣ 웹 개발에서 사용하는 상황
API를 만들면, 보통 DB에서 데이터를 가져와 프론트에 넘겨줘야 합니다.
이때 Python 객체를 JSON으로 바꾸는 역할을 하는 것이 Serializer입니다.

## 3️⃣ Django REST Framework에서의 Serializer란?
Django에서는 직접 JSON으로 바꾸는 게 아니라
Serializer라는 도구를 사용해서 자동으로 변환

```python
from rest_framework import serializers

class PostSerializer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()
# 게시글(Post)의 title과 content를 JSON으로 직렬화해주는 역할
```

## ✅ 핵심
| 개념         | 설명                       |
| ---------- | ------------------------ |
| 직렬화        | 파이썬 객체 → 문자열(예: JSON) 변환 |
| 역직렬화       | 문자열(JSON) → 파이썬 객체로 변환   |
| Serializer | 이 과정을 쉽게 도와주는 Django 도구  |
| 사용하는 이유    | 프론트와 데이터 주고받기 위해 꼭 필요함   |
