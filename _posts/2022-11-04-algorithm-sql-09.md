---
title:  "[SQL] 프로그래머스 Lv 1. 모든 레코드 조회하기, 역순 정렬하기"
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

# 데이터 정보

> ANIMAL_INS 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다.<br>
<br>ANIMAL_INS 테이블 구조는 다음과 같으며, ANIMAL_ID, ANIMAL_TYPE, DATETIME, INTAKE_CONDITION, NAME, SEX_UPON_INTAKE는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:---|:---|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME	|DATETIME	|FALSE|
|INTAKE_CONDITION|	VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE|	VARCHAR(N)	|FALSE|

- 본 문제는 Kaggle의 ["Austin Animal Center Shelter Intakes and Outcomes"](https://www.kaggle.com/datasets/aaronschlegel/austin-animal-center-shelter-intakes-and-outcomes)에서 제공하는 데이터를 사용하였으며 [ODbL](https://opendatacommons.org/licenses/odbl/1-0/)의 적용을 받습니다.

<br>

***

# 1번 문제 : 모든 레코드 조회하기

> 동물 보호소에 들어온 모든 동물의 정보를 ANIMAL_ID순으로 조회하는 SQL문을 작성해주세요. SQL을 실행하면 다음과 같이 출력되어야 합니다.

|ANIMAL_ID	|ANIMAL_TYPE	|DATETIME	|INTAKE_CONDITION|	NAME|	SEX_UPON_INTAKE|
|:---|:---|:---|:---|:---|:---|
|A349996|Cat|2018-01-22 14:32:00|Normal|Sugar|Neutered Male|
|A350276|Cat|2017-08-13 13:50:00|Normal|Jewel|Spayed Female|
|A350375|Cat|2017-03-06 15:01:00|Normal|Meo|Neutered Male|
|A352555|Dog|2014-08-08 04:20:00|Normal|Harley|Spayed Female|

..이하 생략

- [👉 문제(모든 레코드 조회하기) 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59034)

<br>

## 문제 풀이
### (1) 코드 작성

```sql
SELECT *
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

### (2) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

### (3) 코드 리뷰 및 회고
- 이번 문제는 매우 쉬웠다.

<br>

***

# 2번 문제 : 역순 정렬하기

> 동물 보호소에 들어온 모든 동물의 이름과 보호 시작일을 조회하는 SQL문을 작성해주세요. <br></br>이때 결과는 ANIMAL_ID 역순으로 보여주세요. SQL을 실행하면 다음과 같이 출력되어야 합니다.

|NAME	|DATETIME|
|:----|:---|
|Rocky	|2016-06-07 09:17:00|
|Shelly	|2015-01-29 15:01:00|
|Benji|	2016-04-19 13:28:00|
|Jackie	|2016-01-03 16:25:00|
|*Sam|	2016-03-13 11:17:00|

..이하 생략

- [👉 문제(역순 정렬하기) 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59035)

<br>

## 문제 풀이
### (1) 코드 작성

```sql
SELECT NAME, DATETIME
FROM ANIMAL_INS
ORDER BY ANIMAL_ID DESC
```

### (2) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

### (3) 코드 리뷰 및 회고
- 이번 문제는 매우 쉬웠다.
- 이전 ```모든 레코드 조회하기``` 문제에 정렬조건을 내림차순 으로 바꿔준 것이 다이다!

<br>