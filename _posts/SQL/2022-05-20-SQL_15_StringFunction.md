---
layout : single
title : SQL 문자함수
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

### 문자함수

> ###### INITCAP(char), LOWER(char), UPPER(char)

~~~sql
-- INITCAP(char), LOWER(char), UPPER(char)

-- INITCAP 함수는 매개변수로 들어오는 char의 첫 문자는 대문자로, 나머지는 소문자로 반환하는 함수다.
SELECT INITCAP('never say goodbye'), INITCAP('never6say*good가bye') FROM DUAL;

-- LOWER 함수는 소문자로 반환
SELECT LOWER('NEVER SAY GOODBYE'), LOWER('never say goodbye') FROM DUAL;

SELECT EMP_NAME, LOWER(EMP_NAME) FROM EMPLOYEES;
~~~



---

> ###### CONCAT(char1, char2), SUBSTR(char, pos, len), SUBSTRB(char, pos, len)

~~~sql
-- CONCAT(char1, char2), SUBSTR(char, pos, len), SUBSTRB(char, pos, len)
-- CONCAT 함수는 ‘||’ 연산자처럼 매개변수로 들어오는 두 문자를 붙여 반환한다.
-- 매개변수가 2개만 지원
-- || 는 계속 사용가능

SELECT CONCAT('I Have', ' A Dream'), 'I Have' || ' A Dream' || '!!!' FROM DUAL;;

-- SUBSTR('문자', i, j) : 문자를 i번부터 j번까지 반환
SELECT SUBSTR('ABCD EFG', 1, 4) FROM DUAL;

-- SUBSTR('문자', i, j) : i가 음수일 경우, 뒤에서부터 i번부터 오른쪽으로 j번까지 반환
SELECT SUBSTR('ABCDEFG', 1, 4), SUBSTR('ABCDEFG', -1 ,4), SUBSTR('ABCDEFG', -2, 4) FROM DUAL;

SELECT LENGTHB('홍') FROM DUAL;

-- SUBSTRB('문자', i, j) : 문자를 i번 바이트부터 j번 바이트까지 반환
SELECT SUBSTRB('ABCDEFG', 1, 4), SUBSTRB('가나다라마바사', 2, 6) FROM DUAL;

-- SUBSTRB('문자', i, j) : i가 음수일 경우, 뒤에서부터 i번 바이트부터 오른쪽으로 j번 바이트까지 반환
SELECT SUBSTRB('ABCDEFG', -1, 4), SUBSTRB('가나다라마바사', -6, 6) FROM DUAL;
~~~

---

> ###### LTRIM(char, set), RTRIM(char, set)

~~~sql
-- LTRIM(char, set), RTRIM(char, set)
-- LTRIM 함수는 매개변수로 들어온 char 문자열에서 set으로 지정된 문자열을 왼쪽 끝에서 제거한 후 나머지 문자열을 반환한다.
-- 두 번째 매개변수인 set은 생략할 수 있으며, 디폴트로 공백 문자 한 글자가 사용된다.
-- RTRIM 함수는 LTRIM 함수와 반대로 오른쪽 끝에서 제거한 뒤 나머지 문자열을 반환한다.

SELECT LENGTH('     ABCDEF'), LENGTH('ABCDEF     ') FROM DUAL;

-- 1) 좌 우측 공백제거
-- LTRIM : 왼쪽 공백 제거하고 반환
-- RTRIM : 오른쪽 공백 제거하고 반환
SELECT LENGTH(LTRIM('     ABCDEF')), LENGTH(RTRIM('ABCDEF     ')) FROM DUAL;

-- 2) 2번째 파라미터를 좌측 또는 우측에서 제거한 나머지를 반환
SELECT
    LTRIM('ABCDEFGABC', 'ABC'),
    LTRIM('가나다라', '가'),
    RTRIM('ABCDEFGABC', 'ABC'),
    RTRIM('가나다라', '라')
FROM DUAL;

-- 제거 할 수 있는 구조가 아니여서, 자신을 반환한다
SELECT LTRIM('가나다라', '나'), RTRIM('가나다라', '나') FROM DUAL;
~~~



