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

### 3.1 이미지

```html
{% raw %}
<figure style="width: 75%">
  {{ fig_img | markdownify | remove: "<p>" | remove: "</p>" }}
  <figcaption>그림 캡션</figcaption>
</figure>
{% endraw %}
```