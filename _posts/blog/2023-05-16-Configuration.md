---
layout: single
title:  "Configuration 해석"


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
오역이 많습니다.
{: .notice--danger}

# Configuration 구성

[지킬의 구성파일인 ](https://jekyllrb.com/docs/configuration/):`_config.yml` 파일을 통해 사이트 전부에 영향을 주는 설정 값을 바꿀 수 있습니다.
이 파일이 없다면 이 테마의 [기본`_config.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_config.yml)를 통해 만들거나 복사하세요.




**메모 :**  `_config.yml` 파일을 수정하여도 `지킬 서버(로컬 서버)`에는 자동으로 바로 반영되지 못해요.  지킬 서버를 재시작하여 적용 해주세요.
{: .notice--warning}


이 테마에 포함된 구성들을 살펴봅시다.
대부분 설정값의 기본 값과 예시를 제공하기 위해 글을 남겨놨어요.
각각의 자세한 설명들은 아래서 보죠.



## Site settings 설정값

### Theme 테마
Ruby gem 버전의 테마를 사용하고있다면 아래의 코드가 필요해요. (_config.yml을 키자마자 바로보임)
```yaml
theme: minimal-mistakes-jekyll
```

### Skin 스킨
미리 있는 '스킨'을 통해 컬러 구성을 쉽게 바꿀 수 있어요
```yaml
minimal_mistakes_skin: "default" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```
기본으로는 air가 적용되고 default 자리에 옆에 주석 처리된 스킨 중 하나를 넣으면 자동으로 바뀜
[스킨들의 간략한 모습은 여기서 확인가능.](https://mmistakes.github.io/minimal-mistakes/docs/configuration/#skin)

**메모 :**  테마의 css파일을 편집했다면 `minimal-mistakes`를 임포트 하기전에
[`/assets/css/main.scss`](https://github.com/mmistakes/minimal-mistakes/blob/master/assets/css/main.scss)에 `@import "minimal-mistakes/skins/default"; // skin`를 포함하도록 업데이트하세요.
{: .notice--warning}

### Site locale
`site locale`은 사이트안의 페이지들의 기본 언어를 설정하는 값입니다.
(_data/ui-text.yml로 가면 설정한 값이 무슨 값들을 바꾸는지 알 수 잇숩니다.)

예를 들어 `locale: "en-US"`로 값을 설정하면 사이트의 `lang`속성이 미국 영어 스타일로 설정되고 `locale: "en-GB"`로 설정하면 영국 영어 스타일로 설정됩니다.
나라, 언어 설정은 선택적인 것이고 `locale: "en"`과 같은 축약형도 가능합니다.
원하는 나라, 언어의 설정 값은 [이곳에서 볼 수 있습니다.](https://learn.microsoft.com/en-us/previous-versions/commerce-server/ee825488(v=cs.20)?redirectedfrom=MSDN)


적절한 locale설정은 [UI Text](https://mmistakes.github.io/minimal-mistakes/docs/ui-text/) data file(date/ui-text.yml)안에 있는 적응형 텍스트 연결에 중요한 역할을 합니다. 잘못된 값을 넣으면 UI일부가 없어집니다 (예 버튼 라벨, 섹션 제목)

한국어 설정은 다음과 같이 하면 됩니다.
```yaml
locale                   :  "ko-KR" 
```

**메모 :**  이 테마는 영어를 기본적으로 제공합니다.(`en', 'en-US', 'en-GB`)
만약 `_config.yml`안의 `locale`을 바꾼다면 대부분의 UI text는 비어있을거에요.
이를 피하기 위해 일치하는 로케일 키와 번역된 텍스트를 `_data/ui-text.yml`에 추가하세요.
(구버전 메모같습니다? 지금은 신경쓰지 않아도 됩니다.)
{: .notice--warning}

### Site title
당신의 사이트 이름입니다.
사이트 마스트헤드 및 `<title>` 태그와 같은 위치에서 테마 전체에 사용됩니다.

*예시*: `title: "{{site.title}}"`

"`SEO(검색 엔진 최적화)`와 친화적인 페이지 제목"에 사용되는 구분 문자를 설정할 수 있습니다.

*예시*: {{ page.title }} `|` {{ site.title }}

**메모 :**  긴 사이트 타이틀은 마스터헤드 공간을 깨부숴버립니다. 제목을 길게하지 마세요. 
실제로도 제목이 길면 마스터헤드 레이아웃에 구분 문자가 사용되지 않습니다.
{: .notice--warning}


### Site subtitle 부제목
부제목입니다. 그게 답니다.

현재 저의 부제목은 `{{site.subtitle}}` 입니다.

### Site name
사이트 작성자입니다.
특정 게시물, 페이지, 문서 모음에서 따로 재정의 할 수 있습니다.
제 사이트 네임은 `{{site.name}}`입니다. 작성자는 사이트의 footer, 즉 맨 페이지 맨 아래로 내려보면 확인할 수 있숨다.
```yaml
name: "{{site.name}}" 
```
하고 설정 값을 준 것이지요.

**앙 꿀팁띠 :**  야무지게 YAML언어를 사용하고 싶다구요? 이럴땐 [anchors를 사용하세요.](https://yaml.org/spec/1.2-old/spec.html#id2785586)   
값이 중복되서 사용될 때는 변수 선언을 하고 변수를 사용함으로 야무지게 재사용 할 수 있습니다.
 `_config.yml` 파일 안이면 어디서든지요! 간단합니다.
`$변수명 변수값` 가 선언이구요 `*변수명`이 변수 호출입니당.
예를들어 다음과 같이 `&sivar "안녕"`이라고 변수를 선언했다면 `*sivar`을 사용하여 `"안녕"`이라는 값을 재사용 할 수 있어요.
{: .notice--info}


### Site description 사이트 설명
말 그대롭니다. 사이트를 설명하는 글을 적으면 됩니다.
`SEO(검색 엔진 최적화)` 개선을 위해 주로 사용됩니다. 즉, 여기에 적어주는 값을 통해 단서를 얻어
검색 엔진이 검색을 입력받고 이 사이트를 띄울지 말지에 대해 정하게합니다.
만일 요리 블로그를 만들고 싶다면 대충 이렇게 작성하면 좋겠죠?
```yaml
description: : "다양한 요리를 연구하고 공유하는 블로그"
```

### Site URL 사이트 주소
사이트의 기본 호스트 이름 및 프로토콜입니다.
깃허브를 통해 호스팅하고 있는 경우
```yaml
 url: `"https://mmistakes.github.io"`
```
와 비슷한 형태일 겁니다.
커밋커밋
커밋커밋2

