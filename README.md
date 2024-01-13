## 🦥 `Minimal Mistakes theme customized by choiiis`

📎 **블로그 바로 가기**
[`https://choiiis.github.io/`](https://choiiis.github.io/)

---

fork 해서 사용하시기 편하게 변경해서 새로 올려봅니다.  
편하게 사용하시고, fork 하실 때 `star` 하나만 눌러주세용 :)

fork 후 설정이 필요한 사항들은 아래 내용을 참고하세요!

### ▪ 블로그 기본 정보 세팅

[_config.yml]

```yml
# plum skin 활용하여 색상 설정함. 변경하려면 _sass/minimal-mistakes/skins/_plum.scss 에서 변경하거나
# 해당 디렉토리 내의 다른 테마로 변경 가능 (minimal-mistakes 기본 제공 테마)
minimal_mistakes_skin: "plum" # "default" "air", "aqua", ...

# Site Settings
locale: "ko-KR" #"en-US"
title: "Blog Name Here" # 상단 헤더에 보이는 블로그 타이틀
title_separator: "&#124;"
subtitle: # site tagline that appears below site title in masthead
name: "your name here" # 블로그 닉네임 설정
description: "OOOOO DevLog" # 블로그 설명
url: "https://github-account.github.io" # 블로그 URL
baseurl: # the subpath of your site, e.g. "/blog"
repository: "github-account/github-account.github.io" # GitHub Repo 이름
# logo : # 상단 헤더의 블로그 타이틀 앞에 로고 추가하고 싶을 경우 사용

---
# Site Author (Home에서 해당 내용은 숨김 상태)
author:
  name: "your name here" # 블로그 닉네임
  avatar: "/assets/images/meee.png" # 블로그 프로필 사진
  #   bio              : "hi all!"
  # location         : "Seoul, Korea"
  # email            : "youremailhere@xxxxxx.com"
```

### ▪ favicon 변경

1. [https://www.favicon-generator.org/](https://www.favicon-generator.org/) 접속하여 원하는 이미지를 favicon으로 생성
2. 생성된 파일 `assets/images/favicon/` 디렉토리에 저장  
   \*주의) 로컬 실행 시 변경 내역이 반영되지 않을 수 있음. push 해서 확인 필요.
3. `_layouts/default.html`의 `github-account.github.io` 부분에 본인 블로그 URL 입력

```html
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="https://github-account.github.io/assets/images/favicon/apple-touch-icon.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="https://github-account.github.io/assets/images/favicon/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="https://github-account.github.io/assets/images/favicon/favicon-16x16.png"
/>
<link
  rel="manifest"
  href="https://github-account.github.io/assets/images/favicon/site.webmanifest"
/>
<link
  rel="mask-icon"
  href="https://github-account.github.io/assets/images/favicon/safari-pinned-tab.svg"
  color="#5bbad5"
/>
```

### ▪ 상단 헤더 우측 네비게이션 관리

[_data/navigation.yml]

```yml
# main links
main:
  - title: "Home"
    url: https://your-blog-url-here/ # 블로그 HOME 바로가기

  - title: "About"
    url: /about/ #_pages/about.md 연결

  - title: "GitHub"
    url: https://github.com/github-account # 깃허브 바로가기 (본인 깃허브로 변경)


  # 카테고리 기능이 필요하면 활성화 하기 (_pages/categories-archive.md 연결)
  # - title: "Categories"
  #   url: /categories/
```

### ▪ 카테고리 수정

카테고리에 항목을 추가하고 싶을 경우, `_pages/categories/` 하위에 md 파일 추가

`_pages/categories/category-categories1.md` 파일 작성 예시 (ex. category-algorithm.md)

```markdown
title: "Categories1" # 카테고리 이름
layout: category
permalink: /categories/categories1/ # url
author_profile: true
taxonomy: Categories1
sidebar:
nav: "categories"
```

카테고리 이름과 url을 `_data/navigation.yml`에 추가

```yml
# sidebar navigation (categories)
categories:
  - title: "Categories1"
    url: /categories/categories1/
  - title: "Categories2"
    url: /categories/categories2/
  - title: "Categories3"
    url: /categories/categories3/
  - title: "Categories4"
    url: /categories/categories4/
```

2022.09.24 Update : 하위 카테고리 포함 메뉴 (categories-ver2 branch)  
ver2.0 카테고리 형태 문의가 있어서 categories-ver2 브랜치에 업데이트 했습니다.  
예시는 페이지 하단 '개발 기록' 부분에서 확인하실 수 있어요!

참고) `_data/navigation.yml`만 아래와 같이 변경해주셔도 됩니다.

```yml
categories:
  - title: "Title1"
    children:
      - title: "Categories1"
        url: /categories/categories1/
      - title: "Categories2"
        url: /categories/categories2/
      - title: "Categories3"
        url: /categories/categories3/
      - title: "Categories4"
        url: /categories/categories4/

  - title: "Title2"
    children:
      - title: "Categories5"
        url: /categories/categories5/
      - title: "Categories6"
        url: /categories/categories6/

  - title: "Title3"
    children:
      - title: "Categories7"
        url: /categories/categories7/
```

### ▪ 포스트 작성

1. `_posts/YYYY-MM-DD-post-name-here.md` 파일 생성
2. 포스트에 사용할 이미지는 `assets/images/posts_img/post-name-here/` 하위에 저장
3. 포스트 front matter 작성

