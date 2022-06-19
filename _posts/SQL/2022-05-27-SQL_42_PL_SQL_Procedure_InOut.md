---
layout : single
title : PL/SQL 프로시저 IN & OUT
categories:
  - Blog
tags:
  - Blog
---



> ### PL/SQL 프로시저 IN & OUT

---



> ###### 매개변수 디폴트값 설정

~~~sql
-- 매개변수 디폴트 값 설정
EXECUTE MY_NEW_PROC('SM_JOB1', 'SAMPLE JOB1'); -- 에러. 매개변수 4개인데 값은 2개

CREATE OR REPLACE PROCEDURE MY_NEW_JOB_PROC
(
    P_JOB_ID    IN  JOBS.JOB_ID%TYPE,
    P_JOB_TITLE    IN  JOBS.JOB_TITLE%TYPE,
    P_MIN_SALARY    IN  JOBS.MIN_SALARY%TYPE := 10, -- 디폴트 설정
    P_MAX_SALARY    IN  JOBS.MAX_SALARY%TYPE := 100, -- 디폴트 설정
)
...
~~~

- ***한 가지 주의할 점은 디폴트 값은 IN 매개변수에만 사용할 수 있다.***
- ***OUT, IN OUT 매개변수에는 디폴트 값을 설정할 수 없다.***

---

> ###### OUT 매개변수

- OUT 매개변수란 프로시저 실행 시점에 OUT 매개변수를 변수 형태로 전달하고,

  프로시저 실행부에서 이 매개변수에 특정 값을 할당한다.

  그리고 나서 실행이 끝나면 전달한 변수를 참조해 값을 가져올 수 있는 것이다. 

  프로시저 생성 시 매개변수명과 데이터 타입만 명시하면 디폴트로 IN 매개변수가 되지만

  OUT 매개변수는 반드시 OUT 키워드를 명시해야 한다.

~~~sql
-- JOBS 테이블 데이터 입력/수정시 작업한 날짜정보를 OUT출력 매개변수를 사용하여,
-- 외부로 내보내는 기능
CREATE OR REPLACE PROCEDURE MY_NEW_JOB_PROC
(
    P_JOB_ID    IN  JOBS.JOB_ID%TYPE,
    P_JOB_TITLE    IN  JOBS.JOB_TITLE%TYPE,
    P_MIN_SALARY    IN  JOBS.MIN_SALARY%TYPE := 10, -- 기본값 설정
    P_MAX_SALARY    IN  JOBS.MAX_SALARY%TYPE := 100, -- 기본값 설정
    P_UPD_DATE  OUT JOBS.UPDATE_DATE%TYPE -- OUT은 값을 내보내는 변수
)
IS
    VN_CNT NUMBER := 0;
    VN_CUR_DATE JOBS.UPDATE_DATE%TYPE := SYSDATE;
BEGIN
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
    
    -- OUT 매개변수에 현재날짜 값을 할당
    P_UPD_DATE := VN_CUR_DATE;
    
    COMMIT;
END;




-- OUT 매개변수의 프로시저 테스트. 익명블록 구문을 이용
DECLARE
    -- 프로시저의 OUT 매개변수의 값을 받고자 하는 
    VD_CUR_DATE JOBS.UPDATE_DATE%TYPE;
BEGIN
    -- 익명블록 프로시저를 실행시 EXECUTE 키워드를 생략해야 한다
    -- EXECUTE MY_NEW_JOB_PROC('SM_JOB1', 'SAMPLE JOB1', 1000, 2000, VD_CUR_DATE); 에러
    MY_NEW_JOB_PROC('SM_JOB1', 'SAMPLE JOB1', 1000, 2000, VD_CUR_DATE);
    
    DBMS_OUTPUT.PUT_LINE(VD_CUR_DATE);
END;
~~~

---

> ###### IN OUT 매개변수

- 또 다른 유형으로 IN OUT 매개변수가 있는데,

  이렇게 선언하면 입력과 동시에 출력용으로 사용할 수 있다.

  여기서 한 가지 짚고 넘어갈 점이 있는데,

  프로시저 실행 시 OUT 매개변수에 전달할 변수에 값을 할당해서 넘겨줄 수 있지만 큰 의미는 없는 일이다

~~~sql
-- 함수 또는 프로시저 생성시 매개변수의 타입 NUMBER(10), VARCHAR2(10) 길이는 실행하면 안된다
CREATE OR REPLACE PROCEDURE MY_PARAMETER_TEST_PROC
(
    P_VAR1 IN VARCHAR2, -- IN 생략 가능(기본값)
    P_VAR2 OUT VARCHAR2,
    P_VAR3 IN OUT VARCHAR2
)
IS

BEGIN
    -- 패키지, 프로시저()
    DBMS_OUTPUT.PUT_LINE('P_VAR1 VALUE = ' || P_VAR1); -- 입력받은 값이 출력
    DBMS_OUTPUT.PUT_LINE('P_VAR2 VALUE = ' || P_VAR2); -- 공백 출력
    DBMS_OUTPUT.PUT_LINE('P_VAR3 VALUE = ' || P_VAR3); -- 입력받은 값이 출력
    
    P_VAR2 := 'B2';
    P_VAR3 := 'C2'; -- 입력받은 값이 C2 할당
END;



-- 프로시저 테스트. 익명블록
DECLARE
    V_VAR1  VARCHAR2(10) := 'A';
    V_VAR2  VARCHAR2(10) := 'B';
    V_VAR3  VARCHAR2(10) := 'C';
BEGIN
    -- EXXC 제외
    MY_PARAMETER_TEST_PROC(V_VAR1, V_VAR2, V_VAR3);
    
    DBMS_OUTPUT.PUT_LINE('V_VAR2 VALUE = ' || V_VAR2); -- P_VAR2 변수의 값을 출력
    DBMS_OUTPUT.PUT_LINE('V_VAR3 VALUE = ' || V_VAR3); -- P_VAR3 변수의 값을 출력
END;
~~~

