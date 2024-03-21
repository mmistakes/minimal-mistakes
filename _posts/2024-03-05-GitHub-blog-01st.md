---
layout: single
title: "깃허브(GitHub) 블로그 01 : 시작하기"
categories: blog
tags:
  - Github
  - Blog
toc: true
---
### 깃허브를 이용해 블로그를 만드는 이유
- 호스팅 비용이 필요 없다.
- 원하는 방향성대로 할 수 있다.
- 깃허브를 통해 블로그를 작성하면서 깃허브의 원리와 이해에 도움이 된다.

### 1. 마음에 드는 테마 고르기
 - https://github.com/topics/jekyll-theme?o=desc&s=stars
 - 지킬 기반의 테마 중에서 star가 가장 많은 **minimal-mistakes**를 선택했다.
   ![GitHub-blog-001]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-01.png)

### 2. 해당 테마에 들어가 fork를 한다.

![GitHub-blog-002]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-02.png)

### 3. 레파지토리의 이름을 변경한다.

### ![GitHub-blog-003]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-03.png)
- 본인 아이디.github.io 로 지정해준다.

### 4. _config.yml 파일에서 기본 설정

![GitHub-blog-004]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-04.png)
- 위의 사진을 아래 사진으로 변경 해준다.
![GitHub-blog-005]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-05.png)

- https://yoon-beom.github.io/ 으로 들어가면 아래와 같이 변한다.

![GitHub-blog-006]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-06.png)

### 게시물을 Posting 하기
- 마크다운 문법을 이용하여 게시글을 작성한다.
- 게시물은 _posts 파일 안에작성된다.
- 파일의 이름의 형식은 yyyy-mm-dd-title로 적어야한다. title은 블로그의 url값이 되니 한글은 되도록 피하자.
- 상단에는 layout 과 title을 작성해야한다.

![GitHub-blog-007]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-01st-07.png)
