---
layout : single
title : SQL 분석함수
categories:
  - Blog
tags:
  - Blog
---

> ### 분석함수 (Analytic Function)



- 테이블에 있는 로우에 대해 특정 그룹별로 집계 값을 산출할 때 사용된다.

  집계 값을 구할 때 보통은 그룹 쿼리를 사용하는데,

  이때 GROUP BY 절에 의해 최종 쿼리 결과는 그룹별로 로우 수가 줄어든다.

  이에 반해, 집계 함수를 사용하면 로우의 손실 없이도 그룹별 집계 값을 산출해 낼 수 있다.

  분석 함수에서 사용하는 로우별 그룹을 윈도우(window)라고 부르는데,

  이는 집계 값 계산을 위한 로우의 범위를 결정하는 역할을 한다.

- **GROUP BY는 결과만 출력하지만, 분석함수는 그룹화된 데이터 내역, 그 자체를 출력**





---

> ###### ROW_NUMBER()

- ROW_NUMBER는 ROWNUM 의사 컬럼과 비슷한 기능을 하는데,

  파티션으로 분할된 그룹별로 각 로우에 대한 순번을 반환하는 함수다

~~~sql
-- ROW_NUMBER는 ROWNUM 의사 컬럼과 비슷한 기능을 하는데,
-- 파티션으로 분할된 그룹별로 각 로우에 대한 순번을 반환하는 함수다

-- 1) PARTITION BY DEPARTMENT_ID : 부서별 동일한 데이터를 대상으로 선정
-- 2) ORDER BY EMP_NAME : 그룹화된 데이터를 이름기준 정렬
-- 3) ROW_NUMBER() : 번호를 순차적으로 부여

-- 부서별 사원의 수를 출력
SELECT DEPARTMENT_ID, EMP_NAME,
       ROW_NUMBER() OVER (PARTITION BY DEPARTMENT_ID ORDER BY EMP_NAME) AS DEP_ROWS
FROM EMPLOYEES;
~~~





---



> ###### RANK( ), DENSE_RANK( )

~~~sql
-- RANK( )
-- RANK 함수는 파티션별 순위를 반환한다. 부서별로 급여 순위를 매겨 보자.
-- 공동순위의 개수를 참고하여, 그 다음 순위가 정해진다

-- 부서별 연봉 랭크
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY) AS DEP_RANK
FROM EMPLOYEES;




-- DENSE_RANK( )
-- 공동순위의 개수를 참고 안하고, 그 다음 순서에 의하여, 순위가 정해진다
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       DENSE_RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY) AS DEP_RANK
FROM EMPLOYEES;
~~~

~~~sql
-- 응용
-- 부서별 급여가 상위 3위안에 데이터를 출력 ( TOP N 쿼리)
-- 테이블에 존재하는 물리적인 컬럼은 조건식에 사용 가능, 가공된 데이터 컬럼 사용x
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       DENSE_RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY DESC) AS DEP_RANK
FROM EMPLOYEES
WHERE DEP_RANK <= 3; -- DEP_RANK는 가공된 컬럼임. 에러발생

-- FROM 절 서브쿼리(인라인 뷰). 문법> FROM 테이블 또는 뷰
SELECT *
FROM (
      SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
             DENSE_RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY DESC) AS DEP_RANK
      FROM EMPLOYEES
      )
WHERE DEP_RANK <= 3;
~~~





---

> ###### CUME_DIST( )와 PERCENT_RANK( )

~~~sql
-- CUME_DIST( )
-- CUME_DIST 함수는 주어진 그룹에 대한 상대적인 누적분포도 값을 반환한다.
-- 분포도 값(비율)이므로 반환 값의 범위는 0초과 1이하 사이의 값을 반환한다.

-- 부서별 급여에 따른 누적분포도 값을 구해보자.
-- 출력된 값의 개수를 기준으로 누적분포도 값 나옴
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       CUME_DIST() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY) DEP_DIST
FROM EMPLOYEES;



-- PERCENT_RANK( )
-- PERCENT_RANK 함수는 해당 그룹 내의 백분위 순위Percentile Rank 를 반환한다.
-- 0초과 1이하의 누적분포 값을 반환하는 CUME_DIST와는 달리,
-- PERCENT_RANK는 0이상 1이하 값을 반환한다. 
-- 백분위 순위란 그룹 안에서 해당 로우의 값보다 작은 값의 비율을 말한다

-- 랭크를 기준을 퍼센트를 나눈다 5개 로우니깐 0.25씩 나보다 작은 것 합친 값
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       RANK() OVER (PARTITION BY DEPARTMENT_ID
                    ORDER BY SALARY ) AS RAKING,
       CUME_DIST() OVER (PARTITION BY DEPARTMENT_ID
                         ORDER BY SALARY ) CUME_DIST_VALUE,
       PERCENT_RANK() OVER (PARTITION BY DEPARTMENT_ID
                            ORDER BY SALARY ) PERCENTILE
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 60;
~~~

---

> ###### NTILE(expr)

~~~sql
-- NTILE 함수는 파티션별로 expr에 명시된 값만큼 분할한 결과를 반환한다.
-- 예를 들어 한 그룹의 로우 수가 5이고 NITLE(5)라고 명시하면 정렬된 순서에 따라 1에서 5까지 숫자를 반환한다.
-- 즉 주어진 그룹을 5개로 분리한다는 것인 데 여기서 분할하는 수를 버킷 수라고 한다.
-- 버킷(bucket)이란 단어는 양동이라는 뜻이 있는데 5개의 양동이에 나눠 담는다고 이해하면 된다

-- NTILE(몇등분할지)
SELECT DEPARTMENT_ID, EMP_NAME, SALARY,
       NTILE(4) OVER (PARTITION BY DEPARTMENT_ID
                      ORDER BY SALARY)
                      AS NTILES
FROM EMPLOYEES
WHERE DEPARTMENT_ID IN (30);
~~~





---

