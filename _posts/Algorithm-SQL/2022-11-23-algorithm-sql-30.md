---
title:  "[프로그래머스 SQL] Lv 4. 년, 월, 성별 별 상품 구매 회원 수 구하기"
layout: single

categories: "Algorithm_SQL"
tags: [""]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"

published: false
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>








<br>

# <span class="half_HL">🌞 실패 코드 공유</span>
```sql
SELECT DATE_FORMAT(os.SALES_DATE, "%Y") AS YEAR, DATE_FORMAT(os.SALES_DATE, "%m") AS MONTH
     , ui.GENDER, COUNT(ui.GENDER) AS USERS
FROM ONLINE_SALE AS os
  INNER JOIN USER_INFO AS ui ON os.USER_ID = ui.USER_ID
WHERE ui.GENDER IS NOT NULL
GROUP BY YEAR, MONTH, GENDER
# HAVING GENDER IS NOT NULL
ORDER BY YEAR ASC, MONTH ASC, GENDER ASC
```

## 1. 실패 분석
### (1) 코드 실행 순서에 대한 이해도