---
title: "[Database] MySql 데이터타입"
excerpt: "MySql 데이터 타입을 알아보고 실습해보기."

categories:
  - Database
tags:
  - [mysql,datatype]

permalink: /database/sql2/

toc: true
toc_sticky: true

date: 2024-01-08
last_modified_at: 2024-01-08
---

## MySQL데이터 타입

```sql
create table hongong4(
	tinyint_col tinyint,
    smallint_col smallint,
    int_col int,
    bigint_col bigint);
    
insert into hongong4 values(127,32767,2147483647,90000000000000000);

insert into hongong4 values(127,32768,2147483648,90000000000000000);  /* 최대값 넘음*/

/* tinyint unsigned   = > unsigned 키워드를 붙이면 음수는 생략되고 기존 -127 ~ -127 => 0~255 로 데이터를 효율적으로 
사용가능함.*/

-- 대용량 데이터 타입 
create database neflix_db;
use neflix_db;
create table movie(
moive_id int,
movie_title varchar(30),
movie_director varchar(20),
moive_star varchar(20),
movie_script longtext,  -- 자막같은경우 longtxt 데이터 타입
movie_film longblob		-- 파일 
);

```

* CHAR VS VARCHAR 데이터 타입 차이 


![image description](/assets/images/datatype.png)<br>

![image description](/assets/images/datatype2.png)<br>

 
1. 데이터타입 **char(10)으로잡고** '가나다' 3글자를 저장해도 나머지 7에 **공간 낭비가 발생한다**. 하지만 char타입은 mySQL 내부 적으로 **빠른 속도** 면에서는  CHAR 타입으로 설정하는 것이 좋음

2. **varchar(10)** 으로 잡고 '가나다' 3글자를 저장할 경우 **3자리 공간만 사용함**. varchar의 경우 약간에 속도가 떨어짐 
 **글자 크기가 고정**이 된것은 **char** 로 잡으면되고 , **가변적인** 경우 **varchar**로 잡으면된다.

3. ex) addr (경기,서울ㅡ경남 식으로 2글자만 입력받을경우) => 고정적인 char(2) 타입으로 설정한다.

4. ex) mem_name(가수 그룹의 이름인 '잇지' 처럼 2글자도 있지만 '방탄소년단'과 같이 긴글자도 있다, 이러한 가변적인 데이터는 varchar로 잡는게 좋다.
 
5. ex)phone 같은 전화벋호 데이터 타입은 int 타입보다 **char** 타입으로 받는것이 좋다, int 타입으로 받을경우 ex) 010,0794,2301, ->정수형으로 받을경우 **0**이사라진다., 또한 더하기/뺴기 등의 연산에 의미가 업거나 크거나/작다 또는 순서에 의미가 없다면 문자형으로 지정하는것이 좋다.

6. tinyint unsigned  = > unsigned 키워드를 붙이면 음수는 생략되고 기존 -127 ~ -127 => 0~255 로 데이터를 효율적으로 사용가능하다.
