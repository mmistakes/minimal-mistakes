---
layout: single
title:  "Httpx 기본 사용법"
---

## `httpx`

    
    - http client library
    - 동기, 비동기 API를 제공하고 HTTP1.1, HTTP/2를 모두 제공하는 파이썬 3를 위한 클라이언트 라이브러리
    - 파이썬 3.6 이상에서 사용가능
    - HTTP/2의 경우 pip install httpx[http2]
    

https://www.python-httpx.org/compatibility/

#### 사용방법


```python
r = httpx.get("https://www.naver.com")
```


```python
r
```




    <Response [200 OK]>




```python
r = httpx.post('https://httpbin.org/post', data={'key': 'value'})
```


```python
r.status_code
```




    200




```python
r = httpx.put('https://httpbin.org/put', data={'key': 'value'})
```


```python
r = httpx.delete('https://httpbin.org/delete')
```


```python
r = httpx.head('https://httpbin.org/get')
```


```python
r = httpx.options('https://httpbin.org/get')
```

### 헤더에 파라미터 추가하기


```python
params = {
    'key1' : 'value1',
    'key2' : 'value2'
}
```


```python
r = httpx.get("https://httpbin.org/get", params=params)
```


```python
r.url
```




    URL('https://httpbin.org/get?key1=value1&key2=value2')



### 리스트 전달


```python
params = {
    'key1' : 'value1',
    'key2' : ['value1', 'value2']
}
```


```python
r = httpx.get("https://httpbin.org/get", params=params)
```


```python
r.url
```




    URL('https://httpbin.org/get?key1=value1&key2=value1&key2=value2')



### 응답 컨텐츠

- HTTPX는 자동적으로 응답컨텐츠를 Unicode text로 디코딩한다.


```python
r = httpx.get('https://www.example.org')
```


```python
r.text[:100]
```




    '<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <m'




```python
r.encoding
```




    'UTF-8'



### 바이너리 응답 컨텐츠

- 응답 컨텐츠가 text가 아닌 byte로 전달될 수 있다.
- `gzip`, `deflate`로 인코딩된 http 응답을 자동적으로 디코딩해준다.
- 만약 `brotlipy`가 설치된 경우 `brotli` 인코딩을 지원한다.
    - `pip install httpx[brotli]`

```
Dependencies
The HTTPX project relies on these excellent libraries:

httpcore - The underlying transport implementation for httpx.
h11 - HTTP/1.1 support.
certifi - SSL certificates.
rfc3986 - URL parsing & normalization.
idna - Internationalized domain name support.
sniffio - Async library autodetection.
As well as these optional installs:

h2 - HTTP/2 support. (Optional, with httpx[http2])
socksio - SOCKS proxy support. (Optional, with httpx[socks])
rich - Rich terminal support. (Optional, with httpx[cli])
click - Command line client support. (Optional, with httpx[cli])
brotli or brotlicffi - Decoding for "brotli" compressed responses. (Optional, with httpx[brotli])
A huge amount of credit is due to requests for the API layout that much of this work follows, as well as to urllib3 for plenty of design inspiration around the lower-level networking details.

```


```python
from PIL import Image
from io import BytesIO

i = Image.open(BytesIO(r.content))
```

### Json 응답 컨텐츠


```python
r = httpx.get('https://api.github.com/events')
```


