---
title:  "[프로그래머스 SQL] Lv 1. 이름이 없는 동물의 아이디"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "IS NULL", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - IS NULL 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
```ANIMAL_INS``` 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다. ```ANIMAL_INS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```INTAKE_CONDITION```, ```NAME```, ```SEX_UPON_INTAKE```는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE	|NULLABLE|
|:---|:-------|:---------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)	|FALSE|
|DATETIME|	DATETIME|	FALSE|
|INTAKE_CONDITION	|VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE	|VARCHAR(N)|	FALSE|

동물 보호소에 들어온 동물 중, 이름이 없는 채로 들어온 동물의 ID를 조회하는 SQL 문을 작성해주세요. 단, ID는 오름차순 정렬되어야 합니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131114)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. ANIMAL_INS 테이블을 불러온다.
2. 이름이 빈 데이터를 불러오기 위해 WHERE문을 사용한다.
3. ORDER BY로 동물 ID를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT ANIMAL_ID
FROM ANIMAL_INS
WHERE NAME IS NULL
ORDER BY ANIMAL_ID
```

## (3) 코드 리뷰 및 회고
- 데이터를 불러올 때, 특정 조건에 대한 정보만 불러올 때엔 ```WHERE``` 문을 사용하면 된다.
- ```WHERE``` 절을 사용해 ```NAME``` 이 ```NULL``` 인 (```NAME IS NULL```) 조건을 추가해 특정 조건을 만족시켰다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
