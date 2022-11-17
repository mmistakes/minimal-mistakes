---
title:  "[프로그래머스 SQL] Lv 2. 성분으로 구분한 아이스크림 총 주문량"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "GROUP BY", "ORDER BY", "SUM"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 아이스크림 가게의 상반기 주문 정보를 담은 ```FIRST_HALF``` 테이블과 아이스크림 성분에 대한 정보를 담은 ```ICECREAM_INFO``` 테이블입니다. ```FIRST_HALF``` 테이블 구조는 다음과 같으며, ```SHIPMENT_ID```, ```FLAVOR```, ```TOTAL_ORDER``` 는 각각 아이스크림 공장에서 아이스크림 가게까지의 출하 번호, 아이스크림 맛, 상반기 아이스크림 총주문량을 나타냅니다. ```FIRST_HALF``` 테이블의 기본 키는 ```FLAVOR```입니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|SHIPMENT_ID	|INT(N)	|FALSE|
|FLAVOR	|VARCHAR(N)	|FALSE|
|TOTAL_ORDER	|INT(N)	|FALSE|

```ICECREAM_INFO``` 테이블 구조는 다음과 같으며, ```FLAVOR```, ```INGREDITENT_TYPE``` 은 각각 아이스크림 맛, 아이스크림의 성분 타입을 나타냅니다. ```INGREDIENT_TYPE```에는 아이스크림의 주 성분이 설탕이면 ```sugar_based```라고 입력되고, 아이스크림의 주 성분이 과일이면 ```fruit_based```라고 입력됩니다. ```ICECREAM_INFO```의 기본 키는 ```FLAVOR```입니다. ```ICECREAM_INFO```테이블의 ```FLAVOR```는 ```FIRST_HALF``` 테이블의 ```FLAVOR```의 외래 키입니다.

|NAME|	TYPE|	NULLABLE|
|:---|:----|:-----------|
|FLAVOR|VARCHAR(N)|	FALSE|
|INGREDIENT_TYPE|VARCHAR(N)|FALSE|

## 문제

<u>상반기 동안 각 아이스크림 성분 타입과 성분 타입에 대한 아이스크림의 총주문량을 총주문량이 작은 순서대로 조회</u>하는 SQL 문을 작성해주세요. 이때 <u>총주문량을 나타내는 컬럼명은 TOTAL_ORDER</u>로 지정해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/133026)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 두 테이블을 아이스크림 맛(FLAVOR)을 기준으로 묶기 위해 INNER JOIN을 사용한다.
2. 아이스크림 성분별 총 주문량을 조회하기 위해 아이스크림 성분(INGREDIENT_TYPE)으로 그룹화한다.
3. 총 주문량 조회를 위해 SUM 함수를 사용한다.
4. 데이터는 총 주문량을 오름차순으로 정렬한다.
```

## (2) 코드 작성
```sql
SELECT ii.INGREDIENT_TYPE, SUM(fh.TOTAL_ORDER)
FROM FIRST_HALF AS fh
  INNER JOIN ICECREAM_INFO AS ii ON fh.FLAVOR = ii.FLAVOR
GROUP BY ii.INGREDIENT_TYPE
ORDER BY SUM(fh.TOTAL_ORDER) ASC
```

## (3) 코드 리뷰 및 회고
- 이전에 ['식품분류별 가장 비싼 식품의 정보 조회하기'](https://j-jae0.github.io/algorithm_sql/algorithm-sql-24/) 문제를 푼 이후로 GROUP BY와 JOIN에 대한 이해를 완벽하게 해서 그런지 문제가 쉽게! 바로바로! 풀렸다.
- JOIN에는 INNER, RIGHT, LEFT, 등이 있는데 상황별로 어떤 JOIN을 사용하면 좋을지 공부해봐야겠다!  

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}