---
title:  "[프로그래머스 SQL] Lv 3. 없어진 기록 찾기"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "IS NULL"]

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

천재지변으로 인해 일부 데이터가 유실되었습니다. 입양을 간 기록은 있는데, 보호소에 들어온 기록이 없는 동물의 ID와 이름을 ID 순으로 조회하는 SQL문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59042)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT T2.ANIMAL_ID, T2.NAME
FROM ANIMAL_INS AS T1
 RIGHT JOIN ANIMAL_OUTS AS T2 ON T1.ANIMAL_ID = T2.ANIMAL_ID
WHERE T1.ANIMAL_ID IS NULL
```

## (2) 코드 리뷰 및 회고
- 두 테이블(보호소에 들어온 동물 정보/입양 보낸 동물 정보)를 동물의 ID를 기준으로 합치기 위해 ```JOIN``` 을 사용했다.
- ```RIGHT JOIN```을 사용한 이유는 보호소에 들어온 기록이 일부 유실되었기 때문이다. (```ANIMAL_INS```가 빈 값이라도 불러오기 위함)
- 불러온 데이터에 대해 T1(보호소에 들어온 동물 정보)가 NULL인 것만 출력되도록 조건문을 추가했다.
- 출력할 데이터로는 T1에서의 아이디와 이름은 NULL이기 때문에 T2(입양 보낸 동물 정보)에서의 아이디와 이름을 불러왔다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
