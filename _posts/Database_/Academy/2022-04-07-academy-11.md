---
layout: single
title:  " DAY-27. DataBase DML,TCL,DCL,View,Sequence"
categories: Database-academy
tag: [Database,DML,TCL,DCL,View,Sequence]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---


# 🔐 2022-04-07

## 데이터베이스 

<!--Quote-->

> ❗ 수업을 듣고, 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


# 2022-04-07

## 1️⃣ DML (Data Manipulation Language)

데이터 조작어 

- 데이터를 삽입, 수정, 삭제, 조회하는 언어 → insert, update, delete, select

### insert

테이블에 새로운 행을 추가할 때 사용하는 구문 

1) 모든 행에 대한 데이터를 추가하고자 할때 사용하는 구문 (한 행도 빼지않고 넣을 때)


<span style="color: #2D3748; background-color:#fff5b1;">insert into 테이블명 values(입력할 데이터, 입력할 데이터...)</span>

2) 특정한 컬럼에만 데이터를 넣고 싶은 경우 사용하는 구문 : 

<span style="color: #2D3748; background-color:#fff5b1;">insert into 테이블명 (컬럼명1, 컬럼명2...) values (입력데이터1, 입력데이터2...) </span>


```java
// 테이블 생성
create table member (
    id varchar2(100) primary key
    , pw varchar2(100) not null
    , nickname varchar2(100) unique
    , email varchar2(100)
);

// 테이블 조회
select * from member;

// 테이블 삽입
insert into member values ('abc123','abc','ABC초콜릿','abc@naver.com');
insert into member (id,pw) values ('eee555','eEE');

// 묵시적 형변환 -> 오라클이 자동으로 자료형을 추측하여 변환해주는것 
insert into member values(123,sysdate,'ffd','abc@naver.com');
```

### update

컬럼에 저장된 데이터를 수정하는 구문 → 테이블의 전체 행 개수에 변화를 주지 않음

<span style="color: #2D3748; background-color:#fff5b1;">update 테이블명 set 변경할 컬럼명 = 변경할 값... where 조건</span>

```java
//이대로 하면 기존행의 모든 이메일이 eee@gamil.com으로 변경 된다.
update member set email = 'eee@gmail.com';

//아이디가 abc123인 행의 이메일만 abc@naver.com으로 변경
update member set email = 'abc@naver.com' where id ='abc123';

// 2개 이상의 컬럼 변경 아이디가 eee555인 사람의 pw와 nickname 변경
update member set pw = '1234', nickname = '이티' where id = 'eee555';
```

### delete

테이블의 행을 삭제하는 구문 → 행의 개수에 변화가 생김 

- 조건문을 걸어주지 않으면 테이블의 모든 데이터가 삭제됨.
- <span style="color: #2D3748; background-color:#fff5b1;">delete from 테이블명 where 조건</span>


```java
// id가 200인 사람 삭제
delete from member where id = '200';

// 전체의 테이블 삭제
delete from member;
```

### truncate

테이블의 전체 행을 삭제할 때 사용하는 구문 

- 되돌릴 수 없음 → 영구적으로 삭제

```java
// rollback / commit 
commit;
select * from member;
delete from member;
rollback;
```

---

## 2️⃣ TCL (Transcation Control Language)

한번에 수행되어야하는 작업의 단위 

ex) ATM 

1. 카드 삽입
2. 메뉴 선택(인출)
3. 금액 확인 / 비밀번호 인증
4. 사용자가 입력한 금액이 해당 계좌에서 뽑을 수 있는 금액인지 확인
5. 실제 현금 뿅
6. 카드 뽑고 끝

==  현금을 인출한다 작업

→ 6번까지 작업이 정상적으로 완료가 됐을 때 → COMMIT (최종 저장)

→ 6번까지의 작업 중에서 하나라도 비정상 흐름이 발생하면 그때는 모은 작업을 rollback(취소)

- commit : 트랜잭션 작업이 정상적으로 완료되면 변경 내용을 영구적으로 저장
- savepoint <savepoint명> : 현재 트랜잭션 작업 시점에다가 이름 부여 (하나의 트랜잭션 안에서 구역을 나누는 것)
- rollback : 트랜잭션 작업을 모두 취소하고 최근에 commit 했던 지점으로 돌아가는 것.

> rollback to savepoint 명 : 해당 savepoint로 되돌아 간다
> 

```java
// 테이블 생성 
create table tbl_user (
    no number unique
    , id varchar2(100) primary key
    , pw varchar2(100) not null
);

// 데이터 삽입 
insert into tbl_user values(1,'user1','pw1');
insert into tbl_user values(2,'user2','pw2');
insert into tbl_user values(3,'user3','pw3');

select * from tbl_user;

commit;

insert into tbl_user values(4,'user4','pw4 ');

rollback; // 가장 최신에 commit된 상태로 돌아감 즉 user3 까지만 나옴
insert into tbl_user values(4,'user4','pw4 ');
savepoint spl;
insert into tbl_user values(5,'user5','pw5');

rollback to spl; // save 포인트를 해준거는 user4 까지임 
select * from tbl_user; // user4까지만 나옴
rollback; // savepoint 했던것도 안나옴 오직 commit 했을 때의 데이터만 출력
```

