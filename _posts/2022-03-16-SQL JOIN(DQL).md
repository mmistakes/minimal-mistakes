---
layout: single
title: "MySQL JOIN(DQL)"
categories: BackEnd
tag: [total, mysql]
---

## 01. JOIN

**두개의 테이블을 결합시킬 때 사용한다.**

각 테이블의 **교집합, 즉 연결성이 있는 컬럼**으로 두개의 테이블을 결합 할 수 있다.

![screencapture-7401551](/images/screencapture-7401551.png)

두개의 테이블이 있다. `songs` 테이블은 `artists` 테이블**을 참조하고 있는** `artist_id` 컬럼이 존재한다.

두개의 테이블은 **1:N (artists : songs) 관계이다.**

**artists Table**

![screencapture-7401626](/images/screencapture-7401626.png)

**songs Table**

![screencapture-7401634](/images/screencapture-7401634.png)

**명령문으로 두개의 쿼리를 결합해보자**

`SELECT` 문에 필요한 컬럼을 나열한다.

`FROM` 문에 `artists` 테이블을 바라보게 한다.

`JOIN` 문에 `songs` 테이블을 결합시킨다.

`ON` 뒤에는 교집합이 있는 컬럼을 적는다.

```sql
SELECT artists.name, songs.title, artists.id, songs.artist_id#,
FROM artists
JOIN songs
ON artists.id = songs.artist_id;
```

#### 01-1 JOIN + WHERE + LIKE 조건문

`JOIN` 문에 다양한 조건을 통해서 데이터를 뽑을 수 있다.

쿼리문은 아까와 같이 작성하고 맨 아래 `WHERE` 조건문만 추가했다.

결합한 두개의 테이블에서 아티스트의 이름이 "새소년" 인 `id, name, title` 컬럼 값들만 출력해준다.

```sql
SELECT artists.id, artists.name, songs.title
FROM artists
JOIN songs
ON artists.id = songs.artist_id
WHERE artists.name = '새소년';
```

이 쿼리문에서는 `LIKE` 와 추가적으로 `OR` 까지 추가했다.

맨 아래 `WHERE` 조건문에선 가사컬럼 값에 "you" 라는 문자열이 포함되거나 `OR` "i" 라는 문자열이 포함되는 `id, name, title` 컬럼 값들만 출력해준다.

```sql
SELECT artists.id, artists.name, songs.title
FROM artists
JOIN songs
ON artists.id = songs.artist_id
WHERE songs.lyrics LIKE '%you%' OR songs.lyrics LIKE '%i%';
```
