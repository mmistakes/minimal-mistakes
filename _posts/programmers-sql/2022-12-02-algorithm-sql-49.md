---
title:  "[프로그래머스 SQL] Lv 2. 중성화 여부 파악하기"
layout: single

categories: "Algorithm_SQL"
tags: ["REGEXP", "CASE", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - String, Date 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
```ANIMAL_INS``` 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다. ```ANIMAL_INS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```INTAKE_CONDITION```, ```NAME```, ```SEX_UPON_INTAKE```는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|INTAKE_CONDITION|	VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE|	VARCHAR(N)|	FALSE|

## 문제
보호소의 동물이 중성화되었는지 아닌지 파악하려 합니다. 중성화된 동물은 ```SEX_UPON_INTAKE``` 컬럼에 'Neutered' 또는 'Spayed'라는 단어가 들어있습니다. 동물의 아이디와 이름, 중성화 여부를 아이디 순으로 조회하는 SQL문을 작성해주세요. 이때 중성화가 되어있다면 'O', 아니라면 'X'라고 표시해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59409)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
1. 중성화된 동물은 ```SEX_UPON_INTAKE``` 컬럼에서 'Neutered' 또는 'Spayed'로 시작되기 때문에 REGEXP로 두 경우를 만족하는 경우 'O', 만족하지 않는 경우 'X'가 출력될 수 있도록 한다.
2. 출력할 데이터는 동물의 ID를 기준으로 오름차순 정렬한다.

## (2) 코드 작성
```sql
SELECT ANIMAL_ID, NAME,
       CASE 
         WHEN SEX_UPON_INTAKE REGEXP '^[Neutered|Spayed]' THEN 'O' ELSE 'X'
       END AS '중성화'
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## (3) 코드 리뷰 및 회고
- ```CASE - WHEN - THEN - ELSE - END``` 구문을 사용하여 특정 경우에 대해 다른 출력값을 반환할 수 있도록 하였다.
- ```REGEXP '^[Neutered|Spayed]'``` 에서 ```^[]```는 대괄호 안에 들어가는 단어로 시작되는 경우, 조건식이 True가 된다. 
- ```|``` 를 사용하여 두 경우를 만족할 수 있도록 설정했다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
