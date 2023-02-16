---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 2. 로컬작업환경 설정(Gem::FilePermissionError)'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True   # 좌측 프로필 여부
---
## 에러발생
- Github Pages는 ruby라는 언어로 관리가 된다고 한다.
- 하지만 기존의 맥에 설치되어 있는 ruby 2.6.0은 문제를 일으켜서 다음과 같은 에러를 일으킨다. 
```
$ gem install bundler
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.3.0 directory.
```

- 이를 해결하기 위해 rbenv를 설치하면 되는데 다음 순서를 따라가면 된다.(가장 많은 시간을 잡아먹은 부분)

## rbenv 설처 
- [Homebrew(링크)](https://brew.sh/index_ko) 또한 ruby를 사용하기 때문에 이를 통해 설치가 가능하다고한다. 설치가 안되어있다면 링크로 이동해서 다운먼저 받으면 된다.

```
$ brew update
$ brew install rbenv ruby-build

# 설치 확인
$ rbenv versions

# 아래의 형태로 나오면 system ruby 사용중인것
* system (set by /Users/...
```

- 가장 최근의 ruby 버전을 설치한다.
- 에러가 나면 하나 아래 단계로 설치한다.

```
# 설치가능한 ruby 버전 출력
$ rbenv install -l

# 버전을 입력하여 루비 설치
$ rbenv install 3.2.0
```

- 설치한 루비 버전을 global로 설정하고 버전을 확인한다.

```
$ rbenv global 3.2.0

# 버전확인
$ rbenv versions

# 결과
  system
* 3.2.0 (set by /Users/andonghyeon/.rbenv/version)
```

- 마지막으로 본인의 쉘 설정 파일 (..zshrc, .bashrc) 을 열어 rbenv PATH를 추가한다.

```
# 방법1 (for zsh users)

## 쉘 설정 파일 열기
$ vim ~/.zshrc
## 추가할 코드
$ export PATH="$HOME/.rbenv/bin:$PATH"
$ eval "$(rbenv init -)"
## 수정 완료 했으면 :wq 입력으로 페이지에서 나오고 다음 코드로 적용
$ source ~/.zshrc
```

```
# 방법2 (zsh와 bash 유저에 따라 다르게 적용)

## for zsh users
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(rbenv init -)"' >> ~/.zshrc
$ source ~/.zshrc

## for bash users
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
$ source ~/.bashrc
$ type rbenv
```

## Jekyll 과 bundler 설치
- 이 두개 설치하려고 앞의 에러와 씨름한 것이다.

```
# 설치
gem install jekyll bundler

# 버전확인
jekyll -v
# 결과
jekyll 4.3.2
```

## 로컬에서 실행
- [Visual Studio Code (링크)](https://code.visualstudio.com)를 설치한다 
- Repository와 연결된 폴더로 이동해서 터미널 실행후 아래 명령어 입력

```
bundle exec jekyll serve
```
- 하지만 여기서 또 에러가 날 수 있는데

```
Could not find compatible versions

Because every version of minimal-mistakes-jekyll depends on jekyll-include-cache ~> 0.1
  and jekyll-include-cache ~> 0.1 could not be found in locally installed gems,
  minimal-mistakes-jekyll cannot be used.
So, because Gemfile depends on minimal-mistakes-jekyll >= 0,
  version solving has failed.
```
- 다음과 같은 에러가 난다면 <span style="background-color:#C0FFFF"> Gemfile.lock </span> 파일을 찾아서 삭제후(Homebrew 폴더 안에 있었음) 다시 bundle install 명령어를 터미널에서 실행 해주면 된다

- 드디어 [http://127.0.0.1:4000](http://127.0.0.1:4000) 에서 로컬 수정 사항을 바로 확인할 수 있다.
- **_config.yml 같은 파일은 단순 저장으로 반영되지 않으므로 로컬에서 결과를 확인하고 싶다면 수정 후 서버를 껐다 켜야한다**

