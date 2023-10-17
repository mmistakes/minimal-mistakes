---
title: "Gtihub io Redirect From"
categories: "github.io"
tags: 
toc: true
toc_label: false
toc_icon: false
toc_sticky:	false
last_modified_at: 
author_profile: false
sidebar :
    nav: "docs"
---

# 1. Redirect From 플러그인이란?
---
- 서버 내에서 경로가 변경됬을때 자동으로 리다이렉팅 해줌
- 예를들어 카테고리를 coding에서 code로 변경했을 때, 링크를 연결해둔 곳들은 404 에러가 뜸
- 이를 방지하기위해 리다이렉팅 해줌

# 2. 설치법
---
- `gem install 'jekyll-redirect-from'`로 설치
- 이후 `_config.yml`의 `plugins:`와 `whitelist:`에 `- jekyll-redirect-from`을 추가해줌
- 추가로 최상단의 `minimal-mistakes-jekyll.gemspec` 파일에 ` spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.1"`을 추가함

# 3. 사용법
--- 
포스팅에서 카테고리를 coding에서 code로 변경한 경우
속성에
```
redirect_from:
    - /coding/title
```
`/coding/title`로 접속하면`/code/title`로 리다이렉팅된다 