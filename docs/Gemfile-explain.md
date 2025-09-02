# 로컬 개발환경에서 실시간 확인하는 법

## 1. Ruby 설치

- **Ruby** : Jekyll을 실행하는 프로그래밍 언어
- [설치링크] https://rubyinstaller.org/

## 2. Jekyll 설치

- **Jekyll** : Ruby로 개발된 정적 사이트 생성기
- [참고링크] https://jekyllrb.com/docs/
- 시스템 터미널 > `gem install jekyll bundler`

## 3. Jekyll 플러그인 설치

- [참고링크] https://mmistakes.github.io/minimal-mistakes/docs/installation/
- 프로젝트 단위 의존성 관리를 위해 Gemfile + bundler 사용
- Gemfile 파일 > 아래 코드 입력

  ```ruby
  source "https://rubygems.org"
  gem "jekyll"
  gem "minimal-mistakes-jekyll"
  ```

  ```ruby
  # timezone 관련 플러그인
  gem "tzinfo"
  gem "tzinfo-data"
  ```

- 프로젝트 디렉토리 터미널 > `bundle install`

## 4. 서버 실행하기

- 프로젝트 디렉토리 터미널 > `bundle exec jekyll serve`

- (서버를 종료하려면) 프로젝트 디렉토리 터미널 > `ctrl + c`

## If you have any other plugins, put them here!

- https://jekyllrb.com/docs/plugins/installation/
