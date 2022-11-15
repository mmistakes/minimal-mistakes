---
title:  "[프로그래머스 SQL] Lv 2. 동물 수 구하기"
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

동물 보호소에 동물이 몇 마리 들어왔는지 조회하는 SQL 문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59406)

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. ANIMAL_INS 테이블을 불러온다.
2. 해당 테이블엔 보호소에 들어온 동물 정보가 담겨있기 때문에 전체 행이 동물에 대한 정보이다.
3. 전체 행의 개수를 구하여 동물 보호소에 동물이 몇 마리 들어왔는지 조회한다.
```

## (2) 코드 작성
```sql
SELECT COUNT(*)
FROM ANIMAL_INS
```

## (3) 코드 리뷰 및 회고
- 전체 행에 대한 개수를 구하고싶을 땐, ```*```을 사용하자!
- ```COUNT``` 와 ```SUM``` 함수 구분을 잘 하자!
- LGTM:)

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}