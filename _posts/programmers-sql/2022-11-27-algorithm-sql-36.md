---
title:  "[프로그래머스 SQL] Lv 4. 5월 식품들의 총매출 조회하기"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "SUM", "GROUP BY", "ORDER BY", "DATE_FORMAT", "WHERE"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - JOIN 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 식품의 정보를 담은 ```FOOD_PRODUCT``` 테이블과 식품의 주문 정보를 담은 ```FOOD_ORDER``` 테이블입니다. ```FOOD_PRODUCT``` 테이블은 다음과 같으며 ```PRODUCT_ID```, ```PRODUCT_NAME```, ```PRODUCT_CD```, ```CATEGORY```, ```PRICE```는 식품 ID, 식품 이름, 식품코드, 식품분류, 식품 가격을 의미합니다.

|Column name|	Type	|Nullable|
|:---------|:----------|:--------|
|PRODUCT_ID|	VARCHAR(10)|	FALSE|
|PRODUCT_NAME|	VARCHAR(50)|	FALSE|
|PRODUCT_CD|	VARCHAR(10)|	TRUE|
|CATEGORY|	VARCHAR(10)|	TRUE|
|PRICE|	NUMBER|	TRUE|

```FOOD_ORDER``` 테이블은 다음과 같으며 ```ORDER_ID```, ```PRODUCT_ID```, ```AMOUNT```, ```PRODUCE_DATE```, ```IN_DATE```, ```OUT_DATE```, ```FACTORY_ID```, ```WAREHOUSE_ID```는 각각 주문 ID, 제품 ID, 주문량, 생산일자, 입고일자, 출고일자, 공장 ID, 창고 ID를 의미합니다.

|Column name|	Type|	Nullable|
|:----|:----|:----|
|ORDER_ID|	VARCHAR(10)	|FALSE|
|PRODUCT_ID|	VARCHAR(5)|	FALSE|
|AMOUNT|	NUMBER|	FALSE|
|PRODUCE_DATE|	DATE|	TRUE|
|IN_DATE|	DATE|	TRUE|
|OUT_DATE	|DATE|	TRUE|
|FACTORY_ID	|VARCHAR(10)|	FALSE|
|WAREHOUSE_ID|	VARCHAR(10)|	FALSE|

## 문제
```FOOD_PRODUCT```와 ```FOOD_ORDER``` 테이블에서 생산일자가 2022년 5월인 식품들의 식품 ID, 식품 이름, 총매출을 조회하는 SQL문을 작성해주세요. 이때 결과는 총매출을 기준으로 내림차순 정렬해주시고 총매출이 같다면 식품 ID를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131117)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 두 테이블을 PRODUCT_ID를 기준으로 합치기 위해 JOIN 을 사용한다.
2. FOOD_ORDER 테이블을 불러올 때 생산일자가 '2022-05'인 것만 가져오고 식품ID로 그룹화 및 총 주문량 정보를 가져온다.
3. 총 매출량은 총 주문량 * 단가로 계산한다.
```

## (2) 코드 작성
```sql
SELECT T1.PRODUCT_ID, T1.PRODUCT_NAME, T2.AMOUNT * T1.PRICE AS TOTAL_SALES
FROM FOOD_PRODUCT AS T1 
INNER JOIN (
    SELECT PRODUCT_ID, SUM(AMOUNT) AS AMOUNT
    FROM FOOD_ORDER
    WHERE DATE_FORMAT(PRODUCE_DATE, '%Y-%m') = '2022-05'
    GROUP BY PRODUCT_ID
) AS T2 ON T1.PRODUCT_ID = T2.PRODUCT_ID
ORDER BY TOTAL_SALES DESC, T2.PRODUCT_ID
```

## (3) 코드 리뷰 및 회고
- ```JOIN``` 으로 테이블을 결합할 때, ```SELECT, FROM, ~``` 문을 사용해 기존의 테이블을 약간의 변형 후에 가져올 수 있다는 점을 기억해야겠다.
- 풀이 방법에 대한 고민을 많이 했던 문제였다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}