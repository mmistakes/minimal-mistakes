---
title:  "[프로그래머스 SQL] Lv 3. 있었는데요 없었습니다"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "WHERE", "ORDER BY"]

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

관리자의 실수로 일부 동물의 입양일이 잘못 입력되었습니다. 보호 시작일보다 입양일이 더 빠른 동물의 아이디와 이름을 조회하는 SQL문을 작성해주세요. 이때 결과는 보호 시작일이 빠른 순으로 조회해야합니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59043)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT T2.ANIMAL_ID, T2.NAME
FROM ANIMAL_INS AS T1 
  RIGHT JOIN ANIMAL_OUTS AS T2 ON T1.ANIMAL_ID = T2.ANIMAL_ID
WHERE T1.DATETIME > T2.DATETIME
ORDER BY T1.DATETIME
```

## (2) 코드 리뷰 및 회고
- 두 테이블(보호소에 들어온 동물 정보/입양 보낸 동물 정보)를 동물의 ID를 기준으로 합치기 위해 ```JOIN``` 을 사용했다.
- ```RIGHT JOIN```을 사용한 이유는 T1(보호소에 들어온 동물 정보)에 NULL 값이 있기도 하고 T2의 전체 데이터를 불러와야하기 때문이다.
  - 하지만 입양일과 보호시작일을 비교하기 위해선 ```RIGHT JOIN``` 이 아닌 ```JOIN/INNER JOIN``` 을 사용해도 된다.
- 불러온 데이터에 대해 T1(보호소에 들어온 동물 정보)의 보호 시작일이 T2(입양 보낸 동물 정보)의 입양일보다 빠른 경우를 불러오기 위해 조건식을 작성했다.
- 출력할 데이터는 T2를 기준으로 불러왔는데, T1을 기준으로 불러와도 무방하다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
