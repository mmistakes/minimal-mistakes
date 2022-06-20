---
layout : single
title : SQL ROLLUP, CUBE
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### ROLLUP

- ROLLUP과 CUBE는 GROUP BY절에서 사용되어 그룹별 소계를 추가로 보여 주는 역할을 한다.

~~~sql
-- ROLLUP을 적용하지 않은 상태
SELECT PERIOD, GUBUN, SUM(LOAN_JAN_AMT) TOTL_JAN
FROM KOR_LOAN_STATUS
WHERE PERIOD LIKE '2013%'
GROUP BY PERIOD, GUBUN
ORDER BY PERIOD;

-- GROUP BY PERIOD, GUBUN 데이터를 내역으로 하여, 중간소계, 최종소계 함께 출력
SELECT PERIOD, GUBUN, COUNT(*), SUM(LOAN_JAN_AMT) TOTL_JAN
FROM KOR_LOAN_STATUS
WHERE PERIOD LIKE '2013%'
GROUP BY ROLLUP(PERIOD, GUBUN)
ORDER BY PERIOD;

-- PERIOD GUBUN                            COUNT(*)   TOTL_JAN
-------- ------------------------------ ---------- ----------
-- 201310 기타대출                               17     676078
-- 201310 주택담보대출                           17   411415.9
-- 201310 NULL                                   34  1087493.9
-- 201311 기타대출                               17   681121.3
-- 201311 주택담보대출                           17   414236.9
-- 201311 NULL                                   34  1095358.2
-- NULL   NULL                                   68  2182852.1

SELECT PERIOD, GUBUN, SUM(LOAN_JAN_AMT) TOTL_JAN
FROM KOR_LOAN_STATUS
WHERE PERIOD LIKE '2013%'
GROUP BY PERIOD, ROLLUP(GUBUN); -- 전체집계 제외한 출력모습
~~~

---

> ### CUBE

~~~sql
-- GROUP BY PERIOD, GUBUN 데이터를 내역으로 하여, 중간소계,
-- 2번째 GUBUN에 대한 역 중간소계, 최종소계
SELECT PERIOD, GUBUN, COUNT(*), SUM(LOAN_JAN_AMT) TOTL_JAN
FROM KOR_LOAN_STATUS
WHERE PERIOD LIKE '2013%'
GROUP BY CUBE(PERIOD, GUBUN)
ORDER BY PERIOD;

-- PERIOD GUBUN                            COUNT(*)   TOTL_JAN
-------- ------------------------------ ---------- ----------
-- 201310 기타대출                               17     676078
-- 201310 주택담보대출                           17   411415.9
-- 201310 NULL                                   34  1087493.9
-- 201311 기타대출                               17   681121.3
-- 201311 주택담보대출                           17   414236.9
-- 201311 NULL                                   34  1095358.2
-- NULL   기타대출                               34  1357199.3
-- NULL   주택담보대출                           34   825652.8
-- NULL   NULL                                   68  2182852.1
~~~

---

> ### D

~~~sql
~~~

---

> ### D

~~~sql
~~~

