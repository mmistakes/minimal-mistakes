---
layout : single
title : PL/SQL 프로시저 RETURN문
categories:
  - Blog
tags:
  - Blog
---

> ### PL/SQL 프로시저 RETURN문

- 함수에서 사용한 RETURN문을 프로시저에서도 사용할 수 있는데 그 쓰임새와 처리 내용은 다르다.

  함수에서는 일정한 연산을 수행하고 결과 값을 반환하는 역할을 했지만,

  프로시저에서는 RETURN문을 만나면 이후 로직을 처리하지 않고 수행을 종료,

  즉 프로시저를 빠져나가 버린다.

  반복문에서 일정 조건에 따라 루프를 빠져나가기 위해 EXIT를 사용하는 것과 유사하다.

~~~sql
CREATE OR REPLACE PROCEDURE MY_NEW_JOB_PROC
(
    P_JOB_ID    IN  JOBS.JOB_ID%TYPE,
    P_JOB_TITLE    IN  JOBS.JOB_TITLE%TYPE,
    P_MIN_SALARY    IN  JOBS.MIN_SALARY%TYPE := 10, -- 기본값 설정
    P_MAX_SALARY    IN  JOBS.MAX_SALARY%TYPE := 100 -- 기본값 설정
)
IS
    VN_CNT NUMBER := 0;
    VN_CUR_DATE JOBS.UPDATE_DATE%TYPE := SYSDATE;
BEGIN
    
    IF P_MIN_SALARY < 1000 THEN
        DBMS_OUTPUT.PUT_LINE('최소 급여값은 1000 이상이어야 한다');
        RETURN; -- 프로시저 종료. 반환값의 특징은 없다
    END IF;

    -- JOB_ID 값을 중복체크
    SELECT COUNT(*)
    INTO VN_CNT
    FROM JOBS
    WHERE JOB_ID = P_JOB_ID;
    
    IF VN_CNT = 0 THEN
        -- 실행문장
        INSERT INTO JOBS(JOB_ID, JOB_TITLE, MIN_SALARY, MAX_SALARY, CREATE_DATE, UPDATE_DATE)
        VALUES (P_JOB_ID, P_JOB_TITLE, P_MIN_SALARY, P_MAX_SALARY, VN_CUR_DATE, VN_CUR_DATE);
    ELSE
        UPDATE JOBS
            SET JOB_TITLE = P_JOB_TITLE,
                MIN_SALARY = P_MIN_SALARY,
                MAX_SALARY = P_MAX_SALARY,
                UPDATE_DATE = VN_CUR_DATE
            WHERE JOB_ID = P_JOB_ID;
    END IF;

    COMMIT;
END;


-- RETURN 키워드 프로시저 테스트
EXECUTE MY_NEW_JOB_PROC('SM_JOB1', 'SAMPLE_JOB1', 500, 1000);
~~~

