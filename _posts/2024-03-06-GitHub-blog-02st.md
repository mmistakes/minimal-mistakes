---
layout: single
title: "깃허브(GitHub) 블로그 02 : 이미지 넣기"
categories: blog
tags:
  - Github
  - Blog
toc: true
---
### 내가 사용하는 편집기
- Obsidian
- Visual Studio Code
- Typora

처음 기록을 해야겠다 싶어서 시작한건 Obsidian 이였다.
파일과 파일과의 연결, 또 커스텀이 자유롭고 플러그인이 다양했다.
Obsidian도 마크다운 문법을 사용하기 때문에, 깃허브를 이용한 블로그를 만들기 전에
Obsidian을 통해서 작성하고 md 파일만 올리면 되겠다 싶었다.

깃허브를 이용한 블로그를 만들면서 문제가 생겼다.
- Obsidian은 html을 읽지 못하고 그에 관련한 플러그인도 없다.
- Obsidian은 상대경로 절대경로 모두 이미지를 읽지만, 블로그를 업로드할 때에는 상대경로를 써야한다.

이 경우 상대경로로 이미지 경로를 사용한 결과 Obsidian과 깃블로그에도 잘 읽혔다.
```
![GitHub-blog-006]({{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-006.png)

```
이 경우 절대경로로 이미지 경로를 사용한 결과 Obsidian에서는 잘 읽혔지만 깃블로그에서는 이미지가 읽히지 않았다.
```
![GitHub-blog-006](Yoon-Beom.github.io/images/2024-03-05-GitHub-blog-01st/GitHub-blog-006.png)
```

![GitHub-blog-008]({{site.url}}/images/2024-03-06-GitHub-blog-02st/GitHub-blog-02st-01.png)

이 파일 구조가 맘에 들었기 때문에 이 방법을 찾기 위해서 알아보다가
Typora 라는 편집기를 알게 되었다.

Obsidian에서 이미지 크기를 조정 하는 경우 Typora에서 읽히지 않았고 블로그에서도 읽히지 않았다.
```
![GitHub-blog-006|500](Yoon-Beom.github.io/images/2024-03-05-GitHub-blog-01st/GitHub-blog-006.png)
```
Typora에서 이미지 크기를 조정 하는 경우 Html로 변경되어 블로그에서는 읽혔지만, Obsidian에서는 읽히지 않았다.
```
<img src="{{site.url}}/images/2024-03-05-GitHub-blog-01st/GitHub-blog-006.png" alt="GitHub-blog-006" style="zoom:50%;" />
```

내가 생각한 방법은 Obsidian으로 블로그의 글을 작성하고
사진 첨부할때 Typora를 사용하고 GitHub Desktop을 이용해 커밋하는 것이다.