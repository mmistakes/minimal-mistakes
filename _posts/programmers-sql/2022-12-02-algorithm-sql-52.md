---
title:  "[프로그래머스 SQL] Lv 2. DATETIME에서 DATE로 형 변환"
layout: single

categories: "Algorithm_SQL"
tags: ["DATE_FORMAT", "ORDER BY"]

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
```ANIMAL_INS``` 테이블에 등록된 모든 레코드에 대해, 각 동물의 아이디와 이름, 들어온 날짜를 조회하는 SQL문을 작성해주세요. 이때 결과는 아이디 순으로 조회해야 합니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59414)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT ANIMAL_ID, NAME, DATE_FORMAT(DATETIME, '%Y-%m-%d') AS '날짜'
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## (2) 코드 리뷰 및 회고
- 기존 ```DATETIME``` 컬럼은 시간, 분, 초 정보도 포함하기 때문에 연, 월, 일 정보만 불러오기 위해 ```DATE_FORMAT``` 함수로 **DATE TYPE**으로 형 변환을 했다.
- 이번 문제는 이전에 ```DATE_FORMAT``` 함수를 많이 사용해봐서 쉽게 풀었다!
  - 참고 : 연도만 가져오기(```YEAR(컬럼명)```), 월만 가져오기(```MONTH(컬럼명)```), 일만 가져오기(```DAY(컬럼명)```)

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
