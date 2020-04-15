---
title: "Github page 시작하기 허니팁 (2)"
categories:
  - Github Blog
tags:
  - HowToStart
  - image
toc: true
toc_sticky: true
---

## 3. 포스트에 이미지 추가하기

```md
<figure style="width: 75%">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>출처: https://www.e-zigurat.com/innovation-school/blog/what-do-the-next-five-years-hold-for-the-iot</figcaption>
</figure>
```