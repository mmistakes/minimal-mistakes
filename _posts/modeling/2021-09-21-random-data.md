---
title:  "[DB modeling] 랜덤 데이터 생성"

categories:
  - modeling
tags:
  - [RDBMS, DB,modeling]

toc: true
toc_sticky: true


---

# DB 랜덤데이터 생성
개인적으로 공부하면서 참조하려고 만든 포스트입니다.
유튜브 시니어코딩님의 강의를 참고하였습니다.


## 테이블 생성
```sql
CREATE TABLE Dept(
  id tinyint unsigned not null auto_increment,
  pid tinyint unsigned not null default 0 comment '상위부서id',
  dname varchar(31) not null,
  PRIMARY KEY(id)
);

CREATE TABLE Emp(
	id int unsigned not null auto_increment,
    ename varchar(31) not null,
    dept tinyint unsigned not null,
    salary int not null default 0,
    primary key(id),
    foreign key(dept) references Dept(id)
);

```

##함수 생성
문장, 및 연속되는 글자에서 한개의 글자를 빼내는 함수
_str 으로 '가나다라마바사' 를 받으면 랜덤으로 7글자중 하나를 반환한다.
```sql
CREATE DEFINER=`root`@`localhost` FUNCTION `f_rand1`(_str varchar(255)) RETURNS varchar(31) CHARSET utf8mb4
BEGIN
	declare v_ret varchar(31);
    declare v_len tinyint;
    
    set v_len = char_length(_str);
    set v_ret = substring(_str, CEIL(rand() * v_len),1);
    
RETURN v_ret;
END
```
***

v_lasts는 이름의 성으로 쓰일 것들의 집합이고, v_firsts는 이름의 뒤에 두글자를 책임질 집합이다.
concat함수를 이용해서 v_lasts에서 한글자 v_firsts에서 두 글자를 뽑아준다.
아까 만들었던 f_rand1 함수를 여기서 사용한다.

```sql
CREATE DEFINER=`root`@`localhost` FUNCTION `f_randname`() RETURNS varchar(31) CHARSET utf8mb4
BEGIN
	declare v_ret varchar(31);
    declare v_lasts varchar(255) default '김이박조최전천방지마유배원';
    declare v_firsts varchar(255) default '순신세종성호지혜가은세호윤국가나다라마바사아자차카타';
    
    set v_ret = concat(f_rand1(v_lasts),f_rand1(v_firsts),f_rand1(v_firsts));
    
RETURN v_ret;
END
```

## 프로시저 생성
위에서 만든, 두 함수를 사용해서 수많은 데이터를 만들어주는 프로시저를 생성한다.
이때 _cnt는 몇 개의 데이터를 만들것인지 숫자를 인자로 받는다.
ename 은 앞서 만든 f_randname() 을 이용하고, dept는 3,4,5,6,7 중에 하나를 랜덤으로 선택,
salary는 100,200,300,400,500,600,700,800,900 중에 랜덤으로 한개가 선택되어서 데이터로 할당된다.

```sql
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_test_emp`(_cnt int)
BEGIN
	declare v_idx int default 0;
    
	while v_idx < _cnt
    do
		insert into Emp(ename,dept,salary) values (f_randname(),f_rand1('34567'),f_rand1('123456789') * 100);

		set v_idx = v_idx + 1;
    
    end while;
END
```
                 

## Summary
이 이외에도 MySQL 사이트를 참고하면 더미데이터를 불러오는법이 있다. 이번 포스터에서는 내가 함수를 직접생성해서
데이터를 생성한것이고, 추후 포스트에서는 만들어진 데이터를 불러오는 법에 대해서 서술하도록 하겠다.


***
<br>

    🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}

