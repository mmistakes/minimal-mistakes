---
title:  "[프로그래머스 SQL] Lv 4. 입양 시각 구하기(2)"
layout: single

categories: "Algorithm_SQL"
tags: ["SET", "@", "COUNT", "WHERE"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
```ANIMAL_OUTS``` 테이블은 동물 보호소에서 입양 보낸 동물의 정보를 담은 테이블입니다. ```ANIMAL_OUTS``` 테이블 구조는 다음과 같으며, ```ANIMAL_ID```, ```ANIMAL_TYPE```, ```DATETIME```, ```NAME```, ```SEX_UPON_OUTCOME```는 각각 동물의 아이디, 생물 종, 입양일, 이름, 성별 및 중성화 여부를 나타냅니다.

|NAME|	TYPE|	NULLABLE|
|:---|:----|:-----------|
|ANIMAL_ID|	VARCHAR(N)|	FALSE|
|ANIMAL_TYPE|	VARCHAR(N)|	FALSE|
|DATETIME|	DATETIME|	FALSE|
|NAME|	VARCHAR(N)|	TRUE|
|SEX_UPON_OUTCOME|	VARCHAR(N)|	FALSE|

## 문제
보호소에서는 몇 시에 입양이 가장 활발하게 일어나는지 알아보려 합니다. 0시부터 23시까지, 각 시간대별로 입양이 몇 건이나 발생했는지 조회하는 SQL문을 작성해주세요. 이때 결과는 시간대 순으로 정렬해야 합니다.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/59413)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) 코드 작성
```sql
SET @HOUR = -1;
SELECT (@HOUR := @HOUR +1) AS HOUR,
       (SELECT COUNT(*) FROM ANIMAL_OUTS WHERE HOUR(DATETIME) = @HOUR) AS COUNT 
FROM ANIMAL_OUTS
WHERE @HOUR < 23;
```

## (2) 코드 리뷰 및 회고
- 이번 문제는 0 ~ 23 값을 가지는 컬럼을 생성하기 위해 @ SET 명령을 사용해 변수를 생성해주었다.
- 변수 생성법을 몰라서 검색을 통해 알게 되었고 0 ~ 23 값을 만들기 위해 초기 값을 -1로 세팅, 23 미만까지로 조건문을 생성해주었다.(23까지로 설정하면 22까지 해당(22+1=23))
- SET 명령을 처음 사용해보아서 어떻게 사용해야될지 감이 안오긴 하지만 적용사례를 많이 검색하면서 익혀봐야겠다..

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
