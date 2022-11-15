---
title:  "[프로그래머스 SQL] Lv 4. 오프라인/온라인 판매 데이터 통합하기"
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

***

# <span class="half_HL">✔️ 문제 설명</span>

다음은 어느 의류 쇼핑몰의 온라인 상품 판매 정보를 담은 ```ONLINE_SALE``` 테이블과 오프라인 상품 판매 정보를 담은 ```OFFLINE_SALE``` 테이블 입니다. 

```ONLINE_SALE``` 테이블은 아래와 같은 구조로 되어있으며 ```ONLINE_SALE_ID```, ```USER_ID```, ```PRODUCT_ID```, ```SALES_AMOUNT```, ```SALES_DATE```는 각각 온라인 상품 판매 ID, 회원 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|ONLINE_SALE_ID|	INTEGER|	FALSE|
|USER_ID|	INTEGER|	FALSE|
|PRODUCT_ID|	INTEGER|	FALSE|
|SALES_AMOUNT|	INTEGER|	FALSE|
|SALES_DATE|	DATE|	FALSE|

동일한 날짜, 회원 ID, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

```OFFLINE_SALE``` 테이블은 아래와 같은 구조로 되어있으며 ```OFFLINE_SALE_ID```, ```PRODUCT_ID```, ```SALES_AMOUNT```, ```SALES_DATE```는 각각 오프라인 상품 판매 ID, 상품 ID, 판매량, 판매일을 나타냅니다.

|Column name|	Type|	Nullable|
|:---|:---|:---|
|OFFLINE_SALE_ID	|INTEGER	|FALSE|
|PRODUCT_ID	|INTEGER	|FALSE|
|SALES_AMOUNT	|INTEGER|	FALSE|
|SALES_DATE	|DATE|	FALSE|

동일한 날짜, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재합니다.

## 문제
- ```ONLINE_SALE``` 테이블과 ```OFFLINE_SALE``` 테이블에서 2022년 3월의 오프라인/온라인 상품 판매 데이터의 판매 날짜, 상품ID, 유저ID, 판매량을 출력하는 SQL문을 작성해주세요. 
- ```OFFLINE_SALE``` 테이블의 판매 데이터의 ```USER_ID``` 값은 NULL 로 표시해주세요. 
- 결과는 판매일을 기준으로 오름차순 정렬해주시고 판매일이 같다면 상품 ID를 기준으로 오름차순, 상품ID까지 같다면 유저 ID를 기준으로 오름차순 정렬해주세요.
- [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/131537)


# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 두 테이블을 SELECT, FROM, WHERE 로 문제를 만족할 조건식을 만든 후 각각 소괄호로 묶는다.
2. 두 테이블을 컬럼을 기준으로 행으로 붙이기 위해 UNION 을 사용한다.
3. 두 테이블을 묶은 후, SALES_DATE, PRODUCT_ID, USER_ID 를 기준으로 오름차순 정렬한다.
```

## (2) 코드 작성
```sql
(SELECT DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE
     , PRODUCT_ID
     , USER_ID
     , SALES_AMOUNT
FROM ONLINE_SALE
WHERE DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-03')

UNION

(SELECT DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE
     , PRODUCT_ID
     , NULL AS USER_ID
     , SALES_AMOUNT
FROM OFFLINE_SALE
WHERE DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-03')

ORDER BY SALES_DATE, PRODUCT_ID, USER_ID
```

## (3) 코드 리뷰 및 회고
- 이번 문제는 매우매우 어려웠다. 별이 다섯개. ⭐️⭐️⭐️⭐️⭐️
- 처음엔 ```JOIN```을 사용하여 가져오려고 하였으나 생각해보니 두 테이블의 데이터를 독립적으로 가져와야하기 때문에 ```UNION``` 을 사용했다.
- 문제가 어려워서 해결해내는 과정에서 많이 성장한 것 같다! 
- 오늘 성장 발걸음은 .. 👣👣👣👣👣👣👣👣👣👣

## (4) 기억하기
- UNION으로 두 테이블 결합할 땐 컬럼 개수가 일치해야 한다.
- 컬럼의 개수가 맞지 않을 땐, ```NULL```로 대채할 수 있다.
- 위에 작성한 코드와 같이 컬럼 길이를 맞추기 위해 ```NULL```을 사용하고, 컬럼명 변경을 위해 ```AS USER_ID``` 를 기입했다.


👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
