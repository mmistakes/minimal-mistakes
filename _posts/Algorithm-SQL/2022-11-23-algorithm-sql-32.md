---
title:  "[프로그래머스 SQL] Lv 4. 년, 월, 성별 별 상품 구매 회원 수 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["DATE_FORMAT", "COUNT, "GROUP BY", "IS NOT NULL", "DISTINCT", "JOIN"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - GROUP BY 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에 가입한 회원 정보를 담은 ```USER_INFO``` 테이블과 온라인 상품 판매 정보를 담은 ```ONLINE_SALE``` 테이블 입니다. ```USER_INFO``` 테이블은 아래와 같은 구조로 되어있으며 ```USER_ID```, ```GENDER```, ```AGE```, ```JOINED```는 각각 회원 ID, 성별, 나이, 가입일을 나타냅니다.

|Column name|	Type|	Nullable|
|:----|:------|:-----|
|USER_ID|	INTEGER|	FALSE|
|GENDER	|TINYINT(1)|	TRUE|
|AGE	|INTEGER|	TRUE|
|JOINED	|DATE|	FALSE|

```GENDER``` 컬럼은 비어있거나 0 또는 1의 값을 가지며 0인 경우 남자를, 1인 경우는 여자를 나타냅니다.

```ONLINE_SALE``` 테이블은 아래와 같은 구조로 되어있으며, ```ONLINE_SALE_ID```, ```USER_ID```, ```PRODUCT_ID```, ```SALES_AMOUNT```, ```SALES_DATE```는 각각 온라인 상품 판매 ID, 회원 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column| name|	Type|	Nullable|
|:-----|:----|:-----|:----------|
|ONLINE_SALE_ID|	INTEGER|	FALSE|
|USER_ID|	INTEGER|	FALSE|
|PRODUCT_ID|	INTEGER	|FALSE|
|SALES_AMOUNT|	INTEGER|	FALSE|
|SALES_DATE|	DATE|	FALSE|

동일한 날짜, 회원 ID, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

## 문제
```USER_INFO``` 테이블과 ```ONLINE_SALE``` 테이블에서 년, 월, 성별 별로 상품을 구매한 회원수를 집계하는 SQL문을 작성해주세요. 결과는 년, 월, 성별을 기준으로 오름차순 정렬해주세요. 이때, 성별 정보가 없는 경우 결과에서 제외해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131532)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. USER_INFO 테이블과 ONLINE_SALE 테이블을 JOIN으로 USER_ID를 기준으로 합친다.
2. 성별 정보가 없는 것은 가져오지 않는다. (IS NOT NULL)
3. 연도와 월은 DATE_FORMAT으로 분리하여 불러오고 GENDER은 그대로 가져온다.
4. 3번의 세 컬럼을 그룹바이로 묶는다.
5. 그룹바이한 컬럼들을 기준으로 USER_ID의 카운트값도 출력될 수 있도록 한다.
6. 데이터는 년, 월, 성별을 오름차순으로 정렬한다.
```

## (2) 코드 작성
```sql
SELECT DATE_FORMAT(os.SALES_DATE, "%Y") AS YEAR, DATE_FORMAT(os.SALES_DATE, "%m") AS MONTH
     , ui.GENDER, COUNT(DISTINCT os.USER_ID) AS USERS
FROM ONLINE_SALE AS os
  INNER JOIN USER_INFO AS ui ON os.USER_ID = ui.USER_ID
WHERE GENDER IS NOT NULL
GROUP BY YEAR, MONTH, GENDER
ORDER BY YEAR ASC, MONTH ASC, GENDER ASC
```

## (3) 코드 리뷰 및 회고
- 이번 문제를 풀 때, ```USER_ID```를 ```DISTINCT```로 중복제거하여 가져와야 하는 점을 놓쳐서 시간이 많이 소요되었다.
- 물품을 구매한 횟수가 여러번일 수 있고! 그렇게 되면 ```ONLINE_SALE``` 테이블에 ```USER_ID```의 중복값이 있을 수 있다는 점을 간과했다.
- 문제는 ```COUNT(os.USER_ID) -> COUNT(DISTINCT os.USER_ID)```로 바꿈으로써 해결했다.
- 앞으로 문제를 풀기 전에 ```JOIN``` 후에 어떤 테이블이 될지.. 생각해 보는 시간을 가져야겠다!

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
