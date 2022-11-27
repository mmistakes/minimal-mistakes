---
title:  "[프로그래머스 SQL] Lv 1. 나이 정보가 없는 회원 수 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "IS NULL", "COUNT"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - IS NULL 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에 가입한 회원 정보를 담은 ```USER_INFO``` 테이블입니다. ```USER_INFO``` 테이블은 아래와 같은 구조로 되어있으며, ```USER_ID```, ```GENDER```, ```AGE```, ```JOINED```는 각각 회원 ID, 성별, 나이, 가입일을 나타냅니다.

|Column name|	Type	|Nullable|
|:---------|:-----------|:-------|
|USER_ID|	INTEGER|	FALSE|
|GENDER|	TINYINT(1)|	TRUE|
|AGE|	INTEGER|	TRUE|
|JOINED|	DATE|	FALSE|

```GENDER``` 컬럼은 비어있거나 0 또는 1의 값을 가지며 0인 경우 남자를, 1인 경우는 여자를 나타냅니다.

## 문제
```USER_INFO``` 테이블에서 나이 정보가 없는 회원이 몇 명인지 출력하는 SQL문을 작성해주세요. 이때 컬럼명은 ```USERS```로 지정해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131528)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 나이 정보가 없는 조건식 추가를 위해 WHERE 문을 사용한다.
2. 회원 수를 출력하기 위해 COUNT 함수를 사용한다.
```

## (2) 코드 작성
```sql
SELECT COUNT(*) AS USERS
FROM USER_INFO
WHERE AGE IS NULL
```

## (3) 코드 리뷰 및 회고
- 이번 문제는 쉽게 풀었다.
- 테이블(```USER_INFO```)을 불러오고 나이가 NULL인 데이터만 불러오기 위해 ```WHERE``` 절에 ```AGE IS NULL``` 조건을 추가한 뒤, ```COUNT``` 함수로 전체 행의 수가 출력되도록 코드를 작성했다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
