---
title:  "[프로그래머스 SQL] Lv 4. 주문량이 많은 아이스크림들 조회하기"
layout: single

categories: "Algorithm_SQL"
tags: ["SUM", "GROUP BY", "JOIN", "ORDER BY", "LIMIT"]

toc: true
toc_sticky: true
toc_label : "목차"
toc_icon: "bars"
---

<small>SQL 고득점 Kit - JOIN 문제</small>

***

# <span class="half_HL">✔️ 문제 설명</span>
다음은 아이스크림 가게의 상반기 주문 정보를 담은 ```FIRST_HALF``` 테이블과 7월의 아이스크림 주문 정보를 담은 ```JULY``` 테이블입니다. ```FIRST_HALF``` 테이블 구조는 다음과 같으며, ```SHIPMENT_ID```, ```FLAVOR```, ```TOTAL_ORDER```는 각각 아이스크림 공장에서 아이스크림 가게까지의 출하 번호, 아이스크림 맛, 상반기 아이스크림 총주문량을 나타냅니다. ```FIRST_HALF``` 테이블의 기본 키는 ```FLAVOR```입니다. ```FIRST_HALF```테이블의 ```SHIPMENT_ID```는 ```JULY```테이블의 ```SHIPMENT_ID```의 외래 키입니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|SHIPMENT_ID|	INT(N)|	FALSE|
|FLAVOR|	VARCHAR(N)|	FALSE|
|TOTAL_ORDER|	INT(N)|	FALSE|

```JULY``` 테이블 구조는 다음과 같으며, ```SHIPMENT_ID```, ```FLAVOR```, ```TOTAL_ORDER``` 은 각각 아이스크림 공장에서 아이스크림 가게까지의 출하 번호, 아이스크림 맛, 7월 아이스크림 총주문량을 나타냅니다. ```JULY``` 테이블의 기본 키는 ```SHIPMENT_ID```입니다. ```JULY```테이블의 ```FLAVOR```는 ```FIRST_HALF``` 테이블의 ```FLAVOR```의 외래 키입니다. 7월에는 아이스크림 주문량이 많아 같은 아이스크림에 대하여 서로 다른 두 공장에서 아이스크림 가게로 출하를 진행하는 경우가 있습니다. 이 경우 같은 맛의 아이스크림이라도 다른 출하 번호를 갖게 됩니다.

|NAME|	TYPE|	NULLABLE|
|:---|:-----|:----------|
|SHIPMENT_ID|	INT(N)|	FALSE|
|FLAVOR|	VARCHAR(N)|	FALSE|
|TOTAL_ORDER|	INT(N)|	FALSE|

## 문제
7월 아이스크림 총 주문량과 상반기의 아이스크림 총 주문량을 더한 값이 큰 순서대로 상위 3개의 맛을 조회하는 SQL 문을 작성해주세요. [👉 문제 보러가기](https://school.programmers.co.kr/learn/courses/30/lessons/133027)

<br>

# <span class="half_HL">✔️ 문제 풀이</span>
## (1) Pseudo-Code
```markdown
1. 두 테이블은 아이스크림의 맛을 기준으로 JOIN 한다.
2. JULY 테이블에는 다른 공장에서 출하한 데이터를 포함하기 때문에 FLAVOR를 기준으로 GROUP화 한다.
3. 정렬은 7월의 총 주문량과 상반기 총 주문량을 더한 값을 기준으로 내림차순한다.
4. 상위 3개만 가져올 수 있도록 LIMIT 를 사용한다.
```

## (2) 코드 작성
```sql
SELECT J.FLAVOR
FROM (
      SELECT FLAVOR, SUM(TOTAL_ORDER) AS TOTAL_ORDER
      FROM JULY
      GROUP BY FLAVOR
)AS J INNER JOIN FIRST_HALF AS F ON J.FLAVOR = F.FLAVOR
ORDER BY J.TOTAL_ORDER + F.TOTAL_ORDER DESC
LIMIT 3
```

## (3) 코드 리뷰 및 회고
- ```JOIN``` 으로 테이블을 결합할 때, ```SELECT, FROM, ~``` 문을 사용해 기존의 테이블을 약간의 변형 후에 가져올 수 있다는 점을 기억해야겠다.

<br>

👩🏻‍💻개인 공부 기록용 블로그입니다
<br>오류나 틀린 부분이 있을 경우 댓글 혹은 메일로 따끔하게 지적해주시면 감사하겠습니다.
{: .notice}
