---
title:  "[프로그래머스 SQL] Lv 1. 아픈 동물 찾기"
layout: single

categories: "Algorithm_SQL"
tags: 
    - Algorithm
    - SQL

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

**SQL 고득점 Kit - SELECT 문제**
<br>

***

# 문제 설명

ANIMAL_INS 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다. 
<br>ANIMAL_INS 테이블 구조는 다음과 같으며, ANIMAL_ID, ANIMAL_TYPE, DATETIME, INTAKE_CONDITION, NAME, SEX_UPON_INTAKE는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|INTAKE_CONDITION|	VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE|	VARCHAR(N)|	FALSE|

동물 보호소에 들어온 동물 중 아픈 동물의 아이디와 이름을 조회하는 SQL 문을 작성해주세요. 
<br>이때 결과는 아이디 순으로 조회해주세요.
<br>아픈 동물은 ```INTAKE_CONDITION```이 Sick인 경우를 뜻함

본 문제는 Kaggle의 "Austin Animal Center Shelter Intakes and Outcomes"에서 제공하는 데이터를 사용하였으며 ODbL의 적용을 받습니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59036)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. ANIMAL_INS 테이블을 가져온다.
2. INTAKE_CONDITION이 Sick인 데이터를 가져온다.
3. 여러 컬럼 중 ANIMAL_ID, NAME 만 출력한다.
4. 출력 시 ANIMAL_ID를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE INTAKE_CONDITION = "Sick"
ORDER BY ANIMAL_ID
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- LGTM :)

<br>

