---
title:  "[SQL] 프로그래머스 Lv 1. 인기있는 아이스크림🍦"
layout: single

categories: "Algorithm_SQL"
tags: 
    - Algorithm
    - SQL

toc: true
toc_sticky: true
toc_label : "목차"
---

**SQL 고득점 Kit - SELECT 문제**
<br>

***
# 문제 설명

> FIRST_HALF 테이블은 아이스크림 가게의 상반기 주문 정보를 담은 테이블입니다.FIRST_HALF 테이블 구조는 다음과 같으며, SHIPMENT_ID, FLAVOR, TOTAL_ORDER는 각각 아이스크림 공장에서 아이스크림 가게까지의 출하 번호, 아이스크림 맛, 상반기 아이스크림 총주문량을 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:---|:---|
|SHIPMENT_ID	|INT(N)|	FALSE|
|FLAVOR	|VARCHAR(N)|	FALSE|
|TOTAL_ORDER	|INT(N)|	FALSE|

## 문제
- 상반기에 판매된 아이스크림의 맛을 총주문량을 기준으로 내림차순 정렬하고 총주문량이 같다면 출하 번호를 - 기준으로 오름차순 정렬하여 조회하는 SQL 문을 작성해주세요.
- [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/133024)

<br>

# 문제 풀이

## (1) 코드 작성
```sql
SELECT FLAVOR
FROM FIRST_HALF
ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID
```

## (2) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (3) 코드 리뷰 및 회고
- 이번 문제는 매우 쉬웠다.

<br>

