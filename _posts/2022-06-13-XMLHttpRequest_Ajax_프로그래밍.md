<h2>XHR 객체는 서버와 상호작용할 때 사용합니다</h2>
<p>?XHR을 사용하면 페이지의 새로고침 없이도 URL에서 데이터를 가져올 수 있습니다. 이를 활용하면 사용자의 작업을 방해하지 않고 페이지의 일부를 업데이트할 수 있습니다.<p>
<p>
XMLHttpRequest
는 AJAX
 프로그래밍에 많이 사용됩니다.</p>

<div>이름에 XML
이 들어가긴 하지만, XMLHttpRequest
은 XML 뿐만 아니라 모든 종류의 데이터를 가져올 수 있습니다.</div>

<div>이벤트 데이터나 메시지 데이터를 서버에서 가져와야 하는 통신의 경우, EventSource
 인터페이스를 통한 서버발 이벤트
(Server-sent events)의 사용을 고려하세요. 완전한 양방향 통신의 경우에는 WebSocket
이 더 좋은 선택일 수 있습니다.<div>


<h1>### 1단계 : - HTTP request 만드는 법</h1>

<h2>XMLHttpRequest.open() </h2>

<div>https://www.notion.so/XMLHttpRequest-Ajax-bf1b323604f04e2796eb29434275cd33#859694e27e8d47bd93b07c806e0af560<div>


<div>브라우저는 주소창이나 HTML의 form태그 또는 a 태그를 통해 HTTP 요청 전송 기능을 기본 제공한다ㅏ. 자스를 사용하여, HTTP요청을 전송하려면 XMLHttpRequest 객체를 사용한다. Wev API인 XMLHttpRequest 객체는 HTTP 요청 전송(request)과 HTTP 응답 수신(resolve)을 위한 다양한 메서드와 프로퍼티를 제공한다.</div>

<div>JavaScript를 이용하여 서버로 보내는 [HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP) request를 만들기 위해서는 그에 맞는 기능을 제공하는 Object의 인스턴스가 필요합니다.`XMLHttpRequest` 가 그러한 Object의 한 예입니다.<div>

<div>https://www.notion.so/XMLHttpRequest-Ajax-bf1b323604f04e2796eb29434275cd33#1d4d8f77198841498cbeb00867847cd9</div>

<div>https://www.notion.so/XMLHttpRequest-Ajax-bf1b323604f04e2796eb29434275cd33#a8bae40345cc4383a834282a6fc660bf</div>

<h2>XMLHttpRequest.send()</h2>

<p>요청을 전송합니다. 비동기 요청(기본 동작)인 경우, send()는 요청을 전송하는 즉시 반환합니다.<p>

<h3>## `send()`</h3>

<div>메소드의 파라미터는 POST 방식으로 요구한 경우 서버로 보내고 싶은 어떠한 데이터라도 가능합니다. 데이터는 서버에서 쉽게 parse할 수 있는 형식(format)이어야 합니다. 예를 들자면 아래와 같습니다.

`"name=value&anothername="+encodeURIComponent(myVar)+"&so=on"`

`multipart/form-data`만약 `POST`형식으로 데이터를 보내려 한다면, 요청(request)에 MIME type을 먼저 설정 해야 합니다. 예를 들자면 `send()`를 호출 하기 전에 아래와 같은 형태로 send()로 보낼 쿼리를 이용해야 합니, JSON, XML, SOAP 등과 같은 다른 형식(format)도 가능합니다.</div>