---

## 3️⃣ DCL(Data Control Language)

데이터 제어어 

데이터베이스에 관한 보안, 무결성, 복구 등 DBMS를 제어하기 위한 언어

→ grant, revoke / TCL(commit, rollback)

grant : 사용자 또는 role(resource, connect, dba)에 권한 부여 

→ system/관리자 계정 접속 → 시규 사용자 생성 → grant 접속 권한 부여 → 리소스 권한 부여

```java
// kh 계정에서 실행
drop table coffee;
create table coffee(
    name varchar2(50) primary key
    ,price number not null
    ,brand varchar2(100) not null
);

// kh 계정에서 실행
insert into coffee values ('카페라떼',3500,'NESCAFE');
select * from coffee;
commit;

select * from kh.coffee;

// kh 계정에서 실행 
// system 계정에서 test01 계정한테 kh 계정이 가지고 있는 coffee 테이블에 접근 권한 부여 
grant select on kh.coffee to test01;
commit; 

// kh 계정에서 실행
// system 계정에서 test01 계정한테 kh 계정의 coffee 테이블에 대한 insert 권한 부여 
grant insert on kh.coffee to test01;
commit;

// test계정에서 실행
insert into kh.coffee values('바닐라라떼',6000,'starbucks');
select * from kh.coffee;

// kh 계정에서 실행
// revoke -> 부여된 권한을 해제 / 회수하는 명령어
revoke select, insert on kh.coffee from test01;

// system 계정에서 실행 kh의 권한을 확인 하는 작업
select * from dba_role_privs where grantee ='KH';
```

## 4️⃣ view

하나 이상의 테이블에서 원하는 데이터를 선택해서 새로운 가상 테이블을 만들어 주는 것

- 뷰를 통해 만들어진 테이블이 물리적으로 존재하는 것은 아니고, 다른 테이블의 데이터만 조합하여 보여주는 것
- 특정 계정이 원본 테이블에 접근해서 모든 테이터(불필요한 데이터)에 접근하는 걸 방지
- 뷰를 생성하는 권한 → 뷰의 내용을 수정하면 → 실제 원본 테이블의 데이터도 수정됨




**💡 create view 뷰이름 as select 구문** 


- 실제 테이블에서 데이터를 바꾸면 view 테이블에서도 데이터가 바뀐다

```java
// 뷰 생성 권한 부여
grant create view to kh;

// 뷰 테이블 생성
// employee -> emp_no, emp_name, email ,phone
create view emp_view as select emp_no, emp_name, email, phone from employee;
select * from emp_view;

// kh계정에서 실행 
// test01 계정한테 위에서 만든 emp_view에 접근 x 그래서 접근을 주는것 
grant select on kh.emp_view to test01;
commit;

// test계정에서 실행
select * from kh.emp_view;

// test계정에서 실행
select * from kh.emp_view;

// kh계정에서 실행
// 선동일 -> 이름을 김동일으로 수정 
update employee set emp_name = '김동일' where emp_name ='선동일';
select * from employee;
commit;

// kh계정에서 실행
// 뷰 삭제
drop view emp_view;
commit;
```

## 5️⃣ sequence

순차적으로 정수 값을 자동으로 생성하는 객체 -> 자동 번호 발생기

<aside>
💡 create sequence 시퀀스명

</aside>

1. start with 숫자 -> 몇번부터 번호를 시작할건지
2. increment by 숫자 -> 몇 단위로 숫자를 증가시킬건지
3. maxvalue 숫자 / nomaxvalue -> 시퀀스의 최대값 지정 / 지정x
4. minvalue 숫자 / nominvalue -> 시퀀스의 최소값 지정 / 지정x
5. cycle / nocycle -> 만약 최대값에 도달하면 처음으로 돌아가 다시 순번을 매기기 시작할건지
6. cache / nocache -> 메모리상에 미리 시퀀스를 뽑아 올려두고 사용하는 것/ 메모리상에 올려놓지 x

```java
create sequence seq_temp 
    start with 1
    increment by 1
    maxvalue 10 
    cycle 
    nocache;
    
select * from user_sequences where sequence_name = 'SEQ_TEMP';

select seq_temp.currval from dual; // 에러 nextval먼저 사용 해야한다
select seq_temp.nextval from dual;
select seq_temp.currval from dual;
```

- nextval : 현재 시퀀스의 다음 값을 반환함과 동시에 시퀀스를 증가
- currval : 현재값을 반환 → 접속하고나서 nextval이 단한번도 쓰이지 않았다면 사용 x (nextval먼저 사용 해야한다)

1) 활용 

```java

drop sequence seq_temp;
create sequence seq_temp 
    start with 1
    increment by 1
    maxvalue 10 
    cycle 
    nocache;
    
select * from user_sequences where sequence_name = 'SEQ_TEMP';

select seq_temp.nextval from dual;
select seq_temp.currval from dual;

select * from coffee;

delete from coffee where name in ('1','2');
// insert into coffee values(1,4000,'Max'); 
// insert into coffee values(2,4000,'Max'); 
// 위의 코드처럼 하지않고 seq를 사용
insert into coffee values(seq_temp.nextval,4000,'Max');
insert into coffee values(seq_temp.nextval,4000,'Max');
```