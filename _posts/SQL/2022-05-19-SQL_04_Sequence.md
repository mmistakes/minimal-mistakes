---
layout : single
title : SQL 시퀀스
categories: SQL
tags: [SQL]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

> ### 시퀀스의 정의 기본작성

~~~sql
-- 시퀀스(SEQUENCE) : 자동 일련번호 생성하는 기능

-- 시퀀스 기본작성
CREATE SEQUENCE my_seq1; -- 1씩 증가하는 특징

-- my_seq1.NEXTVAL : INCREMENT_BY 설정적용
SELECT my_seq1 .NEXTVAL FROM DUAL;

-- my_seq1.CURRVAL : 현재 시퀀스 값을 읽기
SELECT my_seq1.CURRVAL FROM DUAL;
~~~

---

> ### 시퀀스 삭제

~~~sql
-- 시퀀스 삭제
DROP SEQUENCE my_seq1;
~~~

---

> ### 시퀀스 시작, 증감 시퀀스

~~~sql
CREATE SEQUENCE my_seq1
    INCREMENT BY 1
    START WITH 100; -- 시작 시퀀스

CREATE SEQUENCE my_seq2
    INCREMENT BY 10 -- 시퀀스 증감 숫자
    START WITH 100;

SELECT my_seq2 .NEXTVAL FROM DUAL;

CREATE SEQUENCE my_seq3;

-- my_seq3.NEXTVAL 명령어가 최소 1번 적용된 후에 사용해야 한다
-- INCREMENT BY 적용된 값을 확인하게 된다
SELECT my_seq3.CURRVAL FROM DUAL;
~~~

---

> ### 테이블에 시퀀스 데이터 넣기

~~~sql
-- 시퀀스를 사용하기 위한 테이블
CREATE TABLE ex2_11_seq (
    COL1    NUMBER  PRIMARY KEY
);

-- 시퀀스 생성
CREATE SEQUENCE seq_ex2_11_seq;

-- 시퀀스를 이용한 데이터 입력
INSERT INTO ex2_11_seq(COL1) VALUES(seq_ex2_11_seq.NEXTVAL);

SELECT * FROM ex2_11_seq;

SELECT seq_ex2_11_seq.CURRVAL FROM DUAL;
~~~

