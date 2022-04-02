---
layout: single
title:  "데이터베이스 - weekly review 01"
categories: Database-academy
tag: [Database, 데이터베이스 복습]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---


# 🔐 2022-04-02

## 6주차 데이터베이스 복습

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


# 2022-04-02 - 복습

## 1️⃣ LIKE 와일드카드

- %, _ 사용과 escape

## 2️⃣ order by

- order by + 컬럼명 / order by + 컬럼의 번호(1,2.. )

## 3️⃣ 숫자함수

1. round : round(숫자,인덱스)  → 소수점(인덱스 + 1) 자리에서 올림  
2. trunc :  trunc(숫자,인덱스) → 소수점(인덱스) 까지 남기고 나머지 소수점은 버림 
3. floor :  floor(숫자) → 소수점을 다 없앰 
4. ceil : ceil(숫자) → 소수점이 존재하면 무조건 반올림 후 출력 (5미만이여도 반올림)

## 4️⃣ 조건식

1. decode → like와 같은 표현은 못 쓴다 
2. case → else를 사용