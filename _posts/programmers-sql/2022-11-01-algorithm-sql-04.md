---
title:  "[프로그래머스 SQL] Lv 2. 3월에 태어난 여성 회원 목록 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: ["WHERE", "ORDER BY", "DATE_FORMAT", "IS NOT NULL"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - SELECT 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 식당 리뷰 사이트의 회원 정보를 담은 MEMBER_PROFILE 테이블입니다.
<br>MEMBER_PROFILE 테이블은 다음과 같으며 MEMBER_ID, MEMBER_NAME, TLNO, GENDER, DATE_OF_BIRTH는 회원 ID, 회원 이름, 회원 연락처, 성별, 생년월일을 의미합니다.


|Column name|	Type|	Nullable|
|:---|:---|:---|
|MEMBER_ID|	VARCHAR(100)|	FALSE|
|MEMBER_NAME	|VARCHAR(50)|	FALSE|
|TLNO	|VARCHAR(50)|	TRUE|
|GENDER	|VARCHAR(1)|	TRUE|
|DATE_OF_BIRTH	|DATE|	TRUE|

## 문제
MEMBER_PROFILE 테이블에서 생일이 3월인 여성 회원의 ID, 이름, 성별, 생년월일을 조회하는 SQL문을 작성해주세요. 
<br>이때 전화번호가 NULL인 경우는 출력대상에서 제외시켜 주시고, 결과는 회원ID를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131120)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. WHERE 문에 생일이 3월, 성별이 여성, 번호가 NULL 제외 조건을 넣어준다.
2. ORDER BY 문에 회원 번호를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT MEMBER_ID, MEMBER_NAME, GENDER
     , DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE DATE_FORMAT(DATE_OF_BIRTH, '%m') = '03'
  AND TLNO IS NOT NULL
  AND GENDER = 'W'
ORDER BY MEMBER_ID
```

## (3) 코드 리뷰 및 회고
- 처음에 코드를 제출하였을 때, 틀렸다고 나와서 왜 그런지 생각해 보았다. 정답이 아니였던 이유는 조건이 하나 빠졌기 때문이다.
- '여성'인 데이터를 가져와야했는데, 그러지 못했다. 
- 앞으로 문제를 자세히 읽어보고, 슈도코드를 작성한 후 코드로 옮기는 연습을 해야겠다.
- 코드는 만족한다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}