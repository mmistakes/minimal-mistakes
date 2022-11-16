---
title:  "[프로그래머스 SQL] Lv 2. 진료과별 총 예약 횟수 출력하기"
layout: single

categories: "Algorithm_SQL"
tags: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "COUNT", "BETWEEN"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 종합병원의 진료 예약정보를 담은 ```APPOINTMENT``` 테이블 입니다.<br>
```APPOINTMENT``` 테이블은 다음과 같으며 ```APNT_YMD```, ```APNT_NO```, ```PT_NO```, ```MCDP_CD```, ```MDDR_ID```, ```APNT_CNCL_YN```, ```APNT_CNCL_YMD```는 각각 진료예약일시, 진료예약번호, 환자번호, 진료과코드, 의사ID, 예약취소여부, 예약취소날짜를 나타냅니다.

|Column name|	Type|	Nullable|
|:---------|:-------|:----------|
|APNT_YMD|	TIMESTAMP	|FALSE|
|APNT_NO|	NUMBER(5)	|FALSE|
|PT_NO|	VARCHAR(10)|	FALSE|
|MCDP_CD	|VARCHAR(6)	|FALSE|
|MDDR_ID|	VARCHAR(10)|	FALSE|
|APNT_CNCL_YN	|VARCHAR(1)	|TRUE|
|APNT_CNCL_YMD	|DATE	|TRUE|

APPOINTMENT 테이블에서 2022년 5월에 예약한 환자 수를 진료과코드 별로 조회하는 SQL문을 작성해주세요.<br>
이때, 컬럼명은 '진료과 코드', '5월예약건수'로 지정해주시고 결과는 진료과별 예약한 환자 수를 기준으로 오름차순 정렬하고, 예약한 환자 수가 같다면 진료과 코드를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/132202)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 5월 예약횟수를 불러오기 위해 WHERE 문에 예약일시가 5월인 조건을 작성한다.
2. 진료과 코드를 GROUP BY로 묶고 COUNT(*)로 예약 건수를 구한다.
3. 불러온 데이터는 예약건수를 기준으로 오름차순 정렬하고, 환자 수가 같다면 진료과 코드를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT MCDP_CD AS "진료과코드", COUNT(*) AS "5월예약건수"
FROM APPOINTMENT
WHERE APNT_YMD BETWEEN "2022-05-01 00:00:00" AND "2022-05-31 23:59:59"
    -- AND APNT_CNCL_YMD IS NULL
GROUP BY MCDP_CD
ORDER BY COUNT(*) ASC, MCDP_CD ASC
```

## (3) 코드 리뷰 및 회고
- 처음에 문제를 읽었을 때, 예약 취소건수를 제외해야된다고 생각하여 WHERE절 안에 ```AND APNT_CNCL_YMD IS NULL``` 를 작성했으나 정답이 아니라고 떴다.
- 앞으로 문제를 풀 때, 문제가 정확히 무엇인지 파악을 한 뒤에 어떻게 불러올 지 정리하고 코드로 옮겨야겠다.
- 예약건수때문에 해당 문제를 푸는데 시간이 조금 걸렸지만 해결해서 기분이 좋다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}