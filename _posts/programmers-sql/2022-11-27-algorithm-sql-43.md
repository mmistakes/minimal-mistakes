---
title:  "[프로그래머스 SQL] Lv 2. 상품 별 오프라인 매출 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "GROUP BY", "SUM", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - JOIN 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에서 판매중인 상품들의 상품 정보를 담은 ```PRODUCT``` 테이블과 오프라인 상품 판매 정보를 담은 ```OFFLINE_SALE``` 테이블 입니다. ```PRODUCT``` 테이블은 아래와 같은 구조로 ```PRODUCT_ID```, ```PRODUCT_CODE```, ```PRICE```는 각각 상품 ID, 상품코드, 판매가를 나타냅니다.

|Column name|	Type|	Nullable|
|:-----|:-----|:-----|
|PRODUCT_ID|	INTEGER|	FALSE|
|PRODUCT_CODE|	VARCHAR(8)|	FALSE|
|PRICE|	INTEGER|	FALSE|

상품 별로 중복되지 않는 8자리 상품코드 값을 가지며, 앞 2자리는 카테고리 코드를 의미합니다.

```OFFLINE_SALE``` 테이블은 아래와 같은 구조로 되어있으며 ```OFFLINE_SALE_ID```, ```PRODUCT_ID```, ```SALES_AMOUNT```, ```SALES_DATE```는 각각 오프라인 상품 판매 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column name|	Type	|Nullable|
|:-----|:-----|:-----|
|OFFLINE_SALE_ID|	INTEGER|	FALSE|
|PRODUCT_ID|	INTEGER	|FALSE|
|SALES_AMOUNT|	INTEGER	|FALSE|
|SALES_DATE|	DATE|	FALSE|

동일한 날짜, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

## 문제
```PRODUCT``` 테이블과 ```OFFLINE_SALE``` 테이블에서 상품코드 별 매출액(판매가 * 판매량) 합계를 출력하는 SQL문을 작성해주세요. 결과는 매출액을 기준으로 내림차순 정렬해주시고 매출액이 같다면 상품코드를 기준으로 오름차순 정렬해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131533)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. PRODUCT, OFFLINE_SALE 테이블을 상품 ID를 기준으로 JOIN 한다.
2. OFFLINE_SALE 테이블엔 상품 ID에 대해 여러 데이터가 존재하기 때문에 불러올 때 GROUP BY로 묶은 뒤, ID별로 총 판매량을 불러온다.
3. 출력할 정보인 상품 ID, 매출액(상품 단가*총 판매량)을 SELECT 문에 작성한다.
4. 매출액을 기준으로 내림차순 정렬하고, 매출액이 같다면 상품 코드를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT T1.PRODUCT_CODE, T1.PRICE * T2.AMOUNT AS SALES
FROM PRODUCT AS T1
 INNER JOIN (SELECT PRODUCT_ID, SUM(SALES_AMOUNT) AS AMOUNT
             FROM OFFLINE_SALE
             GROUP BY PRODUCT_ID) AS T2 ON T1.PRODUCT_ID = T2.PRODUCT_ID
ORDER BY SALES DESC, T1.PRODUCT_CODE
```

## (3) 코드 리뷰 및 회고
- ```PRODUCT``` 테이블에 ```OFFLINE_SALE``` 테이블을 상품 ID를 기준으로 ```JOIN``` 할 때, ```SELECT-FROM-GROUP BY```로 테이블에서 원하는 정보만 가져왔다.
- ```SELECT``` 문에 사칙연산 기호를 사용하여 불러올 수 있다는 점을 기억하자.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
