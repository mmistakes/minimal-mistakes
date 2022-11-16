---
title:  "[프로그래머스 SQL] Lv 4. 식품분류별 가장 비싼 식품의 정보 조회하기"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "GROUP BY", "HAVING", "ORDER BY", "JOIN", "MAX", "REGEXP"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"

published: false
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 식품의 정보를 담은 ```FOOD_PRODUCT``` 테이블입니다. ```FOOD_PRODUCT``` 테이블은 다음과 같으며 ```PRODUCT_ID```, ```PRODUCT_NAME```, ```PRODUCT_CD```, ```CATEGORY```, ```PRICE```는 식품 ID, 식품 이름, 식품코드, 식품분류, 식품 가격을 의미합니다.

|Column name|	Type|	Nullable|
|:----------|:------|:----------|
|PRODUCT_ID|	VARCHAR(10)|	FALSE|
|PRODUCT_NAME|	VARCHAR(50)|	FALSE|
|PRODUCT_CD|	VARCHAR(10)|	TRUE|
|CATEGORY|	VARCHAR(10)|	TRUE|
|PRICE|	NUMBER	|TRUE|

## 문제
```FOOD_PRODUCT``` 테이블에서 식품분류별로 가격이 제일 비싼 식품의 분류, 가격, 이름을 조회하는 SQL문을 작성해주세요. 이때 식품분류가 '과자', '국', '김치', '식용유'인 경우만 출력시켜 주시고 결과는 식품 가격을 기준으로 내림차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131116)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 식품분류별로 가장 비싼 식품 정보를 가져오기 위해 GROUP BY로 카테고리를 그룹화한다.
2. 가져올 식품분류는 과자, 국, 김치, 식용유만 들고오기 위해 WHERE 또는 HAVING 문을 사용한다.
3. 데이터는 가격을 기준으로 정렬하고, 카테고리, 가장 비싼 식품의 가격(MAX), 이름을 불러온다.
```

## (2) 코드 작성
```sql
SELECT T2.CATEGORY, T2.PRICE, T2.PRODUCT_NAME
FROM (
    SELECT CATEGORY, MAX(PRICE) AS MAX_PRICE
    FROM FOOD_PRODUCT
    GROUP BY CATEGORY
) AS T1 JOIN FOOD_PRODUCT AS T2 ON T1.CATEGORY = T2.CATEGORY AND T1.MAX_PRICE = T2.PRICE
HAVING CATEGORY REGEXP '과자|국|김치|식용유'
ORDER BY PRICE DESC
```

## (3) 코드 리뷰 및 회고
- ```FROM``` 으로 테이블을 불러올 때, ```SELECT-FROM-GROUP BY``` 문을 사용해서 특정 데이터를 불러올 수 있다.
- ```REGEXP```를 사용하여 코드를 간단하게 작성했다. (CATEGORY = "과자" OR ... 를 사용했을 경우보다)
- ```CATEGORY```로 그룹화하여 집계함수(```count```, ```sum```, 등)을 사용하지 않고 특정 정보를 불러올 때 ```SELF JOIN```을 사용하면 된다.
- 해당 문제에서 과자, 국, 김치, 식용유 카테고리만 가져올 때 ```WHERE``` 또는 ```HAVING``` 문을 사용할 수 있다.
  - ```WHERE``` : 그룹화하기전에 품목을 과자, 국, 김치, 식용유로 설정해서 그룹화 해도 된다.
  - ```HAVING``` : 전체 카테고리에 대해 그룹화하고 과자, 국, 김치, 식용유만 가져온다고 설정해도 된다.

<br>

# <span class="half_HL">🌞 실패 코드 공유</span>
```sql
SELECT CATEGORY, MAX(PRICE) as MAX_PRICE, PRODUCT_NAME
FROM FOOD_PRODUCT
WHERE CATEGORY REGEXP '과자|국|김치|식용유'
GROUP BY CATEGORY
ORDER BY PRICE DESC
```

## 1. 실패 분석
### (1) GROUP BY에 대한 낮은 이해도
```GROUP BY```로 특정 변수를 그룹화하면 그 그룹에 대한 데이터는 한 개(행이 하나로 표현)로 요약된다. 문제를 풀 때, 이 점을 생각하지 못하여 계속 실패 sign이 떴다.<br>

### (2) 예시로 실패 분석하기

아래 데이터(테이블명:```DELIVERY_SERVICE```)는 실패 경험을 분석하기 위해 임의로 만든 것입니다. ```USER_ID```, ```ORDER_ID```, ```FOOD_CATEGORY```, ```FOOD_COST```, ```DELIVERY_COST```, ```TOTAL_COSTS```, ```PAY```는 각각 고객ID, 주문번호, 음식종류, 음식가격, 배달비용, 총결제금액, 결제여부을 뜻합니다.<br><br>
결제여부(```PAY```)는 배달서비스 내에서 선결제 시 ```Y```, 후결제 시(만나서 결제) ```N```를 의미합니다.


|USER_ID|ORDER_ID|FOOD_CATEGORY|FOOD_COST|DELIVERY_COST|TOTAL_COSTS|PAY|
|:------|:-------|:------------|:--------|:------------|:----------|:--|
|A00001|A00001221116|한식|10000|3000|13000|N|
|A00002|A00002221116|한식|15000|3500|18500|Y|
|A00003|A00003221116|양식|35000|3000|38000|Y|
|A00004|A00004221116|양식|135000|0|135000|Y|
|A00005|A00005221116|양식|65000|1000|66000|N|
|A00006|A00006221116|일식|20000|6000|26000|Y|


**🔍 음식 카테고리를 그룹화 하기**
```sql
SELECT *
FROM DELIVERY_SERVICE
GROUP BY FOOD_CATEGORY
```

|USER_ID|ORDER_ID|FOOD_CATEGORY|FOOD_COST|DELIVERY_COST|TOTAL_COSTS|PAY|
|:------|:-------|:------------|:--------|:------------|:----------|:--|
|A00001|A00001221116|한식|10000|3000|13000|N|
|A00003|A00003221116|양식|35000|3000|38000|Y|
|A00006|A00006221116|일식|20000|6000|26000|Y|

<u>그룹화 후, 전체 데이터(*)를 불러오면 그룹별로 첫 번째 행만 가져온다.</u>

**🔍 음식 카테고리, 최고금액, 결제여부 가져오기**
```sql
SELECT FOOD_CATEGORY, MAX(TOTAL_COSTS), PAY
FROM DELIVERY_SERVICE
GROUP BY FOOD_CATEGORY
```

|FOOD_CATEGORY|TOTAL_COSTS|PAY|
|:------------|:----------|:--|
|한식|18500|N|
|양식|135000|Y|
|일식|26000|Y|

위 결과를 보면 이상한 점을 발견할 수 있다.<br>
분명 18500원을 결제한 데이터는 결제여부(```PAY```)가 선결제인데 불러와진 데이터를 보면 N로 조회된다. 이는 그룹화한 카테고리를 기준으로 나머지 컬럼은 MAX, SUM 등의 함수 사용이 없으면 그대로 있는다. <br>

<u>이러한 이유로 위 실패 코드를 사용하여 문제를 풀면 1950원짜리 과자 이름이 맛있는허니버터칩인데 맛있는포카칩으로 불러와진다. 8950원짜리 맛있는마조유가 맛있는 콩기름으로 조회된다.</u>

## (2) 실패 회고
- 이번 문제를 통해 ```GROUP BY```를 이해할 수 있었다.
- GROUP BY로 특정 변수로 그룹화 후, 연산(```COUNT```, ```SUM```, ```MAX``` 등)을 사용하지 않으면 그룹별 첫 번째 데이터(행)이 불러와진다.
- 자신의 테이블을 참조하는 셀프 조인을 통해 위 문제를 해결했다.
- 이번 기회로 ```GROUP BY```, ```JOIN``` 에 대한 개념정리를 해보아야겠다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}