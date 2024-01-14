---
title: "[Database] 트리거"
excerpt: "자동으로 실행되는 트리거의 개념과 실습을 통해 트리거를 활용하여 데이터 백업하는 방법을 알아보자."

categories:
  - Database
tags:
  - [trigger,mysql,]

permalink: /database/sql9/

toc: true
toc_sticky: true

date: 2024-01-14
last_modified_at: 2024-01-14
---

ref -우재남, 『이것이 SQL Server다』, 한빛미디어(2020) , 
{: .notice--info}

## 📌트리거(trigger)

### ✅트리거란?

* **트리거(trigger)**는 자동으로 수행하여 사용자가 추가 작업을 잊어버리는 실수를 방지해준다. 즉 트리거를 사용 하면 데이터에 오류구 발생하는것을 막을수 있다.이런 것을 **데이터의 무결성** 이라고 부르기도 한다.

* 트리거는 테이블에 DML문 **INSERT,UPDATE,DELETE**의 이벤트가 발생할떄 작동한다. 기존 테이블에 트리거 테이블을 장착한다는 느낌.

* 트리거는 앞에서 배운 저장 프로시저와 문법이 비슷하지만, call 문으로 직접 실행시킬 수는 없고 오직 테이블에 **INSERT,UPDATE,DELETE** 등의 이벤트가 발생할 경우에만 **자동**으로 실행된다.

---

### ✅트리거 활용 예제1

```sql
USE market_db;

CREATE TABLE IF NOT EXISTS trigger_table (id INT, txt VARCHAR(10));  
INSERT INTO trigger_table VALUES(1, '레드벨벳');
INSERT INTO trigger_table VALUES(2, '잇지');
INSERT INTO trigger_table VALUES(3, '블랙핑크');

        DELIMITER $$
1 번설명)CREATE TRIGGER myTrigger -- 트리거 이름
2 번설명)    AFTER DELETE -- DELETE 후에 작동하도록 지정
3 번설명)    ON trigger_table -- 트리거를 부착할 테이블 지정
4 번설명)    FOR EACH ROW -- 각 행마다 적용
5 번설명)BEGIN
        SET @msg = '가수 그룹이 삭제됨'; -- 트리거 실행 시 작동되는 코드
        END $$
        DELIMITER ;

DELETE FROM trigger_table WHERE id = 3;
SELECT @msg;

```

1. 트리거 이름은 mtTrigger로 지정함.
2. after delete는 이 트리거는 delete 문이 발생된 이후에 작동하라는 의미.
3. 이 트리거를 부착할 테이블을 지정함.
4. 각 행마다 적용시킨다는 의미인데, 트리거에는 항상 써준다고 보면됨.
5. 트리거에서 실제로 작동할 부분이다. 지금은 간단히 @msg 변수에 글자를 대입시켜놓음.

<p align='center'>
<img src="/assets/images/trigger.png">
</p>
<center>예제 결과</center> 

---

### ✅트리거 활용 예제2

* 예제 2번은 트리거를 사용해 입력/수정/삭제되는 정보를 백업하는 용도로 활용을 해보자.

```sql
create table singer(select mem_id, mem_name,mem_number, addr from member);

create table backup_singer  --백업 테이블 생성
(mem_id char(8) not null,
mem_name varchar(10) not null,
mem_number int not null,
addr  char(2) not null,
modType char(2),  -- 변경된 타입. '수정' 또는 '삭제'
modDate date, -- 변경된 날짜
modUser varchar(30) -- 변경한 사용자as
);

```


* singer 테이블에 insert나 update 작업이 일어나는 경우, 변경되기 전에 데이터를 저장할 백엡 테이블을 미리 생성해 놈.


---

```sql

-- 수정 트리거 부착
delimiter $$
create trigger singer_updateTrg -- 트리거 이름
	after update  -- 변경후에 작동하도록 지정
    on singer -- 트리거를 부탁할 테이블
    for each row -- 각 행마다 적용시킴
begin
	insert into backup_singer values( old.mem_id, old.mem_name, old.mem_number,old.addr,'수정', curdate(), current_user() );
end $$
delimiter ;

-- 삭제 트리거 부착
delimiter $$
create trigger singer_deleteTrg -- 트리거 이름
	after delete  -- 변경후에 작동하도록 지정
    on singer -- 트리거를 부탁할 테이블
    for each row -- 각 행마다 적용시킴
begin
	insert into backup_singer values( old.mem_id, old.mem_name, old.mem_number,old.addr,'삭제', curdate(), current_user() );
end $$
delimiter ;

-- 트리거 작동
update singer set addr = '영국' where mem_id = 'BLK';
delete from singer where mem_number >= 7 ;

select * from singer;  -- 변경된 내용 확인
select * from backup_singer; -- 수정되기 전에 데이터 값 확인됨.

```

1. insert,delete 트리거 부착
2. **old 테이블**은 update,delete가 수행될떄, 변경되기 전의 데이터가 잠깐 저장되는 임시 테이블 이다. old 테이블에 update 문의 작동되면 이 행에 의해서 업데이트 되기전의 데이터가 -> **백업 테이블**에 insert 된다. 즉 원래 데이터가 보존하게 된다. 


![image description](/assets/images/trigger1.png)<br>
<center>예제 결과</center>

* 백업 테이블을 조회하니 수정이나 삭제 되기 전에 데이터를 확인할수 있다.