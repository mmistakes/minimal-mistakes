---
title: "Minimal Mistakes 포스트 규칙"
categories: "github.io"
tags: 
toc: true
toc_label: false
toc_icon: false
toc_sticky:	false
last_modified_at: 
author_profile: false
sidebar :
    nav: "docs"
---

# 1. 포스트 양식 
---

| 속성 | 기능 |
|---|---|
| title | 글 제목 |
| categories | 카테고리 |
| tags | 태그 |
| toc | Table of Contents. 글 구조 생성할것인지? true or false | 
| toc_label | toc의 이름. true or false |
| toc_icon | 아이콘 넣을지 true or false |
| toc_sticky |	고정 toc? true or false |
| last_modified_at | 마지막 수정 일자 |
| author_profile | 좌측에 프로필 띄울지 |
| sidebar | 사이드바 띄울지 |

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
      
   
# 3. 이미지 정렬 규칙
---

```
![이미지 이름]({{site.url}}/경로){: .align-속성 .width="사이즈" .height="혹은%"} 
```

Markdonw & Kramdown 문법을 따름
외부 테마를 적용했다면 이미지 크기가 안먹을 때가 있음   
이때는 `layout.css`에서 기본 설정된 값을 해제할 것   
셋다 사이좋게 안먹는다

1. 왼쪽 정렬   
![IMG_1788]({{site.url}}/image/2023-10-17-post_rules/IMG_1788.JPG){: .align-left .width="400" .height="200"} 

2. 가운데 정렬   
![IMG_0023]({{site.url}}/image/2023-10-17-post_rules/IMG_0023.JPG){: .align-center .width="50%"}   

3. 우측 정렬   
![image-center]({{site.url}}/image/src/sena.png){: .align-right width="400" .height="200"}   

   
      