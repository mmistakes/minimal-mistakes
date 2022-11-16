---
title:  "[프로그래머스 SQL] Lv 1. 가장 비싼 상품 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["ORDER BY", "LIMIT"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - SUM, MAX, MIN 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에서 판매 중인 상품들의 정보를 담은 PRODUCT 테이블입니다. 
<br>PRODUCT 테이블은 아래와 같은 구조로 되어있으며, PRODUCT_ID, PRODUCT_CODE, PRICE는 각각 상품 ID, 상품코드, 판매가를 나타냅니다.

|Column name|	Type|	Nullable|
|:----------|:------|:----------|
|PRODUCT_ID|	INTEGER|	FALSE|
|PRODUCT_CODE|	VARCHAR(8)|	FALSE|
|PRICE|	INTEGER|	FALSE|

상품 별로 중복되지 않는 8자리 상품코드 값을 가지며, 앞 2자리는 카테고리 코드를 의미합니다.

## 문제
PRODUCT 테이블에서 판매 중인 상품 중 가장 높은 판매가를 출력하는 SQL문을 작성해주세요. 
<br>이때 컬럼명은 MAX_PRICE로 지정해주세요.
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131697)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. SELECT 문에 PRICE를 넣고 AS 로 컬럼명을 별칭으로 출력한다.
2. 가장 높은 판매가를 찾아야하기 때문에 ORDER BY 문에 PRICE 를 기준으로 내림차순 정렬한다.
3. 가장 높은 판매가만 출력하기 위해 LIMIT 를 1 로 설정한다.
```

## (2) 코드 작성
```sql
SELECT PRICE AS MAX_PRICE
FROM PRODUCT
ORDER BY PRICE DESC
LIMIT 1
```

## (3) 코드 리뷰 및 회고
- LGTM:)

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}