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

## 3. 자주 사용하는 포스팅 기능

### 3.1 이미지 추가

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-proto-stack.png" alt="">
</figure>

```html
<figure style="width: 100%">
  {% raw %}{{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}{% endraw %}
  <figcaption>그림 캡션</figcaption>
</figure>
```

<figure style="width: 80%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-link-layer.png" alt="">
  <figcaption>그림 캡션</figcaption>
</figure> 