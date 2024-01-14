---
title: "[Database] SQL 테이블 제약 조건(기본키,외래키,고유키)"
excerpt: "데이터의 무결성을 지키기 위한 SQL 제약조건에 대해 알아보자."

categories:
  - Database
tags:
  - [constraint]

permalink: /database/sql4/

toc: true
toc_sticky: true

date: 2024-01-13
last_modified_at: 2024-01-13
---

## 📌제약 조건 CONSTRAINT
* **제약조건(Constraint)은 데이터의 무결성을** 지키기 위해 제한하는 조건이다. 데이터 무결성 = > 데이터에 결함이없음을뜻함.
아아디,이메일등등 제약조건을 줘서 중복되는 결함을 없애는 것을 바로 데이터의 무결성이라고 한다.

---

### ✅기본키 PRIMARY KEY  

```sql
create table member(
mem_id char(8) primary key,  -- 기본키 지정
mem_name varchar(10) not null,
height tinyint unsigned null
);

```

1. 값이 중복될수없음 
2. NULL 값이 입력될수 없음
3. 기본 키로 지정한 것은 자동으로 클러스터형 인덱스가 생선된다.
4. 한 테이블은 기본 키를 1개만 갖는다. 

---

### ✅외래키 FOREIGN KEY 


```sql
create table member(
mem_id char(8) primary key, 
mem_name varchar(10) not null,
height tinyint unsigned null
);

create table buy(
num int auto_increment not null primary key,
mem_id char(8) not null,
prod_name char(6) not null
foreign key(mem_id) references member (mem_id)


alter table buy              --- ALTER TALBE 에서 설정하는 외래키(이렇게도 추가가능)
    add constraint 
    foreign key(mem_id)
    references member(mem_id)

);
```

* 외래키 제약조건은 두테이블 사이의 관계를 연결해주고 , 그결과 데이터의 무결성을 보장해주는 역활을한다. 왜래 키가 설정된 열은 꼭 다른 테이블의  **기본 키와** 연결된다. (**기본키가 있는 테이블을 => 기준 테이블** , **외래 키가 있는 테이블을 참조 테이블 이라고 부른다**)

* 참조 테이블이 참조하는 기준 테이블의 열은 반드시 기본키나 고유키 Unique 키로 설정되어있어야함.

---

### ✅ON UPDATE CASCADE 

* 회원 테이블의 BLK가 물품을 2건 구매한 상태에서 회원 아이디를 PINK로 변경할 경우 어떻게 될까?

![image description](/assets/images/alter.png)<br>


```sql
update member set mem_id ='pink' where mem_id = 'BLK';  ---오류 발생
```

오류메세지:Cannot add or update a parent row: a foreign key constraint fails 

기본키 - 외래키로 맺어진 후에는 기준 테이블의 열 이름이 변경되지 않는다. 열 이름이 변경되면 참조 테이블의 문제가 발생하기떄문이다.

```sql
delete from member where mem_id = 'BLK';
```

삭제도 같은 오류로 삭제되지않는다.



![image description](/assets/images/alter2.png)<br>

* 사진과 같이 기존 테이블의 열 이름이 변경될 떄 참조 테이블의 열 이름이 자동으로 변경되게 해보자

```sql
create table buy(
num int auto_increment not null primary key,
mem_id char(8) not null,
prod_name char(6) not null
);

alter table buy 
	add constraint 
    foreign key(mem_id) references member(mem_id)
    on update cascade
    on delete cascade;
```
 **on update cascade , on delete cascade 제약조건에 추가해주면** 기준 테이블 데이터가 수정되거나 삭제되면 그 참조되는 테이블도 똑같이 수정되거나 삭제된다. 

---

 ### ✅고유키 UNIQUE 

* 고유키 제약조건은 중복되지 않는 유일한 값을 입력해야한다. 기본키랑 비슷하지만 차이점은  고유키는 NULL을 허용함 대신 중복은 허용불가.
* 고유키는 여러 개를 설정해두 된다.

``` sql
--고유키 
create table member(
mem_id char(8) not null primary key,
mem_name varchar(10) not null,
height tinyint unsigned null,
email char(30) null unique  -- 고유키 null은허용하나 중복은 안됌.
);

insert into member values('BLK','블랙핑크', 168,'ping@gmail.com');
insert into member values('TWC','트와이스',163,null);
insert into member values('APN','에이핑크', 164,'ping@gmail.com'); -- 에러발생 닉네임 BLK랑  이메일 중복발생
```
---

### ✅체크 CHECK 
* 체크 제약 조건은 입력되는 데이터를 점검하는 기능을한다. 

```sql
-- check(조건) 체크 제약조건
drop table member;

create table member(
mem_id char(8) not null primary key,
mem_name varchar(10) not null,
height tinyint unsigned null check (height >= 100),
phone1 char(3) null
);

insert into member values('BLK','블랙핑크',163,NULL);
insert into member values('BLK','블랙핑크',99,NULL); -- height 체크 제약조건 100이상을 걸었기떄문에 오류

alter table member
	add constraint
    check (phone1 in ('02','031','032','054','005','061')); 
    
insert into member values('TWC','트와이스',163,'02');
insert into member values('OMY','오마이걸',167,'010'); -- 에러: 체크 조건 위반

```

1. height 체크 제약조건을 걸음 -> 평균 키는 반드시 100 이상의 값만 입력되도록 설정해놈. 99 값이 들어오면 에러발생 .

---

### ✅기본값 default 

```sql
-- 기본값 정의 (default)
drop table member;
create table member(
mem_id char(8) not null primary key,
mem_name varchar(10) not null,
height tinyint unsigned null default 160,   --default 설정 160
phone1 char(3) null
);

alter table member
	alter column phone1 set default '02';
    
insert into member values('RED','레드벨벳',161,'054');
insert into member values('SPC','우주소녀',default,default);
select * from member; 
```

1. height 에 기본값을 160 으로 정의했다. 사용자가 아무 값을 입력하지  않으면 기본값으로 160 이 설정되는 제약조건이다.

<br>
<br>
<br>