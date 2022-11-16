---
title:  "[프로그래머스 SQL] Lv 4. 식품분류별 가장 비싼 식품의 정보 조회하기"
layout: single

categories: "Algorithm_SQL"
tags: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "JOIN", "MAX", "REGEXP"]

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
1. 식품분류별로 가장 비싼 식품 데이터를 불러오기 위해 
2. 
```

## (2) 코드 작성
```sql
SELECT T2.CATEGORY, T2.PRICE, T2.PRODUCT_NAME
FROM (
    SELECT CATEGORY, MAX(PRICE) AS MAX_PRICE
    FROM FOOD_PRODUCT
    GROUP BY CATEGORY
) AS T1 INNER JOIN FOOD_PRODUCT AS T2 ON T1.CATEGORY = T2.CATEGORY AND T1.MAX_PRICE = T2.PRICE
HAVING CATEGORY REGEXP '과자|국|김치|식용유'
ORDER BY PRICE DESC
```

## (3) 코드 리뷰 및 회고
- 이번 문제를 통해 GROUP BY를 이해할 수 있었다.
  - GROUP BY로 특정 변수로 묶고 연산(COUNT, SUM, MAX 등)을 사용하지 않으면 그룹별 첫 번째 데이터(행)이 불러와진다.
  - 이 점을 인식하지 못했을 때 카테고리별, 제일 비싼 식품가격과 그 식품의 이름을 불러왔는데 각 정보가 일치하지 않았다.
  - 예 : 맛동산이 2000원으로 가장 비싼 과자일 때, 위 코드로 데이터를 불러오면 2000원 짱구 라는 가격과 과자명이 일치하지 않은 데이터가 불러와졌다.

<br>

# <span class="half_HL">🌞 실패 코드 공유</span>


|PRODUCT_ID|	PRODUCT_NAME|	PRODUCT_CD|	CATEGORY|	PRICE|
|:---------|:--------------|:-------------|:--------|:-------|
|P0001|	맛있는라면|	CD_ND00001|	면|	3780|
|P0002|	맛있는비빔면|	CD_ND00002|	면|	3920|
|P0003|	맛있는짜장|	CD_ND00003	|면	|4950|
|P0004|	맛있는짬뽕|	CD_ND00004|	면	|4950|
|P0011|	맛있는콩기름|	CD_OL00001|	식용유|	4880|
|P0012|	맛있는올리브유|	CD_OL00002	|식용유|	7200|
|P0013|	맛있는포도씨유|	CD_OL00003|	식용유	|5950|
|P0014|	맛있는마조유|	CD_OL00004|	식용유|	8950|
|P0021|	맛있는케첩	|CD_SC00001	|소스|	4500|
|P0022|	맛있는마요네즈|	CD_SC00002|	소스|	4700|
|P0023|	맛있는핫소스	|CD_SC00003	|소스|	3950|
|P0024|	맛있는칠리소스	|CD_SC00004	|소스|	7950|
|P0031|	맛있는참치	|CD_CN00001|	캔|	1800|
|P0032|	맛있는꽁치	|CD_CN00002	|캔	|2100|
|P0033|	맛있는골뱅이|	CD_CN00003	|캔|	3950|
|P0034|	맛있는고등어|	CD_CN00004	|캔	|2950|
|P0041|	맛있는보리차|	CD_TE00001	|차|	3400|
|P0042|	맛있는메밀차|	CD_TE00002	|차	|3500|
|P0043|	맛있는아메리카노|	CD_TE00003|	차|	3950|
|P0044|	맛있는라떼|	CD_TE00004	|차	|4050|
|P0051|	맛있는배추김치|	CD_KC00001	|김치|	19000|
|P0052|	맛있는열무김치	|CD_KC00002	|김치|	17000|
|P0053|	맛있는파김치|	CD_KC00003	|김치|	17500|
|P0054|	맛있는백김치|	CD_KC00004	|김치|	16950|
|P0061|	맛있는생수|	CD_BR00001	|음료|	1100|
|P0062|	맛있는콜라|	CD_BR00002	|음료|	2700|
|P0063|	맛있는사이다	|CD_BR00003	|음료|	2450|
|P0064|	맛있는사과주스|	CD_BR00004	|음료|	3100|
|P0071|	맛있는미역국|	CD_SU00001	|국|	2400|
|P0072|맛있는소고기국	|CD_SU00002	|국|	2700|
|P0073|맛있는육개장|	CD_SU00003	|국|	2450|
|P0074|	맛있는김치찌개	|CD_SU00004	|국	|2900|
|P0081|	맛있는백미밥|	CD_RI00001	|밥|	1500|
|P0082|	맛있는현미밥|	CD_RI00002	|밥|	1800|
|P0083|	맛있는잡곡밥|	CD_RI00003	|밥|	1950|
|P0084|	맛있는완두콩밥|	CD_RI00004	|밥|	1900|
|P0091|	맛있는포카칩|	CD_CK00001	|과자|	1500|
|P0092|	맛있는고구마깡|	CD_CK00002	|과자|	1800|
|P0093|	맛있는허니버터칩|	CD_CK00003|	과자	|1950|
|P0094|	맛있는새우깡	|CD_CK00004	|과자	|1900|



<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}