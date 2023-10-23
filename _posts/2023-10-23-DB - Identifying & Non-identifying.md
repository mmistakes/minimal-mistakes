---
layout: single
title:  "DB - Identifying & Non-identifying"
categories: DB
tag: [Identifying & Non-identifying]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>





# ◆식별관계와 비식별관계(Identifying & Non-identifying)

외래 키를 통해 다른 테이블과 같은 키를 공유하고 이를 이용하여 조인하여 관계를 이용하는 방식

<br>







# ◆식별관계

식별 관계란, **부모 테이블의 기본키 또는 유니크 키를 자식 테이블이 자신의 기본키로 사용**하는 관계이다. 부모 테이블의 키가 자신의 기본키에 포함되기 때문에 반드시 부모 테이블에 데이터가 존재해야 자식 테이블에 데이터를 입력할 수 있다. 즉, 부모 데이터가 없다면 자식 데이터는 생길 수 없다.

식별관계는 ERD상에서 실선으로 표시한다.  **자식 테이블에 데이터가 존재한다면 부모 데이터가 반드시 존재하는 상태가 됩니다.**

```java
CREATE TABLE member(
    nickName VARCHAR2 (30) UNIQUE,
    email VARCHAR2 (50) CONSTRAINT member_email_pk PRIMARY KEY,
    pwd VARCHAR2 (45) NOT NULL,
    memberState VARCHAR2(10) NOT NULL,
    T1 VARCHAR2(2) DEFAULT 'N',
    T2 VARCHAR2(2) DEFAULT 'N',
    T3 VARCHAR2(2) DEFAULT 'N',
    termsAgree VARCHAR2(1) DEFAULT 'N',
    termsDate DATE DEFAULT sysdate,
    regdate TIMESTAMP DEFAULT sysdate,
    updatedate TIMESTAMP DEFAULT sysdate
   
);

CREATE TABLE memberAttach (
    uuid VARCHAR2(100) NOT NULL,
    fileName VARCHAR2(100) NOT NULL,
    email VARCHAR2 (50),
    CONSTRAINT memberAttach_email_fK FOREIGN KEY(email) REFERENCES member(email),
    CONSTRAINT memberAttach_email_PK PRIMARY KEY (email)
);
```

![식별관계](C:\Users\hwang\pueser.github.io\images\2023-10-23-DB - Identifying & Non-identifying\식별관계.png)

<br>







# ◆비식별관계

비 식별 관계란 **부모 테이블의 기본키 또는 유니크 키를 자신의 기본키로 사용하지 않고, 외래 키로 사용하는 관계**입니다. 자식 데이터는 부모 데이터가 없어도 독립적으로 생성될 수 있다.

```java
CREATE TABLE member(
    nickName VARCHAR2 (30) UNIQUE,
    email VARCHAR2 (50) CONSTRAINT member_email_pk PRIMARY KEY,
    pwd VARCHAR2 (45) NOT NULL,
    memberState VARCHAR2(10) NOT NULL,
    T1 VARCHAR2(2) DEFAULT 'N',
    T2 VARCHAR2(2) DEFAULT 'N',
    T3 VARCHAR2(2) DEFAULT 'N',
    termsAgree VARCHAR2(1) DEFAULT 'N',
    termsDate DATE DEFAULT sysdate,
    regdate TIMESTAMP DEFAULT sysdate,
    updatedate TIMESTAMP DEFAULT sysdate
   
);

CREATE TABLE memberAttach (
    uuid VARCHAR2(100) NOT NULL,
    fileName VARCHAR2(100) NOT NULL,
    email VARCHAR2 (50),
    CONSTRAINT memberAttach_email_fK FOREIGN KEY(email) REFERENCES member(email),
    CONSTRAINT memberAttach_email_UK UNIQUE (email)
);
```

![비식별관계](C:\Users\hwang\pueser.github.io\images\2023-10-23-DB - Identifying & Non-identifying\비식별관계.png)
