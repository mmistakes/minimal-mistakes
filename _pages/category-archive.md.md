---
tiile: "Category"
layout: categories
permalink: /categories/
author_profile: true
sidebar_main: true
---
### 블로그를 확인하려고 서버를 실행 시켰는데 오류가 나타났다.

![GitHub-blog-14](../images/2024-03-08-GitHub-blog-3st/GitHub-blog-14.png)

- 의존성 에러라고 하는데 가이드를 다시 살펴 보면서 빠트린 게 있는지 확인했다.

```
gem install jekyll-archives
bundle install
gem install bundler
```

- tzinfo 파일과 tzinfo-data이 없는 것 같아서 따로 설치를 해봤다.

```
gem install tzinfo
gem install tzinfo-data
```

- 결과는 같았다.

- 인터넷에 찾아보니 Gemfile을 열어서 두 줄의 코드를 작성하여 저장시키면 된다고 한다
```
gem 'tzinfo'
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby] 
```

- 실행 결과 잘 실행 된다.

Jekyll을 이용하여 만든 github 블로그를 로컬에서 실행시 발생한 오류인데
이 오류의 경우 처음 블로그 세팅할 때 (jekyll new ~ 등의 명령어로 초기화 할 때) 넣지 않은 플러그인을 후에 _config.yml 파일에 추가함으로써 생기는 오류이다.