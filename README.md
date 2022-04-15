## Jekyll

* jekyll 은 정적 사이트 생성기입니다. [jekyll](https://jekyllrb.com)
* GitHub은 정적 페이지를 올려놓고 서빙하는 기능을 지원합니다. 특히 jekyll 은 빌트인으로 지원합니다. [Github pages with Jekyll](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
* 저장소의 `master` 브랜치에 푸시하면 퍼블리시 됩니다.

## 로컬에서 jekyll 블로그 보는 법

* jekyll 을 설치하고, 이 저장소를 클론한 다음에 로컬 서버를 띄워 볼 수 있습니다.

```
$ gem install jekyll bundler
$ cd techblog
$ bundle install
$ bundle exec jekyll serve .
```
* 만약 미래 날짜로 포스트를 작성했다면, `bundle exec jekyll serve . --future` 으로 띄우셔야 포스트를 볼 수 있습니다.
* 생성된 정적 사이트의 HTML/CSS 소스파일 등은 `_site` 디렉토리 아래에서 확인할 수 있습니다.

* 혹은, Docker를 이용하면 컴퓨터에 의존성을 설치할 필요 없이 간편하게 로컬 서버를 띄워 볼 수 있습니다.

```
$ docker run --rm -it -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve
```

## 어떻게 글을 작성하는가

* jekyll 의 설정은 매우 방대해서 필요한 것을 하나씩 찾아보며 할 수밖에 없습니다.
* 하지만 핵심인 컨텐츠(글!)는 디자인/레이아웃/사이트맵과는 별도로 꾸준히 추가할 수 있습니다. 

1. `_data` 디렉토리의 `authors.yml` 파일에 자신이 사용한 author 이름 및 정보를을 형식에 맞게 추가 합니다. GitHub username을 포함하면 포스트에 GitHub 프로필 사진이 추가되고 GitHub 프로필 페이지로 링크됩니다.
```
dgoon:
    name: Lee Kangsan
    username: dgoon
    email: dgoon@hpcnt.com
hwan:
    name: Cho Hwan
    username: FrancescoJo
    email: hwan@hpcnt.com
```
2. `_posts` 디렉토리에 `YYYY-mm-dd-Title-of-the-posting.md` 파일을 만듭니다.
3. 파일의 앞 부분에 Front matter 를 작성해 넣습니다. 이건 글의 메타정보를 담고 있습니다. 
  * `layout`, `date`, `title`은 아래 예제를 참고해서 작성합니다. 
  * `author`는 위 `authors.yml` 파일에 존재하는 값이여야 합니다. 
  * `tags`에는 여러개의 `tag`를 넣을수 있으며 공백으로 구분됩니다. 
  * `excerpt` 내용은 포스트 목록에서 표시됩니다. 
  * 포스팅 내용을 수정한 경우 `last_modified_at` 항목을 만들고 수정한 일자를 넣습니다. 
   (아래는 샘플입니다)

```
---
layout: post
date: 2018-04-03
title: 블로그를 만들어보자
author: dgoon
tags: general posting
excerpt: 블로그 만드는 포스팅으로 블로그를 시작합니다.
last_modified_at: 2018-05-01
---
```

4. Front matter 에 `published: false` 를 추가하면 페이지 생성에서 제외됩니다.
5. Front matter 뒤쪽에 Markdown 으로 글을 작성하면 됩니다. Github pages 는 `kramdown` 만을 지원합니다. [Github pages with Kramdown](https://help.github.com/articles/updating-your-markdown-processor-to-kramdown/)

```
GitHub Pages only supports kramdown as a Markdown processor.

GitHub-flavored Markdown is supported by kramdown by default, so you can use Markdown with GitHub Pages the same way you use Markdown on GitHub.
```

6. 혹시 모를 일을 대비하기 위해 `master` 직접 푸시는 막아 두었습니다. 적당한 브랜치를 만들고 `master` 를 향해 Pull request 를 만들어 주세요!

## 이미지 붙이는 법

루트 디렉토리의 `assets` 아래에 파일을 넣고,
```
![ImageName]({{ "/assets/ImageFileName.png" | absolute_url }})
```
와 같은 식으로 임베딩할 수 있습니다. 더 상세한 것은 jekyll 레퍼런스를 찾아보시면 알 수 있습니다.

## 글 작성 외에는?

* jekyll, 혹은 html/css 등으로 할 수 있는 일이 아주 많습니다. 포스팅이 아니어도 디자인 수정, 오타 수정, 설명 갱신 등 누구라도 PR 을 만들어서 보내주시면 감사히 받겠습니다.
* 이를테면, 태그 클라우드를 만들어 붙인다던가요.
