---
layout: single
title: "MySQL Data Language"
categories: SQL
tag: [TIL, SQL, Database, DDL, DML, DQL]
---

## 01. DDL (Data Define Language)

데이터베이스의 `Schema(형태)`를 정의할 수 있는 쿼리문을 의미한다.

`CREATE, ALTER, DROP` 이 대표적인 쿼리문이다.

**데이터를 구성하는 구조(데이터베이스 또는 테이블)을 추가하고 수정, 삭제할 수 있다.**

#### 01-1. CREATE DATABASE

먼저 테이블을 생성하기 전에 데이터베이스를 만들어야 한다.

```bash
$ mysql -u root -p

또는

$ mycli -u root
명령어로 mysql 데이터베이스에 접속 해 있어야 한다.
```

`CREATE DATABASE` Database 를 생성하는 명령어

`SHOW DATABASE` 현재 MySQL 에 저장되어있는 데이터베이스를 보는 명령어

```sql
CREATE DATABASE my_favourite_artists;
SHOW DATABASES;
```

이제 데이터베이스를 생성했으니 생성한 데이터베이스에 접근한다.

```sql
USE my_favourite_artists; # 생성한 데이터베이스에 접근하는 명령어
```

그리고 나서 테이블을 보는 명령어를 입력한다.

```sql
SHOW tables; # 현재 데이터베이스 안에 저장되어있는 테이블들을 보는 명령어
```

#### 01-2 CREATE TABLE

**1:N 관계형 데이터베이스를 생성해보자**.

아티스트는 여러개의 곡을 갖고 있지만 곡은 한명의 아티스트 곡이라는 가정을 한다.

**<u>artists 테이블 생성하기</u>**

`id` 컬럼을 정수, `NULL` 을 허락하지 않으며 값을 **자동증가**하게 설정한다.

`name` 컬럼을 100의 크기를 가지는 문자열, `NULL` 을 허락하지 않는다.

이 테이블의 `Primary Key` 를 `id` 로 설정한다.

```sql
CREATE TABLE artists
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
```

**<u>테이블 확인 명령어</u>**

**Description** 을 축약해 놓은 명령어로써, 테이블의 정보를 보여준다.

```sql
DESC artists;
```

![screencapture-7399593](/images/screencapture-7399593.png)

**<u>songs 테이블 생성하기</u>**

**외래키(FOREIGN KEY)**를 걸어줄 컬럼과 참조할 테이블과 컬럼을 순서대로 적어준다.

```sql
CREATE TABLE songs
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  lyrics VARCHAR(2000),
  artist_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (artist_id) REFERENCES artists (id)
);
```

아래 생성된 테이블을 볼 수 있다.

![screencapture-7399840](/images/screencapture-7399840.png)

_DDL은 데이터베이스를 생성, 접근 하고 내부에 테이블을 생성한다._

---

## 02. DML (Data Manipulation Language)

데이터를 조작하는 쿼리문으로 `INSERT, UPDATE, DELETE` 가 대표적이다.

**`INSERT` 는 데이터를 테이블에 넣고, `UPDATE` 는 이미 테이블에 있는 데이터를 수정하고, `DELTE` 데이터를 테이블에서 삭제한다.**

#### 02-1. INSERT

**테이블에 컬럼명과 해당컬럼에 값 넣기**

`INSERT INTO` 뒤에는 테이블 명과 칼럼값을 소괄호로 감싸준다

`VALUES` 뒤에는 실제로 넣을 값을 소괄호로 감싸주고 앞서 테이블의 컬럼을 지정한 순서대로 데이터를 넣으면 된다.

```sql
INSERT INTO artists (name) VALUES ('Radio Head');
INSERT INTO artists (name) VALUES ('Pink Floid');
INSERT INTO artists (name) VALUES ('새소년');
```

테이블을 전체 조회하는 쿼리문은 아래와 같다.

`*` 는 와일드카드로써 테이블의 모든 컬럼을 조회하겠다는 의미와 같다.

```sql
SELECT * FROM artists;
```

![screencapture-7399980](/images/screencapture-7399980.png)

#### 02-2 UPDATE

**테이블에 특정 컬럼의 값 수정하기**

`UPDATE` 쿼리는 데이터를 수정할 테이블을 기입한다.

바꾸고자 하는 컬럼 값 `name="Pink Floyd"` 에 새롭게 업데이트 할 데이터를 대입한다.

```sql
UPDATE artists SET name='Pink Floyd' WHERE id=2;
```

