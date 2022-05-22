---
layout: single
title:  Github_blog_Category 수정하기
categories: 04_gitgithub
tag: [github, blog, jekyll, liquid, category ]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

## 1.Category 수정하기

Ruby를 다운받고, jekyll을 설치했고, jekyll theme도 fork해서 받았는데 .yml file만 수정하는 걸로도 github blog가 생성됐지만 category를 추가하고 수정하려는 등 customizing 하려니까 그 구조가 도저히 이해가 안됐다. 며칠을 _config.yml file을 수정해보고 다른 .yml file을 수정했는데도 그 구조가 눈에 들어오지 않았다. 그래서 검색을 해봤고 결국은 template language인 liquid를 알아야 한다는걸 알았다. liquid에 대해서 조금 공부했고 다른 programming 언어에 비해서 크게 다르지 않다는걸 알았다. category를 수정하는데 어떻게 하는지 posting 해보겠다. 본인의 jekyll theme는 가장 유명한 minimal mistake( [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#installing-the-theme](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#installing-the-theme) )를 참고했다. 각 theme마다 그 구조는 살짝 다르지만 크게 다르지 않아서 혹시나 다른 theme을 사용하는 user도 이 posting이 도움이 될 수 있겠다. 

1> config.yml file에 전체적인 configuration을 잡아준다. 아래처럼 include: 아래의 부분은 프로그램이 돌면서 보여준다. 아래에서는 _pages를 보여준다. _pages folder에 [category-archive.md](http://category-archive.md) 파일이 있는데 이 file을 읽는다. 여기서 지정된 path로 들어가서 html file을 보여준다. _layout 폴더가 웹이 보여지는 html 거기서 categories를 보여주는 것이다.

<img src = "/assets/img/bongs/220522/Untitled.png">

<img src = "/assets/img/bongs/220522/Untitled%201.png">

2> _pages 폴더에 category-archive.md를 추가해준다. 

<img src = "/assets/img/bongs/220522/Untitled%202.png">

3> 이제 categories file을 열어 수정을 하면 된다. 기존 html과 liquid 문법이 공존한다. 그래서 liquid에 대해서 기본적인 부분은 공부를 해야 한다.

<img src = "/assets/img/bongs/220522/Untitled%203.png">

## 2. navigation.yml 파일(posting 글 옆의 category)) 수정하기

내가 posting하는 글 옆에 빠르게 category로 접근할 수 있도록 하는 부분을 만들었다. 이걸 수정하는 방법에 대해서 간략하게 설명하고자 한다. 

1> 우선 navigation.yml에 필요한 부분들을 아래처럼 넣어준다. 본인은 크게 “Computer Programming”과 “Life”를 추가했고 그 하위로 각각 “01_database”, “02_python”등을 추가했다. 추가만 하고 돌리면 navigation category가 보였지만 클릭하면 원하는 곳으로 갈 수 있도록 url을 만들어주고 지정해줘야 한다. 

<img src = "/assets/img/bongs/220522/Untitled%204.png">

2> url의 path를 지정해주기 위해서 _pages folder에 가서 .md file을 만든다. 나는 category-archive_01_db.md로 만들었다. 아래같이 하면 화면을 보여줄 때 _layouts folder로 들어가서 특정 html file을 보여주는데 그 파일의 이름을 categories_from_01_db로 만들어주면 되고, url을 쓸 때는 //categories_from_01_db// 이렇게 넣어주면 된다. 

<img src = "/assets/img/bongs/220522/Untitled%205.png">

3> html file을 수정해주면 된다.  나의 경우엔 아래처럼 브이 표시된 부분만 수정해서 이 html에서는 01_database category만 나타내도록 하였다.

<img src = "/assets/img/bongs/220522/Untitled%206.png">

4> 최종 결과는 아래와 같다. 아직 하나밖에 없지만 database category에 해당하는 글만 보이게 된다. 

<img src = "/assets/img/bongs/220522/Untitled%207.png">
 
