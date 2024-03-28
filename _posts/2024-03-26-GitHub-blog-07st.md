---
layout: single
title: "깃허브(GitHub) 블로그 07 : 공지사항, 버튼 , Youtube 영상 추가"
categories: blog
tags:
  - Github
  - Blog
author_profile: false
sidebar:
  - nav: "counts"
redirect_from:
  - /blog/GitHub-blog-07st
---

### 1. 공지사항

> 확인

<a href="https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#notices" class="btn btn--primary">Notice 관련 페이지</a>

| Notice Type | Class              |
| ----------- | ------------------ |
| Default     | `.notice`          |
| Primary     | `.notice--primary` |
| Info        | `.notice--info`    |
| Warning     | `.notice--warning` |
| Success     | `.notice--success` |
| Danger      | `.notice--danger`  |

공지사항 예제 
```
**[공지사항]** [{{site.title}} 신규 업데이트 안내 드립니다.](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
```


**[공지사항]** [{{site.title}} 신규 업데이트 안내 드립니다.](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
{: .notice--danger}

```
<div class="notice--success">
<h4>공지사항</h4>
<ul>
	<li>공지사항 순서 1</li>
	<li>공지사항 순서 2</li>
	<li>공지사항 순서 3</li>
</ul>
</div>
```

<div class="notice--success">
	<h4>공지사항</h4>
	<ul>
		<li>공지사항 순서 1</li>
		<li>공지사항 순서 2</li>
		<li>공지사항 순서 3</li>
	</ul>
</div>

### 2. 버튼

<a href="https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#buttons" class="btn btn--primary">버튼 관련 페이지</a>

```
<a href="#" class="btn btn--primary">Link Text</a>
```

| Button Type   | Example                                                                         | Class                      | Kramdown                                    |
| ------------- | ------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------- |
| Default       | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn`                     | `[Text](#link){: .btn}`                     |
| Primary       | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--primary`       | `[Text](#link){: .btn .btn--primary}`       |
| Success       | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--success`       | `[Text](#link){: .btn .btn--success}`       |
| Warning       | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--warning`       | `[Text](#link){: .btn .btn--warning}`       |
| Danger        | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--danger`        | `[Text](#link){: .btn .btn--danger}`        |
| Info          | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--info`          | `[Text](#link){: .btn .btn--info}`          |
| Inverse       | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--inverse`       | `[Text](#link){: .btn .btn--inverse}`       |
| Light Outline | [Text](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#link) | `.btn .btn--light-outline` | `[Text](#link){: .btn .btn--light-outline}` |

[Google](https://www.google.com/){: .btn .btn--danger}

| Button Size | Example                                                                               | Class                              | Kramdown                                            |
| ----------- | ------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------- |
| X-Large     | [X-Large Button](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#) | `.btn .btn--primary .btn--x-large` | `[Text](#link){: .btn .btn--primary .btn--x-large}` |
| Large       | [Large Button](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#)   | `.btn .btn--primary .btn--large`   | `[Text](#link){: .btn .btn--primary .btn--large}`   |
| Default     | [Default Button](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#) | `.btn .btn--primary`               | `[Text](#link){: .btn .btn--primary }`              |
| Small       | [Small Button](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/#)   | `.btn .btn--primary .btn--small`   | `[Text](#link){: .btn .btn--primary .btn--small}`   |

### 3. Youtube 영상

<a href="https://mmistakes.github.io/minimal-mistakes/docs/helpers/#youtube" class="btn btn--primary">Youtube 관련 페이지</a>

```
{% include video id="XsxDH4HcOWA" provider="youtube" %}
```

{% include video id="q0P3TSoVNDM" provider="youtube" %}

```
header:
  video:
    id: XsxDH4HcOWA
    provider: youtube
```