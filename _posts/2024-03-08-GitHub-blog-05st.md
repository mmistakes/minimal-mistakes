---
layout: single
title: "깃허브(GitHub) 블로그 05 : 이미지 경로 오류"
categories: blog
tags:
  - Github
  - Blog
toc: true
---
### 이미지 경로 오류
카테고리 기능을 추가하고 결과를 확인 하는데 이미지가 안 읽어와서 또 무슨 오류인가 싶었다.
카테고리 기능은 url을 통해 분류 된다.

- 카테고리 추가 전

```
https://yoon-beom.github.io/GitHub-blog-01st/
```
- 카테고리 blog 추가 후

```
https://yoon-beom.github.io/blog/GitHub-blog-01st/
```
- 이미지의 경로는 상대경로로 상위 폴더로 올라가서 현재 폴더에서 images 파일에 들어 가는 것이다.

```
![GitHub-blog-014]({{site.url}}/images/2024-03-08-GitHub-blog-04st/GitHub-blog-014.png)
```


### 카테고리 적용 전 경로

![GitHub-blog-015]({{site.url}}/images/2024-03-08-GitHub-blog-05st/GitHub-blog-05st-01.png)

### 카테고리 적용 후 경로

![GitHub-blog-016]({{site.url}}/images/2024-03-08-GitHub-blog-05st/GitHub-blog-05st-02.png)

### 해결책
- 이미지 경로에 ../ 를 ../../ 로 쓰는 방법이 있다. 
- ../ 를 \{\{site.url\}\}로 변경하여 쓰는 방법이 있다.
위의 방법을 쓰면 편집기에서는 이미지가 로딩이 안된다는 불편한 점이 있다.

```
{{site.url}}/images/2024-03-08-GitHub-blog-05st/GitHub-blog-05st-02.png
```
이런 상대경로를
```
Yoon-Beom.github.io/images/2024-03-08-GitHub-blog-05st/GitHub-blog-05st-02.png
```
이런 형식으로 바꿔주는 기능은 없는 듯 하다.
