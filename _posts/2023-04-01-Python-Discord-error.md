---
layout: single
title: "Python 파이썬으로 디스코드 메세지 에러 오류코드 : UnicodeEncodeError: 'latin-1' codec can't encode characters in position 0-1: Body ('text') is not valid Latin-1. Use body.encode('utf-8') if you want to send it encoded in UTF-8."
categories: [Python]
tag: [python, discord]
toc: true
---

오류코드 

UnicodeEncodeError: 'latin-1' codec can't encode characters in position 0-1: Body ('현재') is not valid Latin-1. Use body.encode('utf-8') if you want to send it encoded in UTF-8.

 

또다른 오류

TypeError: memoryview: a bytes-like object is required, not 'str'

 

디스코드에 메세지를 보내는 코드 

```python
import datetime
import requests

discord_url = "https://discord.com/api/webhooks/1045271437176492064/fL5a-Fgo_wWgK82nFAU6WBl-nG4cHAXwcVgHljs9YDxnjPbqIqv7r564GPiNT1Mdz_W2"
#디스코드 채널로 메세지 전송
def discord_send_message(text):
    now = datetime.datetime.now()
    message = {"content": f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] {str(text)}"}
    requests.post(discord_url, data=message)
    print(message)
```

여기서 message 변수로 보내는 데이터를 {"content" :  "보낼내용"} 이 양식을 지키지 않으면 인코딩 에러가 나옵니다. 

 

디스코드 api문서 확인하면 됩니다.
