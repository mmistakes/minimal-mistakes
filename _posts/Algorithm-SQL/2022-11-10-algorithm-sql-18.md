---
title:  "[프로그래머스 SQL] Lv 2. 가격이 제일 비싼 식품의 정보 출력하기"
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

👩🏻‍💻 SQL 고득점 Kit - SUM, MAX, MIN 문제
<br>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 식품의 정보를 담은 FOOD_PRODUCT 테이블입니다. 
<br>FOOD_PRODUCT 테이블은 다음과 같으며 PRODUCT_ID, PRODUCT_NAME, PRODUCT_CD, CATEGORY, PRICE는 식품 ID, 식품 이름, 식품 코드, 식품분류, 식품 가격을 의미합니다.

|Column name|	Type|	Nullable|
|:---------|:------|:----------|
|PRODUCT_ID	|VARCHAR(10)	|FALSE|
|PRODUCT_NAME|	VARCHAR(50)|	FALSE|
|PRODUCT_CD|	VARCHAR(10)	|TRUE|
|CATEGORY|	VARCHAR(10)	|TRUE|
|PRICE	|NUMBER	|TRUE|

## 문제
FOOD_PRODUCT 테이블에서 가격이 제일 비싼 식품의 식품 ID, 식품 이름, 식품 코드, 식품분류, 식품 가격을 조회하는 SQL문을 작성해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131115)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. SELECT 문에 PRODUCT_ID, PRODUCT_NAME, PRODUCT_CD, CATEGORY, PRICE 컬럼명을 넣는다.
2. 가장 비싼 식품에 대한 데이터를 추출하기 위해 ORDER BY 문에 PRICE 를 기준으로 내림차순 정렬한다.
3. 가장 비싼 식품에 대한 정보만 출력하기 위해 LIMIT 를 1 로 설정한다.
```

## (2) 코드 작성
```sql
SELECT PRODUCT_ID, PRODUCT_NAME, PRODUCT_CD, CATEGORY, PRICE
FROM FOOD_PRODUCT
ORDER BY PRICE DESC 
LIMIT 1
```

## (3) 코드 리뷰 및 회고
- LGTM:)

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}