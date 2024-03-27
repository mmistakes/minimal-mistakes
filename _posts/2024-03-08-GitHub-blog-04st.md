---
layout: single
title: "깃허브(GitHub) 블로그 04 : 의존성 오류 tzinfo"
categories: blog
tags:
  - Github
  - Blog
toc: true
author_profile: false
sidebar:
  - nav: "docs"
---
### 블로그를 확인하려고 서버를 실행 시켰는데 오류가 나타났다.

![GitHub-blog-04st-01]({{site.url}}/images/2024-03-08-GitHub-blog-04st/GitHub-blog-04st-01.png)

의존성 에러라고 하는데 가이드를 다시 살펴 보면서 빠트린 게 있는지 확인했다.

```
gem install jekyll-archives
bundle install
gem install bundler
```

tzinfo 파일과 tzinfo-data이 없는 것 같아서 따로 설치를 해봤다.

```
gem install tzinfo
gem install tzinfo-data
```

결과는 같았다.

인터넷을 찾아보니 Gemfile에 코드 두 줄을 넣으면 된다고 한다.
```
gem 'tzinfo'
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```

Jekyll을 이용하여 만든 github blog를 로컬에서 실행 시 발생하는 오류
이 오류는 처음 블로그 세팅 할 때 (jekyll new ~ 등의 명령어로 초기화 할 때) 넣지 않은 플러그인을 후에 _config.yml 파일에 추가함으로써 생기는 오류이다.

