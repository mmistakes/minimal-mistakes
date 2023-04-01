---
layout: single
title: "Python 파이썬으로 디스코드(Discord) 메세지 보내기"
categories: [Python]
tag: [python, discord]
toc: true
---

Python version 3.10

소스코드는 참고 문헌을 통해 가져왔습니다. 

## Python 파이썬으로 디스코드 (Discord) 메세지 보내기

### Discord 디스코드란?

Discord는 무료 커뮤니케이션 앱으로 친구, 게임 커뮤니티, 개발자와 음성, 영상, 문자 채팅을 나눌 수 있습니다. 수억 명의 사용자가 있어 온라인에서 사람들과 소통하는 가장 인기 있는 방법 중 하나입니다. Discord는 거의 모든 인기 플랫폼에서 사용할 수 있어 Windows, macOS, Linux, iOS, iPadOS, Android는 물론 웹 브라우저를 통해서도 사용할 수 있습니다. 

### 1. 디스코드(Discord)를 설치 후 회원가입 및 로그인

[https://di](https://discord.com/)[scord.com](https://discord.com/)디스코드 사이트. 링크를 눌러 접속하시면 됩니다.

![img](https://blog.kakaocdn.net/dn/bo3Ene/btrR3elc2mn/SUMTbLlCbDu8IE61OLMvC0/img.png)

가운데 다운로드 버튼 및 위에 다운로드를 눌러서 디스코드를 다운로드합니다. 

맥, 윈도 버전 확인하고 다운로드하시면 됩니다. 

 

설치 완료하시고 실행시키면 이 화면이 나옵니다.

![img](https://blog.kakaocdn.net/dn/J3VTO/btrR3CzlJ6J/OX5g4kKfFA93c9gUZkr3p1/img.png)

회원가입 및 로그인을 해주시면 1 단계 성공입니다.

로그인을 마치셨다면 다음 단계로 넘어갑니다.

### 2. 디스코드 (Discord) 실행 후 서버 추가 및 웹 후크 주소 받기

실행시킨 후 서버 추가를 해보겠습니다. 

![img](https://blog.kakaocdn.net/dn/vRQM4/btrRY2NipUO/7ZyOVoMKmxRKOXT5NDDE60/img.png)

사진에 보이는 + 버튼을 눌러서 서버 추가하기를 눌러줍니다.

서버 추가하기를 누르면 이런 창이 뜹니다.  * 2022년 11월 24일 기준



![img](https://blog.kakaocdn.net/dn/U4eDa/btrR30GNaRz/mqGNFQOGR5b1HqDdqmVlIK/img.png)

우선 저는 직접 만들기를 선택했습니다.

![img](https://blog.kakaocdn.net/dn/bEQyGK/btrR30Uj0p9/IckgNKbFdlCKTveaGFkr2K/img.png)

나와 친구들을 위한 서버 선택해줍니다.

![img](https://blog.kakaocdn.net/dn/bh1RoC/btrR20OemjM/wTwK7cXtuIXeTbq0yQoEg0/img.png)

마지막으로 서버 이름 정해주고 사진 업로드 해주면 성공



만들기 버튼 누르셨으면 서버 개설은 성공입니다. 이제 디스코드 봇을 만들어 볼 겁니다

서버 완성했으면 왼쪽 사이드바에 서버가 나와있을 겁니다. 서버에 들어간 후

![img](https://blog.kakaocdn.net/dn/3zaes/btrR35OQex0/zAsGfctkcKBwAYjpminXPK/img.png)

위에 노란색 동그라미에 있는 채널 편집을 눌러줍니다.![img](https://blog.kakaocdn.net/dn/Q8ij6/btrR1f6yrHF/UGguTuQiaXwBKy0HEfFaj0/img.png)

위에 사진대로 노란색 네모 "연동" 클릭 후 오른쪽 노란색 동그라미 웹후크 만들기를 클릭해줍니다

![img](https://blog.kakaocdn.net/dn/rnyYi/btrR2EY59tm/uthkNRkhfmHyb2CAVpJ4bK/img.png)웹후크 URL 복사를 누르시면 주소가 복사됩니다. 

 

인터넷 주소처럼 URL 주소가 복사가 될 텐데 이것을 잘 복사해서 보관해두겠습니다.

저는 메모장에 복사해두었습니다.

![img](https://blog.kakaocdn.net/dn/dLyaDm/btrRY36COyL/lm8o2KKjcm6MLKpIckgdyK/img.png)

저는 모자이크 처리를 해두어서 주소가 안 보이지만 앞에 #[https://discord.com/api/webhooks/형태로 나오면 성공입니다.](https://discord.com/api/webhooks)

이 주소를 잊어버려도 괜찮습니다. 다시 들어가서 복사하면 됩니다. * 웹후크 주소는 새로 만들지 않는 이상 똑같습니다.

 

여기까지 완료하시면 2단계 성공입니다. 다음 3단계 파이썬으로 넘어가겠습니다. 

### 3. Python 파이썬으로 디스코드 (Discord) 메세지 보내기

우선 파이썬을 실행합니다.

( 파이썬을 개인적으로 준비하고 오셔야 합니다. 저는 파이참Pycharm을 사용했습니다.

추후에 파이썬 강의 올리겠습니다.)

 

파이썬으로 웹후크를 통해 메시지를 보내는 소스코드입니다. 

```python
import datetime
import requests
```

우선 datetime과 requests를 import임포트 해서 가져옵니다. 

datetime은 날짜를 알려주는 기능을 하고

requests 란 파이썬으로 웹 HTTP 라이브러리입니다. 특정 웹 사이트에 요청을 보내서 각종 데이터를 받는 역할을 합니다. 

```python
discord_url = "여기 주소창 전부를 저장한 메모장이나 복사한 url을 붙어넣기 합니다."
#디스코드 채널로 메세지 전송
def discord_send_message(text):
    now = datetime.datetime.now()
    message = {"content": f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] {str(text)}"}
    requests.post(discord_url, data=message)
    print(message)
    
discord_send_message("입력할 메세지")
```

discord_url 변수 부분에 디스코드 웹후크 주소를 붙어 넣기 합니다. 

 

discord_send_message() 함수를 실행시키면

현재 시간을 나타내는 datetime.datetime.now() 함수가 실행되고 

message = 현재시간 + 입력할 메세지가 디스코드로 전송됩니다. 

 

discord_send_message("보내고 싶은 메세지 내용")

```
discord_send_message("안녕")
```

이 함수를 실행시키면 

![img](https://blog.kakaocdn.net/dn/bmkVfO/btrR2RKEEYg/KUYUv4ThNAY3qol5kAMvuk/img.png)

결과가 나옵니다.

현재 시간과 함께 입력한 메세지가 출력되고 디스코드를 확인하면.![img](https://blog.kakaocdn.net/dn/naTri/btrR2rsaA7a/d0SCaewQBaxH1kQLnNHFf1/img.png)

### 디스코드 봇이 작동하면 3단계 완료입니다.  

파이썬을 통한 디스코드 작동을 알아보았는데요 
이 소스 코드를 통해 많은 것을 메시지로 받아 볼 수 있습니다.  
