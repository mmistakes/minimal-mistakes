---
layout: single
title: "깃허브(GitHub) 블로그 08 : 사이트 주소가 바뀌었을 때 redirect_from 플러그인"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: "counts"
redirect_from:
  - /blog/GitHub-blog-08st
---
<a href="https://github.com/jekyll/jekyll-redirect-from" class="btn btn--primary">jekyll-redirect-from</a>

`redirect-from` install

```
gem install jekyll-redirect-from
```

`_config.yml`에 추가

```_config.yml
plugins:
  - jekyll-redirect-from
```

`minimal-mistakes-jekyll.gemspec` 에 추가
```minimal-mistakes-jekyll.gemspec
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.1"
```

게시글의 프론트매터에 추가한다.
```
redirect_from:
  - /blog/GitHub-blog-08st
  - /blog/GitHub-blog-08st-new/
```

위의 `url`을 입력하면 해당 게시글로 이동한다.