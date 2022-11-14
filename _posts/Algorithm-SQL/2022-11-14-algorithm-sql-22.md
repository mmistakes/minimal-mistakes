---
title:  "[프로그래머스 SQL] Lv 2. 중복 제거하기"
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

👩🏻‍💻 SQL 고득점 Kit - SUM, MAX, MIN 문제
<br>

***

# <span class="half_HL">✔️ 문제 설명</span>
```ANIMAL_INS``` 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다.<br>
```ANIMAL_INS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```INTAKE_CONDITION```, ```NAME```, ```SEX_UPON_INTAKE```는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|ANIMAL_ID|	VARCHAR(N)	|FALSE|
|ANIMAL_TYPE	|VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|INTAKE_CONDITION|	VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE	|VARCHAR(N)|	FALSE|

동물 보호소에 들어온 동물의 이름은 몇 개인지 조회하는 SQL 문을 작성해주세요. <br>
이때 이름이 NULL인 경우는 집계하지 않으며 중복되는 이름은 하나로 칩니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59408)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. ANIMAL_INS 테이블을 불러온다.
2. COUNT(NAME)으로 결측치를 제외한 이름의 개수를 불러온다.
3. 중복되는 이름을 하나로 가져오기 위해 DISTINCT를 추가한다.
```

## (2) 코드 작성
```sql
SELECT COUNT(DISTINCT NAME)
FROM ANIMAL_INS
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- 전체 행에 대한 개수를 구하고싶을 때 ```*```을 사용하면, 하나의 행에 결측치가 아닌 값이 하나라도 있으면 무조건 COUNT에 포함된다.
- 특정 변수에 대한 개수를 구하고싶을 때 ```COUNT(변수)``` 를 사용하면 되는데 이때 NULL인 부분은 COUNT에 포함되지 않는다.
- ```DISTINCT``` 를 사용하면 중복된 값을 제거하고 대표로 1개의 값만 가져올 수 있다.
- LGTM:)

<br>