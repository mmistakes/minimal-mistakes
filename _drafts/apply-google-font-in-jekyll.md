---
layout: post
title:  "구글 폰트를 Jekyll 에 적용하기"
date:   2019-02-01 14:34:34 +0900
categories: jekyll fonts google
author: code-machina
---

> 하나씩 만들어 가는 즐거움과 계획하에 따른 적용은 언제나 기쁜일이다.

Jekyll 의 기본 theme 은 minima 이다. minima 는 깔끔한 UI 를 제공하기에 사용하기에 무리가 없다. 그러나 조금 더 기능을 더하고 자신만의 스타일을 추구한다면 수정이 필요하다.

1. head 파일 수정
  1. ㅁㄴㅇㄻㄴㅇㄹ
ㅁㄴㅇㄻㄴㅇㄹ

- 소스 파일에 style.scss 를 생성한다.
  - 문서 앞에 fontmatter dash 를 추가
  - `@import "minima";` 를 추가
  - Custom css 를 추가한다.

```html
<link href='https://fonts.googleapis.com/css?family=Arvo:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
```