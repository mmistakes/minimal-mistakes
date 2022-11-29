---
title:  "[프로그래머스 SQL] Lv 3. 오랜 기간 보호한 동물(1)"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "IS NULL", "ORDER BY", "LIMIT", "WHERE"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - JOIN 문제</small>

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

```ANIMAL_OUTS``` 테이블은 동물 보호소에서 입양 보낸 동물의 정보를 담은 테이블입니다. ```ANIMAL_OUTS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```NAME```, ```SEX_UPON_OUTCOME```는 각각 동물의 아이디, 생물 종, 입양일, 이름, 성별 및 중성화 여부를 나타냅니다. ```ANIMAL_OUTS``` 테이블의 ```ANIMAL_ID```는 ```ANIMAL_INS```의 ```ANIMAL_ID```의 외래 키입니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_OUTCOME|	VARCHAR(N)|	FALSE|

아직 입양을 못 간 동물 중, 가장 오래 보호소에 있었던 동물 3마리의 이름과 보호 시작일을 조회하는 SQL문을 작성해주세요. 이때 결과는 보호 시작일 순으로 조회해야 합니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59044)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT T1.NAME, T1.DATETIME
FROM ANIMAL_INS AS T1
 LEFT JOIN ANIMAL_OUTS AS T2 ON T1.ANIMAL_ID = T2.ANIMAL_ID
WHERE T2.ANIMAL_ID IS NULL
ORDER BY T1.DATETIME
LIMIT 3
```

## (2) 코드 리뷰 및 회고
- 입양을 가지 못한 동물 데이터를 불러오기 위해 T2(입양 보낸 동물 정보)는 NULL 이어도 T1(보호소에 들어온 동물 정보)는 NULL이 아니어야한다.
- T2에 데이터가 없어도 T1의 정보가 유실되지 않도록하기 위해 ```LEFT JOIN```을 사용했다.
- 불러온 데이터에 대해 T2의 정보가 없는 조건을 만족시키기 위해 T2에 ```ANIMAL_ID```가 없는 경우를 기입했다.
- 데이터는 보호소에 들어온 일자를 기준으로 오름차순 정렬했고, 상위 3개만 가져오기 위해 ```LIMIT 3```을 입력했다.
- 두 데이터를 어떤 변수를 기준으로 결합할 때, 합집합, 교집합, 차집합 등을 잘 고민해서 적절한 ```JOIN``` 문을 사용해야겠다!

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
