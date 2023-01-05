# 윤건우의 블로그

## 실행
윈도우 사용자를 위한 간략한 설치를 소개합니다.

- 필수 사항
  - [VS2022](https://visualstudio.microsoft.com/)
    - 'C++'을 반드시 설치해주세요.
  - [scoop](https://scoop.sh/)
    - [윈도우 사용자를 위한 개발 환경 구성 #1](https://youtu.be/Z6YJfCzUZJE)을 참고하세요.

### Step 1 - 블로그 템플릿을 Fork 하세요.
- [alembic](https://github.com/daviddarnes/alembic)에 가셔서 `fork`하세요.
- `fork` 이후에 자신의 저장소를 `clone` 하세요.


```
$ git clone https://github.com/Yoongunwo/Yoongunwo.github.io.git
$ cd Yoongunwo.github.io.git
```

### Step 2 - Ruby 2.7 버전 설치

```
$ scoop bucket add extras
$ scoop bucket add versions
$ scoop update
$ scoop search ruby
$ scoop install ruby26
$ scoop install msys2
$ ridk install
```

### Step 3 - Jekyll 설치
```
(Yoongunwo.github.io.git) $ gem install bundler:2.1.4
(Yoongunwo.github.io.git) $ bundle install
```

### Step 4 - Local에서 실행
```
(Yoongunwo.github.io.git) $ bundle exec jekyll serve
...
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.

```



## Ref.
해당 블로그는 [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/)에서 확인하실 수 있습니다. \
[저장소](https://github.com/mmistakes/minimal-mistakes)에서 코드를 확인하실 수 있습니다.

