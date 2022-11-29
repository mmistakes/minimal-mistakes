---
title:  "[프로그래머스 SQL] Lv 4. 보호소에서 중성화한 동물"
layout: single

categories: "Algorithm_SQL"
tags: ["JOIN", "WHERE", "LIKE", "REGEXP"]

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

보호소에서 중성화 수술을 거친 동물 정보를 알아보려 합니다. 보호소에 들어올 당시에는 중성화 되지 않았지만, 보호소를 나갈 당시에는 중성화된 동물의 아이디와 생물 종, 이름을 조회하는 아이디 순으로 조회하는 SQL 문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59045)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. ANIMAL_INS과 ANIMAL_OUTS에 NULL 값이 포함되어 있다.
2. 두 테이블에 대해 중성화 정보가 들어있는 항목을 결합하기 위해 INNER JOIN을 사용한다.
3. JOIN으로 테이블을 결합할 땐 ID를 기준으로 한다.
4. 조건문에 ANIMAL_INS 중성화 되지 않은 경우를 넣기 위해 LIKE문을 사용한다.
5. 조건문에 ANIMAL_OUTS 중성화가 된 경우를 넣기 위해 Spayed, Neutered를 포함하는 정규표현식을 작성한다.
```

## (2) 코드 작성
```sql
SELECT T1.ANIMAL_ID, T1.ANIMAL_TYPE, T1.NAME
FROM ANIMAL_INS AS T1
 INNER JOIN ANIMAL_OUTS AS T2 ON T1.ANIMAL_ID = T2.ANIMAL_ID
WHERE T1.SEX_UPON_INTAKE LIKE 'Intact%'
  AND T2.SEX_UPON_OUTCOME REGEXP '^[Spayed|Neutered]'
```

## (3) 코드 리뷰 및 회고
- 두 테이블에서 같은 동물에 대해 중성화 여부의 변경사항(X->O)를 확인하기 위해 ```JOIN```을 사용했다.
- T1(보호소에 들어온 동물 정보)에선 Intract로 시작되는 데이터만 불러오기 위해 ```LIKE``` 연산자와 ```%``` 와일드카드를 사용했다.
- T2(입양 보낸 동물 정보)에선 Spayed 또는 Neutered로 시작되는 데이터만 불러오기 위해 정규표현식을 사용해 한 줄로 표현했다.
  - 정규표현식을 사용하지 않았다면 아래 코드와 같이 작성할 수 있다.
  - ```(T2.SEX_UPON_OUTCOME LIKE 'Spayed%' OR T2.SEX_UPON_OUTCOME LIKE 'Neutered%')```

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
