---
layout: single
title: "ORM & Prisma가 무엇이고 사용하는 방법"
categories: Node
tag: [TIL, SQL, Database, ORM, Prisma, Migrations]
---

## 01. ORM (Object Relational Mapping)

`ORM`은 코드로 작성한 `객체`를 **데이터베이스 테이블에 매핑시킨다.**

`객체`를 사용하는 언어는 `자바스크립트`이고 `ORM` (변환)될 언어는 `MySQL의 쿼리문`을 다뤘다.

![screencapture-7482555](/images/screencapture-7482555.png)

위 그림처럼 `Migrations` 되는것이다.

`Models` 는 객체로 만든 클래스이고 `Migrations` 가 되어 `Database 언어`로 변경된다.

**모델**을 생성할 땐 **파스칼문법을**(객체 클래스를 생성할 때 클래스 이름 시작을 대문자로 시작하는 것) 지향한다.

```js
class Users {
	...
}
```

이건 다시 밑에서 다루겠다.

---

## 02. Prisma

`prisma` 는 오픈소스 프로젝트이다. `Typescript` 와 `Node.js` 환경에서 데**이터베이스 접근을 쉽게 하도록 도와주는 소프트웨어이다.**

`ORM`에서 다룬 `Model` (객체타입에 생성자 또는 클래스)을 **마이그레이션**(변환, Migrations) 하기 위해서 `Prisma` 라는걸 사용한다.

### 02-1. 패키지 설치

```bash
npm install prisma --save-dev
npm install @prisma/client --save-dev
```

두가지 패키지를 더 설치하자면

- nodemon (코드가 변경 된 이후, 서버를 재실행하지 않아도 변경 사항이 서버에 적용)
- dotenv : 환경 변수를 사용할 수 있게 해주는 `.evn` 파일이 생성됨.

```bash
npm install dotenv nodemon -D
```

### 02-2. 시작 & 데이터베이스 연결

아래 명령어를 치게되면 `prisma/schema.prisma` 위치에 해당파일이 생긴다.

```bash
npx prisma // 명령어 확인
npx prisma init // prisma 초기세팅
```

**데이터베이스를 연결한다.**

`provider` 값을 `mysql` 로 정해놓고 `url`을 나의 **데이터베이스 경로**로 설정한다.

아까 위에 설치한 `dotenv`가 여기서 쓰인다.

`env("")` 따움표 안에 변수이름을 넣으면 `.evn` 파일에 해당 변수 값을 가져와준다.

`.env` 파일은 보이지 않는 파일이기 때문에 **민감한 정보를 넣기에 용이하다.**

```jsx
// prisma/schema.prisma

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```jsx
//.env
// mysql 포트는 3306번으로 고정이다.
DATABASE_URL = "mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME";
```

### 02-3. Prisma 모델 생성

데이터베이스를 연결 했으니 `Prisma`를 통해 테이블을 **정의**해보자.

이 과정을 **"모델을 만든다"**. 라고 표현한다.

**모델은 prisma/schema.prisma 파일에서 만든다.**

```jsx
//prisma/schema.prisma

model articles {
  id         Int             @id @default(autoincrement())
  user_id    Int
  title      String
  body       String
  created_at DateTime?       @default(now())
  updated_at DateTime?
  deleted_at DateTime?
  users      User           @relation(fields: [user_id], references: [id])
  comments   comments[]

  @@index([user_id], name: "user_id")
}

model comments {
  id         Int       @id @default(autoincrement())
  article_id Int
  user_id    Int
  body       String
  created_at DateTime? @default(now())
  updated_at DateTime?
  deleted_at DateTime?
  articles   articles  @relation(fields: [article_id], references: [id])
  users      users     @relation(fields: [user_id], references: [id])

  @@index([article_id], name: "article_id")
  @@index([user_id], name: "user_id")
}

model User {
  id         Int          @id @default(autoincrement())
  email      String       @unique
  password   String
  created_at DateTime?    @default(now())
  updated_at DateTime?
  deleted_at DateTime?
  articles   articles[]
  comments   comments[]
}
```

위 코드를 보면 모델 생성자를 선언하고 `User`라는 생성자의 이름을 사용했다.

위에서 말했던 **파스칼문법을** 사용한 것이다. `prisma` 파일이여도 **객체타입을** 사용하기 때문에 자바스크립트의 정규문법을 맞춘것이다. 하지만 이름을 마음대로 해도 상관은 없다.

### 02-4. Migration (변환)

모델을 만들었으니 마이그레이션을 해보자.

해당 명령어는 `schema.prisma` 파일에 모델을 자동으로 `sql 쿼리문`으로 **변환** 해주고 데이터베이스를 업데이트하게 해준다.

```bash
npx prisma migrate dev --name file_name
```

데이터베이스가 업데이트가 되고 `prisma/migrations` 폴더가 생성되고

내부에 올린 시각으로 `202012300220_file_name/migtaion.sql` 모습의 파일이 생성된다.

#### 여기서 궁금한점은

그럼 다른 테이블을 어떻게 추가하는가.

`schema.prisma` 파일에 존재하는 모델의 맨 밑에 추가하면 된다.

`prisma` 파일은 변동사항만 기록한다. 그래서 `prisma` 파일의 모델은 순서를 지켜야 된다.

그리고 위에 **마이그레이션 명령어를** 다시 치면 올린 시각으로 또 폴더가 생성되고 내부에 `.sql` 파일이 생성된다.

`migrations.sql` 파일은 sql로 변경된 기록이라 생각하면된다. 그래서 폴더에 타임스탬프를 사용하는 것이다.
