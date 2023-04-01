---
layout: single
title: "ruby no such file or directory 오류 해결 : rbenv 설치방법"
categories: [Error, Download]
tag: [it, coding, error, ruby, rbenv, bundle]
toc: true
---

오류 해결 내용 

ruby no such file or directory,

이건 루비 설치하면 해결완료
ruby 해결방법 rbenv 설치방법 
깃헙 주소 :https://github.com/rbenv/rbenv#how-rbenv-hooks-into-your-shell


# rbenv로 앱의 루비 환경을 원활하게 관리하세요.

rbenv는 유닉스 계열 시스템에서 루비 프로그래밍 언어를 위한 버전 관리자 도구입니다.
동일한 컴퓨터에서 여러 루비 버전 간에 전환하고 작업 중인 각 프로젝트가 항상 올바른 루비 버전에서 실행되도록 하는 데 유용합니다.


## rbenv 설치

### Page manager 설치, 패키지 관리자 사용하기
다음 방법 중 하나를 사용하여 rbenv를 설치하세요.

macOS 또는 Linux에서는 Homebrew로 rbenv를 설치하는 것이 좋습니다.
```
brew install rbenv ruby-build
```
macOS에서는 Homebrew로 rbenv를 설치하는 것이 좋습니다.

Ubunto(우분투) 설치 방법 | 최신 버전을 설치하려면, git을 사용하여 rbenv를 설치하는 것이 좋습니다.
```
sudo apt install rbenv
```

### rbenv 설치 확인하기
rbenv가 정상적으로 설치되었는지 확인하려면 다음 명령어를 실행하세요.
```
rbenv -v
```

### rbenv 초기화
rbenv를 사용하려면, 쉘을 다시 시작해야 합니다. 다음 명령어를 실행하여 쉘을 다시 시작하세요.
```
exec $SHELL
```

### rbenv 버전 설치하기
rbenv를 사용하려면, 먼저 루비 버전을 설치해야 합니다. 다음 명령어를 실행하여 루비 버전을 설치하세요.
```
rbenv install -l
rbenv install -L

#버전을 입력하세요 뒤에 숫자에 
rbenv install 2.7.2
```

### rbenv 루비 버전 설정하기
설치한 루비 버전을 사용하려면, 다음 명령어를 실행하여 루비 버전을 설정하세요.
```
rbenv global 2.7.2

rbenv local 2.7.2
```
저는 global을 선호합니다. 이렇게 하면, 모든 프로젝트에서 루비 버전을 전환할 필요가 없습니다.

### rbenv gem install 루비 보석 설치하기'
```
gem install bundler

gem env home
```


