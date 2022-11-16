---
title:  "[프로그래머스 SQL] Lv 1. 최댓값 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["SELECT", "FROM", "ORDER BY", "LIMIT", "MAX"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - SUM, MAX, MIN 문제</small>

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

가장 최근에 들어온 동물은 언제 들어왔는지 조회하는 SQL 문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59415)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 가장 늦게 들어온 동물 데이터를 조회하기 위해 FROM 문에 테이블 명을 입력한다.
2. 날짜가 최신인 데이터를 조회하기 위해 SELECT 문에 MAX(DATETIME) 을 입력한다.
3. 컬럼명을 "시간" 으로 바꿔준다. 

+ DATETIME을 기준으로 내림차순 정렬 후 LIMIT 1로도 원하는 정보를 추출할 수 있다.
```

## (2) 코드 작성
```sql
-- ver 1
SELECT MAX(DATETIME) AS "시간"
FROM ANIMAL_INS

-- ver 2
SELECT DATETIME AS "시간"
FROM ANIMAL_INS
ORDER BY DATETIME DESC
LIMIT 1
```

## (3) 코드 리뷰 및 회고
- 2가지 방법으로 문제를 해결해보았다.
- LGTM:)

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}