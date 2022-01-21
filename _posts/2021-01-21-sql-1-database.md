---

layout: single
title: "SQL-1) 데이터베이스(DB)? SQL이란?  "
categories: SQL
tag: [Database, SQL]
toc: true 
toc_label: "Point"
toc_sticky: true
---

코드스테이츠 섹션3를 시작한지 3일차에 SQL이라는 언어를 배우게되었고, 해매고있을때 스터디장님이 유튜브를 추천해주셔서 해당 영상을 보고 개념과, 다루는 방법을 배워보기로 하였다. (감사해요!!)
[해당 강의유튜브](https://www.youtube.com/watch?v=0cRhit1EJM0&list=PLVsNizTWUw7GCfy5RH27cQL5MeKYnl8Pm&index=1)

---

# 데이터베이스(DB)

데이터베이스(Database)는 "데이터의 집합"이라고 한다.
데이터 베이스에는 일상생활의 대부분의 정보가 저장되고 관리된다.

---

## DBMS ? (DB의 소프트웨어)

DBMS (Database management System)는  **"데이터 베이스를 관리하고 운영하는 소프트웨어" ** 이다.

### DBMS 핵심 개념 2가지

1. 대용량의 데이터를 사용하고 저장, 관리 할 수 있다.
2. 공유개념, 동시에 다른 사용자가 공유할 수 있다.
   데이터베이스는 여러명의 사용자나 응용 프로그램과 공유하고 동시에 접근이 가능해야한다.

**엑셀도 DBMS 일까요? NO! **
엑셀은 대용량의 데이터를 저장하기 힘들고, 다른 컴퓨터에서 내가 작업중인 파일을 동시에 공유하며 작업하고 저장할 수 없다. (공유개념이 없다.)

---

### DBMS 종류

데이터베이스를 사용하기 위해 다운받아야하는 소프트웨어 종류를 살펴보면,
대표적인 관계형 데이터베이스의 소프트웨어는 [MySQL](https://www.mysql.com/), [Oracle](https://www.oracle.com/database/), [SQLite](https://www.sqlite.org/index.html), [PostgresSQL](https://www.postgresql.org/), [MariaDB](https://mariadb.org/) 등이 있다.
(이 중 가장 실무에서 많이 쓰는 **"MySQL"**을 사용하기로 결정 유튜브에서 추천해주신)

---

### DBMS 분류(유형)

계층형, 망형, 관계형, 객체지향형, 객체관계형 등이 있다. 
현재 사용되는 DBMS 에는 관계형 DBMS가 가장 많이 사용한다. 위에 소개했던 DBMS 종류( [MySQL](https://www.mysql.com/), [Oracle](https://www.oracle.com/database/), [SQLite](https://www.sqlite.org/index.html), [PostgresSQL](https://www.postgresql.org/), [MariaDB](https://mariadb.org/))도 모두 관계형 데이터베이스이다. 

---

## 관계형 데이터 베이스 (RDBMS)

관계형 데이터 베이스(Relational DBMS)는 RDBMS라고 부르지만, DBMS라고도 보편적으로 부른다.
관계형 데이터 베이스는 **테이블(table)**이라는 최소 단위로 구성되며, 이 테이블은 하나 이상의 **열(column)**과 **행(row)**로 이루어져있는데, **모든 데이터가 이 테이블에 저장**된다.

---



# SQL 이란? : DBMS에서 사용되는 언어

SQL 을 배워야 DBMS(데이터베이스 소프트웨어)를 잘 다룰 수 있고,  DBMS 안의 데이터베이스를 조작 할 수 있다. 그러므로 SQL에 대해 알아본다!

---

**SQL(Structured Query Language)은 이러한 DBMS에 데이터를 구축, 관리하고 활용하기 위해서 사용되는 언어가 "SQL" 이다. ** 간단히 말해서 **"SQL"은 데이터베이스 용 프로그래밍 언어**이다.
SQL은  구조화된 쿼리 언어이며, **데이터베이스에 쿼리를 보내 원하는 데이터를 가져오거나 삽입**할 수 있다.  

> **쿼리(query)란 무엇일까요? **
> 쿼리는 *'질의문'* 이라는 뜻을 가지고 있습니다. 예를 들면 검색할 때 입력하는 검색어가 일종의 쿼리입니다. 검색을 할 때, 기존에 존재하는 데이터를 검색어로 필터링합니다. 따라서, 쿼리는 저장되어 있는 데이터를 필터하기 위한 질의문으로도 볼 수 있습니다.

SQL을 사용할 수 있는 데이터베이스와 달리, 데이터의 구조가 고정되어 있지 않은 데이터베이스를 NoSQL이라고 합니다. 관계형 데이터베이스와는 달리, 테이블을 사용하지 않고 데이터를 다른 형태로 저장합니다. NoSQL의 대표적인 예시는 MongoDB 와 같은 문서 지향 데이터베이스입니다.

이처럼 데이터베이스 세계에서 SQL은 데이터베이스 종류를 SQL이라는 언어 단위로 분류할 정도로 중요한 자리를 차지하고 있습니다. 그리고 **SQL을 사용하기 위해서는 데이터가 구조가 고정되어 있어야 합니다.**

다음장에서는 제가 해맸었던... 설치와 실행방법에 대해 알아봅니다!



>출처
>[강의유튜브](https://www.youtube.com/watch?v=0cRhit1EJM0&list=PLVsNizTWUw7GCfy5RH27cQL5MeKYnl8Pm&index=1)
>코드스테이츠

