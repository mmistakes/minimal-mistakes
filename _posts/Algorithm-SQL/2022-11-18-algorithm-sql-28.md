---
title:  "[프로그래머스 SQL] Lv 2. 동명 동물 수 찾기"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "GROUP BY", "WHERE", "HAVING", "COUNT", "IS NOT NULL", "ORDER BY"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

```ANIMAL_INS``` 테이블은 동물 보호소에 들어온 동물의 정보를 담은 테이블입니다. ```ANIMAL_INS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```INTAKE_CONDITION```, ```NAME```, ```SEX_UPON_INTAKE```는 각각 동물의 아이디, 생물 종, 보호 시작일, 보호 시작 시 상태, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE	|NULLABLE|
|:---|:---------|:-------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|INTAKE_CONDITION|	VARCHAR(N)|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_INTAKE|	VARCHAR(N)|	FALSE|

## 문제
동물 보호소에 들어온 동물 이름 중 두 번 이상 쓰인 이름과 해당 이름이 쓰인 횟수를 조회하는 SQL문을 작성해주세요. 이때 결과는 이름이 없는 동물은 집계에서 제외하며, 결과는 이름 순으로 조회해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59041)

<br>
<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 동물 이름을 기준으로 그룹화하고 개수를 세기 위해 COUNT 함수를 사용한다.
2. 이름이 NULL 인 것은 집계에서 제외하기 위해 IS NOT NULL 문을 사용한다.
3. 그룹화 후, 이름이 두 번 이상 쓰인 것만 조회를 위해 HAVING 문을 사용한다.
4. 데이터는 동물 이름을 기준으로 정렬한다. (기본값 : ASC)
```

## (2) 코드 작성
```sql
-- version 1
SELECT NAME, COUNT(*)
FROM ANIMAL_INS
WHERE NAME IS NOT NULL
GROUP BY NAME
HAVING COUNT(*) >= 2
ORDER BY NAME

-- version 2
SELECT NAME, COUNT(*)
FROM ANIMAL_INS
GROUP BY NAME
HAVING COUNT(*) >= 2 AND NAME IS NOT NULL
ORDER BY NAME
```

## (3) 코드 리뷰 및 회고
- 코드를 두 가지 버전으로 작성해 보았다.
- 첫 번째 코드는 그룹화하기 전에 미리 이름이 없는 동물 정보를 제외시켰고, 두 번째 코드는 그룹화 후에 이름 없는 동물 정보를 제외시켰다.
  - 두 코드 모두 원하는 정보를 가져오는데 성공했다.

**👀 기억할 것 : WHERE, HAVING 차이**
- 그룹화 전, 후에 적용해도 상관없는 조건은 ```WHERE``` or ```HAVING``` 에 작성할 수 있다.
- 그룹화 전에 적용해야하는 조건은 ```WHERE``` 문을 사용해야 한다.
- 그룹화 후에 적용해야하는 조건은 ```HAVING``` 문을 사용해야 한다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}