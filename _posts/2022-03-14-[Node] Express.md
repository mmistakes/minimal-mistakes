---
layout: single
title: "Express"
categories: Node
tag: [TIL, Javascript, Node, Express, Reference]
---

### 01. Express 가 없다면?

**Node.js 의 기반으로 만들어졌으며, 노드환경을 좀 더 낫게 만들어주는 Javascript 패키지다.**

만약에 Express 프레임워크가 없다면 오로지 Node의 내장모듈인 http를 사용해서 하나의 함수 안에 서버를 생성하고 요청을 처리해야된다.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");

  if (url === "/ping") {
    return res.end(JSON.stringify({ message: "/ pong" }));
  }
  if (url === "/signup" && method === "POST")
    return res.end(JSON.stringify({ message: "회원가입 완료!" }));
  if (url === "/login" && method === "POST")
    return res.end(JSON.stringify({ message: "로그인 완료!" }));

  res.end(
    JSON.stringify({ message: "this response answers to every request" })
  );
});

server.listen(8080, () => {
  console.log("server is listening on PORT 8000");
});
```

위 코드를 보면 `server` 를 `http.createServer` 메서드를 이용해 생성을 하면서 내부에 요청 핸들링을 하게 되어있다.

요청에 대한 응답은 `JSON.stringify` 를 사용해 `json` 형태로 응답한다.

`server` 는 앞서 생성한 서버를 의미하고 이 객체의 `listen` 함수는 인자로 포트번호와 콜백함수를 받는다. 보통 서버가 켜져있다는 로그 메시지를 남긴다.

**여기서 알아야 할 것은** 함수 하나에 서버를 생성하면서 모든 요청을 받게 되어있다. 만약에 서버의 규모가 커진다면 모듈화 하기 힘들 것이고 조건문으로 라우팅을 하게되서 수많은 조건문과 수많은 로직을 서버를 실행하는 함수 안에서 작성해야된다.

이런 불편함에 탄생한 프레임워크가 Express이다.

---

### 02. Express

Express 공식사이트 문서에 따르면 다음과 같이 정의 되어있다.

> _Express is fast, unopinionated, minimalist web framework for node.js._

위에서 언급했던 **라우팅과** 로직의 **모듈화를** 위해 사용된다.

<u>**설치**</u>

```
npm install express --save
```

<u>**위에 `http` 모듈로 만든 환경을 `express` 로 변경한 코드이다.**</u>

```js
const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "/ endpoint" });
});

app.post("/signup", (req, res) => {
  res.json("signup success");
}); // 첫번째 인자에는 endpoint url 을 기입하고,
app.post("/login", (req, res) => {
  res.json("login success");
}); // 각각의 요청에 대해 핸들링 하는 함수를 두번째 인자로 넣습니다.

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("server is listening on PORT 8000");
});
```

`express` 모듈을 임포트 한 후 함수를 실행해서 `app` 이란 변수에 담는 것이 **컨벤션**이다.

달라진 점은 `app.use(express.json())` 을 사용해 응답타입을 json으로 정한다. http 모듈을 사용할때 처럼 응답할 때마다 `JSON.stringify()` 메서드를 사용해서 json 데이터를 string 타입으로 변환하지 않아도 된다.

조건문의 라우팅 방식이 사라지고 `express` 모듈을 담은 `app` 으로 각자 첫번째 인자에 `url` 을 정해서 사용한다.

위에 요청/응답 로직을 완료하면 아래 `http.createServer` 에 `app` 을 담아서 서버를 실행한다.
