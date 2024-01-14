---
title: "[Database] 스토어드 프로시저"
excerpt: "스토어드 프로시저에 대한 개념과 사용 방법 알아보기."

categories:
  - Database
tags:
  - [index]

permalink: /database/sql8/

toc: true
toc_sticky: true

date: 2024-01-14
last_modified_at: 2024-01-14
---
ref -우재남, 『이것이 SQL Server다』, 한빛미디어(2020) , https://devkingdom.tistory.com/323
{: .notice--info}


## 📌스토어드(저장) 프로시저

### ✅스토어드 프로시저란?
* MySQL의 스토어드 프로시저는 **SQL + 프로그래밍** 기능을 추가한 프로그래밍 기능이다.<br>
실무에서는 프로그램에서 만들어 놓은 SQL문을 저장해 놓고, 필요할 때마다 호출해서 사용하는 방식으로 프로그램을 만든다.

### ✅왜사용할까?
1. <span style="background-color:#fff5b1"> SQL Server의 성능을 향상 시킬 수 있다. </span><br>
프로시저를 처음에 실행하면 최적화, 컴파일 단계를 거쳐 그 결과가 캐시(메모리)에 저장되게 되는데, 이 후에 해당 SP를 실행하게 되면 캐시(메모리)에 있는 것을 가져와서 사용하므로 실행속도가 빨라지게 된다.<br>그렇기 때문에 일반 쿼리를 반복해서 실행하는 것보다 SP 를 사용하는게  성능적인 측면에서 좋다.

2. <span style="background-color:#fff5b1"> 유지보수 및 재활용 측면에서 좋다. </span><br>
C#, Java등으로 만들어진 응용프로그램에서 직접 SQL문을 호출하지 않고 저장 프로시저의 이름을 호출하도록 설정하여 사용하는 경우가 많은데, 이때 개발자는 수정요건이 발생할때 코드 내 SQL문을 건드리는게 아니라 SP 파일만 수정하면 되기 때문에 유지보수 측면에서 유리해진다. <br>
또한 한번 저장 프로시저를 생성해 놓으면, 언제든 실행이 가능하기 때문에 재활용 측면에서 매우 좋다.

3. <span style="background-color:#fff5b1"> 보안을 강화할 수 있다. </span><br>
사용자별로 테이블에 권한을 주는게 아닌 저장 프로시저에만 접근 권한을 주는 방식으로 보안을 강화할 수 있다.
실제 테이블에 접근하여 다양한 조작을 하는 것은 위험하기 때문에 실무에서는 실제로 개발자에게는 sp권한만 주는 방식을 많이 사용한다

4. <span style="background-color:#fff5b1"> 네트워크의 부하를 줄일 수 있다.</span><br> 
클라이언트에서 서버로 쿼리의 모든 텍스트가 전송될 경우 네트워크에는 큰 부하가 발생하게 된다. 하지만 저장 프로시저를 이용한다면 저장프로시저의 이름, 매개변수 등 몇글자만 전송하면 되기 때문에 부하를 크게 줄일 수 있다.

### ✅ 사용법

```sql

-- ex1)
use market_db;
drop procedure if exists user_proc;
delimiter $$
create procedure user_proc()
begin
	select * from member; -- 스토어드 프로시저 내용
end $$
delimiter ;

call user_proc();  -- 프로스저 호출

-- ex2)매개변수 추가
drop procedure user_proc; -- 프로시저 삭제 
-- 매개변수가 있는 프로시저
drop procedure if exists user_proc1;
delimiter $$
create procedure user_proc1(in userName varchar(10))
begin
	select * from member where mem_name = userName; -- 스토어드 프로시저 내용
end $$
delimiter ;

call user_proc1('에이핑크');

-- -- ex3)매개변수 2개  프로시저
drop procedure if exists user_proc1;

delimiter $$
create procedure user_proc2(
		in userNumber int,
        in userHeight int )
begin
	select * from member 
    where mem_number > userNumber and height > userHeight; -- 스토어드 프로시저 내용
end $$
delimiter ;

call user_proc2(6,165)

```
