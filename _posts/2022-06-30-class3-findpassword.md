---
layout: single
title:  "비밀번호 찾기"
categories: Class3
tag: [자료 구조, 해시를 사용한 집합과 맵]
toc: true
author_profile: false
sidebar: 
    nav: "docs"
---

# 17219, 비밀번호 찾기

## 최초 접근법

너무 쉬운 문제였다. dictionary의 개념을 묻는 문제였다. 

## 코드

```python
n, m = map(int, input().split())
memo = {}

for _ in range(n):
    site, password = map(str, input().split())
    memo[site] = password

for _ in range(m):
    print(memo[input()])

```

## 설명

dictionary의 key로 site를 입력받아 value를 출력한다.

