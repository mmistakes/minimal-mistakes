---
title:  "[SQL] 프로그래머스 Lv 1. 과일로 만든 아이스크림 고르기"
layout: single

categories: "Algorithm"
tags: 
    - Algorithm
    - SQL

toc: true
toc_sticky: true
toc_label : "목차"
author_profile: false
sidebar:
    nav: "study"
---

**SQL 고득점 Kit - SELECT 문제**
<br>

***
# 문제 설명

```markdown
다음은 아이스크림 가게의 상반기 주문 정보를 담은 FIRST_HALF 테이블과 아이스크림 성분에 대한 정보를 담은 ICECREAM_INFO 테이블입니다. 
FIRST_HALF 테이블 구조는 다음과 같으며, SHIPMENT_ID, FLAVOR, TOTAL_ORDER 는 각각 아이스크림 공장에서 아이스크림 가게까지의 출하 번호, 아이스크림 맛, 상반기 아이스크림 총주문량을 나타냅니다. 
FIRST_HALF 테이블의 기본 키는 FLAVOR입니다.
```

|NAME|TYPE|NULLABLE|
|:---|:---|:---|
|SHIPMENT_ID|INT(N)|FALSE|
|FLAVOR|VARCHAR(N)|FALSE|
|TOTAL_ORDER|INT(N)|FALSE|

```markdown
ICECREAM_INFO 테이블 구조는 다음과 같으며, FLAVOR, INGREDITENT_TYPE 은 각각 아이스크림 맛, 아이스크림의 성분 타입을 나타냅니다. 
INGREDIENT_TYPE에는 아이스크림의 주 성분이 설탕이면 sugar_based라고 입력되고, 아이스크림의 주 성분이 과일이면 fruit_based라고 입력됩니다. 
ICECREAM_INFO의 기본 키는 FLAVOR입니다. ICECREAM_INFO테이블의 FLAVOR는 FIRST_HALF 테이블의 FLAVOR의 외래 키입니다.
```

|NAME|TYPE|NULLABLE|
|:---|:---|:---|
|FLAVOR|VARCHAR(N)|FALSE|
|INGREDIENT_TYPE|VARCHAR(N)|FALSE|

## 문제

상반기 아이스크림 총주문량이 3,000보다 높으면서 아이스크림의 주 성분이 과일인 아이스크림의 맛을 총주문량이 큰 순서대로 조회하는 SQL 문을 작성해주세요.

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. first_half 테이블과 icream_info 테이블을 FLAVOR 을 기준으로 조인하여 가져온다.
2. 총 주문량이 3000보다 큰 경우와 주 성분이 과일인 아이스크림의 맛으로 필터링 한다.
3. 총 주문량을 내림차순한 결과에 대해 FLAVOR 값만 가져온다. 
```

## (2) 코드 작성
```sql
SELECT fh.FLAVOR
FROM first_half as fh
    INNER JOIN icecream_info as ii ON fh.FLAVOR = ii.FLAVOR
WHERE fh.TOTAL_ORDER > 3000
    AND ii.INGREDIENT_TYPE = "fruit_based"
ORDER BY fh.TOTAL_ORDER DESC
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰
- JOIN 을 사용하여 두 테이블을 FLAVOR 을 기준으로 합쳐주었다.
- WHERE 에 주문량 3000 초과, 주성분 과일맛 조건을 넣어주어 데이터를 필터링해 주었다.
- 데이터 출력은 FLAVOR만 하지만 순서는 총 주문량의 내림차순을 기준으로 한다.
- 코드는 만족한다.

<br>

***