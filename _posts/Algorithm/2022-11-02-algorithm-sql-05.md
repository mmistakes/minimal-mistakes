---
title:  "[프로그래머스 SQL] Lv 1. 강원도에 위치한 생산공장 목록 출력하기"
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

다음은 식품공장의 정보를 담은 FOOD_FACTORY 테이블입니다. 
<br>FOOD_FACTORY 테이블은 다음과 같으며 FACTORY_ID, FACTORY_NAME, ADDRESS, TLNO는 각각 공장 ID, 공장 이름, 주소, 전화번호를 의미합니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|FACTORY_ID	|VARCHAR(10)|	FALSE|
|FACTORY_NAME|	VARCHAR(50)	|FALSE|
|ADDRESS|	VARCHAR(100)|	FALSE|
|TLNO	|VARCHAR(20)	|TRUE|

## 문제
FOOD_FACTORY 테이블에서 강원도에 위치한 식품공장의 공장 ID, 공장 이름, 주소를 조회하는 SQL문을 작성해주세요. 
<br>이때 결과는 공장 ID를 기준으로 오름차순 정렬해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131112)

<br>

# 문제 풀이
## (1) Pseudo-Code
```markdown
1. 강원도로 시작되는 문자를 포함하는 주소를 가져온다. (Like, % 사용)
2. 공장 ID 를 ORDER BY로 정렬한다.
```

## (2) 코드 작성
```sql
SELECT FACTORY_ID, FACTORY_NAME, ADDRESS
FROM FOOD_FACTORY
WHERE ADDRESS LIKE '강원도%'
ORDER BY FACTORY_ID
```

## (3) 코드 결과
- **성능 요약** : 메모리 0.0 MB, 시간 0.00 ms
- **채점결과** : EMPTY

## (4) 코드 리뷰 및 회고
- 강원도에 위치한 공장 정보를 가져오기 위해, 'LIKE' 를 사용하였다.
- LIKE 로 강원도 정보를 불러올 때, 데이터는 '강원도 정선군 ~ '와 같은 형식이기 때문에 %를 사용하여 불러왔다.
- 코드는 만족한다.

<br>

