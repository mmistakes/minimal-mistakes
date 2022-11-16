---
title:  "[프로그래머스 SQL] Lv 4. 식품분류별 가장 비싼 식품의 정보 조회하기"
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





<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/132202)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1.
```

## (2) 코드 작성
```sql
SELECT T2.CATEGORY, T2.PRICE, T2.PRODUCT_NAME
FROM (
    SELECT CATEGORY, MAX(PRICE) as MAX_PRICE
    FROM FOOD_PRODUCT
    GROUP BY CATEGORY
) AS T1 INNER JOIN FOOD_PRODUCT as T2 ON T1.CATEGORY = T2.CATEGORY AND T1.MAX_PRICE = T2.PRICE
HAVING CATEGORY REGEXP '과자|국|김치|식용유'
ORDER BY PRICE DESC
```

## (3) 코드 리뷰 및 회고
- 

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}