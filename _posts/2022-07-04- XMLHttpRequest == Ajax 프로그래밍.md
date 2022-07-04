## 1단계 : - HTTP request 만드는 법
XMLHttpRequest.open() (en-US)
```jsx
//open() 메소드의 파라미터

//첫번째 파라미터는 HTTP 요구 방식(request method)
// ─ GET, POST, HEAD 중의 하나이거나 당신의 서버에서 지원하는 다른 방식  입니다.
// 이 파라미터는 HTTP 표준에 따라 모두 대문자로 표기해야합니다.

//두번째 파라미터는 요구하고자하는 URL 입니다

//세번째 파라미터(생략 가능)는 요구가 비동기식(Asynchronous)으로 수행될 지를 결정합니다. 
//만약 이 파라미터가 true(기본값) 으로 설정된 경우에는 자바스크립트 함수가 
//지속적으로 수행될 수 있어 서버로부터 응답을 받기 전에도 유저와 페이지의 상호작용이 
//계속 진행됩니다. 이것이 AJAX 의 첫번째 A (Asynchronous : 비동기성) 입니다.
false로 설정된 경우 동기적으로 작동합니다.
(send() 함수에서 서버로부터 응답이 올 때까지 기다림)

open(method, url)
open(method, url, async)
open(method, url, async, user)
open(method, url, async, user, password)

```
<p>XHR) 객체는 서버와 상호작용할 때 사용합니다. XHR을 사용하면 페이지의 새로고침 없이도 URL에서 데이터를 가져올 수 있습니다. 이를 활용하면 사용자의 작업을 방해하지 않고 페이지의 일부를 업데이트할 수 있습니다.</p>
---
<p>XMLHttpRequest는 AJAX 프로그래밍에 많이 사용됩니다. 이름에 XML이 들어가긴 하지만, XMLHttpRequest은 XML 뿐만 아니라 모든 종류의 데이터를 가져올 수 있습니다.</p>
---

<p>이벤트 데이터나 메시지 데이터를 서버에서 가져와야 하는 통신의 경우, EventSource
 인터페이스를 통한 서버발 이벤트
(Server-sent events)의 사용을 고려하세요. 완전한 양방향 통신의 경우에는 WebSocket
이 더 좋은 선택일 수 있습니다.</p>

<p>브라우저는 주소창이나 HTML의 form태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다ㅏ. 자스를 사용하여, HTTP요청을 전송하려면 XMLHttpRequest 객체를 사용한다. Wev API인 XMLHttpRequest 객체는 HTTP 요청 전송(request)과 HTTP 응답 수신(resolve)을 위한 다양한 메서드와 프로퍼티를 제공한다. 