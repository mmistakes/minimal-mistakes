---
title:  "[Github 블로그] Mathjax로 수식(Math Expression) 쓰기" 

categories:
  - Blog
tags:
  - [Blog, jekyll, Math]

toc: false
toc_sticky: true
 
date: 2020-05-30
last_modified_at: 2020-05-30
---

## 1. `📁_include/scripts.html` 에 다음과 같은 코드를 끝에 추가한다.
```html
{% raw %}
{% if page.mathjax %}
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" defer
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>
{% endif %}
{% endraw %}
```

## 2.`_config.yml`에 `mathjax:true`를 추가한다.

```
# Defaults
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
      mathjax: true ✨✨✨
```
여기까지만 하면 이제 수식을 쓸 수 있다 😀

## 수식 쓰는 방법

### 수식 문법 참고
[MathJax 공식 문서](https://www.mathjax.org/)  
[Notion 수식 기호 모음](https://www.math.brown.edu/~jhs/ReferenceCards/TeXRefCard.v1.5.pdf)

### inline으로 수식 쓰는 방법
`\\(` 와 `\\)` 사이에 문법대로 수식을 쓴다

- 예시
```
`원래 힘으로 돌아가려는 힘 벡터` = \\(\vec{f_{ij,spring}} = -k(\vert\vec{x_i} - \vec{x_j}\vert - l_0){\vec{x_i} - \vec{x_j}\over{\vert\vec{x_i} - \vec{x_j}\vert}} \\)
```
`원래 힘으로 돌아가려는 힘 벡터` = \\(\vec{f_{ij,spring}} = -k(\vert\vec{x_i} - \vec{x_j}\vert - l_0){\vec{x_i} - \vec{x_j}\over{\vert\vec{x_i} - \vec{x_j}\vert}} \\)

### 블록으로 수식 쓰는 방법
`\\[` 와 `\\]` 사이에 문법대로 수식을 쓴다

- 예시
```
`원래 힘으로 돌아가려는 힘 벡터` = \\[\vec{f_{ij,spring}} = -k(\vert\vec{x_i} - \vec{x_j}\vert - l_0){\vec{x_i} - \vec{x_j}\over{\vert\vec{x_i} - \vec{x_j}\vert}} \\]
```
`원래 힘으로 돌아가려는 힘 벡터` = \\[\vec{f_{ij,spring}} = -k(\vert\vec{x_i} - \vec{x_j}\vert - l_0){\vec{x_i} - \vec{x_j}\over{\vert\vec{x_i} - \vec{x_j}\vert}} \\]

<br>

[이 분의 블로그를 참고했습니다](https://www.cross-validated.com/How-to-render-math-on-Minimal-Mistakes/)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}