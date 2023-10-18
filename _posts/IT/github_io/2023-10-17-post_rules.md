---
title: "Minimal Mistakes 포스트 규칙"
excerpt: "Markdown & Kramdown 문법을 따름"
categories: "github.io"
tags: 
toc: true
toc_label: " - "
toc_icon: true
toc_sticky:	true
last_modified_at: "2023-10-18"
author_profile: false
sidebar :
    nav: "docs"
---

Jekyll로 생성한 Github.io는 Markdown & Kramdown 문법을 따른다

# 1. 포스트 속성
---

| 속성 | 기능 |
|---|---|
| title | 글 제목 |
| expert | 상위 페이지에서 미리보기 시 보이는 글 요약  |
| categories | 카테고리 |
| tags | 태그 |
| toc | Table of Contents. 글 구조 생성할것인지? true or false | 
| toc_label | toc의 이름. |
| toc_icon | 아이콘 |
| toc_sticky | 스크롤시 toc가 따라올지 true or false |
| date | 글 작성 시간 |
| last_modified_at | 마지막 수정 일자 |
| published | 글 공개 여부. 비공개로 할 수도, 원하는 시간에 공개할수도 있음 |
| author_profile | 좌측에 프로필 띄울지 true or false, sidebar와 함께 사용해야함 |
| sidebar | 사이드바에 어떤 정보를 띄울지. /_data/navigation.yml에 정의된 클래스 중 한개 호출 |

```
title: "title"
excerpt : 요약

categories: 
    - 카테고리 이름
tags: 
    - [태그1, 태그2]

toc: true
toc_sticky:	true
toc_label: false
toc_icon: false

date: YYYY-MM-DD
last_modified_at: YYYY-MM-DD

published : false  # 글 비공개 전환

author_profile: false
sidebar :
    nav: "counts"
```
이렇게 템플릿 만들어놓고 쓰는 중

# 2. 텍스트 정렬 규칙
---

```
Left aligned text
{: .text-left}
```
Left aligned text
{: .text-left}

```
Center aligned text.
{: .text-center}
```
Center aligned text.
{: .text-center}

```
Right aligned text.
{: .text-right}
```
Right aligned text.
{: .text-right}

No wrap text.
{: .text-nowrap}
```
No wrap text.
{: .text-nowrap}
```
      