---
categories: "git"
---

# 문제 직면

그저 강의 내용만 올리던 블로그에서 벗어나 중요한 코드 리뷰나 이슈 해결을 하려고 했는데... 올리다 보니 다음과 같은 에러가 발생했습니다. 

해당 에러는 git repository 의 action 탭에서 확인했습니다. 

`Warning:  github-pages can't satisfy your Gemfile's dependencies.`

검색해보니 결국 문제는 **"jekyll 버전"** 이었습니다. 

다시 git 블로그 만져보겠다고 local 에서 블로그 실행을 위해 ruby 를 받았는데 버전이 4.2.2 인가 그랬습니다. 그런데 git 에서 지원되는 버전은 **3.9.3 까지** 였던 겁니다.

 [깃허브에서 지원되는 githubPage Dependency versions 확인하기](https://pages.github.com/versions/ )

# jekyll 버전 확인

먼저 자신의 jekyll 버전은 github.io 폴더의 Gemfile.lock 에서 확인할 수 있습니다.

![image-20230411191451254](../../images/2023-04-09-gitblog 에러(jemfile 에러)/image-20230411191451254.png)
사실 처음에는 jekyll 버전이 다른지도 모르고 지원되는 dependency version 과 Gemfile.lock 을 비교할 뻔했으나... 기적적으로 맷돌이 돌아간 덕분에 chatGPT 에  dependency version 과 Gemfile.lock 를 복붙해서 version 이 초과되는 부분을 알려달라고 했습니다. 

덕분에 jekyll 버전이 4.2.2 인걸 확인했습니다.

**포스팅 잘 되다가 왜 버전이 올라갔나?**

사실 당일 오전까지만 하더라도 포스팅을 잘 했는데 중간에 로컬서버에서 블로그를 확인하겠다고 업그레이드된 ruby 를 다운로드 받은게  화근이었습니다. 다운로드 받고 새로 `bundle install` 을 실행하면서 jekyll 버전이 전역적으로 변경되지 않았나 싶습니다. (추측입니다 ㅎ)

어쨋든 1시간 정도 고생했는데 해결되어서 저녁 맛있게 먹었습니다 ^^ 

# 버전 수정

## Gemfile.lock 삭제

`Gemfile.lock`  파일을 직접 수정하는 것은 권장되는 방법이 아닙니다. 대신 `Gemfile`에서 의존성 버전을 수정한 후, `bundle update` 명령을 실행하여 `Gemfile.lock` 파일을 자동으로 업데이트하는 것이 좋습니다.

그러기 위해서 먼저 Gemfile.lock  을 과감히 삭제합니다. (새가슴인 저는 잘못되면 백업하려고 따로 저장해놨습니다.)

## Gemfile 의존성 수정

### Gemfile  의존성 최종

- ```ruby
  source 'https://rubygems.org'
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
  gem 'webrick'
  gem "jekyll", "~> 3.9.3" # 깃 허브 페이지의 default 버전
  gem 'github-pages', group: :jekyll_plugins
  
  
  group :jekyll_plugins do
    gem 'jekyll-feed'
    gem 'jekyll-sitemap'
    gem 'jekyll-seo-tag'
  end
  ```

### 의존성 수정 설명

루트 폴더에 있는 `Gemfile`에서 `jekyll` 의존성을 추가해야 합니다. `gem "jekyll", "~> 3.9.3"`

하지만 이것만 추가하고 실행해보니 여러가지 에러가 떴는데...

- ` Error:  No source of timezone data could be found.` : 해당 에러는 tzinfo 라이브러리가 시간대 데이터를 찾을 수 없을 때 발생합니다. 
  - 해결방안 : `Gemfile`에서 의존성 추가 `gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]`
- `cannot load such file -- webrick (LoadError)` : `webrick`이 로드되지 않았음을 나타냅니다.
  - 해결방안 : `Gemfile`에서 의존성 추가 `gem 'webrick'`
  - webrick 는 아까 설치했다고 생각했는데 `.lock` 파일을 삭제하면서 없어진 것 같습니다.

*나머지 의존성 코드들은 사실 chatGPT 가 처음에 `gem "jekyll", "~> 3.9.3"` 코드와 같이 적어준거라 어떤 역할인지는 모르지만 복붙했습니다.* 

중요한거 아니면 깃블로그 쓰는데 저것까지 연구할 필요도 없구요... (chatGPT 가 저보단 똑똑하겠죠) 제 생각에는 Gemfile 코드 중 위에 4줄만 있어도 동작할 거 같습니다. (추측입니다.)



## Gemfile 종속성 설치 및 로컬 테스트

powershell 을 통해 루트폴더로 와서 `bundle install` 을 실행합니다. Gemfile 이 있는 곳이 루트폴더입니다.

저 같은 경우에는 `C:\Users\kimhobeen\desktop\hobeen-kim.github.io> bundle install` 입니다.

이후 `bundle exec jekyll serve` 명령로 로컬 실행을 할 수도 있습니다. (localhost:4000)

 **문제 해결 완료!**



근데 이 문제를 검색해봐도 해외 몇 건만 보이는건...

저만 바보였나봅니다. 감사합니다. 

