---
title:  "[프로그래머스 SQL] Lv 3. 즐겨찾기가 가장 많은 식당 정보 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: []

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 식당의 정보를 담은 ```REST_INFO``` 테이블입니다. ```REST_INFO``` 테이블은 다음과 같으며 ```REST_ID```, ```REST_NAME```, ```FOOD_TYPE```, ```VIEWS```, ```FAVORITES```, ```PARKING_LOT```, ```ADDRESS```, ```TEL```은 식당 ID, 식당 이름, 음식 종류, 조회수, 즐겨찾기수, 주차장 유무, 주소, 전화번호를 의미합니다.

|Column name|	Type|	Nullable|
|:----------|:------|:----------|
|REST_ID|	VARCHAR(5)|	FALSE|
|REST_NAME|	VARCHAR(50)	|FALSE|
|FOOD_TYPE|	VARCHAR(20)	|TRUE|
|VIEWS|	NUMBER|	TRUE|
|FAVORITES|	NUMBER|	TRUE|
|PARKING_LOT|	VARCHAR(1)|	TRUE|
|ADDRESS|	VARCHAR(100)|	TRUE|
|TEL	|VARCHAR(100)|	TRUE|

## 문제
```REST_INFO``` 테이블에서 음식종류별로 즐겨찾기수가 가장 많은 식당의 음식 종류, ID, 식당 이름, 즐겨찾기수를 조회하는 SQL문을 작성해주세요. 이때 결과는 음식 종류를 기준으로 내림차순 정렬해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131123)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 음식종류별 즐겨찾기수가 가장 많은 식당 데이터를 불러오기 위해 T1로 기존 데이터의 일부를 가져온다.
2. T1과 T2를 SELF JOIN을 통해 음식종류별, 즐겨찾기수가 같은 데이터를 기준으로 연결한다.
3. SELF JOIN으로 만든 데이터에 대해 원하는 컬럼만 조회될 수 있도록 SELECT 문을 완성한다.
4. 데이터는 음식종류를 기준으로 내림차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT T2.FOOD_TYPE, T2.REST_ID, T2.REST_NAME, T2.FAVORITES
FROM (
      SELECT FOOD_TYPE, MAX(FAVORITES) AS FAVORITES
      FROM REST_INFO
      GROUP BY FOOD_TYPE
) AS T1 INNER JOIN REST_INFO AS T2 ON T1.FOOD_TYPE = T2.FOOD_TYPE AND T1.FAVORITES = T2.FAVORITES
ORDER BY T2.FOOD_TYPE DESC
```

## (3) 코드 리뷰 및 회고
- 이전에 ['식품분류별 가장 비싼 식품의 정보 조회하기'](https://j-jae0.github.io/algorithm_sql/algorithm-sql-24/) 문제를 푼 이후로 GROUP BY와 JOIN에 대한 이해를 완벽하게 해서 그런지 문제가 쉽게! 바로바로! 풀렸다.
- SELF JOIN의 적용사례를 참고하여 JOIN과 더 친해져봐야겠다!

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}