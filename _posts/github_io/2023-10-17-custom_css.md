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

![sena2]({{site.url}}/image/2023-10-17-post_rules/IMG_1788.JPG){: .img-quarter .align-center}
<img src="{{ site.url }}/image/2023-10-17-post_rules/IMG_1788.JPG" alt="">{: .img-half .align-center}
![sena2](/image/2023-10-17-post_rules/IMG_1788.JPG){: .align-center}

