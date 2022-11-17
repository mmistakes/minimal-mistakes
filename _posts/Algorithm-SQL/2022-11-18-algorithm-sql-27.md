---
title:  "[프로그래머스 SQL] Lv 2. 고양이와 개는 몇 마리 있을까"
layout: single

categories: "Algorithm_SQL"
tags: ["GROUP BY", "COUNT", "ORDER BY"]

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
동물 보호소에 들어온 동물 중 고양이와 개가 각각 몇 마리인지 조회하는 SQL문을 작성해주세요. 이때 고양이를 개보다 먼저 조회해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59040)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 동물 종을 기준으로 그룹화하고, 각각 몇 마리인지 조회하기 위해 COUNT 함수를 사용한다.
2. 데이터는 동물 종을 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT ANIMAL_TYPE, COUNT(*) AS COUNT
FROM ANIMAL_INS
GROUP BY ANIMAL_TYPE
ORDER BY ANIMAL_TYPE
```

## (3) 코드 리뷰 및 회고
- 동물 종을 기준으로 그룹화하고, 고양이와 강아지가 각각 몇 마리인지 조회하기 위해 ```COUNT``` 함수를 사용했다.
- 변수 명을 바꾸기 위해 ```AS```를 사용했다.(```AS``` 사용 전 : ```COUNT(*)```, 후 : ```COUNT```)

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}