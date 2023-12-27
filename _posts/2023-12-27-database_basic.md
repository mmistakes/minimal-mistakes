---
published: true
title: "[DB] Database 1"

categories: database
tag: [database]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2023-12-27
---
<br>
<br>

# 데이터베이스

어떤 DB를 만나던지 데이터베이스의 데이터를 어떻게 입력하고 어떻게 출력하는가를 따져보는 것이 중요하다

`Input`과 `Output`을 파악한다면 데이터베이스의 반을 한다고 해도 과언이 아님

입력
- 데이터의 생성 **C**reate
- 데이터의 수정 **U**pdate
- 데이터의 삭제 **D**elete
  
출력
- 생성한 데이터를 읽음 **R**ead

# File, Spreadsheet

가장 간단한 데이터를 저장하는 방법인 `File`이 어떻게 `DataBase`화 되어가는지 알아보자

정보의 양이 막대하게 커지면서 `File`의 한계가 드러남.

`File`의 한계를 극복하기 위해 누구나 쉽게 데이터를 정리정돈 하기위해 만들어진 `DataBase`

`DataBase`를 사용하면 데이터를 가공하는 것이 훨씬 쉬워짐

File에 대비해서 `Spreadsheet`는 `Database`로 가는 길목에 있음

일반적으로 `Spreadsheet`를 `Database`로 보지는 않지만 넓게 보면 `Database`적인 특성을 가지고 있음

# DBMS

데이터베이스 시장의 절대 강자는 `Relational DBMS`임.

관계형 데이터베이스 이후에 관계형 데이터베이스가 아닌 데이터베이스도 공부해볼 것을 추천. ex) `MongoDB`, `Cassandra` ...

`WHY?` - 관계형 데이터베이스만 배우면 마치 데이터베이스는 원래 그런 것이다 라는 생각을 하기가 쉬움

다른 유형의 데이터베이스에 공통적으로 존재하는 특성이 있고 데이터베이스마다 다른 특성들이 있는데

공통적인 부분을 배우게 된다면 데이터베이스의 본질적인 것일 가능성이 크고 

다른 특성들을 배우게 된다면 데이터베이스가 꼭 이래야 되는 것은 아니구나 하는 고정관념을 환기 시켜주는 역할을 해줄 것이다.

# RDBMS vs Spreadsheet

## 공통점

- 데이터를 표의 형태로 표현해줌

## 차이점

- 데이터베이스는 마치 사람과 대화하듯이 SQL이라고 하는 컴퓨터 언어(코딩)를 통해서 데이터를 제어함
- 스프레드시트는 클릭, 클릭, 클릭을 통해 사용자가 컴퓨터에게 명령하고 조작함
