---
title:  "[프로그래머스 SQL] Lv 2. NULL 처리하기"
layout: single

categories: "Algorithm_SQL"
tags: ["CASE", "IF", "ORDER BY", "IS NULL"]

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

입양 게시판에 동물 정보를 게시하려 합니다. 동물의 생물 종, 이름, 성별 및 중성화 여부를 아이디 순으로 조회하는 SQL문을 작성해주세요. 
<br>이때 프로그래밍을 모르는 사람들은 NULL이라는 기호를 모르기 때문에, 이름이 없는 동물의 이름은 "No name"으로 표시해 주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59410)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 이름이 NULL 인 경우, 'No name'으로 출력하기 위해 CASE 절을 사용한다.
2. ORDER BY로 동물 ID를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT ANIMAL_TYPE, 
       CASE 
           WHEN NAME IS NULL THEN 'No name' ELSE NAME
       END AS NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

## (3) 코드 리뷰 및 회고
- ```NULL``` 값을 'No name' 값으로 대체하기 위해 ```CASE``` 문을 사용했다.
- ```CASE``` 문을 사용하면 특정 조건에 대한 값을 변경할 수 있다.
- 코드를 작성할 때, ```CASE``` 문을 사용했지만 사용한 조건문이 1개라서 ```IF``` 조건문도 사용할 수 있다.
- ```IF``` 문을 사용한 코드는 아래와 같다.
- ```IF (조건식, 조건식이 TRUE일 때 반환값, 조건식이 FALSE일 때 반환값)```

```sql
# IF 조건문을 사용한 경우
SELECT ANIMAL_TYPE, 
       IF (NAME IS NULL, 'No name', NAME) AS NAME, SEX_UPON_INTAKE
FROM ANIMAL_INS
ORDER BY ANIMAL_ID
```

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
