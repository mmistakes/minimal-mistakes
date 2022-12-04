---
title:  "[프로그래머스 SQL] Lv 2. 가격대 별 상품 개수 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["CASE", "TRUNCATE", "LEFT", "COUNT", "GROUP BY", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에서 판매중인 상품들의 정보를 담은 ```PRODUCT``` 테이블입니다. ```PRODUCT``` 테이블은 아래와 같은 구조로 되어있으며, ```PRODUCT_ID```, ```PRODUCT_CODE```, ```PRICE```는 각각 상품 ID, 상품코드, 판매가를 나타냅니다.

|Column name|	Type	|Nullable|
|:---|:--|:--|
|PRODUCT_ID|	INTEGER	|FALSE|
|PRODUCT_CODE	|VARCHAR(8)	|FALSE|
|PRICE|	INTEGER	|FALSE|

상품 별로 중복되지 않는 8자리 상품코드 값을 가지며 앞 2자리는 카테고리 코드를 나타냅니다.

## 문제
```PRODUCT``` 테이블에서 만원 단위의 가격대 별로 상품 개수를 출력하는 SQL 문을 작성해주세요. 이때 컬럼명은 각각 컬럼명은 PRICE_GROUP, PRODUCTS로 지정해주시고 가격대 정보는 각 구간의 최소금액(10,000원 이상 ~ 20,000 미만인 구간인 경우 10,000)으로 표시해주세요. 결과는 가격대를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131530)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT CASE
         WHEN PRICE < 10000 THEN 0 ELSE TRUNCATE(PRICE, -4)
       END AS PRODUCT_GROUP, COUNT(*) AS PRODUCTS
FROM PRODUCT
GROUP BY PRODUCT_GROUP
ORDER BY PRODUCT_GROUP
```

## (2) 코드 리뷰 및 회고
- 이번 문제는 만원 단위로 그룹화하여 그 단위에 해당하는 상품의 개수를 출력하는 문제이다.
- 단위를 컬럼으로 불러오기 위해 ```//``` 등 연산기호를 많이 사용해보았지만 실패했다..
- 고민을 하다가 ```LEFT```로 앞자리를 불러오고 ```*10000 (곱하기)```로 불러올까 고민했다가 ```TRUNCATE``` 함수를 알게되었다.
- ```TRUNCATE``` 함수는 ```TRUNCATE(숫자, 버릴 자릿수)```의 기본구조를 가지고 있고, 소수점 둘째 자리 이하를 제거할 때 등에 사용된다.
  - ```TRUNCATE```로 소수점이 아닌 정수값 일부를 제거한다면 0으로 표현된다.(예를 들어 TRUNCATE(123456, -3) => 123000)

## (3) LEFT 활용 방안 공유
```sql
SELECT CASE
         WHEN PRICE < 10000 THEN 0 ELSE LEFT(PRICE, 1) * 10000
       END AS PRODUCT_GROUP, COUNT(*) AS PRODUCTS
FROM PRODUCT
GROUP BY PRODUCT_GROUP
ORDER BY PRODUCT_GROUP
```

- 우선 만원 미만의 금액은 0으로, 그 외의 값은 만원 단위만 불러오고 10000으로 곱하여 가격대 별로 상품 개수를 불러올 수 있도록 했다.
- 만약 십만원 이상의 단위가 존재한다면 위 방법은 적절하지 않고 ```TRUNCATE```를 사용하는 것이 좋다고 생각한다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
