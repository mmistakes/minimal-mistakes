---
layout : single
title : SQL 집합 연산자 (SET Opertor)
categories:
  - Blog
tags:
  - Blog
---

> ### 집합 연산자 (SET Opertor)



---



> ###### UNION (합집합)

- UNION은 합집합을 의미한다. 참고(UNION ALL)
- 컬럼의 개수와 데이터타입이 동일(호환)해야 한다

~~~sql
-- 테이블 예시
CREATE TABLE exp_goods_asia (
       country VARCHAR2(10),
       seq     NUMBER,
       goods   VARCHAR2(80));

INSERT INTO exp_goods_asia VALUES ('한국', 1, '원유제외 석유류');
INSERT INTO exp_goods_asia VALUES ('한국', 2, '자동차');
INSERT INTO exp_goods_asia VALUES ('한국', 3, '전자집적회로');
INSERT INTO exp_goods_asia VALUES ('한국', 4, '선박');
INSERT INTO exp_goods_asia VALUES ('한국', 5,  'LCD');
INSERT INTO exp_goods_asia VALUES ('한국', 6,  '자동차부품');
INSERT INTO exp_goods_asia VALUES ('한국', 7,  '휴대전화');
INSERT INTO exp_goods_asia VALUES ('한국', 8,  '환식탄화수소');
INSERT INTO exp_goods_asia VALUES ('한국', 9,  '무선송신기 디스플레이 부속품');
INSERT INTO exp_goods_asia VALUES ('한국', 10,  '철 또는 비합금강');

INSERT INTO exp_goods_asia VALUES ('일본', 1, '자동차');
INSERT INTO exp_goods_asia VALUES ('일본', 2, '자동차부품');
INSERT INTO exp_goods_asia VALUES ('일본', 3, '전자집적회로');
INSERT INTO exp_goods_asia VALUES ('일본', 4, '선박');
INSERT INTO exp_goods_asia VALUES ('일본', 5, '반도체웨이퍼');
INSERT INTO exp_goods_asia VALUES ('일본', 6, '화물차');
INSERT INTO exp_goods_asia VALUES ('일본', 7, '원유제외 석유류');
INSERT INTO exp_goods_asia VALUES ('일본', 8, '건설기계');
INSERT INTO exp_goods_asia VALUES ('일본', 9, '다이오드, 트랜지스터');
INSERT INTO exp_goods_asia VALUES ('일본', 10, '기계류');

COMMIT;
~~~

~~~sql
-- 한국의 주요 수출품목을 조회하라
SELECT * FROM exp_goods_asia
WHERE COUNTRY = '한국'
ORDER BY SEQ;

-- 일본의 주요 수출품목을 조회하라
SELECT * FROM exp_goods_asia
WHERE COUNTRY = '일본'
ORDER BY SEQ;

-- 국가에 상관없이 모든 수출품을 조회 ( 단, 품목은 한번만 조회하기)
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국'
UNION 
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'; -- 전체 20건에서 중복된 데이터는 한번만 조회. 15건 출력

-- 전체항목 조회
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국'
UNION ALL
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'; -- 전체 20건 출력

-- 컬럼의 개수가 다르다. 에러발생
SELECT SEQ, GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국'
UNION
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'; -- 전체 20건 출력

-- 타입이 다르다. 에러발생
SELECT SEQ FROM exp_goods_asia
WHERE COUNTRY = '한국'
UNION
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'; -- 전체 20건 출력

-- 타입이 다르지만, 형변환 작업 후 타입일치가 되어 실행
-- SELECT문을 여러개 사용가능
SELECT TO_CHAR(SEQ) AS "번호" FROM exp_goods_asia
WHERE COUNTRY = '한국'
UNION
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'
UNION
SELECT TO_CHAR(SEQ) FROM exp_goods_asia
WHERE COUNTRY = '한국';
~~~

---

> ###### GROUPING SETS 절

- GROUPING SETS은 ROLLUP이나 CUBE처럼 GROUP BY 절에 명시해서 그룹 쿼리에 사용되는 절

~~~sql
SELECT period, SUM(loan_jan_amt) totl_jan
    FROM kor_loan_status
    WHERE period LIKE '2013%' 
    AND region IN ('서울', '경기')
    GROUP BY PERIOD
    UNION ALL
SELECT gubun, SUM(loan_jan_amt) totl_jan
    FROM kor_loan_status
    WHERE period LIKE '2013%'
    AND region IN ('서울', '경기')
    GROUP BY gubun;

-- 위의 UNION ALL을 하나로 묶음
-- GROUP BY GROUPING SETS(period, gubun)
SELECT period, gubun, SUM(loan_jan_amt) totl_jan
    FROM kor_loan_status
    WHERE period LIKE '2013%'
    AND region IN ('서울', '경기')
    GROUP BY GROUPING SETS(period, gubun);
~~~









---



> ###### INTERSECT (교집합)

- INTERSECT는 합집합이 아닌 교집합을 의미한다
- 즉 데이터 집합에서 공통된 항목만 추출해 낸다

~~~sql
-- 공통된 항목만 추출
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국'
INTERSECT 
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본';
~~~





---

> ###### MINUS

- MINUS는 차집합을 의미한다
- 즉 한 데이터 집합을 기준으로 다른 데이터 집합과 공통된 항목을 제외한 결과만 추출해 낸다

~~~sql
-- 한국입장에서 일본꺼 빼기
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국'
MINUS 
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본';

-- 일본입장에서 한국꺼 빼기
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '일본'
MINUS 
SELECT GOODS FROM exp_goods_asia
WHERE COUNTRY = '한국';
~~~

---

> ###### 집합연산자 사용시 ORDER BY 위치

~~~sql
-- ORDER BY 맨 마지막에 사용가능
SELECT goods
        FROM exp_goods_asia
        WHERE COUNTRY = '한국'
        UNION
        SELECT goods
        FROM exp_goods_asia
        WHERE COUNTRY = '일본'
        ORDER BY goods; -- 앞 SELECT문의 결과를 전체적인 관점에서 정렬하는 의미로 사용
~~~

---

> - ###### 주의사항
>
> ###### BLOB, CLOB, BFILE 타입의 컬럼에 대해서는 집합 연산자를 사용할 수 없다
>
> ###### UNION, INTERSECT, MINUS 연산자는 LONG형 컬럼에는 사용할 수 없다