```txt
---
title: "[포스팅 예시] 이곳에 제목을 입력하세요"
excerpt: "본문의 주요 내용을 여기에 입력하세요"

categories: # 카테고리 설정
  - categories1
tags: # 포스트 태그
  - [tag1, tag2]

permalink: /categories1/post-name-here/ # 포스트 URL

toc: true # 우측에 본문 목차 네비게이션 생성
toc_sticky: true # 본문 목차 네비게이션 고정 여부

date: 2020-05-21 # 작성 날짜
last_modified_at: 2021-10-09 # 최종 수정 날짜
---
```

4. front matter 하단에 포스팅 내용 작성

- 참고 (\_config.yml에서 포스팅 기본 세팅) : comment, author_profile 등의 상태를 변경 가능. 포스팅 디폴트값

```yml
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: #true
      show_date: true
      comments: true
      # share: true
      related: true
      sidebar:
        nav: "categories"
```

### ▪ 댓글 기능 (utterances 사용)

utterances 관련해서 구글링 해보고 진행하기를 추천.  
기본적인 세팅 방법을 설명하자면,

1. 본인 GitHub에 utterances용 repository 생성
2. [https://github.com/apps/utterances](https://github.com/apps/utterances)에 접속하여 생성한 repo 선택 후 install
3. `_config.yml` 파일 변경 (theme 변경 시에만)

```yml
comments:
  provider: "utterances"
  utterances:
    theme: "github-light" # "github-dark"
    issue_term: "pathname" # pathname은 post의 markdown 파일 이름으로 연결됨
```

4. `_includes/comments-providers/utterances.html` 파일 작성

```yml
# 본인 깃허브 아이디와 생성한 레파지토리 입력
script.setAttribute('repo', 'github-account/repository-name');
# 선택한 깃허브 테마 입력
script.setAttribute('theme', '{{ site.comments.utterances.theme | default: "github-light" }}');
```

### ▪ Google Analytics 연결

[https://analytics.google.com/analytics/web/](https://analytics.google.com/analytics/web/)에서 접속하여 연결

```yml
# Analytics
analytics:
  provider: "google-gtag"
  # false (default), "google", "google-universal", "google-gtag", "custom"
  google:
    tracking_id: "your tracking id here" # 본인의 tracking id 입력
    anonymize_ip: # true, false (default)
```

### ▪ Goolge Search Console 연결

구글에 내 게시물이 보이게 하려면 search console과 연결이 필요
[https://search.google.com/search-console/about](https://search.google.com/search-console/about)에서 접속하여 도메인 등록

1. 도메인 등록 시 구글에서 제공하는 `google~~.html` 파일 루트 디렉토리에 업로드
2. `jekyll-sitemap` 플러그인 설치 (구글링 추천)

```bash
sudo gem install jekyll-sitemap
```

3. `_config.yml` 파일에 plugins에 jekyll-sitemap 없으면 추가

```yml
# Plugins (previously gems:)
plugins:
  - jekyll-sitemap
```

4. 루트 디렉토리에 `robots.txt` 생성

```txt
User-agent: *
Allow: /

Sitemap: https://github-account.github.io/sitemap.xml
```

### ▪ 네이버 검색 등록 (서치어드바이저)

[https://searchadvisor.naver.com/](https://searchadvisor.naver.com/)에 접속하여 사이트 등록  
루트 디렉토리에 `naver~~~~.html` 추가

- 참고할만한 블로그가 있어서 링크 걸어두겠습니다.
  [https://yenarue.github.io/tip/2020/04/30/Search-SEO/#%EB%84%A4%EC%9D%B4%EB%B2%84-naver](https://yenarue.github.io/tip/2020/04/30/Search-SEO/#%EB%84%A4%EC%9D%B4%EB%B2%84-naver)

### ▪ 폰트 변경

1. `assets/css/main.scss`에 import나 font-face 방식 중 선택하여 폰트 추가

```scss
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@font-face {
  font-family: "RIDIBatang";
  font-weight: normal;
  src: url(/assets/css/fonts/RIDIBatang.otf);
}
```

2. `_sass/minimal-mistakes/_variables.scss`에서 폰트 설정

```scss
$serif: Georgia, Times, serif !default;
$sans-serif: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
  "Montserrat", "Pretendard", "Merriweather", sans-serif !default;
$monospace: "Fira Mono", "Pretendard", Monaco, Consolas, "Lucida Console",
  monospace !default;
```

### ▪ About 페이지 작성

상단 네비게이션의 `About` 탭은 `_pages/about.md`로 연결. 해당 파일에 내용 작성

```txt
---
title: "Hi all! I'm OOOOOO👋🏻"
permalink: /about/
layout: single
comments: false
---

본인 소개 여기에 입력
```

_문의사항 또는 수정 요청은 블로그에 댓글 남겨주시거나 이메일로 연락주세요!_

---

### 개발 기록

[VER1.0]
![choiiis github blog main](/assets/images/posts_img/readme/blog-main-ver1.png)

[VER2.0]
![choiiis github blog main](/assets/images/posts_img/readme/blog-main-ver2.png)

- logo 변경
- 카테고리 디자인 변경
- font family, size 변경
- 메인 컬러 변경

[VER2.1]
![choiiis github blog main](/assets/images/posts_img/readme/ver2_1_main.png)
