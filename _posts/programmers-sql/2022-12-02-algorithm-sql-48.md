---
title:  "[프로그래머스 SQL] Lv 2. 이름에 el이 들어가는 동물 찾기"
layout: single

categories: "Algorithm_SQL"
tags: ["REGEXP", "WHERE", "ORDER BY"]

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
보호소에 돌아가신 할머니가 기르던 개를 찾는 사람이 찾아왔습니다. 이 사람이 말하길 할머니가 기르던 개는 이름에 'el'이 들어간다고 합니다. 동물 보호소에 들어온 동물 이름 중, 이름에 "EL"이 들어가는 개의 아이디와 이름을 조회하는 SQL문을 작성해주세요. 이때 결과는 이름 순으로 조회해주세요. 단, 이름의 대소문자는 구분하지 않습니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59047)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
1. 강아지 이름에 el(소문자 version) 또는 El(대문자 version) 이 포함되는 강아지 정보를 출력하기 위해 ```REGEXP``` 연산자를 사용한다.
2. 동물 종이 강아지인 조건문도 AND 로 추가한다. (두 조건 다 만족해야 함)
3. 출력할 데이터는 이름을 기준으로 오름차순 정렬한다.

## (2) 코드 작성
```sql
SELECT ANIMAL_ID, NAME
FROM ANIMAL_INS
WHERE NAME REGEXP '(El|el)+'
  AND ANIMAL_TYPE = 'Dog'
ORDER BY NAME
```

## (3) 코드 리뷰 및 회고
- 이름에 El 또는 el 이 포함된 데이터를 불러오기 위해 ```REGEXP '(El|el)+'```를 추가했는데 이때 ```'(El|el)+'```는 El 또는 el을 하나라도 포함하는 경우를 출력하라는 조건문이다.
- ```REGEXP``` 연산자를 사용할 때 [이전에 정리해둔 글](https://j-jae0.github.io/sql/sql-01/)을 참고했다. :) 

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
