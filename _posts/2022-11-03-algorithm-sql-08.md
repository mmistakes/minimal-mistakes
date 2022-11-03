---
title:  "[SQL] 프로그래머스 Lv 2. 재구매가 일어난 상품과 회원 리스트 구하기"
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

> 다음은 어느 의류 쇼핑몰의 온라인 상품 판매 정보를 담은 ONLINE_SALE 테이블 입니다.<br> <br>ONLINE_SALE 테이블은 아래와 같은 구조로 되어있으며 ONLINE_SALE_ID, USER_ID, PRODUCT_ID, SALES_AMOUNT, SALES_DATE는 각각 온라인 상품 판매 ID, 회원 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|ONLINE_SALE_ID|	INTEGER|	FALSE|
|USER_ID|	INTEGER	|FALSE|
|PRODUCT_ID	|INTEGER|	FALSE|
|SALES_AMOUNT|	INTEGER|	FALSE|
|SALES_DATE	|DATE|	FALSE|

> 동일한 날짜, 회원 ID, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

## 문제
- ONLINE_SALE 테이블에서 동일한 회원이 동일한 상품을 재구매한 데이터를 구하여, 재구매한 회원 ID와 재구매한 상품 ID를 출력하는 SQL문을 작성해주세요. 
- 결과는 회원 ID를 기준으로 오름차순 정렬해주시고 회원 ID가 같다면 상품 ID를 기준으로 내림차순 정렬해주세요.
- [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131536)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. 동일한 회원, 동일한 상품 컬럼을 GROUP BY 로 묶는다.
2. GROUP BY 로 묶은 값을 기준으로 행이 2개 이상인 데이터만 가져올 수 있도록 HAVING 문을 사용한다.
3. 데이터에 대해 고객ID 오름차순, 상품ID 내림차순(DESC) 정렬한다.
```

## (2) 코드 작성
```sql
SELECT USER_ID, PRODUCT_ID
FROM ONLINE_SALE
GROUP BY USER_ID, PRODUCT_ID
HAVING COUNT(*) > 1
ORDER BY USER_ID, PRODUCT_ID DESC
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- 이번 문제는 고민을 조금 많이 했다.
- 동일한 고객, 동일한 상품을 재구매한 데이터를 가져올 수 있는 방법에 대해 고민을 많이했다.
- 두 조건에 대한 데이터를 가져올 수 있도록, 두 컬럼을 그룹바이로 묶어서 해결하였다.
- 또한, 그룹바이 한 결과에 대해, 행의 개수가 2개 이상인 조건을 걸어주기 위해 HAVING 문을 사용하였다.
- 문제를 해결해서 뿌듯하다.🔥

<br>

***
