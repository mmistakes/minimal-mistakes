---
layout: post
title:  "(인터뷰 준비하기) HTTP 헤더의 이해 Part 1"
subtitle: "HttpOnly 와 Secure 쿠키의 의미"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-07-30 00:00:00 +0900
categories: [ "HTTP", "Header", "HttpOnly", "Secure"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. HTTP 헤더 중 Set-Cookie 를 알아보고 보안 속성을 정리하여 알려드리도록 하겠습니다. 😺

<!--more-->

## 쿠키(Cookie)란

HTTP 쿠키는 서버가 브라우저에게 전송하는 데이터입니다. 클라이언트는 이를 저장한 다음에 다시 서버에게 전송을 함으로써 Stateless HTTP 프로토콜 속성을 보완합니다. 

그렇다면 Stateless 란 무엇일까요? 모든 HTTP 리퀘스트(request)는 완전히 독립된다는 의미입니다. 즉, 전후 요청에 영향을 받지 않는 것입니다. ( [참고: 스택오버플로우](https://stackoverflow.com/questions/3105296/if-rest-applications-are-supposed-to-be-stateless-how-do-you-manage-sessions) ) 즉, 서버는 매 Request 를 처리할 때마다 독립적으로 처리하므로 HTTP 포로토콜은 많은 정보량을 가지게됩니다. 

따라서, 웹 서버는 Stateless 속성을 극복하기 위해서 쿠키를 사용하였습니다. 쿠키는 Mozilla 의 문서를 보면 아래의 역할들을 가지고 있습니다. 쿠키 정보를 보다보면 아래와 같은 내용을 확인할 수 있을 겁니다.

```http
Cookie: CartInfo=1234,1235,12346,...; OtherInfo=.....;
```

즉, 카트 정보가 아래와 같이 매 브라우저 요청 마다 Cookie 정보를 포함하는 것입니다.

- Session Management (세션관리)
  - 로그인, 쇼핑카트, 게임 점수 등
- Personalization
  - 사용자 설정, 테마 등
- Tracking
  - 사용자 행위 분석과 기록

## Set-Cookie 란 무엇

그렇다면, Set-Cookie 란 무엇이고, 뒤에 붙은 복잡한 속성(Property)는 무엇을 위한 것일까요? Mozilla 의 문서에서 찾아볼 경우 `Creating Cookies` 절에 `Set-Cookie` 가 언급되어 있는 것을 알 수 있습니다.

즉, 서버는 Set-Cookie 헤더를 설정하여 응답과 함께 전송하고 쿠키는 브라우저에 저장됩니다. 즉, 서버는 아래와 같은 포맷으로 전송하는 것입니다. 

원문 찬스를 쓰겠습니다. (블로그가 글로벌해보입니다.)

> When receiving an HTTP request, a server can send a Set-Cookie header with the response. The cookie is usually stored by the browser, and then the cookie is sent with requests made to the same server inside a Cookie HTTP header. An expiration date or duration can be specified, after which the cookie is no longer sent. Additionally, restrictions to a specific domain and path can be set, limiting where the cookie is sent. [Mozillla.org : HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies)

```http
HTTP/2.0 200 OK
Content-type: text/html
Set-Cookie: <cookie-name>=<cookie-value>

// Page Content ....
```

### Session Cookie

그렇다면, 위의 쿠키는 무슨 쿠키일까요? `Session cookies` 입니다. 세션 쿠키는 클라이언트가 셧다운되면 바로 사라지는 쿠키입니다. 이는 `Expires` 혹은 `Max-Age` 를 지정하지 않았기 때문입니다. (일부 브라우저에서 Session Resorting 을 사용하는 경우 `Session cookie`를 영구 쿠키로 만들 수 있습니다. 브라우저 신규 버전이 나올때마다 이를 체크해 보는건 어떨까요?)

### Permanent Cookie

우리는 사용자가 브라우저를 열고 닫을 때마다 이러한 쿠키 설정이 보존되도록 하고 싶습니다. 이때 사용하는 것이 `Permanent Cookies` 입니다. 즉, `Set-Cookie`에 몇가지 속성을 달아서 조건을 부과하는 것입니다.

아래의 샘플을 볼까요? (Mozilla 샘플을 그대로 들고왔습니다.)

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
// 주의 사항 만료 시간은 클라이언트 시간을 따릅니다.
// 따라서, 서버 시간과 다를 수 있습니다.
```

## HttpOnly 쿠키

HttpOnly 쿠키의 탄생 배경은 XSS 라는 공격 기법 때문입니다. 유해한 사용자에 의해서 나의 쿠키정보가 유출되는 것을 의미합니다. 특히, 로그인을 유지해 주는 쿠키 정보가 유출된다면, 나를 사칭하거나 금전적인 피해를 줄 수 있습니다. 이때 쿠키 정보를 유출하기 위한 방법으로 XSS 라는 기법을 사용합니다. 

HttpOnly 는 이러한 공격을 막기 위해 고안되었습니다. 일종의 규약으로 `HttpOnly 로 설정한 쿠키는 Document.cookie API 를 통해서 접근할 수 없다` 입니다.

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; HttpOnly
```

## Secure 쿠키

그렇다면 Secure 쿠키는 무엇일까요? `Secure` 쿠키는 HTTPS 전송을 보증해주는 역할입니다. 즉, Secure 로 설정된 쿠키는 안전한 전송 프로토콜에만 쿠키정보를 서버로 보냅니다. (Chrome 에서 테스트 해보세요 ~) 즉, HTTP 프로토콜에서는 쿠키가 전송되지 않습니다.

즉, 아래와 같이 설정하게되면 XSS 를 통해서 쿠키 정보가 유출될 일이 없고 HTTPS 로만 통신을 하기 때문에 중간에서 데이터를 가로챌 염러가 없습니다.

```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

## 결론

지금까지 Set-Cookie 와 그 속성(?) 중 Secure, HttpOnly 에 대해서 알아보았습니다. 쿠키 데이터 중에 안전하게 보관하고자 하는 데이터가 있다면 위의 내용을 살펴보는 것이 도움이 될 것입니다. 

## 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [Mozilla: HTTP/Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies)
