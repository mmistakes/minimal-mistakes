---
layout: single
title: "깃헙 블로그에 댓글창 띄우기"
categories: Github-Blog
tag: [기록, 댓글창 만들기]
toc: true
toc_sticky: true
toc_label: 목차
author_profile: false
sidebar:
  nav: "docs"
---

깃헙 블로그에 댓글을 남길 수 있는 방법에 대해 기술하였습니다.
해당 글은 '테디노트'님의 방법을 따라, 글로 남겨두었습니다.

## 개요

깃헙 블로그 강의를 기반으로, 유튜브 영상에서 알려주는 깃헙 블로그에 댓글 남기기 방법을 정리해두려한다.
강의를 들을 때 카테고리와 태그, 검색하는 방법까지는 같이 할 수 있었지만 그 외의 방법들은 영상을 통해 학습할 수 있었다.

## disqus 회원가입하기

깃헙 블로그에 댓글창을 만들 수 있는 방법은 여러가지가 있는 것 같지만, 나는 영상에서 나오는 disqus로 해보기로 했다.

[disqus 링크](https://disqus.com/)에 들어가 회원가입부터 진행해주면 되는데, 나는 구글 계정이 이미 있어 그걸로 가입했다.

## 블로그와 disqus 연결해주기

회원가입까지 완료되었다면, 댓글창을 눈에 보이게 하기 전에 먼저 내 블로그와 disqus를 연결해주는 작업이 필요하다.
로그인을 해주고,

```
우측 상단에 있는 프로필 클릭
Settings 클릭
클릭하여 나온 화면의 우측 상단의 톱니바퀴(Settings) 클릭
Add Disqus To Site 메뉴 클릭
제일 아래로 내려 GET STARTED 클릭
I want to install Disqus on my site 클릭
Website Name 지정 - Category 지정(Language는 English로 해주었음)
Create Site 클릭
```

여기까지 해주었을 때, 결제 플랜 화면이 나오게 되는데 유료 버전이 필요한 사람은 돈을 내고 쓰겠지만, 나는 그렇게까지 해줄 필요는 없을 것 같다.

Billed 옆에 토글 버튼이 있는데, 토글을 꺼주고 아래로 내려서 Subscribe Now를 클릭해준다.

그 다음, 플랫폼을 선택하는 화면이 나오는데, 나의 경우 Jekyll을 사용하여 만들었기 때문에 Jekyll을 선택해주었다. 많은 플랫폼들이 나오는데, 맞는 플랫폼을 선택해주면 된다.

선택해 준 후 Configure - Website URL을 입력해준다. URL은 깃헙 블로그 주소를 넣어주면 되는데, 여기서 주의할 점은 꼭 https:// 를 앞에 붙여야한다.

URL 입력 후 Next를 입력해주면 완성되었다. 하지만 댓글창을 사용할 수 있도록 내 사이트와 연결을 해주었을 뿐, 블로그에 들어갔을 때 보이지는 않는다. 사용할 수 있게 기능을 연결해주어야한다.

## 댓글창 기능 구현하기

\_config.yml파일에 들어가준다.
아래로 내리다보면 280번째 줄(에디터로 vs code를 사용 중이라, vs code 기준이다.)

```
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: # true
      share: true
      related: true
```

comments를 볼 수 있는데, true 앞에 있는 #을 지워주고 저장해준다.

그 다음 32번째 줄까지 올려주면,

```
comments:
  provider: # false (default), "disqus", "discourse", "facebook", "staticman", "staticman_v2", "utterances", "giscus", "custom"
  disqus:
    shortname: # https://help.disqus.com/customer/portal/articles/ ...
```

comments 설정을 볼 수 있는데, # 앞에 "disqus"를 작성하고 저장해준다.

## disqus shortname 설정하기

그 다음, disqus shortname을 지정하도록 되어있는데, 이 부분은 다시 disqus 사이트로 돌아와서 우측 상단의 Admin을 클릭한다.
![스크린샷 2023-02-28 오후 4 09 18](https://user-images.githubusercontent.com/91467260/221782175-e43317e0-bc38-4f3d-a88e-86b5aff3e59e.png)
![스크린샷 2023-02-28 오후 4 22 04](https://user-images.githubusercontent.com/91467260/221782864-04b860a7-94d6-4eb0-9ca3-10005144e7b1.png)
클릭해주면 'check out what's been happening on (your shortname).'이 나오는데, 이 (your shortname)이라고 써있는 부분이 본인의 shortname이다.

다시 vs code로 돌아가,

```
disqus:
    shortname: # https://help.disqus.com/customer/portal/articles/ ...
```

이 부분에서 #으로 주석처리 된 내용들을 전부 지워주고, disqus 사이트에서 확인한 본인의 shortname을 복사 + 붙여넣기 해준다(저장하는 것을 잊지 말자).

로컬 서버를 꺼준 후 다시 켜주어 댓글창이 뜨는지 확인해준다.
(깃헙 블로그 로컬 개발환경 설정방법은 [여기](https://hsly22xk.github.io/error/handling/logs/localenv-github-blog/)에서 확인할 수 있다. 만약 하지 않았다면 따라서 해보는 것을 추천한다.)

## 바로 적용해보기

로컬 서버환경에서 확인하면 적용 여부를 바로 확인해볼 수 있지만, 그렇다고 실제 내 블로그에도 적용이 되었다는 것은 아니다.

따라서,

```
git status
git add .
git commit -m 'commit message here'
git push origin master
```

로 깃에 적용하면, 바로 actions가 돌아 배포가 완료되면 블로그에 적용이 된다.

push를 할 때 나의 branch name이 무엇인지 확인을 먼저 해봐야한다. 대부분은 master branch로 이름이 명명되어있지만, 간혹 main이나 본인이 지정한 branch name으로 둔 경우가 있다.

## 내 블로그에 댓글창이 안뜨는데요?!(1)

대부분 \_config.yml 파일을 수정할 때 띄어쓰기를 잘못했거나, 오타가 있거나 하면 뜨지 않는 경우가 많았다.
이 부분을 잘 보고, 띄어쓰기가 틀리지는 않았는지 혹은 오타가 나지는 않았는지 확인을 먼저 해보면 99%는 해결된다(나의 경우에는 그렇다).

## 내 블로그에 댓글창 그래도 안뜨는데요?!(2)

모든 경우의 수를 전부 작성해둘 수는 없지만, Website Name을 지정할 때 띄어쓰기를 하는 경우도 있었다.

ex) Github blog

이런 경우, Shortname을 Github-blog, 즉 '-' 를 띄어쓰기한 부분에 지정하면 실행이 된다.