![screencapture-7400109](/images/screencapture-7400109.png)

#### 02-3 DELETE

**테이블에 특정 컬럼 하나 삭제하기**

`DELETE` 쿼리문은 테이블의 이름과 `WHERE` 문으로 조건을 걸어주면 된다.

```sql
DELETE FROM artists WHERE name='새소년';

SELECT * FROM artists;
```

_DML은 데이터를 조작하는 쿼리문이다_

---

## 03. DQL (Data Query Language)

**데이터를 쿼리하는데 사용되는 SQL문이다.**

쿼리한다는 것은 **데이터베이스 서버에 데이터를 달라고 요청하는 것이다.**

생성이나 수정, 삭제가 아닌 **조회한다고 보면된다.**

#### 03-1 SELECT

`SELECT` 문은 `DQL` 의 태표적인 쿼리문이다.

테이블에 저장된 **데이터를 꺼내오는 핵심 쿼리문이다.**

테스트를 하기전에 데이터베이스에 내부에 데이터를 테이블에 담아준다.

```sql
# artists 테이블에 들어갈 데이터
INSERT INTO artists (name) VALUES ('Radio Head');
INSERT INTO artists (name) VALUES ('Pink Floyd');
INSERT INTO artists (name) VALUES ('새소년');


# songs 테이블에 들어갈 데이터, artists 테이블과 1:N 관계
INSERT INTO songs (title, artist_id, lyrics) VALUES ('All I need', 1, 'I\'m the next act\nWaiting in the wings');
INSERT INTO songs (title, artist_id, lyrics) VALUES ('Videotape', 1, 'When I\'m at the pearly gates\nThis will be on my videotape, my videotape');
INSERT INTO songs (title, artist_id, lyrics) VALUES ('Comfortably Numb', 2, 'Hello? (Hello? Hello? Hello?\nIs there anybody in there?\nJust nod if you can hear me\nIs there anyone home?');
INSERT INTO songs (title, artist_id, lyrics) VALUES ('Wish you were here', 2, 'So, so you think you can tell\nHeaven from hell?');
INSERT INTO songs (title, artist_id, lyrics) VALUES ('파도', 3, '파도가 넘실넘실\n흐려진 달 사이로\n사람들 숨 쉬네\n절망이 없다');
INSERT INTO songs (title, artist_id, lyrics) VALUES ('난춘', 3, '그대 나의 작은 심장에 귀 기울일 때에\n입을 꼭 맞추어내 숨을 가져가도 돼요');
```

`SELECT` 문을 사용해 데이터를 확인한다.

```sql
SELECT * FROM artists;
SELECT * FROM songs;
```

![screencapture-7400717](/images/screencapture-7400717.png)

`SELECT * FROM` 는 와일드카드로써 테이블의 모든 컬럼을 조회하겠다는 의미와 같다.

이번에는 보고싶은 컬럼의 값만 테이블에서 뽑아보자.

`SELECT` 문에 `songs.title, songs.lyrics` 을 넣으면 곡의 타이틀컬럼을 가진 값과 가사컬럼을 가진 값을 출력한다.

```sql
SELECT songs.title, songs.lyrics FROM songs;
```

**<u>WHERE 조건문</u>**

다양한 쿼리문을 사용하기 위해 사용한다.

`WHERE` 은 조건문이고 생각하고 조건문에 `songs.title = "파도"` 를 담아서 **타이틀컬럼의 값이 파도인 곡의** 가사를 출력해준다.

```sql
SELECT songs.lyrics FROM songs WHERE songs.title ="파도";
```

**<u>WHERE + LIKE 조건문</u>**

`LIKE` 문을 사용하면 **문자열 검색이** 수월해진다.

데이터의 값 문자열 일부분으로도 조건문 연산이 가능하다.

`WHERE songs.lyrics LIKE '%넘실넘실%'` 는 가사의 ''넘실넘실'' 이라는 문자열이 들어간 곡의 타이틀 값을 뽑아준다.

```sql
SELECT songs.title, songs.lyrics FROM songs WHERE songs.lyrics LIKE '%넘실넘실%';
```

_DQL은 데이터를 출력할때 사용하는 명령어이다._

**DQL의 JOIN문(두개의 테이블을 결합하여 출력해주는 명령문)을 알고싶다면 아래링크 클릭**
[MySQL JOIN](<https://devshon.github.io/sql/SQL-JOIN(DQL)/>).
