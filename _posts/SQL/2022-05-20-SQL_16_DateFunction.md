---
layout : single
title : SQL 날짜 함수
categories:
  - Blog
tags:
  - Blog
---

> ### 날짜 함수

~~~sql
-- SYSDATE, SYSTIMESTAMP
-- SYSDATE와 SYSTIMESTAMP는 현재일자와 시간을 각각 DATE, TIMESTAMP 형으로 반환한다.

SELECT SYSDATE, SYSTIMESTAMP FROM DUAL;
~~~



---



> ###### ADD_MONTHS (date, integer)

~~~sql
-- ADD_MONTHS (date, integer)
-- ADD_MONTHS 함수는 매개변수로 들어온 날짜에 interger 만큼의 월을 더한 날짜를 반환한다.

SELECT SYSDATE, ADD_MONTHS(SYSDATE, 1), ADD_MONTHS(SYSDATE, -1) FROM DUAL;
~~~

---

> ###### MONTHS_BETWEEN(date1, date2)

~~~sql
-- MONTHS_BETWEEN(date1, date2)
-- MONTHS_BETWEEN 함수는 두 날짜 사이의 개월 수를 반환하는데, date2가 date1보다 빠른 날짜가 온다

SELECT
    MONTHS_BETWEEN(SYSDATE, ADD_MONTHS(SYSDATE, 1)) MON1,
    MONTHS_BETWEEN(ADD_MONTHS(SYSDATE, 1), SYSDATE) MON1
FROM DUAL;
~~~

---

> ###### LAST_DAY(date)

~~~sql
-- LAST_DAY(date)
-- LAST_DAY는 date 날짜를 기준으로 해당 월의 마지막 일자를 반환한다.

SELECT LAST_DAY(SYSDATE), LAST_DAY('2020-08-15') FROM DUAL;
~~~

> ###### ROUND(date, format), TRUNC(date, format)

~~~sql
-- ROUND(date, format), TRUNC(date, format)
-- ROUND와 TRUNC는 숫자 함수이면서 날짜 함수로도 쓰이는데,
-- ROUND는 format에 따라 반올림한 날짜를, TRUNC는 잘라낸 날짜를 반환한다.

SELECT SYSDATE, ROUND(SYSDATE, 'month'), TRUNC(SYSDATE, 'month') FROM DUAL;

-- 날짜데이터가 15일 반올림 안됨, 16일 이상이면 반올림 됨
SELECT
    ROUND(TO_DATE('2022-05-15'), 'month'),
    ROUND(TO_DATE('2022-05-16'), 'month'),
    TRUNC(TO_DATE('2022-05-17'), 'month') -- 절삭
FROM DUAL;
~~~

---

> ###### NEXT_DAY (date, char)

~~~sql
-- NEXT_DAY (date, char)
-- NEXT_DAY는 date를 char에 명시한 날짜로 다음 주 주중 일자를 반환한다.

SELECT NEXT_DAY(SYSDATE, '금요일') FROM DUAL;
~~~

