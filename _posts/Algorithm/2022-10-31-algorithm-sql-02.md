---
title:  "[프로그래머스 SQL] Lv 1. 12세 이하인 여자 환자 목록 출력하기"
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
<br>

***
# 문제 설명

다음은 종합병원에 등록된 환자정보를 담은 PATIENT 테이블입니다.
<br>PATIENT 테이블은 다음과 같으며 PT_NO, PT_NAME, GEND_CD, AGE, TLNO는 각각 환자번호, 환자이름, 성별코드, 나이, 전화번호를 의미합니다.

|Column name|	Type	|Nullable|
|:---|:---|:---|
|PT_NO	|VARCHAR(10)	|FALSE|
|PT_NAME	|VARCHAR(20)	|FALSE|
|GEND_CD	|VARCHAR(1)	|FALSE|
|AGE	|INTEGER	FALSE
|TLNO	|VARCHAR(50)	|TRUE|

## 문제
PATIENT 테이블에서 12세 이하인 여자환자의 환자이름, 환자번호, 성별코드, 나이, 전화번호를 조회하는 SQL문을 작성해주세요. 
<br>이때 전화번호가 없는 경우, 'NONE'으로 출력시켜 주시고 결과는 나이를 기준으로 내림차순 정렬하고, 나이 같다면 환자이름을 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/132201)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. WHERE 에 나이가 12세 이하, 성별이 여자인 조건을 추가하여 데이터를 필터링하여준다.
2. TLNO가 Null 값인 경우는 NONE을 출력하고, 그 외는 기존 번호가 출력되도록 한다.
3. 데이터 정렬은 AGE를 내림차순으로 설정하고 나이가 같다면 이름을 오름차순으로 정렬한다.
```

## (2) 코드 작성
```sql
SELECT PT_NAME, PT_NO, GEND_CD, AGE,
    CASE WHEN TLNO IS NULL THEN 'NONE' ELSE TLNO END AS TLNO
FROM PATIENT
WHERE GEND_CD = "W" AND AGE <= 12
ORDER BY AGE DESC, PT_NAME
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- WHERE 문에 두 정렬 조건을 넣을 때, AND 를 넣어야하는지 헷갈렸는데 서칭을 통해 해결하였다.
- CASE WHEN THEN ELSE END AS ~ 문을 사용할 때, AS로 별명을 설정하지 않으면 컬럼 이름이 매우 이상하니 꼭꼭 바꿔줘야한다.
- 코드는 만족한다.

<br>

