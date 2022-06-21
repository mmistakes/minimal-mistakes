---
layout : single
title : PL/SQL 프로시저 커서(CURSOR)
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ### 커서(CURSOR)

- 커서란 특정 SQL 문장을 처리한 결과를 담고 있는 영역(PRIVATE SQL이라는 메모리 영역)을 가리키는 일종의 포인터로,

  커서를 사용하면 처리된 SQL 문장의 결과 집합에 접근할 수 있다.

~~~sql
-- 1) 묵시적 커서 ( SQL 커서)
-- 오라클 내부에서 자동으로 생성되어 사용하는 커서로,
-- SQL 문장(INSERT, UPDATE, MERGE, DELETE, SELECT INTO)이 실행될 때마다 자동으로 만들어져 사용된다.

-- 묵시적 커서와 커서속성
DECLARE
    VN_DEPARTMENT_ID EMPLOYEES.DEPARTMENT_ID%TYPE := 80;
BEGIN
    -- 부서ID가 80인 데이터를 자신의 이름으로 수정
    UPDATE EMPLOYEES
        SET EMP_NAME = EMP_NAME
    WHERE DEPARTMENT_ID = VN_DEPARTMENT_ID; -- 34건 발생

    -- 업데이트 했던 데이터 변경이 몇건이 발생했는지 확인    
    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT);
    COMMIT;
END;

-- 2) 명시적 커서

-- 2-1) 익명블록
DECLARE -- 변수, 상수, 커서 선언
    VS_EMP_NAME EMPLOYEES.EMP_NAME%TYPE;
    VN_CNT NUMBER := 0;
    
    -- 커서선언
    CURSOR CUR_EMP_DEP (CP_DEPARTMENT_ID EMPLOYEES.DEPARTMENT_ID%TYPE)
    IS
    SELECT EMP_NAME
    FROM EMPLOYEES
    WHERE DEPARTMENT_ID = CP_DEPARTMENT_ID;
    
BEGIN
    -- 커서오픈(실행)
    OPEN CUR_EMP_DEP(90);
    
    LOOP
    -- 커서패치 작업 (메모리상의 데이터를 읽어오는 의미)
        FETCH CUR_EMP_DEP INTO VS_EMP_NAME;
        
        VN_CNT := VN_CNT + 1;
        DBMS_OUTPUT.PUT_LINE(VN_CNT);
        
        -- 커서영역에 현재의 포인터가 더이상 참조데이터 행이 없는경우 LOOP탈출
        EXIT WHEN CUR_EMP_DEP%NOTFOUND; -- 현재 FETCH의 상태를 확인
        
        DBMS_OUTPUT.PUT_LINE(VS_EMP_NAME);

    END LOOP;
    
    CLOSE CUR_EMP_DEP;
    
END;
~~~

---

> ### 커서와 FOR문

~~~sql
기본 FOR문 구문 형식

    FOR 인덱스 IN [REVERSE]초깃값..최종값
    LOOP
      처리문;
    END LOOP;
커서와 함께 FOR문을 사용할 때는, “초깃값..최종값” 대신 커서가 위치한다.

커서와 함께 사용될 경우 FOR문 구문 형식

    FOR 레코드 IN 커서명(매개변수1, 매개변수2, ...)
    LOOP
      처리문;
    END LOOP;
~~~

~~~sql
-- 1)
DECLARE
    -- 커서 선언
    CURSOR CUR_EMP_DEP (CP_DEPARTMENT_ID EMPLOYEES.DEPARTMENT_ID%TYPE)
    IS
    SELECT EMPLOYEE_ID, EMP_NAME FROM EMPLOYEES
    WHERE DEPARTMENT_ID = CP_DEPARTMENT_ID;
