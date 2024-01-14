---
title: "[Database] 인덱스의 내부 작동 원리와 구조"
excerpt: "클러스터형 인덱스와 보조 인덱스 내부 작동 원리."

categories:
  - Database
tags:
  - [index]

permalink: /database/sql7/

toc: true
toc_sticky: true

date: 2024-01-14
last_modified_at: 2024-01-14
---

ref -우재남, 『이것이 SQL Server다』, 한빛미디어(2020)
{: .notice--info}

## 📌균형트리란?
* 클러스터형 인덱스와 보조 인덱스는 모두 내부적으로 균형트리가 만들어진다. **균형 트리**는 '자료 구조'에 나오는 범용적으로 사용되는 데이터 구조로써 **데이터를 검색하는데 효율적으로 이루어진다**. 

<p align="center">
  <img src="/assets/images/index5.png">
</p>


### ✅균형트리 구조
* 균형 트리 구조에서 데이터가 저장되는 공간을 **노드**라고 한다. 모든 출발은 루트 노드에서 시작된다. **리프 노드**는 제일 마지막에 존재하는 노드를 말한다.데이터 양이 많다면 루트 노드와 리프 노드의 중간에 끼인 노드들은 **중간 노드**라고 부른다.

![image description](/assets/images/index6.png)<br>
노드라는 용어는 개념적인 설명에서 주로 나오는 용어이며, MySQL에서는 **페이지(page)**라고 부른다.

--- 
### ✅페이지 분할
* 인덱스는 균형 트리로 이루어져 있기 떄문에 **SELECT**의 속도를 샹상 시킬수 있지만, 변경작업(INSERT,UPDATE,DELETE)시 성능이 나빠질수있다. 그 이유는 **페이지 분할**이라는 작업이 발생하기 떄문이다.페이지 분할이란 새로운 페이지를 준비해서 데이터를 나누는 작업을 말한다. 

![image description](/assets/images/index7.png)
<center>INSERT 문으로 인한 페이지 분할</center>
<br>
<br>

![image description](/assets/images/index8.png)<br>
<center> 페이지 분할 인한 중간 노드의 생성</center>


---

## 📌인덱스의 구조 

### ✅클러스터형 인덱스 구조

![image description](/assets/images/index9.png)<br>
* 클르서터형 인덱스를 구분하면 데이터 페이지도 인덱스에 포함된다. 데이터페이지에 알바벳순으로 정렬되면서 찾음.

---

### ✅보조 인덱스 구조
![image description](/assets/images/index10.png)<br>
* 보조 인덱스는 데이터 페이지를 건들이지 않는다.
* 보조 인덱스를 구성하면 인덱스가 별도의 공간에 만들어진다.(책 뒤별에 별도 찾아보기 기능과 같은 개념)
* 데이터 위치는 **페이지 번호 +#** 위치로 기록되어있음.


### ✅결과
두 인덱스 모두 검색이 빠르기는 하지만 **클러스터형** 인덱스가 조금더 빠르다.

---

## 📌인덱스 실제 사용

### ✅인덱스 생성

```SQL

CREATE[UNIQUE] INDEX 인덱스_이름
  ON 테이블_이름 (열_이름) [ASC| DESC]

ANALYZE talbe 테이블이름 -- 인덱스 적용  

```

---

### ✅인덱스 제거

```SQL

DROP INDEX 인덱스_이름 ON 테이블_이름
```

* 기본키,고유키로 자동 생성된 인덱스는 DROP INDEX로 제거 하지 못한다. ALTER TABLE 문으로 기본 키나 고유 키를 제거하면 자동으로 생성된 인덱스를 제거 할수있다.


### ✅인덱스 사용

```sql

create index idx_member_addr -- 회원 테이블의 회원 주소 중복을 허용하는 단순 보조 인덱스 생성.

create index idx_member_name -- 회원 이름으로 중복혀요 단순 보조 인덱스 생성. 


1.select * from memer;

2.select mem_id, mem_name, addr from member;
ANALYZE talbe member; --인덱스를 생성한 후에 ANALYZE talbe 문을 실행 해줘야 실제로 적용이된다.

3. select mem_id, mem_name, addr 
  from member
  where mem_name = '에이핑크';

```
* 인덱스를 생성하고 **ANALYZE talbe** 문을 실행 해줘야 실제로 적용이된다.

1.번은 모든열을 조회하기떄문에 인덱스를 사용하지않는다. 결과=> 풀 테이블 스캔.
2. 인덱스로 지정한 열이 select 다음으로 나오면 인덱스와 사용안함. 결과=>풀 테이블 스캔.
3. 인덱스를 사용하려면 where 조건절에 인덱스를 사용해야함. 
