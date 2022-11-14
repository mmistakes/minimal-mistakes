---
title:  "[프로그래머스 SQL] Lv 1. 흉부외과 또는 일반외과 의사 목록 출력하기"
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

👩🏻‍💻 SQL 고득점 Kit - SELECT 문제

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 종합병원에 속한 의사 정보를 담은DOCTOR 테이블입니다.
<br>DOCTOR 테이블은 다음과 같으며 DR_NAME, DR_ID, LCNS_NO, HIRE_YMD, MCDP_CD, TLNO는 각각 의사이름, 의사ID, 면허번호, 고용일자, 진료과코드, 전화번호를 나타냅니다.


|Column| name|	Type|	Nullable|
|:---|:---|:---|:---|
|DR_NAME|	VARCHAR(20)	|FALSE|
|DR_ID|	VARCHAR(10)	|FALSE|
|LCNS_NO|	VARCHAR(30)	|FALSE|
|HIRE_YMD|	DATE	|FALSE|
|MCDP_CD|	VARCHAR(6)	|TRUE|
|TLNO|	VARCHAR(50)	|TRUE|

## 문제
DOCTOR 테이블에서 진료과가 흉부외과(CS)이거나 일반외과(GS)인 의사의 이름, 의사ID, 진료과, 고용일자를 조회하는 SQL문을 작성해주세요. 
<br>이때 결과는 고용일자를 기준으로 내림차순 정렬하고, 고용일자가 같다면 이름을 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/132203)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 진료과가 흉부외과, 일반외과인 경우만 가져오기 위해 WHERE 문에 OR 로 두 조건을 넣는다.
2. 고용일자를 내림차순으로 설정하고 고용일자가 같다면 이름을 오름차순으로 설정하기 위해 ORDER BY 에 두 기준을 넣는다.
3. DATA 타입을 시간,분,초 제거를 위해 DATA_FORMAT 을 사용해 연도-월-일 형태로 변경하여 출력되도록 설정한다.
```

## (2) 코드 작성
```sql
SELECT DR_NAME, DR_ID, MCDP_CD, DATE_FORMAT(HIRE_YMD,'%Y-%m-%d') AS HIRE_YMD
FROM DOCTOR
WHERE MCDP_CD = "CS" OR MCDP_CD = "GS"
ORDER BY HIRE_YMD DESC, DR_NAME
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- 처음 결과를 출력해보았을 때 HIRE_YMD 가 시간,분,초를 포함하고 있길래 연도-월-일 형태로 출력하기 위해 DATA_FORMAT 을 사용하였다.
- 이전에 배웠던 기억이 있지만 어떤 함수를 사용해야되는지 기억이 나지 않아 구글 서칭을 통해 해결하였다.
- 코드는 만족한다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}