---
layout: single
title: "깃헙 블로그 로컬 개발환경 설정방법 및 에러 핸들링"
categories: Error-Handling-Logs
tag: [루비, 로컬 개발환경, 에러핸들링, 기록]
toc: true
toc_sticky: true
toc_label: 목차
author_profile: false
sidebar:
  nav: "docs"
---

깃헙 블로그 로컬 개발환경 설정 방법과 그 과정에서 나온 에러 핸들링을 적어두었습니다.

## 개요

어제 들은 깃헙 블로그 강의를 기반으로, macOS에서 로컬 개발환경 설정하는 방법에 대해 올려보려 한다.
시간이 없어 라이브 강의에서 실제로 하는 것을 보지는 못했지만, 유튜브 채널에 영상으로 올라가있었다.
하지만 유튜브 영상은 윈도우를 기반으로 하고 있었고, 댓글들을 보니 맥에서 설치하는 것이 너무 어렵다는 반응들이 많았다.
그래서 영상 + 직접 해본 방법들을 토대로 기록해둔다.

## 루비 설치하기

로컬 환경을 설정해주려면, 몇 가지 설치가 필요한데, 그 중 하나인 루비를 설치하는 방법이다.
먼저, homebrew를 이용하여 설치해준다.
만약 homebrew 설치가 필요하다면

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

해당 명령어로 해주면 된다. [homebrew 링크](https://brew.sh/index_ko)로 들어가면 나온다.

```
brew install rbenv ruby-build
rbenv install -l // 어떤 버전을 설치할 수 있는지 확인할 수 있는 명령어
rbenv install 3.1.3
rbenv global 3.1.3 // rbenv를 사용하여 설치한 버전을 전역으로 설정하는 명령어
rbenv versions // 확인 절차
```

여기까지 잘 되었다.
하지만 문제가 생겼다.

## 에러 핸들링

이제 영상에서 나온대로 gem 명령어를 사용하려 하는데, 에러가 떴다.
<img width="731" alt="스크린샷 2023-02-28 오후 2 51 08" src="https://user-images.githubusercontent.com/91467260/221765884-3352ad6d-164c-4929-befd-8f22373c69ad.png">

읽어보니, 권한이 없어서 그런다는데...해결할 수 있는 방법을 한 번 찾아보기로 했다. 그리고 해결할 수 있었다.

권한이 없으면 권한을 만들어주면 되지!

쉘 설정 파일에 rbenv PATH를 추가해준다. 사용하는 쉘에 따라 달라지는데, bash는 .bashrc, zsh는 .zshrc로 해주면 된다.
나는 zsh라서 .zshrc로 해주었다.

```
touch ~/.zshrc
nano ~/.zshrc
```

상기 명령어들을 터미널에 입력한 후, 하기 내용을 추가해주면 된다.

```
[[ -d ~/.rbenv  ]] && \
  export PATH=${HOME}/.rbenv/bin:${PATH} && \
  eval "$(rbenv init -)"
```

추가하여 저장해주었다면, 설정이 반영될 수 있도록 하기의 source 명령어로 해당 내용을 적용한다.

```
source ~/.zshrc
```

이렇게 한 후 다시 gem install jekyll 명령어를 쳤더니 해결되었다.

## 깃헙 블로그 개발 로컬환경에서 보기

```
jem install bundler
```

상기 명령어를 활용하여 bundler를 설치해 준 후, 프로젝트 폴더 안으로 경로를 이동해준다.
(나의 경우에는 미리 git clone으로 프로젝트 폴더를 github에서 받아와, 그 폴더 안에서 진행했다.)

```
bundle install
bundle exec jekyll serve --livereload
```

여기까지 해주었다면

```
LiveReload address: http://127.0.0.1:35729
  Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

이렇게 나오는 것을 확인할 수 있다. 4000번 포트에 서버가 구동됨을 알 수 있다.
(사실 위에 더 많은 내용들이 나오지만, 로컬에서 확인할 수 있는 주소가 나오는 부분만 가져왔다.)
