---
title:  "Flask db구축(used docker)"
excerpt: " Flask 공부"

categories:
  - Python
tags:
  - [Python, flask]

toc: true
toc_sticky: true

breadcrumbs: true
 
date: 2023-09-16
last_modified_at: 2023-09-16
---

## 1. 로컬 개발환경 구축(used docker)
- 도커설치
  - docker
    - docker for mac
    - [docker for window](https://docs.docker.com/desktop/install/windows-install/)
  - [docker-compose](https://docs.docker.com/compose/install/)
- 도커로 mysql 세팅

- [도커란?](https://github.com/hidekuma/gogglekaap/wiki/~K.1.-%EB%8F%84%EC%BB%A4%EB%9D%BC%EC%9D%B4%EC%A7%95:-%EB%8F%84%EC%BB%A4%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C)

### 1-1. mysql run

```
$ docker run --rm --name testdb mysql:5.7
```
  - docker ps : docker process, 도커로 띄운 컨테이너를 확인.(running중만 확인)
  - docker ps -a : all, running 안하는것 포함하여 모든 컨테이너 확인
  - docker --rm : remove, 컨테이너를 stop하지 말고 process를 아예없애버리는 명령어, rm 안붙이면 컨테이너 종료후 stop상태로 process가 계속 잡고있다.

### 1-2. 패스워드 설정 & mysql run

```
$ docker run --rm -d --name testdb -e MYSQL_ROOT_PASSWORD=password mysql:5.7
$ docker exec -it testdb bash
```
  - docker -d : detach, 이거안붙이면 그냥 실행화면이 보임. 근데 붙이면 백그라운드에서 돌게된다.
  - -e : 환경변수를 정의하겠다는 의미
  - docker exec -it testdb bash
    - it:터미널 환경을 쓸수있게끔하는 옵션이다.
    - exec : 실행명령어
    - testdb : 실행할 container name
    - bash : it로 실행할 쉘지정

### 1-3. mysql 접근 하기

```
$ mysql -u root -p password 
```
  - u :user 설정
  - p : password 설정

```
$ mysql -u root -p
```
  - 패스워드 입력하면 mysql 접속됨

```
>>> show databases;
```
  - 현재 mysql의 db 보여준다.현재는 기본db상태로 되어있다.

```
$ docker exec -it testdb mysql -u root -p
```
  - mysql docker 접속하기

### 1-4. 3306포트 열어주기

```
$ docker run --rm -d --name testdb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:5.7
$ docker ps
$ docker stop testdb
```
  - 3306포트를 3306포트로 연결하겠다는 의미이다.
  - docker ps 하면 해당 웹포트(0.0.0.0:3306)이 내부에 있는 컨테이너의 3306과 연결이 되었다는걸 표시해준다.
  - 개발할때 local:3306에 붙어야 하기 때문에 해당 컨테이너에 접속해서 mysql자원에 접속할수 있어야 한다.그래서 이를 외부오픈해줘야 한다. 이땐 -p 옵션을 붙여주면된다
  - docker stop testdb : 백그라운드로 띄웠던 mysql이 stop된다.

### 1-5. 컨테이너 생성 시 부터 db 생성하기

```
docker stop testdb
docker run --rm -d --name testdb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=gogglekaap mysql:5.7
docker exec -it testdb mysql -u root -p
```

### 1-6. mysql에서 한국어 입력 가능하게 하기

```
mysql> select * from information_schema.SCHEMATA;
mysql> show full columns from '테이블명';
mysql> alter table '테이블명' convert to character set utf8;
```

### 1-7. 최종커맨드(컨테이너 생성 + db생성 + 한국어 입력가능하게)

```
$ docker run --rm -d --name testdb -p 3306:3306 -e MYSQL_DATABASE=googlekaap -e MYSQL_ROOT_PASSWORD=password mysql:5.7 --character-set-server=utf8 --collation-server=utf8_general_ci
```

  - docker run --rm -d --name testdb \ # 도커를 실행(run)할건데 컨테이너 정지 시, 컨테이너를 삭제(--rm)하고 백그라운드(-d)로 띄우고 컨테이너명(--name)은 testdb이다.
  - p 3306:3306 \ # 포트는 3306을 사용할 것이고, 외부에 3306 포트로 오픈할것이다.
  - e MYSQL_DATABASE=googlekaap \ # 기본적으로 googlekaap이라는 MySQL 데이터베이스를 생성할 것이고,
  - e MYSQL_ROOT_PASSWORD=password \ # root 유저의 패스워드는 password로 설정하고,
  - mysql:5.7 \ # MySQL 5.7버전을 이용할 것이다.
  - --character-set-server=utf8 \ # 한국어 지원을 위해 utf-8설정을 진행한다.
  - --collation-server=utf8_general_ci

### 1-8. 생성된 mysql 접근하기

```
$ docker exec -it testdb mysql -u root -p
```


[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}
 

