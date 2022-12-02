---
title:  "[프로그래머스 SQL] Lv 3. 조건별로 분류하여 주문상태 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: ["DATE_FORMAT", "CASE", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - String, Date 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 식품공장의 주문정보를 담은 ```FOOD_ORDER``` 테이블입니다. ```FOOD_ORDER``` 테이블은 다음과 같으며 ```ORDER_ID```, ```PRODUCT_ID```, ```AMOUNT```, ```PRODUCE_DATE```, ```IN_DATE,OUT_DATE```,```FACTORY_ID```, ```WAREHOUSE_ID```는 각각 주문 ID, 제품 ID, 주문양, 생산일자, 입고일자, 출고일자, 공장 ID, 창고 ID를 의미합니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|ORDER_ID|	VARCHAR(10)	|FALSE|
|PRODUCT_ID|	VARCHAR(5)|	FALSE|
|AMOUNT|	NUMBER|	FALSE|
|PRODUCE_DATE|	DATE|	TRUE|
|IN_DATE|	DATE|	TRUE|
|OUT_DATE|	DATE|	TRUE|
|FACTORY_ID	|VARCHAR(10)|	FALSE|
|WAREHOUSE_ID|	VARCHAR(10)|	FALSE|

## 문제
```FOOD_ORDER``` 테이블에서 5월 1일을 기준으로 주문 ID, 제품 ID, 출고일자, 출고여부를 조회하는 SQL문을 작성해주세요. 출고여부는 5월 1일까지 출고완료로 이 후 날짜는 출고 대기로 미정이면 출고미정으로 출력해주시고, 결과는 주문 ID를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131113)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
1. ```OUT_DATE``` 값이 NULL인 경우, '출고미정'이 출력되도록 조건문을 작성한다.
2. ```OUT_DATE``` 값이 5월 1일 이전(포함) 값은 '출고완료'가 출력되도록 조건문을 작성하고, 값이 5월 1일 이후이면 '출고대기
'가 출력되도록 한다.
3. 결과는 주문 ID를 기준으로 오름차순 정렬한다.

## (2) 코드 작성
```sql
SELECT ORDER_ID, PRODUCT_ID, DATE_FORMAT(OUT_DATE, '%Y-%m-%d') AS OUT_DATE,
       CASE
         WHEN OUT_DATE IS NULL THEN '출고미정' 
         WHEN DATE_FORMAT(OUT_DATE, '%m-%d') <= '05-01' THEN '출고완료' ELSE '출고대기'
       END AS '출고여부'
FROM FOOD_ORDER
ORDER BY ORDER_ID
```

## (3) 코드 리뷰 및 회고
- ```CASE - WHEN - THEN - ELSE - END``` 문을 사용하여 출고일이 빈 값이면 미정, 빈 값이 아닌 경우 특정 날짜를 기준으로 특정 조건을 만족하는 경우와 만족하지 않는 경우를 나누어 새로운 컬럼이 출력될 수 있도록 했다.
- 처음엔 한 컬럼에 대해 ```WHEN - THEN - ELSE``` 문을 한 줄로 써야하는 줄 알았는데 두 경우로 나누어서 작성해봤는데 출력이 잘 되었다! (기억하자.. 메모..)
- 지난번 [Null 처리하기](https://j-jae0.github.io/algorithm_sql/algorithm-sql-34/) 문제를 통해 CASE 문을 사용해봐서 그런지 이 문제를 보고 바로 CASE 구문을 사용해야겠다 !라는 생각이 들었다. :)
  - 역시 문제를 많이 풀어보고 ! 정리하고 ! 이해하고 ! 내 것으로 만들어야 되는 것 같다 !

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
