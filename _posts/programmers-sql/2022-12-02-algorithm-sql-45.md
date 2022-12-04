---
title:  "[프로그래머스 SQL] Lv 4. 취소되지 않은 진료 예약 조회하기"
layout: single

categories: "Algorithm_SQL"
tags: [""]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - String, Date 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 환자 정보를 담은 ```PATIENT``` 테이블과 의사 정보를 담은 ```DOCTOR``` 테이블, 그리고 진료 예약목록을 담은 ```APPOINTMENT```에 대한 테이블입니다. ```PATIENT``` 테이블은 다음과 같으며 ```PT_NO```, ```PT_NAME```, ```GEND_CD```, ```AGE```, ```TLNO```는 각각 환자번호, 환자이름, 성별코드, 나이, 전화번호를 의미합니다.

|Column name|	Type|	Nullable|
|:----|:---|:---|
|PT_NO	|VARCHAR(N)|	FALSE|
|PT_NAME|	VARCHAR(N)|	FALSE|
|GEND_CD|	VARCHAR(N)|	FALSE|
|AGE	|INTEGER|	FALSE|
|TLNO|	VARCHAR(N)|	TRUE|

```DOCTOR``` 테이블은 다음과 같으며 ```DR_NAME```, ```DR_ID```, ```LCNS_NO```, ```HIRE_YMD```, ```MCDP_CD```, ```TLNO```는 각각 의사이름, 의사ID, 면허번호, 고용일자, 진료과코드, 전화번호를 나타냅니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|DR_NAME|	VARCHAR(N)|	FALSE|
|DR_ID|	VARCHAR(N)|	FALSE|
|LCNS_NO|	VARCHAR(N)|	FALSE|
|HIRE_YMD|	DATE|	FALSE|
|MCDP_CD|	VARCHAR(N)|	TRUE|
|TLNO|	VARCHAR(N)|	TRUE|

```APPOINTMENT``` 테이블은 다음과 같으며 ```APNT_YMD```, ```APNT_NO```, ```PT_NO```, ```MCDP_CD```, ```MDDR_ID```, ```APNT_CNCL_YN```, ```APNT_CNCL_YMD```는 각각 
진료 예약일시, 진료예약번호, 환자번호, 진료과코드, 의사ID, 예약취소여부, 예약취소날짜를 나타냅니다.

|Column name|	Type|	Nullable|
|:-----|:-----|:----|
|APNT_YMD|	TIMESTAMP|	FALSE|
|APNT_NO|	INTEGER	|FALSE|
|PT_NO|	VARCHAR(N)|	FALSE|
|MCDP_CD|	VARCHAR(N)|	FALSE|
|MDDR_ID|	VARCHAR(N)|	FALSE|
|APNT_CNCL_YN|	VARCHAR(N)|	TRUE|
|APNT_CNCL_YMD|	DATE|	TRUE|

## 문제
```PATIENT```, ```DOCTOR``` 그리고 ```APPOINTMENT``` 테이블에서 2022년 4월 13일 취소되지 않은 흉부외과(CS) 진료 예약 내역을 조회하는 SQL문을 작성해주세요. 진료예약번호, 환자이름, 환자번호, 진료과코드, 의사이름, 진료예약일시 항목이 출력되도록 작성해주세요. 결과는 진료예약일시를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/132204)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 
```

## (2) 코드 작성
```sql
SELECT A.APNT_NO, P.PT_NAME, A.PT_NO, A.MCDP_CD, D.DR_NAME, A.APNT_YMD
FROM PATIENT AS P
  JOIN APPOINTMENT AS A ON P.PT_NO = A.PT_NO
  JOIN DOCTOR AS D ON A.MDDR_ID = D.DR_ID
WHERE MONTH(A.APNT_YMD) = '04' AND A.APNT_CNCL_YN = 'N' AND A.MCDP_CD = 'CS'
GROUP BY PT_NAME
ORDER BY A.APNT_YMD
```

## (3) 코드 리뷰 및 회고
- 

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
