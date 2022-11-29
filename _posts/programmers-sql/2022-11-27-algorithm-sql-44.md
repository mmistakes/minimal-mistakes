---
title:  "[프로그래머스 SQL] Lv 5. 상품을 구매한 회원 비율 구하기"
layout: single

categories: "Algorithm_SQL"
tags: ["ROUND", "COUNT", "YEAR", "MONTH", "JOIN", "DISTINCT", "GROUP BY", "LIKE", "ORDER BY", "WHERE"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - JOIN 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 어느 의류 쇼핑몰에 가입한 회원 정보를 담은 ```USER_INFO``` 테이블과 온라인 상품 판매 정보를 담은 ```ONLINE_SALE``` 테이블 입니다. ```USER_INFO``` 테이블은 아래와 같은 구조로 되어있으며 ```USER_ID```, ```GENDER```, ```AGE```, ```JOINED```는 각각 회원 ID, 성별, 나이, 가입일을 나타냅니다.

|Column name|	Type|	Nullable|
|:------|:----|:----|
|USER_ID|	INTEGER	|FALSE|
|GENDER	|TINYINT(1)|	TRUE|
|AGE|	INTEGER|	TRUE|
|JOINED|	DATE|	FALSE|

```GENDER``` 컬럼은 비어있거나 0 또는 1의 값을 가지며 0인 경우 남자를, 1인 경우는 여자를 나타냅니다.

```ONLINE_SALE``` 테이블은 아래와 같은 구조로 되어있으며 ```ONLINE_SALE_ID```, ```USER_ID```, ```PRODUCT_ID```, ```SALES_AMOUNT```, ```SALES_DATE```는 각각 온라인 상품 판매 ID, 회원 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column name|	Type|	Nullable|
|:----|:----|:---|
|ONLINE_SALE_ID|	INTEGER|	FALSE|
|USER_ID|	INTEGER|	FALSE|
|PRODUCT_ID	|INTEGER|	FALSE|
|SALES_AMOUNT|	INTEGER|	FALSE|
|SALES_DATE|	DATE|	FALSE|

동일한 날짜, 회원 ID, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

## 문제
```USER_INFO``` 테이블과 ```ONLINE_SALE``` 테이블에서 2021년에 가입한 전체 회원들 중 상품을 구매한 회원수와 상품을 구매한 회원의 비율(=```2021년에 가입한 회원 중 상품을 구매한 회원수 / 2021년에 가입한 전체 회원 수```)을 년, 월 별로 출력하는 SQL문을 작성해주세요. 
<br>상품을 구매한 회원의 비율은 소수점 두번째자리에서 반올림하고, 전체 결과는 년을 기준으로 오름차순 정렬해주시고 년이 같다면 월을 기준으로 오름차순 정렬해주세요. 
<br>[👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131534)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. ONLINE_SALE 테이블을 동일한 날짜, 회원 ID, 상품 ID 조합에 대해 한 데이터만 불러오기 위해 DISTINCT 를 사용한다.
2. ONLINE_SALE 테이블에서 연도, 월, 고객 ID만 불러올 수 있도록 한다.
3. 위에서 불러온 테이블을 USER_INFO 테이블과 고객 ID를 기준으로 JOIN 한다.
4. USER_INFO 에서 가입 연도가 2021년도에 해당하는 정보만 불러올 수 있는 조건문을 추가한다. (LIKE 연산자 사용하면 될 듯)
5. 상품을 구매한 연도와 월을 기준으로 GROUP BY한다.
6. 출력할 정보는 연도, 월, 고객 수, 2021년에 가입한 전체 회원들 중 상품을 구매한 회원수와 상품을 구매한 회원의 비율이다.
7. 연도와 월을 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
SELECT T1.YEAR, T1.MONTH, COUNT(T1.USER_ID) AS PUCHASED_USERS
     , ROUND((COUNT(T1.USER_ID) / (SELECT COUNT(USER_ID) FROM USER_INFO WHERE YEAR(JOINED) = 2021)), 1) AS PUCHASED_RATIO
FROM (
      SELECT DISTINCT YEAR(SALES_DATE) AS YEAR, MONTH(SALES_DATE) AS MONTH, USER_ID
      FROM ONLINE_SALE
) AS T1 JOIN USER_INFO AS T2 ON T1.USER_ID = T2.USER_ID AND T2.JOINED LIKE '2021%'
GROUP BY T1.YEAR, T1.MONTH
ORDER BY T1.YEAR, T1.MONTH
```

## (3) 코드 리뷰 및 회고
- **2021년에 가입한 전체 회원들 중 상품을 구매한 회원수와 상품을 구매한 회원의 비율**을 구할 때 2021년에 가입한 전체 회원 수를 구하기 위해 ```SELECT-FROM-WHERE``` 을 사용했다.
- ```SELECT``` 문의 계산식(```ROUND```, ```COUNT```, .. 등)에도 테이블을 새로 불러오고 원하는 정보를 뽑아내어 가져올 수 있다는 점을 기억해야겠다!
- 또한 ```JOIN```으로 테이블을 연결할 때 **조건식**(```T2.JOINED LIKE '2021%'```)을 넣을 수 있다는 점을 기억해야겠다!

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
