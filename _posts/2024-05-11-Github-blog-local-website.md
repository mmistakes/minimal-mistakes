---
layout: single
title: Github blog local website check
categories:
  - coding
---
# 깃허브 블로그 세팅하기 - 로컬 웹페이지 생성

깃허브 블로그를 수정하면서 매번 페이지가 업데이트 되기까지의 과정을 줄이기 위해서.
_ 유튜브 TedyNote [Ep03. 업데이트 내역을 실시간 확인하기](https://youtu.be/0TeHUqSAb6Q?si=AUQN-NaGH8VTUjdu) 참고_


### 1. 필요한 프로그램들 설치하기(Ruby 등)
[필요 설치파일 및 안내](https://jekyllrb.com/docs/)
설치할 것들을 모두 설치한 뒤, 블로그 폴더에 터미널을 열고
```terminal
bundle install
```
실행. 
```terminal
bundle exec jekyll serve
```

오류 발생시
```
bundle add webrick
```
->
다시 실행 / 서버 구동
```terminal
bundle exec jekyll serve
```

#### 짜란~! 실시간으로 블로그 웹사이트 수정내용 확인가능
