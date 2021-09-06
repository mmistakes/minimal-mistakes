---
title:  "[Oracle DB] 기본 정리 -생활코딩"

categories:
  - oracleDB
tags:
  - [RDBMS, OracleDB,MySQL]

toc: true
toc_sticky: true

date: 2021-09-06
last_modified_at: 2021-09-06

---

# Oracle DB 기본 정리
이 포스트는 생활코딩의 Oracle Database 수업을 참조하였습니다.
개인적으로 공부하면서 참조하려고 만든 포스트입니다.
![image](https://user-images.githubusercontent.com/69495129/132136086-2ad0b2b3-53a4-45d5-8f41-12295fc742ca.png)
[생활코딩 Oracle DB 바로가기](https://www.youtube.com/watch?v=dqcOa-fVWWo&list=PLuHgQVnccGMB5q5uJIDhLlcC2V6tyXhY6&index=1)

## 가격 정책
다양한 Edition 과 License가 있지만, Enterprise 급으로 가면 억단위의 금액을 지불해야한다. 일반적으로 공부용, 및 작은 프로젝트 용으로는 Express로도 충분하므로 조만간 Express를 이용하여 Oracle DB 를 공부할 예정이다.
<br>
![image](https://user-images.githubusercontent.com/69495129/132136269-552bc233-0694-421b-bb16-b89048803759.png)

## 사용자와 스키마
Oracle DB 서버는 대체적으로 비싸기 때문에 한대의 서버에는 여러명의 클라이언트들이 원격으로 접속하는 형태를 갖추고 있다. 그에 따라서 유저는 스키마를 만들고 스키마는 연관된 표들을 묶어주는 일종의 디렉토리라고 여기면 된다. 스키마란 서로 연관된 표를 묶어 연결하는것

<br>
![image](https://user-images.githubusercontent.com/69495129/132136328-5de5a603-02e2-4347-93c3-829dc8ba3682.png)
![image](https://user-images.githubusercontent.com/69495129/132136339-bb6cef59-f8a5-49bb-afb2-6da13f4af1e6.png)

## 사용자 생성 (CREATE USER)

``` sql
CREATE USER name IDENTIFIED BY password
```
위 명령어를 실행하면 오류가 날 것이다.
위의 에러를 해결하기 위한 해결방법은 두가지가 있다 첫번째는 생성할 계정명 앞에 키워드를 붙여주는 것이고 
두번째는 예전의 스크립트 방식 그대로 생성이 가능하도록 설정을 변경하는것이다
``` sql
ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;
```
위 코드를 입력한뒤 다시 실행해주면 에러는 사라질 것이다.

``` sql
CREATE USER name IDENTIFIED BY password
```
다시 위 명령어를 입력해주면 정상적으로 작동한다.


## 사용자 권한 부여 
``` sql
GRANT DBA TO name;
```
<br>
위 코드와 같은 권한 부여는 실무에서는 잘 쓰지않는다 DBA 자체가 모든 권한을 부여하는것이기 때문에 현업에서는 위험하다고 생각하고, 필요한 부분에 따른 권한만 부여하는 경우가 많다.

## 테이블 생성
테이블을 생성하는것은 데이터베이스에서 가장 중요하다고 생각하는 부분이다.

| id   | title  | dedscription | created    |
| :--- | ------ | ------------ | ---------- |
| 1    | ORACLE | ORACLE is .. | 2019-07-29 |
| 2    | MySQL  | MySQL is ... | 2019-08-01 |
|      |        |              |            |

위와 같은 테이블을 만들기 위해 어떤 쿼리문을 작성해야하는지 살펴보겠다.

``` sql
CREATE TABLE topic (
        id NUMBER NOT NULL,
        title VARBHAR2(50) NOT NULL,
        description VARCHAR2(4000),
        created DATE NOT NULL
)
```
NOT NULL 은 NULL 값을 허용하지 않겠다는 것이고 VARCHAR 뒤의 괄호는 들어갈 수 있는 문자의 양을 조절해주는 것이다.
created 같은 경우는 Oracle DB 에서 내장되어있는 타입인 DATE 타입을 사용한다.

## 행 추가

``` sql
  INSERT INTO topic
    (id,title,description,created)
    VALUES
    (1,'ORACLE','ORACLE is...',SYSDATE);
```

## SQL 이란

SQL
Structured
Query
Language
구조화된 정보를 처리하도록 요청하는 컴퓨터 언어

## 행 읽기 - Select 문의 기본 형식


``` sql
SELECT * FROM topic;
```
토픽 테이블의 전부를 보여준다.

## 행 읽기 - 행과 컬럼 제한하기


``` sql
SELECT * FROM topic;

SELECT id,title,created FROM topic;

SELECT * FROM topic WHERE id = 1;

SELECT id,title,created FROM topic WHERE id = 1;

```

SELECT 다음의 * 는 전부를 뜻한다. 만약 그 자리에 보고싶은 컬럼 명만 작성하면 그 컬럼만 보이게 된다 뒤의 WHERE 절은 조건문을 추가한다고 생각하면된다 나는 topic테이블에서 가져올거야 행을 근데 어떤행? id 가 1인 행을 가져올거야 라고 해석하면된다.


## 행 읽기 - 정렬과 페이징

``` sql

SELECT * FROM topic ORDER by id DESC;

SELECT * FROM topic
    OFFSET 1 ROWS
    FETCH NEXT 2 ROWS ONLY;
```

첫번째는 id를 기준으로 내림차순해서 가져와줘 라고하면 id가 5,4,3,2 ... 순서대로 작아지는 행 순서대로 가져오게 된다.
밑의 코드는 맨처음부터 한칸뛰고(1행은 생략하고 2행부터) 그 2행부터 2개를 가져와줘 라는뜻이다. 그렇다면 2행과 3행의 결과물이 가져와지게 된다.


## 행 수정

``` sql
UPDATE topic
      SET
        title = 'MSSQL'
        description = 'MSSQL is...'
      WHERE
        id = 3;
```

topic 테이블에서 id 가 3인 행의 title 과 description 을 저렇게 바꿔줘, 이때 WHERE절을 빼먹으면 큰일난다 모든게 바뀌어버린다. **절대 주의**


## 행 삭제

``` sql
DELETE FROM topic WHERE id = 3;
```

id 가 3인 행을 삭제해줘  이때 WHERE절을 빼먹으면 큰일난다 모든게 삭제된다. **절대 주의**

## PRIMARY KEY

``` sql

CREATE TABLE topic (
	id NUMBER NOT NULL,
    title VARCHAR2(50) NOT NULL,
    description VARCHAR2(4000),
    created DATE NOT NULL,
    CONSTRAINT PK_TOPIC PRIMARY KEY(id)
);

```
<br>

id 값이 PRIMARY KEY 값으로 된다

CONSTRAINT PK_TOPIC PRIMARY KEY (id,title)      
- CONSTRAINT는 제약조건이라는 뜻, 이미 존재하지 않는 값만 넣을수있다는 제약을 테이블에다가 가하는 것이다 
   PRIMARY의 고유한이름정하기 -> PK_TOPIC,  
   (   )안에는어떤 PRIMARY의 KEY를 걸것인지 삽입하여준다

PRIMARY KEY지정된 값을 가진 행은 이 표안에서 유일무의 하다라는 걸 확신할 수 있게 된다.
PRIMARY KEY를 지정한것과 안지정 한것의 속도차이는 어마어마함. 필수는 아니지만 쓰지 않는건 경제성이 없다.


## SEQUENCE
id 를 PK로 지정을해도 id가 1억개가 있다면, 어떤 id값이 비어있는지 일일이 확인할 수 없다. 
값을 집어넣을때마다 오라클에서 자동으로 id값을 겹치지 않도록 지정해주면 안될까?

``` sql

CREATE SEQUENCE SEQ_TOPIC;
```

<br>
위 코드로 시퀀스를 생성 해준다

```sql
INSERT INTO topic
	(id,title,description,created)
	VALUES
	(SEQ_TOPIC.NEXTVAL,'ORACLE','ORACLE is...',SYSDATE);
```
이렇게 하면 오라클에서 자동으로 id값을 처리해준다.


## 테이블의 분해 조립 

![image](https://user-images.githubusercontent.com/69495129/132136969-126546c0-efd9-450d-8d5d-a448f586dc05.png)

위처럼 하나의 topic 테이블이라면 만약 egoing 의 profile이 developer 에서 designer 로 바꼇을 경우 그 egoing이라는 사람이 쓴 글이 1억개라면 하나하나 developer에서 designer로 바꾸는 과정을 겪어야 할것이다. 하지만, 
위의 topic 테이블에서 author 테이블 을 분리시켜 아래처럼 만들면 만약 egoing이라는 사람의 프로필이 바뀌었을때 author테이블에서 단한번 수정하는 과정을통해 모든 수정사항을 적용시킬 수 있다.

<br>

그렇다면 테이블이 두개 따로따로 있는데 한꺼번에 보고싶을땐 어떻게 해야할까? 여기서 바로 RDBMS의 본질 가장 중요한**JOIN** 의 개념이 나온다. 관계형이란 두 테이블이 관계를 갖고 있다는 것이고 이를 유동적으로 언제든지 조립 분리를 할 수 있어야지 훌륭한 *DATABASE developer* 가 될 수 있다.

```sql
SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id;
```

이런식으로 왼쪽에 topic 테이블을 두고 그 오른쪽에 author 테이블을 붙혀줘 이때 조건은 topic 테이블의 author_id 와 author 테이블의 id 가 같은 것 끼리 합쳐줘! 라는 명령어 이다. 이를 실행하면 다음과 같은 표를 확인할 수 있다.

![image](https://user-images.githubusercontent.com/69495129/132137086-d1a122cc-9b2f-4acf-b427-6191dc250eec.png)


이 간단한 것을 배웠지만 실제 세상에는 너무나 많은 것들이 관계에 얽매여서 존재하고 있다. 그 관계를 어떻게 해석하고 TABLE로 옮기는지가 중요할것이다.


***
<br>

    🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}

