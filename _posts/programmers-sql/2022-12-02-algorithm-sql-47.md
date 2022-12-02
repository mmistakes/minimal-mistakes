---
title:  "[프로그래머스 SQL] Lv 2. 루시와 엘라 찾기"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "IN", "ORDER BY"]

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
동물 보호소에 들어온 동물 중 이름이 Lucy, Ella, Pickle, Rogan, Sabrina, Mitty인 동물의 아이디와 이름, 성별 및 중성화 여부를 조회하는 SQL 문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59046)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SELECT ANIMAL_ID, NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
WHERE NAME IN ('Lucy', 'Ella', 'Pickle', 'Rogan', 'Sabrina', 'Mitty')
ORDER BY ANIMAL_ID
```

## (2) 코드 리뷰 및 회고
- 특정 이름을 가진 동물 정보를 불러올 때, ```WHERE - IN``` 구문을 사용해서 소괄호 안에 포함되어있는 경우의 데이터만 불러올 수 있도록 조건문을 작성했다.
- 이때, 불러올 동물 정보의 이름은 Lucy, Ella 이기 때문에 ```LIKE```, ```REGEXP```를 사용할 필요가 없다.
- **만약? Lucy로 시작하는 동물의 이름을 가진 정보를 불러와라!** 라는 문제라면 ```LIKE```, ```REGEXP``` 를 사용하면 된다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
