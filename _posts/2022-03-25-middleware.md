---
layout: single
title: "Middleware"
categories: Reference
tag: [TIL, Reference, MVC, Node]
---

## 미들웨어란?

미들웨어는 API의 요청이 들어왔을 때 응답으로 내보내기 까지의 전 과정을 처리한다.

요청을 받은 순간부터 그 안에서 여러 함수들을 차례대로 거치게 되는데 그 함수 중 하나를 **middleware** 라고 한다.

**미들웨어의 역할은 다음 기능으로 통과시킬지 말지 결정한다.**

## 미들웨어의 용도

#### Request의 body추가

body의 값이 들어올 때 http 특성상 문자열로 전송된다.

그것을 모든요청의 body를 json 형태로 받을 때 express에서 미들웨어로 제공한다.

#### 인증, 인가

인증과 인가가 필요한 모든 API에서 각각 로직을 만들지 않고 하나의 미들웨어로 인증을 통과한다면 해당 API를 실행할 수 있게 만들면 된다.

#### CORS 등이 있다.

CORS는 브라우저 보안 정책이다.

내부의 서버자원을 제한하지 않고 다른 서비스로부터 요청할 수 있게 허용하는 구조이다.

이 또한 모든 요청에서 사용하므로 미들웨어로 사용할 수 있다.

## 미들웨어 사용하기

인증, 인가로 예시를 들어봤다.

```jsx
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!validToken(token)) {
    res.status(400).json({ message: "invalid token" });
    return;
  }

  const userInfo = await getUser(token.id);

  if (userInfo) {
    req.userInfo = userInfo; // req에 프로퍼티를 추가하여 다음함수로 넘김
    next();
  } else {
    res.status(400).json({ message: "로그인할 수 없습니다." });
  }
}
```

API 요청 헤더에 있는 토큰의 유효성을 체크하고 넘어가는 미들웨어이다.

**토큰이 없거나 정보가 일치하지 않다면 컨트롤러로 넘어가기 전에 에러를 반환한다.**
