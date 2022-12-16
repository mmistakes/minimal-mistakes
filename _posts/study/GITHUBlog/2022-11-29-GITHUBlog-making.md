---
Layout: post
title: "좌충우돌 GITHUB로 블로그 만들기"
excerpt: "GITHUB을 이용한 블로그를 만들고 포스팅하기까지의 험난한(?) 과정을 대충 적어보았다."
categories: GITHublog
date: 2022-11-29
---

GIT이고 GITHUB고 어떻게 쓰는지 모르는 상태에서 일단 블로그를 만들어 보기로 했는데...  
마크다운 언어는 또 뭐야.. 어디선가 들어본거는 같은데.. 전혀 모르겠다  
  
그래서 남의 블로그 글을 그대로 따라해 보기로 했다.  

# step 1. 블로그 포크해오기

https://comeinsidebox.com/create-a-blog-on-github/  
위 글을 따라 깃허브 계정을 만들고, 리포지토리를 만들고  
mmistakes라는 테마를 포크해서 일단 블로그의 구색을 갖췄다(??)  
jekyll이 뭔지도 몰라서 일단 그냥 냅다 들고 옴.  

# step 2. 게시글 싸기
  
## 일단 포스트를 써 보자
  
위의 포크 설명글에도 어느정도 포스팅에 대한 설명은 있지만,   
실제로는 이 글을 싸지를 때는 다음 글을 많이 참고했다.  
[ansohxxn.github.io](https://ansohxxn.github.io/blog/posting/#1-markdown-%EC%9D%84-%EC%A7%80%EC%9B%90%ED%95%98%EB%8A%94-%EC%97%90%EB%94%94%ED%84%B0%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%9C%EB%8B%A4)  
게시글은 리포지토리의 _post 폴더에 YY-MM-DD-Title.MD 형식으로 작성해야 한다.  
처음에는 _post 폴더가 없다 보니 윈도우에서처럼 빈 폴더를 만들고 파일을 생성하려고 했는데  
빈 폴더를 만드는 방법도 찾을 수가 없었다...  
알고보니 그냥 파일명 입력할 때 슬래시 집어넣으면 자동으로 해당 폴더로 정리가 되는듯.  
빈 폴더는 만들 수가 없다!?  
  
그리고 게시글을 쓰고 나니 Front matter가 안먹는다. 다른것보다 excerpt(요약문)은 가급적 수기로 쓰고싶은데...   
그래서 처음 글을 쓸 때는 타이틀/카테고리/날짜 3가지만 남겨보았다.  
  
## excerpt(요약문) 작성이 왜 안되는지?
  
[xho95.github.io](https://xho95.github.io/blog/jekyll/markdown/post/kramdown/2016/01/12/Post-a-new-MarkDown-file.html)  
[https://jekyllrb.com](https://jekyllrb.com/docs/posts/#post-excerpts)  
[https://mmistakes.github.io](https://mmistakes.github.io/so-simple-theme/tags/#excerpt)  
위의 두 글과 한 페이지를 참고해서 front matter에 post.excerpt 항목을 추가해 보았는데... 실패  
post.excerpt 변수 (또는 page.excerpt) 는 요약문을 작성하는게 아니라
다른 페이지(예를 들어, 포스트 목록) 에서 요약문을 읽어오는데 사용되는 변수인 듯 하다.  
  
그리고 이거저거 만지는 중에...  얼라...? 갑자기 요약문이 입력되었다.  
```
Layout: post
title: "깃헙 블로그 포스팅 테스트"
excerpt: "발췌문 내용"
categories: 카테고리명
date: 2022-11-29
```
이런 식으로 작성했는데 갑자기 입력이 되어버렸다. 안되던게 되니까 왜 되는지를 몰라서 답답하네...

## 마크다운?

[inpa.tistory.com](https://inpa.tistory.com/entry/MarkDown-%F0%9F%93%9A-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EB%AC%B8%EB%B2%95-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC)

# step 3. 환경 설정하기

## 테마 적용하기

_config.yml 파일의 15행에 있는 minimal_mistakes_skin 항목을 바꿔주면 색상 테마를 적용할 수 있음.
[https://junhobaik.github.io/](https://junhobaik.github.io/jekyll-apply-theme/)

## 레이아웃

[ansohxxn.github.io ; mmistakes 테마 디렉토리 구조](https://ansohxxn.github.io/blog/jekyll-directory-structure/)
위 글을 참고해서 레이아웃 수정중.  
data\ui-text.yml에서 toc의 라벨? 을 on this page -> Index / 목차 로 수정하고  
data\navigation.yml에서 전부 주석처리  
_config.yml에서 breadcrumps -> true, comment provider -> facebook, search -> true  
등등...

사이드바 내용 날리는게 어려웠다. 코딩의 코도 모르는 바보...
_includes/author-profile.html 파일에서 3군데를 주석처리했다.
```
<div itemscope itemtype="https://schema.org/Person" class="h-card">
{% raw %}
  <!-- 여기랑
  {% if author.avatar %}
    <div class="author__avatar"> 
    ....
  {% endif %}
  -->
  
  <!-- 여기
  <div class="author__content">
    <h3 class="author__name p-name" itemprop="name">
    ....
    {% if author.bio %}
    ...
    {% endif %}
  </div>
  주석2-->
    
    
  <div class="author__urls-wrapper">
    <button class="btn btn--inverse">{{ site.data.ui-text[site.locale].follow_label | remove: ":" | default: "Follow" }}</button>
    <ul class="author__urls social-icons">
      <!--마지막으로 여기!!! 를 주석처리
      {% if author.location %}
        <li itemprop="homeLocation" itemscope itemtype="https://schema.org/Place">
          <i class="fas fa-fw fa-map-marker-alt" aria-hidden="true"></i> <span itemprop="name" class="p-locality">{{ author.location }}</span>
        </li>
      {% endif %}
      -->
      
      ... 이하생략
{% endraw %}
        
```
  
포스트 상에서는 사이드바가 나타나는데  
다른데서는 사이드바가 안보인다.  
nav_list를 수정해야 하나보다

## 사이드바에 카테고리 넣기

[https://devyurim.github.io](https://devyurim.github.io/development%20environment/github%20blog/2018/08/07/blog-6.html)
[https://ansohxxn.github.io](https://ansohxxn.github.io/blog/category/)
[https://x2info.github.io](https://x2info.github.io/minimal-mistakes/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC_%EB%A7%8C%EB%93%A4%EA%B8%B0/)


카테고리별로 페이지를 만들고
네비게이션에 각 카테고리별로 페이지로 가는 링크를 추가하고
config.yml에 사이드바를 등록하는 순서인듯?


### 카테고리별 페이지 만들기

_pages 폴더에 category-[category name].md 형태로 파일을 만들고 내용은
```
---
title: "제목"
layout: archive
permalink: /[카테고리 주소 (영문)]
---

{% raw %}
  {% assign posts = site.categories.[카테고리 주소 (영문)] %}
  {% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endraw %}  
```
일단 이렇게 해 놨다...  
  
근데 게시글에 나오는 카테고리 페이지를 클릭하니 categories/#[category name] 형식이라 이것도 수정이 필요할 듯 하다

### 네비게이션 수정

_data/navigation.yml 파일에서 기존 항목 전부 주석처리하고
```
    main:
    <!--
    주석처리...
    -->
    sidebar-category:
      - title: "categories"
        children:
          - title: "[카테고리1]"
            url: "/[카테고리1 주소]
          - title: "[카테고리2]"
            url: "/[카테고리2 주소]"
```


### config 수정
config.yml의 마지막에 아래 코드 추가
```
      sidebar:          #사이드바
        nav: "sidebar-category"   #사이드바에 내비 추가
```

## 폰트 크기 수정

[https://evenharder.github.io](https://evenharder.github.io/blog/jekyll-change-fonts/)  
위 블로그 글에 따라 assets/css/main.scss 파일을 수정.

## 에디터와 모바일 환경

[StackEdit](https://stackedit.io/app#)


# 기타 참고할 페이지들

[https://www.wonseoko.com/jekyll/minimal-mistakes/]
[https://namhoon.kim/2017/03/20/jekyll/009/index.html]
