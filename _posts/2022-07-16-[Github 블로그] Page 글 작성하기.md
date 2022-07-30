---
layout: single
title:  "[Github 블로그] Page 글 작성하기"
categories:
  - Github Pages
tags: [blog, github]
toc: true
toc_sticky: true
header:
  image: /assets/images/yancy-min-842ofHC6MaI-unsplash.jpg
  overlay_image: /assets/images/yancy-min-842ofHC6MaI-unsplash.jpg
  overlay_filter: 0.6
  caption: "Photo credit: [**Unsplash**](https://unsplash.com/photos/842ofHC6MaI)"
---
💡 오늘은 Page 글 작성 방법을 알아보겠습니다.

이번 시간에는 지킬 블로그 기본 글 작성 타입 중 하나인 page 글을 작성해볼 것이다.

지킬에서의 게시물은 크게 post와 page로 두가지 형태로 지원된다.

블로그 post는 _posts 폴더에 위치한다. _posts 폴더에 속한 post들은 날짜를 기반으로 파일명이 작성되고 일반적으로 생각하는 블로그 글이라고 생각하면 좋다. 

page는 사이트 내 특정 주소에 보여줄 (날짜와 관련없는) 글을 작성할때 사용된다. 예를 들면 블로그 혹은 작가 소개 페이지나 사이트맵 등이 여기 해당된다.

그럼 블로그 소개글인 About과 주소 오류 페이지인 404 page를 등록해보겠다.


## 1. page 글 등록하기
minimal-mistakes theme 초기 상태에는 _pages 폴더가 존재하지 않는다. _pages 폴더를 만들고 예제에서 사용된 about.md와 404.md 파일을 복사해서 등록해준다. page는 파일명에 날짜 포맷을 표기하지 않아도 된다.


## 2. About page 등록하기
```ruby
---
title: "블로그 소개"
permalink: /about/
layout: single
---

## 모리의 블로그

이 블로그는 github.io를 이용한 블로그를 제작하는 목적으로 만들어졌습니다.
추후 블로그 제작 과정을 게시하거나 공부한 내용을 정리하여 다른 사람들에게 공유하는 것을 목표로 하고 있습니다.
```
이 블로그에서 만든 about.md 파일이다. YFM에서 제목과 permalink, layout 정도를 설정하였다.

permalink은 About 페이지를 주소에 표시하기 위한 설정이다. 홈페이지의 베이스 주소+permalink 해당 페이지의 주소가 된다.

즉, 현재 블로그의 About 페이지의 주소는 https://jinsookim97.github.io/about/ 가 된다.


layout은 이 페이지를 어떤 형태로 보여줄지를 미리 꾸며놓은 포맷이다. _layouts 폴더에 가면 여러가지 이름의 layout 파일들을 볼 수 있다. page는 layout을 single로 지정하는 것이 기본 설정이다. layout은 single을 사용하면 결국은 default.html을 include하는 형태로 되어있다.


## 3. 404 page 등록하기
```ruby
---
title: "Page Not Found"
excerpt: "Page not found. Your pixels are in another canvas."
sitemap: false
permalink: /404.html
---

Sorry, but the page you were trying to view does not exist.
```

404 page는 test/_pages 폴더 내 404.md 파일이 있을 것이다. test/_pages 폴더 내의 파일을 복사하여 내용을 일부 수정하였다.

GitHub Pages에서 404.html 페이지는 주소를 찾을 수 없을때 기본으로 보여주는 페이지이다.

블로그 내에서 정의되지 않은 주소로 접속을 시도하면 GitHub Pages는 기본 Not Found 페이지를 보여주게 되는데, 블로그에 404.html 주소를 등록해두면 GitHub Pages는 기본 Not Found 페이지가 아닌 블로그에서 등록한 404.html 페이지를 보여준다.

이렇게 page 글을 사용하면 블로그의 필요한 구성 페이지를 마음대로 만들 수 있다.


출처: https://devinlife.com/howto%20github%20pages/new-pages/