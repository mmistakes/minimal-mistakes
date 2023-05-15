---
layout: single
title:  "minimal mistakes configuration 정리"
categories: 
    - blog
tag: [blog, minimal mistakes]
published: true



toc: true #테이블
toc_sticky: true
toc_label: 
toc_icon: "fa-solid fa-list" #https://fontawesome.com/v5/search?o=r&m=free&s=solid 아이콘 링크


author_profile: true # 옆에뜨는 프로파일

sidebar:
    nav: "docs"
search: true #검색해도 안뜨게함

date: 2023-05-16
last_modified_at: 2023-05-16
typora-root-url: ../
---

# Configuration 구성

_config.yml 파일을 통해 사이트 전부에 영향을 주는 설정 값을 바꿀 수 있습니다.
이 파일이 없다면 이 테마의 기본 _config.yml를 통해 만들거나 복사하세요.



**메모 :**  _config.yml 파일을 수정하여도 지킬 서버(로컬 서버)에는 자동으로 바로 반영되지 못해요.  지킬 서버를 재시작하여 적용 해주세요.
{: .notice--warning}


이 테마에 포함된 구성들을 살펴봅시다.
대부분 설정값의 기본 값과 예시를 제공하기 위해 글을 남겨놨어요.
각각의 자세한 설명들은 아래서 보죠.



## Site settings 설정값

#### Theme 테마
Ruby gem 버전의 테마를 사용하고있다면 아래의 코드가 필요해요. (_config.yml을 키자마자 바로보임)
```scss
theme: minimal-mistakes-jekyll
```

#### Skin 스킨
미리 있는 '스킨'을 통해 컬러 구성을 쉽게 바꿀 수 있어요
```scss
minimal_mistakes_skin: "default" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```
기본으로는 air가 적용되고 default 자리에 옆에 주석 처리된 스킨 중 하나를 넣으면 자동으로 바뀜
[스킨들의 간략한 모습은 여기서 확인가능.](https://mmistakes.github.io/minimal-mistakes/docs/configuration/#skin)

**메모 :**  테마의 css파일을 편집했다면 "minimal-mistakes"를 임포트 하기전에
"/assets/css/main.scss"에 @import "minimal-mistakes/skins/default"; // skin를 포함하도록 업데이트하세요.
{: .notice--warning}


