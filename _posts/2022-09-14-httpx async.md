### Async

비동기(Async)는 멀티스레딩보다 훨씬 효율적인 동시성 모델로, 

상당한 성능 이점을 제공하고 웹소켓과 같은 긴 네트워크 연결을 사용할 수 있다.

비동기 웹 프레임워크로 작업하는 경우 발신 HTTP 요청을 발송하기 위해 비동기 클라이언트를 사용할 수도 있습니다.


```python
import httpx

async with httpx.AsyncClient() as client:
    r = await client.get('https://www.example.com')
```


```python
r
```




    <Response [200 OK]>



Method - `await`과 함께 사용

`AsyncClient.get(url, ...)`

`AsyncClient.options(url, ...)`

`AsyncClient.head(url, ...)`

`AsyncClient.post(url, ...)`

`AsyncClient.put(url, ...)`

`AsyncClient.patch(url, ...)`

`AsyncClient.delete(url, ...)`

`AsyncClient.request(method, url, ...)`

`AsyncClient.send(request, ...)`


```python
# 일반적인 사용


async with httpx.AsyncClient() as client:
    ...
    
# 명시적 닫기


client = httpx.AsyncClient()
...
await client.aclose()
```

### Streaming response


```python
client = httpx.AsyncClient()
async with client.stream('GET', 'https://www.example.com/') as response:
    async for chunk in response.aiter_bytes():
        ...
```

- `Response.aread()` - For conditionally reading a response inside a stream block.
- `Response.aiter_bytes()` - For streaming the response content as bytes.
- `Response.aiter_text()` - For streaming the response content as text.
- `Response.aiter_lines()` - For streaming the response content as lines of text.
- `Response.aiter_raw()` - For streaming the raw response bytes, without applying content decoding.
- `Response.aclose()` - For closing the response. You don't usually need this, since .stream block closes the response automatically on exit.


```python
import httpx
from starlette.background import BackgroundTask
from starlette.responses import StreamingResponse

client = httpx.AsyncClient()

async def home(request):
    req = client.build_request("GET", "https://www.example.com/")
    r = await client.send(req, stream=True)

    ##### Response.acloise()를 꼭 해줘야한다.
    return StreamingResponse(r.aiter_text(), background=BackgroundTask(r.aclose))
```

### Streaming requests

`AsyncClient` 인스턴스로 streaming request를 보낼 때 bytes generator 대신 async bytes generator를 보낼 수 있다.


```python
async def upload_bytes():
    ...  # yield byte content

await client.post(url, content=upload_bytes())
```

### 명시적 transport instance

전송 인스턴스를 직접 인스턴스화할 때는 httpx를 사용해야 합니다.비동기 HTTP 전송.


```python
import httpx

transport = httpx.AsyncHTTPTransport(retries=1)
async with httpx.AsyncClient(transport=transport) as client:
    ...
```

HTTPX는 비동기 환경으로서 `asyncio` 또는 `trio`를 지원한다.

소켓 작업 및 동시성 프리미티브의 백엔드로 사용할 두 가지 중 어떤 것을 사용할 지 
자동 감지한다.


```python
import asyncio
import httpx

async def main():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://www.example.com/')
        print(response)

asyncio.run(main())
```

### Trio
Trio is an alternative async library, designed around the the principles of structured concurrency.


```python
!pip install trio
```


```python
import httpx
import trio

async def main():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://www.example.com/')
        print(response)

trio.run(main)
```

    c:\users\l2t\appdata\local\programs\python\python39\lib\site-packages\trio\_core\_run.py:89: RuntimeWarning: coroutine 'main' was never awaited
      @attr.s(frozen=True, slots=True)
    RuntimeWarning: Enable tracemalloc to get the object allocation traceback
    

    <Response [200 OK]>
    

### AnyIO

AnyIO는 비동기식 네트워킹 및 동시성 라이브러리로, 

비동기식 또는 트리오를 기반으로 작동합니다. 선택한 백엔드를 기본 라이브러리로 사용한다.


```python
!pip install anyio
```

    Requirement already satisfied: anyio in c:\users\l2t\appdata\local\programs\python\python39\lib\site-packages (3.6.1)
    Requirement already satisfied: idna>=2.8 in c:\users\l2t\appdata\local\programs\python\python39\lib\site-packages (from anyio) (2.10)
    Requirement already satisfied: sniffio>=1.1 in c:\users\l2t\appdata\local\programs\python\python39\lib\site-packages (from anyio) (1.2.0)
    


```python
import httpx
import anyio

async def main():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://www.example.com/')
        print(response)

anyio.run(main, backend='trio')
```

### ASGI Web application에 직접 요청해보기


```python
from starlette.applications import Starlette
from starlette.responses import HTMLResponse
from starlette.routing import Route


async def hello(request):
    return HTMLResponse("Hello World!")


app = Starlette(routes=[Route("/", hello)])
```


```python
import httpx
async with httpx.AsyncClient(app=app, base_url="http://testserver") as client:
    r = await client.get("/")
    assert r.status_code == 200
    assert r.text == "Hello World!"
```

더 복잡한 경우에는 ASGI 전송을 사용자 정의해야 할 수 있습니다. 
이를 통해 다음을 수행할 수 있습니다.

- `raise_app_exceptions=False`를 설정하여 예외를 발생시키지 않고 500개의 오류 응답을 검사합니다.
- `root_path`를 설정하여 ASGI 애플리케이션을 하위 경로에 마운트합니다.
- 클라이언트를 설정하여 요청에 대해 지정된 클라이언트 주소를 사용합니다.


```python
# Instantiate a client that makes ASGI requests with a client IP of "1.2.3.4",
# on port 123.
transport = httpx.ASGITransport(app=app, client=("1.2.3.4", 123))
async with httpx.AsyncClient(transport=transport, base_url="http://testserver") as client:
    ...
```
