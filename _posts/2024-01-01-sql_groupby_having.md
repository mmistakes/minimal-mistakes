---
published: true
title: "[SQL] GROUP BY, HAVING"

categories: SQL
tag: [SQL, MySQL]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-01
---
SELECT 형식 중 GROUP BY, HAVING절에 대해 알아보자

<br>

*p.s 새해 새벽부터 첫 포스팅~ 보는 사람 없이 그냥 혼자만의 공부 기록 블로그지만 다들 새해 복 많이 받길 바랍니다.*

<br>
<br>

# SELECT 순서

```sql
SELECT select_expr
    FROM table_name
    WHERE where_condition
    GROUP BY {col_name | expr | position}
    HAVING where_condition
    ORDER BY {col_name | expr | position}
```

<br>
<br>

# GROUP BY

GROUP BY 절은 속성값을 그룹으로 분류하고자 할 때 사용한다.

`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()` 같은 집계 함수와 함께 사용되며 특정 열의 행을 그룹화하는 데 사용된다.

아래는 **[서울시 따릉이 자전거 이용 현황]** 데이터베이스의 `station`테이블의 각 고유 `local`값 (지역명)에 대한 레코드 수를 GROUP BY를 이용해 계산한 예시이다. 

(다양한 지역에 걸쳐 자전거 보관소의 분포 또는 사용을 이해하는 데 도움이 될 수 있다.)

**[데이터베이스]**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/61521db6-8a8a-441f-bb5a-447ba7178dad)

**[SQL 쿼리]**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/27f7789c-2090-49f9-a814-5e24debb7910)

**[결과]**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/7464eea6-167a-4b84-8653-e2f04bb69524)


# HAVING

HAVING 절은 GROUP BY에 의해 분류한 후 그룹에 대한 조건을 지정할 때 사용한다.

GROUP BY 절과 함께 사용되며 그룹화된 행에 대해 지정된 조건을 기반으로 쿼리 결과를 필터링해주는 것이다.

아래는 지역별 대여 수로 GROUP BY 한 후에 대여 수가 100 이상인 지역만 출력하는 쿼리 예시이다.

**[SQL 쿼리]**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/f84e363e-7654-4327-9807-d2b14049eb91)

**[결과]**

![image](https://github.com/leejongseok1/algorithm/assets/79849878/575756bb-43f2-47a8-942f-0b3d644f7cae)

## WHERE vs. HAVING

**WHERE**

```sql
SELECT * FROM table_name WHERE condition;
```

**WHERE** 조건절은 항상 **FROM 뒤**에 위치하고 조건(condition)에는 다양한 비교연산자들이 사용되어 구체적인 조건을 줄 수 있다. 일반적으로 집계되지 않은 열과 함께 사용된다.


**HAVING**

```sql
SELECT * FROM table_name GROUP BY filed_name HAVING condition;
```

**HAVING** 절은 항상 **GROUP BY 뒤**에 위치하고 WHERE 절과 마찬가지로 조건에 다양한 비교연산자들이 사용되어 구체적인 조건을 줄 수 있다.

위에서 설명했듯이, HAVING절은 집계 값을 기준으로 그룹화가 수행된 후 쿼리 결과를 필터링하고, 집계 함수를 기반으로 그룹을 필터링하는 데 사용된다.

**차이점**은,

**HAVING**절은 **GROUP BY**없이 사용할 수 없고, **WHERE**절은 독립적으로 사용할 수 있으며 모든 필드를 조건에 둘 수 있다.

전체 테이블 자체에서 쿼리를 수행하고자 한다면 **WHERE**절을,

테이블을 그룹화 한 뒤 해당 그룹에서 어떠한 조건을 두고 출력하고 싶다면 **HAVING**절을 사용한다.

<br>

SQL 집계 함수에 대한 내용 **->** [https://leejongseok1.github.io/sql/sql_func(1)/#%EA%B3%84%EC%82%B0-%ED%95%A8%EC%88%98](https://leejongseok1.github.io/sql/sql_func(1)/#%EA%B3%84%EC%82%B0-%ED%95%A8%EC%88%98)