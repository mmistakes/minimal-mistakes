---
title: "커스텀 CSS 스타일을 마크다운 형식으로 적용하기"
categories: "github.io"
tags: 
toc: true
toc_label: false
toc_icon: false
toc_sticky:	false
last_modified_at: 
author_profile: false
sidebar :
    nav: "counts"
---

깃허브 블로그에서 이미지에 커스텀 스타일을 적용시키려면   

`_sass\minimal-mistakes\_utilities.scss`
에 원하는 스타일을 정의해두고,  

이미지의 뒤에 속성을 가져다 쓰면 된다.

```css
/* 이미지 사이즈 50% */
.img-quarter{
  height: 25%;
  width: 25%;
}

/* 이미지 사이즈 25% */
.img-half{
  height: 50%;
  width: 50%;
}

![사진이름]({{site.url}}/경로){: .img-quarter .align-center}

```

<img src="https://onedrive.live.com/embed?resid=91EF77F7B9E9A70C%21341684&authkey=%21ANOluIMc4E5Kt2Q&width=4032&height=3024">{: .img-quarter .align-center}
<img src="https://onedrive.live.com/embed?resid=91EF77F7B9E9A70C%21341684&authkey=%21ANOluIMc4E5Kt2Q&width=4032&height=3024">{: .img-half .align-center}
<img src="https://onedrive.live.com/embed?resid=91EF77F7B9E9A70C%21341684&authkey=%21ANOluIMc4E5Kt2Q&width=4032&height=3024">{: .align-center}
