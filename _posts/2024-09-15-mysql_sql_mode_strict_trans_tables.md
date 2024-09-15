---
title: "[MySQL] sql_mode STRICT_TRANS_TABLES 설정"
excerpt: "호환되지 않는 타입으로 인한 데이터 삽입, 삭제, 변경으로 인한 데이터 부정합을 막기 위해 STRICT_TRANS_TABLES 를 설정합니다."
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

MySQL에서는 sql_mode 를 이용하여 문제가 발생할 수 있는 쿼리실행을 제어할 수 있습니다. 이 중에서도 STRICT_TRANS_TABLES 를 설정하면 호환되지 않는 타입으로 인한 데이터 삽입, 삭제, 변경으로 인한 데이터 부정합을 막을 수 있습니다.

---

### 🚀STRICT_TRANS_TABLES 미설정 시 발생하는 현상

sql_mode에서 STRICT_TRANS_TABLES 를 미설정할 때 예상하지 못한 값이 입력될 수 있습니다. 예를 들어보겠습니다. 먼저 테이블을 생성합니다.

```
CREATE TABLE `test` (
  `col1` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT
```

그리고 데이터를 삽입해보겠습니다.

```
insert into test values('dd'); -- Integer 타입의 컬럼에 문자 삽입
Query OK, 1 row affected, 1 warning (0.01 sec)

select * from test; -- 타입에 맞지 않는 값을 입력하면 0 으로 저장
+------+
| col1 |
+------+
|    0 |
+------+
```

보시는 바와 같이 int 타입 컬럼에 알파벳 문자열을 입력할 경우 0이라는 값이 입력됩니다.

---

### 🚀해결방안

 MySQL의 이러한 특성을 알고 쓰는 경우라면 괜찮을 수 있지만 일반적인 상황에서는 타입오류를 발생시키는 것이 혼동이 없을 것입니다. 따라서 sql_mode 설정 시 STRICT_TRANS_TABLES 모드는 활성화 시키는 것을 추천드립니다. 해당 기능을 활성화하고 다시 테스트를 해보면 아래와 같이 정상적인 오류가 발생합니다.

```
insert into test values('dd'); -- Integer 타입의 컬럼에 문자 삽입
ERROR 1366 (HY000): Incorrect integer value: 'dd' for column 'col1' at row 1

```

---
{% assign posts = site.categories.Mysql %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}