```python
r.json()
```




    [{'id': '23996368366',
      'type': 'DeleteEvent',
      'actor': {'id': 41898282,
       'login': 'github-actions[bot]',
       'display_login': 'github-actions',
       'gravatar_id': '',
       'url': 'https://api.github.com/users/github-actions[bot]',
       'avatar_url': 'https://avatars.githubusercontent.com/u/41898282?'},
      'repo': {'id': 406861191,
       'name': 'MiSTer-DB9/Distribution_MiSTer',
       'url': 'https://api.github.com/repos/MiSTer-DB9/Distribution_MiSTer'},
      'payload': {'ref': 'zips', 'ref_type': 'branch', ...



### Custom Headers



```python
url = 'https://httpbin.org/headers'
headers = {'user-agent': 'my-app/0.0.1'}
r = httpx.get(url, headers=headers)
```


```python
r.json()
```




    {'headers': {'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Host': 'httpbin.org',
      'User-Agent': 'my-app/0.0.1',
      'X-Amzn-Trace-Id': 'Root=1-632189eb-53440554314fc44a7a8bb055'}}



### 폼 전달하기

- `post`, `put` 요청 시 request body에 form 데이터를 전달할 수 있다.
- `form-encoded` 데이터를 전달한다.


```python
data = {
    'key1': 'value1',
    'key2': 'value2'
}
```


```python
r = httpx.post('https://httpbin.org/post', data=data)
```


```python
print(r.text)
```

    {
      "args": {}, 
      "data": "", 
      "files": {}, 
      "form": {
        "key1": "value1", 
        "key2": "value2"
      }, 
      "headers": {
        "Accept": "*/*", 
        "Accept-Encoding": "gzip, deflate", 
        "Content-Length": "23", 
        "Content-Type": "application/x-www-form-urlencoded", 
        "Host": "httpbin.org", 
        "User-Agent": "python-httpx/0.23.0", 
        "X-Amzn-Trace-Id": "Root=1-63218a80-1ee3efba570ccf83203acbdd"
      }, 
      "json": null, 
      "origin": "59.10.53.151", 
      "url": "https://httpbin.org/post"
    }
    
    


```python
r.json()
```




    {'args': {},
     'data': '',
     'files': {},
     'form': {'key1': 'value1', 'key2': 'value2'},
     'headers': {'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Length': '23',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'httpbin.org',
      'User-Agent': 'python-httpx/0.23.0',
      'X-Amzn-Trace-Id': 'Root=1-63218a80-1ee3efba570ccf83203acbdd'},
     'json': None,
     'origin': '59.10.53.151',
     'url': 'https://httpbin.org/post'}




```python
r.headers
```




    Headers({'date': 'Wed, 14 Sep 2022 08:02:08 GMT', 'content-type': 'application/json', 'content-length': '501', 'connection': 'keep-alive', 'server': 'gunicorn/19.9.0', 'access-control-allow-origin': '*', 'access-control-allow-credentials': 'true'})




```python
data = {
    'key1' : ['value1', 'value2']
}
```


```python
r = httpx.post('https://httpbin.org/post', data=data)
```


```python
print(r.text)
```

    {
      "args": {}, 
      "data": "", 
      "files": {}, 
      "form": {
        "key1": [
          "value1", 
          "value2"
        ]
      }, 
      "headers": {
        "Accept": "*/*", 
        "Accept-Encoding": "gzip, deflate", 
        "Content-Length": "23", 
        "Content-Type": "application/x-www-form-urlencoded", 
        "Host": "httpbin.org", 
        "User-Agent": "python-httpx/0.23.0", 
        "X-Amzn-Trace-Id": "Root=1-63218ae9-1956286b6be2ba98247694c0"
      }, 
      "json": null, 
      "origin": "59.10.53.151", 
      "url": "https://httpbin.org/post"
    }
    
    

### Multipart File Uploads

- 파일을 업로드할 때 `HTTP Multipart encoding` 을 사용한다.

```
>>> files = {'upload-file': open('report.xls', 'rb')}
>>> r = httpx.post("https://httpbin.org/post", files=files)
>>> print(r.text)
{
  ...
  "files": {
    "upload-file": "<... binary content ...>"
  },
  ...
}

```

- 파일이름과 컨텐츠 타입을 명시적으로 설정할 수 있다. (튜플로 설정)

```
>>> files = {'upload-file': ('report.xls', open('report.xls', 'rb'), 'application/vnd.ms-excel')}
>>> r = httpx.post("https://httpbin.org/post", files=files)
>>> print(r.text)
{
  ...
  "files": {
    "upload-file": "<... binary content ...>"
  },
  ...
}
```

- 파일이 아닌 데이터를 추가하고 싶을 경우

```
>>> data = {'message': 'Hello, world!'}
>>> files = {'file': open('report.xls', 'rb')}
>>> r = httpx.post("https://httpbin.org/post", data=data, files=files)
>>> print(r.text)
{
  ...
  "files": {
    "file": "<... binary content ...>"
  },
  "form": {
    "message": "Hello, world!",
  },
  ...
}

```

#### JSON 데이터 보내기

- 간단한 key, value 구조의 경우 Form으로 보낼 수 있지만
- 복잡한 데이터를 보낼 경우에는 Json으로 인코딩하여 전달한다.


```python
data = {'integer': 123, 'boolean': True, 'list': ['a', 'b', 'c']}
```


```python
r = httpx.post("https://httpbin.org/post", json=data)
print(r.json())
```

    {'args': {}, 'data': '{"integer": 123, "boolean": true, "list": ["a", "b", "c"]}', 'files': {}, 'form': {}, 'headers': {'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate', 'Content-Length': '58', 'Content-Type': 'application/json', 'Host': 'httpbin.org', 'User-Agent': 'python-httpx/0.23.0', 'X-Amzn-Trace-Id': 'Root=1-63218ca2-42bb2dda614c1cbb1a5ca4a3'}, 'json': {'boolean': True, 'integer': 123, 'list': ['a', 'b', 'c']}, 'origin': '59.10.53.151', 'url': 'https://httpbin.org/post'}
    


```python
r.json()['data']
```




    '{"integer": 123, "boolean": true, "list": ["a", "b", "c"]}'



### 바이너리 요청 데이터

- 다른 인코딩의 경우에는 반드시 `content=을 추가해야 한다.
- bytes 혹은 bytes를 yield하는 generator의 경우에도 마찬가지
- binary data를 업로드할 때 Custom `Content-Type` 을 설정할 수도 있다.


```python
content = b'hello, world'
r = httpx.post("https://httpbin.org/post", content=content)
```


```python
r.json()['data']
```




    'hello, world'




```python
r.status_code == httpx.codes.OK
```




    True




```python
httpx.codes.CREATED
```




    <codes.CREATED: 201>



상태코드가 200번 응답이 아닌 경우 오류처리

```
>>> not_found = httpx.get('https://httpbin.org/status/404')
>>> not_found.status_code
404
>>> not_found.raise_for_status()
```

### 응답 헤더

- `content-encoding`
- `transfter-encoding`
- `connection`
- `server`
- `x-runtime`
- `etag`
- `content-type`
- `date`
- `content-length`
- `connection`
- `server`
- `access-control-allow-origin`


```python
r.headers
```




    Headers({'date': 'Wed, 14 Sep 2022 08:13:40 GMT', 'content-type': 'application/json', 'content-length': '408', 'connection': 'keep-alive', 'server': 'gunicorn/19.9.0', 'access-control-allow-origin': '*', 'access-control-allow-credentials': 'true'})




```python
r.headers['content-type']
```




    'application/json'



### Steraming 응답

- 용량이 큰 파일을 다운로드 받는 경우 streaming 응답을 받을 수 있다.
- 한번에 메모리에 전체 응답을 로드하지 않음


```python
with httpx.stream("GET", "https://www.example.com") as r:
    for data in r.iter_bytes():
        print(data)
```

    b'<!doctype html>\n<html>\n<head>\n    <title>Example Domain</title>\n\n    <meta charset="utf-8" />\n    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <style type="text/css">\n    body {\n        background-color: #f0f0f2;\n        margin: 0;\n        padding: 0;\n        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n        \n    }\n    div {\n        width: 600px;\n        margin: 5em auto;\n        padding: 2em;\n        background-color: #fdfdff;\n        border-radius: 0.5em;\n        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);\n    }\n    a:link, a:visited {\n        color: #38488f;\n        text-decoration: none;\n    }\n    @media (max-width: 700px) {\n        div {\n            margin: 0 auto;\n            width: auto;\n        }\n    }\n    </style>    \n</head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is for use in illustrative examples in documents. You may use this\n    domain in literature without prior coordination or asking for permission.</p>\n    <p><a href="https://www.iana.org/domains/example">More information...</a></p>\n</div>\n</body>\n</html>\n'
    


```python
# Or the text of the response...

with httpx.stream("GET", "https://www.example.com") as r:
    for text in r.iter_text():
        print(text)
```

    <!doctype html>
    <html>
    <head>
        <title>Example Domain</title>
    
        <meta charset="utf-8" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
        body {
            background-color: #f0f0f2;
            margin: 0;
            padding: 0;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
            
        }
        div {
            width: 600px;
            margin: 5em auto;
            padding: 2em;
            background-color: #fdfdff;
            border-radius: 0.5em;
            box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
        }
        a:link, a:visited {
            color: #38488f;
            text-decoration: none;
        }
        @media (max-width: 700px) {
            div {
                margin: 0 auto;
                width: auto;
            }
        }
        </style>    
    </head>
    
    <body>
    <div>
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents. You may use this
        domain in literature without prior coordination or asking for permission.</p>
        <p><a href="https://www.iana.org/domains/example">More information...</a></p>
    </div>
    </body>
    </html>
    
    
    


```python
# line by line

with httpx.stream("GET", "https://www.example.com") as r:
    for line in r.iter_lines():
        print(line)
```

    <!doctype html>
    
    <html>
    
    <head>
    
        <title>Example Domain</title>
    
    
    
        <meta charset="utf-8" />
    
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <style type="text/css">
    
        body {
    
            background-color: #f0f0f2;
    
            margin: 0;
    
            padding: 0;
    
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    
            
    
        }
    
        div {
    
            width: 600px;
    
            margin: 5em auto;
    
            padding: 2em;
    
            background-color: #fdfdff;
    
            border-radius: 0.5em;
    
            box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    
        }
    
        a:link, a:visited {
    
            color: #38488f;
    
            text-decoration: none;
    
        }
    
        @media (max-width: 700px) {
    
            div {
    
                margin: 0 auto;
    
                width: auto;
    
            }
    
        }
    
        </style>    
    
    </head>
    
    
    
    <body>
    
    <div>
    
        <h1>Example Domain</h1>
    
        <p>This domain is for use in illustrative examples in documents. You may use this
    
        domain in literature without prior coordination or asking for permission.</p>
    
        <p><a href="https://www.iana.org/domains/example">More information...</a></p>
    
    </div>
    
    </body>
    
    </html>
    
    


```python
with httpx.stream("GET", "https://www.example.com") as r:
    for chunk in r.iter_raw():
        print(chunk)
```

    b'\x1f\x8b\x08\x00\xc2\x15\xa8]\x00\x03}TMs\xdb \x10\xbd\xfbWl\xd5K2#$\'i\x1a\x8f-i\xfa\x99i\x0fi\x0fi\x0f=\x12\xb1\xb2\x98\x08P\x01\xc9\xf6t\xf2\xdf\xbbB\x8e#7\x99\x9a\x91\x81]x\xbb\xef\xb1\x90\xbd\x12\xa6\xf4\xbb\x16\xa1\xf6\xaa)f\xd9c\x87\\\x143\xa0_\xe6\xa5o\xb0\xf8\xbc\xe5\xaam\x10>\x19\xc5\xa5\xce\xd2\xd1:\x1b\x97(\xf4\x1c\xca\x9a[\x87>\x8f:_\xb1E\x04i1q\xd6\xde\xb7\x0c\x7fw\xb2\xcf\xa3\x8fF{\xd4\x9e\ra#(\xc7Y\x1ey\xdc\xfat\x08\xbf:@\xbd\x84\xa4\xb9\xc2<\xea%nZc\xfdd\xffF\n_\xe7\x02{Y"\x0b\x93\x18\xa4\x96^\xf2\x86\xb9\x927\x98\x9f=A9\xbf#2C\x06\xfb\xc0\xa5s\xd1\xe8\xbb3b\x07\x7f\xc20Lyy\xbf\xb6\xa6\xd3\x82\x95\xa61v\t\xaf\xab9\xb5\xf3\xd5a\x89\xe2v-\xf5\x12\xe6O\xa6\x96\x0b!\xf5\xfa\xc8VQ\xa6\xac\xe2J6\xbb%0\xde\x92\x9c\xcc\xed\x9cG\x15\xc3\xd8\xb3N\xc6\xf0\xa1\x91\xfa\xfe\x86\x97\xb7\xc1tM\x9bb\x88nqm\x10~~\x8dh\xfc\xbdE\r\xb7\\\xbba\xf2\x05\x9b\x1e\xbd,9|\xc3\x0e\xc9r0\xc4\xf0\xde\x12w\xc2\xa6\xa5\xcc\xa1\x95\xd5S.a\xf0\x10\xfe\x85\xec\'t\x83pKx;\x9f\xb7\xdb\xe7\x0c/Q\x01\xef\xbcy\x81\xe89\xaa\xd5\x7fE\x13\xd4&\x19\xdc\x19+\xd02\xcb\x85\xec\x1c\xe9\x94\\\x1e\x01\x98-s5\x17fC\xc8\xed\x16.\xe8\xbb\xa2o\x18\xdb\xf5\x1d?\x99\xc7\xa1%\xf3\xf3\xd3\xd5\x84\x0c_\x0e\xea\xc5\xd4\xf7\xd2I\x8fbB\xed1\x93\x8b\xc5\x9b\xc5b\x92\xc9p\xfeL`i,\xf7\xd2\x10Km4NA\xdf)\x14\x92\xc3\x89\xe2[\xb6\xd7\xe7j\xd0\xe7t\x02~\xac\xe2QU\xfc\xa3\xd8D\xe5c\xc7\xc3$d\x96\x86\n-\xc2Ye\xe9x\x1dg\xd9P\x9bt;)\xd8\xbe\x8e\xeb\xb3g7\x93L\xa3\xaf-~\xd4\xd2\x81\x08v\xa0Qe,t\x0ea\x985M\xe7\xfc@\xb8G\xc0\x11\xc1\r\x0ez\x0e:E\xf7\xc9%\xf0\xcbtDb\x17\xb6xB\x1a\xabe\x8f\xa6\xa1!y\t\xa0\xb3Ht|m:\x0f\xad\x95\x14\xa24t\xb4R\x071\x81\xe6\xdc\xddS\x85\x84\xe8-Z%\x9d#G\x92\xa5\xed!\xcf\x8c\x1e\x08\x8bU\x1e\r\xcf\x84[\xa6\xe9f\xb3I$\xd7<1v\x9d\x8e!]\xbaO3*n\x8c\x1dH\x10\xa0\nA\x92\x84\xd0x\x11\x10\xb34\x88\x93\xa5{\xa9\xd2\xf1A\xfb\x0b(\xeb|o\xe8\x04\x00\x00'
    


```python
# conditionally load the response
LENGTH = 1000

with httpx.stream("GET", "https://www.example.com") as r:
        if int(r.headers['Content-Length']) < 1000:
            r.read()
            print(r.text)
```

    <!doctype html>
    <html>
    <head>
        <title>Example Domain</title>
    
        <meta charset="utf-8" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
        body {
            background-color: #f0f0f2;
            margin: 0;
            padding: 0;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
            
        }
        div {
            width: 600px;
            margin: 5em auto;
            padding: 2em;
            background-color: #fdfdff;
            border-radius: 0.5em;
            box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
        }
        a:link, a:visited {
            color: #38488f;
            text-decoration: none;
        }
        @media (max-width: 700px) {
            div {
                margin: 0 auto;
                width: auto;
            }
        }
        </style>    
    </head>
    
    <body>
    <div>
        <h1>Example Domain</h1>
        <p>This domain is for use in illustrative examples in documents. You may use this
        domain in literature without prior coordination or asking for permission.</p>
        <p><a href="https://www.iana.org/domains/example">More information...</a></p>
    </div>
    </body>
    </html>
    
    


```python
r.headers['Content-Length']
```




    '648'



### 쿠키

- 응답 메세지에 담긴 쿠키에 쉽게 접근할 수 있다.


```python
r = httpx.get('https://httpbin.org/cookies/set?chocolate=chip')
r.cookies['chocolate']
```




    'chip'



쿠키를 요청 메세지에 포함시킬 경우 `cookie` 파라미터를 사용한다.


```python
cookies = {
    'peanut' : 'butter'
}
```


```python
r = httpx.get('https://httpbin.org/cookies', cookies=cookies)
```


```python
r.json()
```




    {'cookies': {'peanut': 'butter'}}



Cookies는 `Cookies` 인스턴스에서 반환되는데, 쿠키 인스턴스는 도메인 또는 경로로 쿠키에 액세스하기 위한 추가 API가 있는 `dict`와 유사한 데이터 구조입니다.


```python
cookies = httpx.Cookies()
```


```python
cookies
```




    <Cookies[]>




```python
cookies.set('cookie_on_domain',  'hello, there', domain='httpbin.org')
```


```python
cookies
```




    <Cookies[<Cookie cookie_on_domain=hello, there for httpbin.org />]>




```python
r = httpx.get('http://httpbin.org/cookies', cookies=cookies)
```


```python
r.json()
```




    {'cookies': {'cookie_on_domain': 'hello, there'}}



### 리다이렉션 , History

`httpx` 기본적으로 모든 HTTP 메서드에 대한 redirection을 따르지 않는다.
하지만 명시적으로 활성화할 수는 있다.

github는 모든 http 요청을 https로 리다이렉션한다.


```python
r = httpx.get('http://github.com/')
r.status_code
r.history
r.next_request
```




    <Request('GET', 'https://github.com/')>




```python
# 명시적으로 redirection handling하기

r = httpx.get('http://github.com/', follow_redirects=True)
r.url
r.status_code
r.history
```




    [<Response [301 Moved Permanently]>]



### Timeout


```python
httpx.get('https://github.com/', timeout=1)
```




    <Response [200 OK]>



### Authentication

- HTTPX는 기본, 다이제스트 http 인증을 지원한다.
- Basic, authentication credentials을 제공하기 위해 2개의 일반 텍스트 문자열 또는 바이트 객체를 auth 인수로 요청 함수에 전달합니다.


```python
httpx.get("https://example.com", auth=("my_user", "password123"))
```




    <Response [200 OK]>




```python
auth = httpx.DigestAuth("my_user", "password123")
httpx.get("https://example.com", auth=auth)
```




    <Response [200 OK]>






다이제스트 인증에 대한 자격 증명을 제공하려면 다이제스트를 인스턴스화해야한다.
일반 텍스트 사용자 이름 및 암호를 인수로 사용하는 Auth 객체이다. 
그러면 이 객체는 다음과 같이 auth 인수로 요청 메서드에 전달할 수 있다.


```python
import httpx
from typing import Optional
from urllib.parse import quote
import json