BEGIN
    -- 내부적으로 커서 OPEN이 사용
    -- FOR문을 통한 커서 패치작업 (OPEN - FETCH - CLOSE)
    FOR EMP_REC IN CUR_EMP_DEP(90) -- 1) OPEN 커서 2) 데이터행을 EMP_REC 레코드변수가 참조
    LOOP
        DBMS_OUTPUT.PUT_LINE('사원번호 : ' || EMP_REC.EMPLOYEE_ID);
        DBMS_OUTPUT.PUT_LINE('사원이름 : ' || EMP_REC.EMP_NAME);
    END LOOP;
END;



-- 2) FOP문으로 패치(커서의 내용을 포함). 레코드명사용. 예) 레코드명.컬럼명 참조
DECLARE
    
BEGIN
    -- 내부적으로 커서 OPEN이 사용
    -- FOR문을 통한 커서 패치작업 (OPEN - FETCH - CLOSE)
    FOR EMP_REC IN (
                    -- 커서내용
                    SELECT EMPLOYEE_ID, EMP_NAME 
                    FROM EMPLOYEES
                    WHERE DEPARTMENT_ID = 90)
    LOOP
        DBMS_OUTPUT.PUT_LINE('사원번호 : ' || EMP_REC.EMPLOYEE_ID);
        DBMS_OUTPUT.PUT_LINE('사원이름 : ' || EMP_REC.EMP_NAME);
    END LOOP;
END;
~~~

---

> ### 커서변수 타입

~~~sql
-- 커서변수를 정의하기 위한 데이터 타입

-- 1) 약한 커서타입
-- TYPE 커서_타입명 IS REF CURSOR;
-- 2) 강한 커서타입 : 커서변수가 갖게 되는 SELECT문
-- TYPE 커서_타입명 IS REF CURSOR [ RETURN 반환 타입 ];
DECLARE
    VS_EMP_NAME EMPLOYEES.EMP_NAME%TYPE;
    
    -- 약한 커서타입 선언
    TYPE EMP_DEP_CURTYPE IS REF CURSOR;
    -- 커서변수선언. 예) 커서변수명 커서약한 또는 강한 데이터타입
    EMP_DEP_CURVAR EMP_DEP_CURTYPE;
    
BEGIN
    OPEN EMP_DEP_CURVAR FOR SELECT EMP_NAME
                            FROM EMPLOYEES
                            WHERE DEPARTMENT_ID = 90;
    LOOP
        FETCH EMP_DEP_CURVAR INTO VS_EMP_NAME;
        
        EXIT WHEN EMP_DEP_CURVAR%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE('TEST');    
    END LOOP;
    
END;
~~~

---

> ### 커서변수를 매개변수로 전달하기

~~~sql
-- 커서변수를 매개변수로 전달하기
DECLARE
    EMP_DEP_CURVAR SYS_REFCURSOR; -- 약한 커서타입

    -- 사원명을 받아오기 위한 변수선언
    VS_EMP_NAME EMPLOYEES.EMP_NAME%TYPE;
    
    -- 임시 프로시저 선언(정의)
    PROCEDURE TEST_CURSOR_ARGU(P_CURVAR IN OUT SYS_REFCURSOR)
    IS
        C_TEMP_CURVAR SYS_REFCURSOR;
    BEGIN
        OPEN C_TEMP_CURVAR FOR SELECT EMP_NAME
                               FROM EMPLOYEES
                               WHERE DEPARTMENT_ID = 90;
        P_CURVAR := C_TEMP_CURVAR;        
    END;
    
BEGIN
    -- 프로시저 호출. EMP_DEP_CURVAR 매개변수로 제공한 커서변수가 임시프로시저 내부의 C_TEMP_CURVAR 참조
    TEST_CURSOR_ARGU(EMP_DEP_CURVAR);
    
    LOOP
        FETCH EMP_DEP_CURVAR INTO VS_EMP_NAME;
        
        EXIT WHEN EMP_DEP_CURVAR%NOTFOUND;
        
        DBMS_OUTPUT.PUT_LINE(VS_EMP_NAME);
    END LOOP;
END;
~~~

