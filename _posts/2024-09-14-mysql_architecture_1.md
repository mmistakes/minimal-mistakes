---
title: "MySQL 아키텍처(1)"
excerpt: "MySQL 아키텍처 구성요소인 MySQL엔진과 스토리지엔진 영역을 정리합니다."
#layout: archive
categories:
 - Mysql
tags:
  - [mysql, mariadb]
#permalink: mysql-architecture
toc: true
toc_sticky: true
date: 2024-09-14
last_modified_at: 2024-09-14
comments: true
---
### 🚀MySQL 아키텍쳐
!["MySQL아키텍쳐"](https://github.com/user-attachments/assets/4443fdb1-0de8-46bb-904d-8cc0b7f06cac "MySQL 아키텍처")

---
### 🚀MySQL엔진
MySQL 엔진은 클라이언트로부터의 접속 및 쿼리 요청을 처리하는 커넥션 핸들러와 SQL파서 및 전처리기, 옵티마이저가 중심을 이룹니다. 그리고 성능 향상을 위해 MylSAM의 키 캐시나 InnoDB의 버퍼풀과 같은 보조 저장소 기능이 포함되어 있습니다. 또한，MySQL은 표준 SQL(ANSI SQL용2) 문법을 지원하기 때문에 표준 문법에 따라 작성된 쿼리는 타 DBMS와 호환되어 실행될 수 있습니다.

---

### 🚀스토리지 엔진
MySOL 엔진은 요청된 SQL 문장을 분석하거나 최적화하는 등 DBMS의 두뇌에 해당하는 처리를 수행하고 실제 데이터를 디스크 스토리지에 저장하거 나 디스크 스토리지로부터 데이터를 읽어오는 부분은 스토리지 엔진이 전담합니다. MySOL 서버에서 MySOL 엔진은 하나지만 스토리지 엔진은 여러개를 동시에 사용할 수 있습니다. 대표적으로 현재는 MVCC, 트랜잭션, 단일행 잠금 등을 지원하는 InnoDB가 메인으로 쓰이고 있고 특수한 요건에 맞춰 spider,blackhole, rocksdb, memory 등의 다른 스토리지 엔진도 쓰이고 있습니다. 이번 글에서는 대표적으로 쓰이는 InnoDB 엔진에 대해서 간략하게 설명드리도록 하고 다른 스토리지 엔진에 대해서는 별도의 글로 다뤄보도록 하겠습니다.

---

### 🚀핸들러 API
MySQL 엔진의 쿼리 실행기에서 데이터를 쓰거나 읽어야 할 때는 각 스토리지 엔진에게 쓰기 또는 읽기를 요청하는데, 이러한 요청을 핸들러(Handler) 요청이라고 하고, 여기서 사용되는 API를 핸들러 API라고 합니다. InnoDB 스토리지 엔진 또한 이 핸들러 API를 이용해 MySQL 엔진과 데이터를 주고받습니다. 이 핸들러 API를 통해 얼마나 많은 데이터(레코드) 접근이 있었는지 확인할 수 있습니다. 

핸들러 API 요청은 아래의 명령으로 확인할 수 있습니다.

```
"SHOW GLOBAL STATUS LIKE 'Handler%'"; 
```

위의 명령어를 수행하면 나타나는 핸들러 API 중 대표적인 항목에 대해 간단히 설명드리면 아래와 같습니다.


| Handler 통계 정보 | 증가하는 경우 | 설명 | 예시 |
|---|---|---|---|
| Handler_read_first | Index Full Scan 시 가장 왼쪽 leaf page 접근, Index 기준 컬럼으로 order by column ASC limit 1 | 인덱스를 이용하여 데이터를 처음부터 순차적으로 읽을 때 증가 | `SELECT * FROM table ORDER BY column ASC LIMIT 1` |
| Handler_read_key | Index 접근 시 (Index 수직 탐색) | 인덱스를 이용하여 데이터를 찾을 때마다 증가 | `SELECT * FROM table WHERE column = 'value'` |
| Handler_read_last | Index Full Scan 시 가장 오른쪽 leaf page 접근, Index 기준 컬럼으로 order by column DESC limit 1 | 인덱스를 이용하여 데이터를 끝에서부터 순차적으로 읽을 때 증가 | `SELECT * FROM table ORDER BY column DESC LIMIT 1` |
| Handler_read_next | Index Range Scan 시 | 인덱스 범위 내에서 데이터를 순차적으로 읽을 때 증가 | `SELECT * FROM table WHERE column BETWEEN 1 AND 10` |
| Handler_read_prev | Index Range Scan 시 (역순) | 인덱스 범위 내에서 데이터를 역순으로 읽을 때 증가 | `SELECT * FROM table WHERE column BETWEEN 10 AND 1` ORDER BY column DESC |
| Handler_read_rnd | 인라인뷰 또는 sort 연산 이후 | 복잡한 쿼리 실행 시 임시 테이블 생성, 정렬 등으로 인해 증가 | 서브쿼리 사용, ORDER BY 절이 있는 복잡한 쿼리 |
| Handler_read_rnd_next | 인덱스 없이 테이블 풀 스캔 시 | 인덱스 없이 테이블 전체를 순차적으로 읽을 때 증가 | `SELECT * FROM table` (인덱스가 없는 경우) |


---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}