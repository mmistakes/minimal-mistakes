---
title:  "[프로그래머스 SQL] Lv 1. 조건에 맞는 회원수 구하기"
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

**SQL 고득점 Kit - SELECT 문제**
<br>

***

# 문제 설명
다음은 어느 의류 쇼핑몰에 가입한 회원 정보를 담은 USER_INFO 테이블입니다. 
<br>USER_INFO 테이블은 아래와 같은 구조로 되어있으며 USER_ID, GENDER, AGE, JOINED는 각각 회원 ID, 성별, 나이, 가입일을 나타냅니다.

|Column name|	Type|	Nullable|
|:----|:---|:---|
|USER_ID|	INTEGER	|FALSE|
|GENDER	|TINYINT(1)	|TRUE|
|AGE|	INTEGER	|TRUE|
|JOINED|	DATE|	FALSE|

GENDER 컬럼은 비어있거나 0 또는 1의 값을 가지며 0인 경우 남자를, 1인 경우는 여자를 나타냅니다.

## 문제
USER_INFO 테이블에서 2021년에 가입한 회원 중 나이가 20세 이상 29세 이하인 회원이 몇 명인지 출력하는 SQL문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131535)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. USER_INFO 테이블을 가져온다.
2. 가입일자가 2021년도인 데이터를 가져온다. (WHERE)
3. 나이가 20세 이상 29세 이하 데이터를 가져온다. (WHERE, BETWEEN)
4. 데이터 개수를 출력하기 위해 COUNT(*)를 사용한다.
```

## (2) 코드 작성
```sql
SELECT COUNT(*)
FROM USER_INFO
WHERE DATE_FORMAT(JOINED, '%Y') = '2021'
      AND AGE BETWEEN 20 AND 29 
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- BETWEEN 은 이상, 이하를 나타내는 것을 기억하자.
- COUNT 함수를 사용할 때, 결측치가 있는 컬럼을 넣으면 결측값을 제외한 행의 개수를 출력한다는 점을 기억하자.
- COUNT(*)를 사용하면 결측값이 있어도 행 전체가 NULL이 아닌 이상 전체 행의 개수를 출력한다.
- LGTM :)

<br>

