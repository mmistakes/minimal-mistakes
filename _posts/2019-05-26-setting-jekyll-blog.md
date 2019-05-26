---
title: "개인 로컬환경에서 GitHub Blog With jekyll 세팅하기"
date: 2019-05-26
categories: setting
comments: true
---


깃헙 블로그 셋팅 방법에는 여러가지가 있습니다.

1. [jekyll remote theme](https://github.com/benbalter/jekyll-remote-theme) 방법
2. jekyll theme repo를 fork해서 사용하는 방법

기본 세팅이 끝나면 포스트 쓰기 혹은 커스텀마이징을 시작할텐데,

만약 로컬환경에 jekyll을 세팅하지 않는다면?

자신의 github blog repo에 파일을 push하고 확인하고 또 반영하는데 시간이 걸리므로 작업속도가 느려질 수 있습니다. (**경험담**)

<u>위 문제를 해결하기 위해서</u> 개인 로컬환경에서 github blog를 띄울 필요가 있습니다.

수정사항을 실시간으로 확인하기 위해 개인 로컬환경에 jekyll를 설치해봅시다.

---

# Window10 환경
### 설치 방법

- [Ruby Installer for Windows](https://rubyinstaller.org/downloads/)에서 개인환경에 맞는 DEVKIT 다운로드 후 설치
- 설치된 'Start Command Prompt with Ruby' 실행
- ```$ gem install bundler jekyll``` 명령어 실행
- github blog저장소 위치로 이동
    - (2)번에서 실행한 command창에서 github blog 저장소로 이동해도됨
    - 아래 그림과 같이 저장소로 이동 후, command창 실행해도됨

![예제1]({{ "/assets/images/20190526/example1.gif"}})

- ```$ jekyll serve -w``` 명령어 실행
    - -w: 실시간으로 변경사항 감지해서 재반영함
- 아래 그림과 같이 **Server address**에서 해당 주소로 접속

![예제2]({{ "/assets/images/20190526/example2.PNG"}})

##### 참고
Could not find gem 'rake(~> 10.0) x64-mingw32' in any of the gem sources listed in your Gemfile. 오류가 발생한다면? 

```$ bundle update```명령어 실행



