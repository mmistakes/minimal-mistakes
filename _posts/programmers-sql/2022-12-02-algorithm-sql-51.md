---
title:  "[프로그래머스 SQL] Lv 2. 카테고리 별 상품 개수 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["GROUP BY", "ORDER BY", "LEFT", "COUNT"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - String, Date 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에서 판매중인 상품들의 정보를 담은 ```PRODUCT``` 테이블입니다. ```PRODUCT``` 테이블은 아래와 같은 구조로 되어있으며, ```PRODUCT_ID```, ```PRODUCT_CODE```, ```PRICE```는 각각 상품 ID, 상품코드, 판매가를 나타냅니다.

|Column name|	Type|	Nullable|
|:---------|:------|:-----------|
|PRODUCT_ID|	INTEGER|	FALSE|
|PRODUCT_CODE|	VARCHAR(8)|	FALSE|
|PRICE|	INTEGER|	FALSE|

상품 별로 중복되지 않는 8자리 상품코드 값을 가지며, 앞 2자리는 카테고리 코드를 의미합니다.

## 문제
```PRODUCT``` 테이블에서 상품 카테고리 코드(```PRODUCT_CODE``` 앞 2자리) 별 상품 개수를 출력하는 SQL문을 작성해주세요. 결과는 상품 카테고리 코드를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131529)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
1. CATEGORY 코드를 불러오기 위해 PRODUCT_CODE 컬럼에서 앞 2자리를 불러온다.
2. 카테고리별 상품의 개수를 출력한다.

## (2) 코드 작성
```sql
SELECT LEFT(PRODUCT_CODE, 2) AS CATEGORY, COUNT(*) AS PRODUCTS
FROM PRODUCT
GROUP BY CATEGORY
ORDER BY CATEGORY
```

## (3) 코드 리뷰 및 회고
- 특정 데이터를 왼쪽에서 n개를 잘라서 가져올 땐 ```LEFT(컬럼명, n)```를 사용하면 된다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
