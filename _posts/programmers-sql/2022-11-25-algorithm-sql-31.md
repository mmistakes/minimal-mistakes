---
title:  "[프로그래머스 SQL] Lv 1. 경기도에 위치한 식품창고 목록 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: ["CASE", "IS NULL", "WHERE", "LIKE"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - IS NULL 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 식품창고의 정보를 담은 ```FOOD_WAREHOUSE``` 테이블입니다. ```FOOD_WAREHOUSE``` 테이블은 다음과 같으며 ```WAREHOUSE_ID```, ```WAREHOUSE_NAME```, ```ADDRESS```, ```TLNO```, ```FREEZER_YN```는 창고 ID, 창고 이름, 창고 주소, 전화번호, 냉동시설 여부를 의미합니다.

|Column name|	Type|	Nullable|
|:----------|:------|:----------|
|WAREHOUSE_ID|	VARCHAR(10)|	FALSE|
|WAREHOUSE_NAME|	VARCHAR(20)	|FALSE|
|ADDRESS|	VARCHAR(100)|	TRUE|
|TLNO|	VARCHAR(20)	|TRUE|
|FREEZER_YN|	VARCHAR(1)|	TRUE|

## 문제
```FOOD_WAREHOUSE``` 테이블에서 경기도에 위치한 창고의 ID, 이름, 주소, 냉동시설 여부를 조회하는 SQL문을 작성해주세요. 이때 냉동시설 여부가 NULL인 경우, 'N'으로 출력시켜 주시고 결과는 창고 ID를 기준으로 오름차순 정렬해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131114)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 냉동시설 여부가 NULL 인 경우, 'N'으로 출력하기 위해 CASE 절을 사용한다.
2. 경기도에 위치한 창고 정보만 출력하기 위해 WHERE 절과 LIKE 연산자를 사용한다 
```

## (2) 코드 작성
```sql
SELECT WAREHOUSE_ID, WAREHOUSE_NAME, ADDRESS,
       CASE 
           WHEN FREEZER_YN IS NULL THEN 'N' ELSE FREEZER_YN
       END AS FREEZER_YN
FROM FOOD_WAREHOUSE
WHERE ADDRESS LIKE '경기도%'
```

## (3) 코드 리뷰 및 회고
- ```NULL``` 값을 'N'으로 출력하기 위해 ```CASE``` 문을 사용했다.
- ```CASE```문을 사용할 때 ```NULL```이 아닌 경우는 기존 데이터('N', 'Y')가 출력될 수 있도록 ```FREEZER_YN```를 넣어주었다.
- ```CASE```문을 까먹기 직전이었는데 이번 문제를 통해 사용법을 조금 익혔다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