---

> ###### LPAD(expr1, n, expr2), RPAD(expr1, n, expr2)

~~~sql
-- LPAD(expr1, n, expr2), RPAD(expr1, n, expr2)
-- LPAD 함수는 매개변수로 들어온 expr2 문자열(생략할 때 디폴트는 공백 한 문자)을 n자리만큼 왼쪽부터 채워 expr1을 반환하는 함수다.
-- 매개변수 n은 expr2와 expr1이 합쳐져 반환되는 총 자릿수를 의미한다.

CREATE TABLE ex4_1 (
    phone_num   VARCHAR2(30)
);

INSERT INTO ex4_1 VALUES('111-1111');
INSERT INTO ex4_1 VALUES('111-2222');
INSERT INTO ex4_1 VALUES('111-3333');

SELECT * FROM ex4_1;

-- LPAD(컬럼, 총자리수, 입력데이터) : 총자리수에서 맨 왼쪽에 입력문자데이터를 넣는다

-- 전체 12자리에서 phone_num 컬럼의 데이터의 왼쪽에 채운다
SELECT LPAD(phone_num, 12, '(02)') FROM ex4_1;

-- 전체 12자리에서 phone_num 컬럼의 데이터의 오른쪽에 채운다
SELECT RPAD(phone_num, 12, '(02)') FROM ex4_1;
~~~



---

> ###### REPLACE(char, search_str, replace_str), TRANSLATE(expr, FROM_str, to_str)

~~~sql
-- REPLACE(char, search_str, replace_str), TRANSLATE(expr, FROM_str, to_str)
-- REPLACE 함수는 char 문자열에서 search_str 문자열을 찾아 이를 replace_str 문자열로 대체한 결과를 반환하는 함수다.

-- REPLACE('문자', '1번문자데이터', '2번문자데이터') : 문자열에 1번문자데이터를 2번문자데이터로 변경
SELECT REPLACE('나는 너를 모르는데 너는 나를 알겠느냐?', '나', '너') FROM DUAL;

SELECT
    LTRIM('  ABC DEF  '),
    RTRIM('  ABC DEF  '),
    REPLACE('  ABC DEF  ', '  ', '')
FROM DUAL;


-- TRANSLATE : 문자열 자체가 아닌 문자 한 글자씩 매핑해 바꾼 결과를 반환한다
-- REPLACE : 단어별(문자열) 검색하여 바꾸기(하나로 묶어서)
SELECT 
    REPLACE('나는 너를 모르는데 너는 나를 알겠는가?', '나는', '너를') AS rep,
    TRANSLATE('나는 너를 모르는데 너는 나를 알겠는가?', '나는', '너를') AS trn
  FROM DUAL;
~~~



---

> ###### INSTR(str, substr, pos, occur), LENGTH(chr), LENGTHB(chr)



~~~sql
-- INSTR(str, substr, pos, occur), LENGTH(chr), LENGTHB(chr)
-- INSTR 함수는 str 문자열에서 substr과 일치하는 위치를 반환하는데,
-- pos는 시작 위치로 디폴트 값은 1, occur은 몇 번째 일치하는지를 명시하며 디폴트 값은 1이다.

-- INSTR('문자', '찾을문자', i, j) : 문자에서 찾을문자를 i번부터 시작해서 찾기, j가 있다면 j번째 일치되는것
-- 반환값은 문자에 몇번째 있는지 반환
SELECT
    INSTR('내가 만약 외로울 때면, 내가 만약 괴로울 때면, 내가 만약 즐거울 때면', '만약에') AS INSTR1, 
    INSTR('내가 만약 외로울 때면, 내가 만약 괴로울 때면, 내가 만약 즐거울 때면', '만약') AS INSTR2,
    INSTR('내가 만약 외로울 때면, 내가 만약 괴로울 때면, 내가 만약 즐거울 때면', '만약', 5) AS INSTR3,
    INSTR('내가 만약 외로울 때면, 내가 만약 괴로울 때면, 내가 만약 즐거울 때면', '만약', 5, 2) AS INSTR4
FROM DUAL;
~~~









