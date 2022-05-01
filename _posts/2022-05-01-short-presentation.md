---
published: true
title:  "내 로컬 PC 외부에 공유하기"
excerpt: "발표용으로 localhost를 외부에 공유하기"

categories:
- Tool
tags:
- ngrok
last_modified_at: 2022-05-01
---

발표를 위해 localhost를 공유용 링크로 전달해야 했는데, 구글링한 결과로 `ngrok`과 `localtunnel`에 대해 알게 되었다. 둘 다 로컬 PC를 외부에 공유할 수 있는 수단으로 이용되는 듯 했다. 

localtunnel의 경우 윈도우 환경에서 사용하기 쉽지 않은 듯해서 ngrok을 사용하게 되었다. ngrok의 무료버전을 사용하면 1분당 40개 커넥션만 받을 수 있고, 최대 1개의 ngrok만 실행시킬 수 있지만, 간단한 발표용으로 사용하려 했기 때문에 무료 버전 ngrok을 사용했다.

<br>

아래는 ngrok으로 로컬 pc를 외부에 공유하는 방법이다. (당연히 localhost에 서버가 돌아가고 있어야 한다.)
1. ngrok 공식 사이트에서 계정을 만들고, ngrok을 다운로드 한다. 
2. 압출폴더를 열고, ngrok이 위치한 폴더로 이동해서 `./ngrok authtoken [개인 token]` 를 입력해 내 계정과 연결한다. 
3. `./ngrok http [내 서버가 위치한 포트넘버]` (장고의 경우 localhost:8000)
4. 제공받은 public URL 사용!

<br>

더 좋은 방법이 있을 때 글을 추가할 예정이다!

- [노마드코더 ngrok](https://www.youtube.com/watch?v=0lUJvVqSEkY)