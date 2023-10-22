---
layout: single
title:  "oracle - SQL basic gramma"
categories: oracle
tag: [SQL]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆연산자

| **연산자 종류**       | **설명**                                            |
| --------------------- | --------------------------------------------------- |
| =                     | 같은 조건을 검색                                    |
| !=, <>                | 같지 않은 조건을 검색                               |
| >                     | 큰 조건을 검색                                      |
| >=                    | 크거나 같은 조검을 검색 (공백,순서 조심해서 쓰기!!) |
| <                     | 작은 조건을 검색                                    |
| <=                    | 작거나 같은 조건을 검색 (공백,순서 조심해서 쓰기!!) |
| BETWEEN a AND b       | A와 B 사에이 있는 범위값을 모두 검색                |
| IN(a,b,c,)            | A이거나 B이거나 C인 조건을 검색                     |
| Like                  | 특정 패턴을 가지고 있는 조건을 검색                 |
| Is Null / Is Not Null | Null 값을 검색 / Null이 아닌 값을 검색              |
| A AND B               | A 조건과 B 조건을 모두 만족하는 값만 검색           |
| A OR B                | A 조건이나 B 조건 중 한 가지라도 만족하는 값을 검색 |
| NOT A                 | A가 아닌 모든 조건을 검색                           |

<br>





## 1)산술연산자

```sql
SELECT name,
       sal+100
FROM emp;
```

emp테이블의 sal 컬럼값에 100을 더해서 출력



## 2) 비교연산자

```sql
-- =
-- acompany테이블에 position이 staff인 모든 컬럼출력
SELECT *
FROM acompany
WHERE position = 'staff'; 
```



## 3) 논리연산자

```sql
-- AND
-- position이 staff이고 hiredate가 1987-12-31인 모든 컬럼출력
SELECT *
FROM acompany
WHERE position = 'staff' AND hiredate > '1987-12-31';


-- OR
-- position이 staff이거나 hiredate가 1987-12-31인 모든 컬럼 출력
SELECT *
FROM acompany
WHERE position = 'staff' OR hiredate > '1987-12-31';
-- IN을 사용하여 WHERE절 변경 : WHERE workdept IN('C01' , 'D11')
SELECT *
FROM acompany
WHERE workdept = 'C01' OR workdept = 'D11';


-- != , <>, NOT
-- position이 staff가 아닌 모든 컬럼출력
SELECT *
FROM acompany
WHERE position != 'staff';

SELECT *
FROM acompany
WHERE position <> 'staff';

SELECT *
FROM acompany
WHERE NOT position = 'staff';
```



*** 주의사항**<br/>-SQL은 NOT절을 평가하고 그 다음으로 AND절과 OR절을 차례로 평가하기 때문에 평가순서를 바꾸고 싶으면 괄호를 사용하여야 한다.

```sql
WHERE workdept = 'E11' AND NOT job = 'analyst';


-- workdept가 E11 또는 E21 그리고 edlevel가 12보다 큰 값
WHERE edlevel > 12 AND
     (workdept = 'E11' OR workdept = 'E21');
     
-- edlevel 12보다 크고 workdept가 E11 ,이거나 workdept E21인 값(E21은 edlevel의 조건이 없음)
WHERE edlevel > 12 AND
      workdept = 'E11' OR workdept = 'E21';
```





## 4) BETWEEN a AND b

-숫자형, 문자형, 날짜형에 사용가능하다.

```sql
-- hiredate가 '2019-01-01'부터 '2020-12-31'사이의 모든 컬럼 출력
SELECT *
FROM acompany
WHERE hiredate BETWEEN '2019-01-01' AND '2020-12-31';

-- hiredate가 '2019-01-01'미만이거나 '2020-12-31'초과하는 모든 컬럼 출력
SELECT *
FROM acompany
WHERE hiredate NOT BETWEEN '2019-01-01' AND '2020-12-31';
```





## 5) LIKE

```sql
-- name이 M으로 시작하는 데이터 출력
SELECT *
FROM acompany
WHERE name LIKE "M%";

-- adress가 Japan으로 끝나는 데이터 출력
SELECT *
FROM acompany
WHERE adress LIKE "%Japan";

-- 이름에 ar이 들어가는 데이터를 출력
SELECT *
FROM acompany
WHERE name LIKE "%ar%";

-- 이름중에서 M로 시작하고 i로 끝나는 4글자를 가진 데이터를 출력
SELECT * 
FROM acompany
WHERE name LIKE "M__i%"
```





## 6) Is Null / Is Not Null

```sql
-- adress의 값이 null값을 가지고 있는 데이터 출력
SELECT *
FROM acompany
WHERE adress is null ;

-- adress의 값이 null값을 가지고 있지 않은 데이터 출력
SELECT *
FROM acompany
WHERE adress is not null ;
```





## 7) ORDER BY

-성능은 느리기 때문에 index을 활용하여 사용한다.<br/>-쿼리문의 맨 마지막에 사용하여야 한다.

```sql
-- 오름차순
SELECT *
FROM acompany
ORDER BY name ASC;

-- 내림차순
SELECT *
FROM acompany
ORDER BY sal DESC;

-- 오름차순 & 내림차순
SELECT *
FROM acompany
ORDER BY name ASC, sal DESC;

-- 오름차순 & 내림차순(인덱스 값으로 가능)
-- 1 name과 2 sal을 오름차순으로 정렬
SELECT name,
       sal
FROM acompany
ORDER BY 1,2 ASC;
```

