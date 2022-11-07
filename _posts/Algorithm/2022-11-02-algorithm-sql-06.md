---
title:  "[프로그래머스 SQL] Lv 4. 서울에 위치한 식당 목록 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: 
    - Algorithm
    - SQL

toc: true
toc_sticky: true
toc_label : "목차"
---

**SQL 고득점 Kit - SELECT 문제**
<br>

***
# 문제 설명


> 다음은 식당의 정보를 담은 REST_INFO 테이블과 식당의 리뷰 정보를 담은 REST_REVIEW 테이블입니다. <br>
<br>REST_INFO 테이블은 다음과 같으며 REST_ID, REST_NAME, FOOD_TYPE, VIEWS, FAVORITES, PARKING_LOT, ADDRESS, TEL은 식당 ID, 식당 이름, 음식 종류, 조회수, 즐겨찾기수, 주차장 유무, 주소, 전화번호를 의미합니다.


|Column name|	Type|	Nullable|
|:---|:---|:---|
|REST_ID	|VARCHAR(5)|	FALSE|
|REST_NAME	|VARCHAR(50)	FALSE|
|FOOD_TYPE|	VARCHAR(20)|	TRUE|
|VIEWS|	NUMBER|	TRUE|
|FAVORITES|	NUMBER|	TRUE|
|PARKING_LOT|	VARCHAR(1)|	TRUE|
|ADDRESS|	VARCHAR(100)|	TRUE|
|TEL	|VARCHAR(100)|	TRUE|


> REST_REVIEW 테이블은 다음과 같으며 REVIEW_ID, REST_ID, MEMBER_ID, REVIEW_SCORE, REVIEW_TEXT,REVIEW_DATE는 각각 리뷰 ID, 식당 ID, 회원 ID, 점수, 리뷰 텍스트, 리뷰 작성일을 의미합니다.


|Column name|	Type|	Nullable|
|:---|:---|:---|
|REVIEW_ID|	VARCHAR(10)|	FALSE|
|REST_ID|	VARCHAR(10)|	TRUE|
|MEMBER_ID|	VARCHAR(100)|	TRUE|
|REVIEW_SCORE|	NUMBER|	TRUE|
|REVIEW_TEXT|	VARCHAR(1000)|	TRUE|
|REVIEW_DATE|	DATE|	TRUE|

## 문제
- REST_INFO와 REST_REVIEW 테이블에서 서울에 위치한 식당들의 식당 ID, 식당 이름, 음식 종류, 즐겨찾기수, 주소, 리뷰 평균 점수를 조회하는 SQL문을 작성해주세요. 
- 이때 리뷰 평균점수는 소수점 세 번째 자리에서 반올림 해주시고 결과는 평균점수를 기준으로 내림차순 정렬해주시고, 평균점수가 같다면 즐겨찾기수를 기준으로 내림차순 정렬해주세요.
- [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131118)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. 주소가 서울을 포함하고 있는 데이터를 가져온다 (WHERE)
2. 평균 점수는 AVG로 가져오고, 반올림(ROUND) 하여 소수점 2자리 수로 가져온다
3. 평균점수를 기준으로 내림차순으로 정렬하고, 평균점수가 같다면 즐겨찾기 수로 내림차순 정렬한다. (ORDER BY - DESC)
```

## (2) 코드 작성
```sql
SELECT ri.REST_ID, ri.REST_NAME, ri.FOOD_TYPE
     , ri.FAVORITES, ri.ADDRESS
     , ROUND(AVG(rr.REVIEW_SCORE), 2) AS SCORE
FROM REST_INFO AS ri
    INNER JOIN REST_REVIEW AS rr ON ri.REST_ID = rr.REST_ID
WHERE ri.ADDRESS LIKE '서울%'
GROUP BY ri.REST_ID
ORDER BY SCORE DESC, FAVORITES DESC
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- 강원도에 위치한 공장 정보를 가져오기 위해, 'LIKE' 를 사용하였다.
- LIKE 로 강원도 정보를 불러올 때, 데이터는 '강원도 정선군 ~ '와 같은 형식이기 때문에 %를 사용하여 불러왔다.
- 코드는 만족한다.

<br>

