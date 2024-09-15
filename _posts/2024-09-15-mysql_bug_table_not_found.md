---
title: "MySQL5.7 Bug #107311	InnoDB: Load table xx failed; Table xx doesn't exist"
excerpt: "MySQL Bug 사항으로 부모키 - 외래키의 캐릭터셋이 불일치 할 경우 연관 테이블이 사라지는 현상을 정리합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-15
last_modified_at: 2024-09-15
comments: true
---

어느날 갑자기 개발환경에서 ```show tables ``` 명령어로는 보이지만 조회가 불가능한 테이블이 발견되었습니다.(Load table xx failed; Table xx doesn't exist) 해당 현상이 발생된 원인에 대해서 알아보고 해결방법에 대하여 정리하였습니다.

---

### 🚀버그현상

해당 현상은 MySQL 5.7 환경에서 발생하는 현상으로 [버그리포트](https://bugs.mysql.com/bug.php?id=107311) 로 기재 되어 있는 현상입니다. 부모키 - 외래키의 캐릭터셋이 불일치 상태인 이후, MySQL Daemon이 재시작 하면 연관 테이블이 보이지 않는 현상이 발생합니다. DBMS 재기동 이후 물리적으로 설정된 부모 - 자식 관계 테이블 중 나중에 조회가 발생된 테이블이 보이지 않습니다. MySQL 5.7.38 릴리즈 환경에서도 지속되고 있는 현상이므로 상위버전으로 패치하거나 8버전 이상으로 업그레이드 하는 것을 권장합니다.

---
### 🚀해결방안
foreign_key_checks 변수를 0 으로 변경 후 보이지 않는 테이블 조회하면 다시 테이블에 접근할 수 있습니다. 이후 불일치한 캐릭터셋을 맞춰주는 작업을 해주시면 됩니다.


---

### 🚀테스트 환경
아래의 환경에서 테스트를 진행하였습니다.

```
MySQL Version : 5.7.32 Community Version
```

테이블 구성은 아래와 같습니다.

![테스트 스키마](https://github.com/user-attachments/assets/c716b6c3-6e16-491b-b10d-630076d8aac4 "테스트 스키마")

---

테스트 방식은 부모 - 자식 제약 관계가 형성되어 있는 테이블 생성 후 외래키의 캐릭터셋을 변경하고 MySQL을 재기동 한 뒤 현상을 확인하는 것입니다.


- 스키마 생성

```
DROP TABLE `parent1`;
DROP TABLE `parent2`;
DROP TABLE `parent3`;
DROP TABLE `son1`;
DROP TABLE `son2`;
DROP TABLE `son3`;
CREATE TABLE `parent1` (
  `parent1_pk1` varchar(50) NOT NULL,
  `parent1_pk2` varchar(100) NOT NULL,
  `col3` varchar(100) DEFAULT NULL,
  `col4` varchar(50),
  PRIMARY KEY (`parent1_pk1`,`parent1_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='부모테이블1';

CREATE TABLE `son1` (
  `son1_pk1` varchar(50) NOT NULL,
  `parent1_pk1` varchar(50) NOT NULL,
  `parent1_pk2` varchar(100) NOT NULL,
  PRIMARY KEY (`son1_pk1`),
  CONSTRAINT `fk_parent1` FOREIGN KEY (`parent1_pk1`,`parent1_pk2`) REFERENCES `parent1` (`parent1_pk1`,`parent1_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `parent2` (
  `parent2_pk1` varchar(50) NOT NULL,
  `parent2_pk2` varchar(100) NOT NULL,
  `col3` varchar(100) DEFAULT NULL,
  `col4` varchar(50),
  PRIMARY KEY (`parent2_pk1`,`parent2_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='부모테이블2';

CREATE TABLE `son2` (
  `son2_pk1` varchar(50) NOT NULL,
  `parent2_pk1` varchar(50) NOT NULL,
  `parent2_pk2` varchar(100) NOT NULL,
  PRIMARY KEY (`son2_pk1`),
  CONSTRAINT `fk_parent2` FOREIGN KEY (`parent2_pk1`,`parent2_pk2`) REFERENCES `parent2` (`parent2_pk1`,`parent2_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `parent3` (
  `parent3_pk1` varchar(50) NOT NULL,
  `parent3_pk2` varchar(100) NOT NULL,
  `col3` varchar(100) DEFAULT NULL,
  `col4` varchar(50),
  PRIMARY KEY (`parent3_pk1`,`parent3_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='부모테이블3';

CREATE TABLE `son3` (
  `son3_pk1` varchar(50) NOT NULL,
  `parent3_pk1` varchar(50) NOT NULL,
  `parent3_pk2` varchar(100) NOT NULL,
  PRIMARY KEY (`son3_pk1`),
  CONSTRAINT `fk_parent3` FOREIGN KEY (`parent3_pk1`,`parent3_pk2`) REFERENCES `parent3` (`parent3_pk1`,`parent3_pk2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

---


### 🚀테이블 제약 관계 손상 케이스 1) - 자식 테이블 Charset 변경

자식 테이블의 테이블 캐릭터셋을 UTF8MB4 로 변경 후 Deamon 재기동합니다.

```
set foreign_key_checks=0;
ALTER TABLE son1 CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE son2 CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE son3 CONVERT TO CHARACTER SET utf8mb4;
set foreign_key_checks=1;


-- Daemon 재기동 후 부모테이블 먼저 조회
select * from parent1;
select * from parent2;
select * from parent3;


-- 자식테이블은 보이지 않음
mysql> select * from son1;
ERROR 1146 (42S02): Table 'content_v3.son1' doesn't exist
mysql> select * from son2;
ERROR 1146 (42S02): Table 'content_v3.son2' doesn't exist
mysql> select * from son3;
ERROR 1146 (42S02): Table 'content_v3.son3' doesn't exist



-- 이번에는 Daemon 재기동 후 자식테이블을 먼저 조회 후 부모테이블 조회
select * from son1;
select * from son2;
select * from son3;


-- 부모테이블이 보이지 않음
select * from parent1;
ERROR 1146 (42S02): Table 'content_v3.parent1' doesn't exist
select * from parent2;
ERROR 1146 (42S02): Table 'content_v3.parent2' doesn't exist
select * from parent3;
ERROR 1146 (42S02): Table 'content_v3.parent3' doesn't exist

```

---


### 🚀테이블 제약 관계 손상 케이스 2) - 부모 테이블 Charset 변경

부모 테이블의 PK 설정을 변경해보고 동일하게 MySQL을 재기동합니다.


```
set foreign_key_checks=0;
ALTER TABLE parent1 CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE parent2 CONVERT TO CHARACTER SET utf8mb4;
ALTER TABLE parent3 CONVERT TO CHARACTER SET utf8mb4;
set foreign_key_checks=1;


-- Daemon 재기동 후 부모테이블 먼저 조회
select * from parent1;
select * from parent2;
select * from parent3;


-- 자식테이블은 보이지 않음
mysql> select * from son1;
ERROR 1146 (42S02): Table 'content_v3.son1' doesn't exist
mysql> select * from son2;
ERROR 1146 (42S02): Table 'content_v3.son2' doesn't exist
mysql> select * from son3;
ERROR 1146 (42S02): Table 'content_v3.son3' doesn't exist



-- 이번에는 Daemon 재기동 후 자식테이블을 먼저 조회 후 부모테이블 조회
select * from son1;
select * from son2;
select * from son3;


-- 부모테이블이 보이지 않음
select * from parent1;
ERROR 1146 (42S02): Table 'content_v3.parent1' doesn't exist
select * from parent2;
ERROR 1146 (42S02): Table 'content_v3.parent2' doesn't exist
select * from parent3;
ERROR 1146 (42S02): Table 'content_v3.parent3' doesn't exist

```


---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}