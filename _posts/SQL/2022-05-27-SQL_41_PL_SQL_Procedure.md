---
layout : single
title : PL/SQL 프로시저 생성
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### PL/SQL 프로시저 생성

- 함수나 프로시저 모두 DB에 저장된 객체이므로 프로시저를 스토어드(Stored, 저장된)

  프로시저라고 부르기도 하는데 이 책에서는 그냥 프로시저라고 하겠다

  (함수도 스토어드 함수라고도 한다).

  프로시저의 생성 구문은 다음과 같다.

~~~sql
CREATE OR REPLACE PROCEDURE 프로시저 이름
    (매개변수명1[IN |OUT | IN OUT] 데이터타입[:= 디폴트 값],
     매개변수명2[IN |OUT | IN OUT] 데이터타입[:= 디폴트 값],
     ...
     )
IS[AS]
      변수, 상수 등 선언
BEGIN
      실행부
    　
[EXCEPTION 예외 처리부]
END [프로시저 이름];
~~~

- CREATE OR REPLACE PROCEDURE

  함수와 마찬가지로 CREATE OR REPLACE 구문을 사용해 프로시저를 생성한다.

- 매개변수: IN은 입력, OUT은 출력, IN OUT은 입력과 출력을 동시에 한다는 의미다.

  아무것도 명시하지 않으면 디폴트로 IN 매개변수임을 뜻한다.

  OUT 매개변수는 프로시저 내에서 로직 처리 후,

  해당 매개변수에 값을 할당해 프로시저 호출 부분에서 이 값을 참조할 수 있다.

  그리고 IN 매개변수에는 디폴트 값 설정이 가능하다



---



> ###### 예제

~~~sql
-- jobs 테이블에 신규 JOB을 넣는 프로시저를 만들어 보자.
-- jobs 테이블에는 job 번호, job명, 최소, 최대 금액, 생성일자, 갱신일자 컬럼이 있는데,
-- 생성일과 갱신일은 시스템 현재일자로 등록할 것이므로 매개변수는 총 4개를 받도록 하자.

-- 프로시저 생성
CREATE OR REPLACE PROCEDURE MY_NEW_PROC
(
    P_JOB_ID    IN  JOBS.JOB_ID%TYPE,
    P_JOB_TITLE    IN  JOBS.JOB_TITLE%TYPE,
    P_MIN_SALARY    IN  JOBS.MIN_SALARY%TYPE,
    P_MAX_SALARY    IN  JOBS.MAX_SALARY%TYPE
)
IS

BEGIN
    -- 실행문장
    INSERT INTO JOBS(JOB_ID, JOB_TITLE, MIN_SALARY, MAX_SALARY, CREATE_DATE, UPDATE_DATE)
    VALUES (P_JOB_ID, P_JOB_TITLE, P_MIN_SALARY, P_MAX_SALARY, SYSDATE, SYSDATE);
    
    COMMIT;
END;


-- 프로시저 실행(테스트)
-- EXEC 혹은 EXECUTE 프로시저명(EXPR1, EXPR2 ...);

EXECUTE MY_NEW_PROC('SM_JOB1', 'SAMPLE JOB1', 1000, 5000);
~~~

> ###### 예제 수정

~~~sql
-- 중복된 데이터를 체크해서, 존재하면 수정, 존재하지 않으면 삽입하는 기능으로 소스를 수정
CREATE OR REPLACE PROCEDURE MY_NEW_PROC
(
    P_JOB_ID    IN  JOBS.JOB_ID%TYPE,
    P_JOB_TITLE    IN  JOBS.JOB_TITLE%TYPE,
    P_MIN_SALARY    IN  JOBS.MIN_SALARY%TYPE,
    P_MAX_SALARY    IN  JOBS.MAX_SALARY%TYPE
)
IS  
    VN_CNT NUMBER := 0;      
BEGIN
    -- JOB_ID 값을 중복체크
    SELECT COUNT(*)
    INTO VN_CNT
    FROM JOBS
    WHERE JOB_ID = P_JOB_ID;
    
    IF VN_CNT = 0 THEN
    -- 실행문장
        INSERT INTO JOBS(JOB_ID, JOB_TITLE, MIN_SALARY, MAX_SALARY, CREATE_DATE, UPDATE_DATE)
        VALUES (P_JOB_ID, P_JOB_TITLE, P_MIN_SALARY, P_MAX_SALARY, SYSDATE, SYSDATE);
    ELSE
        UPDATE JOBS
            SET JOB_TITLE = P_JOB_TITLE,
                MIN_SALARY = P_MIN_SALARY,
                MAX_SALARY = P_MAX_SALARY,
                UPDATE_DATE = SYSDATE
            WHERE JOB_ID = P_JOB_ID;
    END IF;
    COMMIT;
END;

-- 수정된 프로시저 테스트
EXECUTE MY_NEW_PROC('SM_JOB1', 'SAMPLE JOB1', 2000, 6000);
EXECUTE MY_NEW_PROC(P_JOB_ID => 'SM_JOB1', P_JOB_TITLE => 'SAMPLE JOB1', P_MIN_SALARY => 2000, P_MAX_SALARY => 6000);

-- 데이터 조회
SELECT * FROM JOBS WHERE JOB_ID = 'SM_JOB1';
~~~





