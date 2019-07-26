---
layout: post
title:  "Vuetify 를 이용한 UI 만들기 Part 1."
subtitle: "Layout 구성하기"
author: "코마"
date:   2019-02-17 21:00:00 +0900
categories: [ "veutify", "vue", "layout" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 Veutify 를 이용해 Web UI 를 꾸미기전에 Layout 을 잡는 방법을 소개해드리겠습니다.

<!--more-->

# 개요

Vuetify 는 Google 의 Material UI 프로젝트를 Vue 에 맞게끔 포팅한 버전입니다. 즉, UI 의 배치와 컴포넌트는 Google 의 철학을 따르고 있습니다.

그렇다면 모든 UI 프로젝트가 그렇듯 컴포넌트를 이쁘게 잘 배치하고 사용자가 편하게 이를 사용할 수 있도록 하는 것이 중요합니다. 저 **코마**는 여러분들에게 Layout 의 기본 개념을 설명드리고 실제로 컴포넌트의 레이아웃을 잡는 방법을 알려드리도록 하겠습니다.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- 수평형 광고 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7572151683104561"
     data-ad-slot="5543667305"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# Gird 시스템 이란

Veutify 는 12 구획으로 나누어진 그리드 시스템을 지원합니다. 그리드는 어플리케이션의 컨턴츠를 배열하는데 도움을 줍니다. 물론, 직접 CSS 를 조작하여 배치를 조정해도 됩니다만, 생산성 측면에서 이러한 시스템을 따르는 것이 유리합니다. 그리드 시스템은 5 가지 유형의 매체 타입에 맞추어져 있습니다. (향후에 추가되거나 늘어날지도 모르겠습니다.)

# Grid 시스템 사용

그리드 시스템을 사용하기 위해서는 아래의 세가지 컴포넌트를 알 필요가 있습니다.

- v-container
- v-layout
- v-flex

위의 콤포넌트들은 위에서 아래로 갈수록 하위 컴포넌트입니다. 즉 아래와 같은 코드 배치를 가집니다.

```html
<v-container>
  <v-layout>
    <v-flex>
    </v-flex>
    <v-flex>
    </v-flex>
  </v-layout>
</v-container>
```

그렇다면 각 컴포넌트의 역할을 알아보겠습니다.

## 컨테이너(v-container)

`v-container` 는 중앙 중심의 페이지에 적용됩니다. 만약 전체 너비를 이용하고자 할 경우 `fluid` 속성(prop) 을 전달해 줍니다. 아래와 같이 말이죠.

```html
<v-container fluid>
</v-container>
```

## 레이아웃(v-layout)

`v-layout` 컴포넌트는 각 섹션을 분리하는데 사용됩니다. 그리고 `v-flex` 를 사용하기 위해 필수입니다. flex 객체는 layout 내에 포함되어야 합니다.

## 플렉스(flex)

CSS 의 플렉스는 엘리먼트의 크기나 위치를 쉽게 잡아두는 도구입니다. 레이아웃을 효과적으로 표현하기 위해 도입된 도구입니다. 마찮가지로 v-flex 또한 이러한 역할을 도와줍니다.

# Grid 를 이용한 레이아웃 잡기

Vuetify.js 의 Grid 시스템을 이용해서 웹 UI 를 간편하게 잡아보도록 하겠습니다. UI 를 구성하기 위해 논리적 단위로 화면을 분할해야 합니다. 보통 브라우저는 수직 스크롤 이동에 익숙해져 있습니다. 따라서, 각 컴포넌트들이 수직으로 나열되면 일반적으로 보기에 좋습니다. 

이때 필요한 컴포넌트는 v-layout 과 v-flex 입니다. v-layout 에 수직 나열을 위한 column 키워드를 아래와 같이 지정해봅니다. 아래의 코드를 볼까요?

```html
<div id="app">
  <v-app>
    <v-container>
      <v-layout column>
         <v-flex>
          <v-sheet>
            우리는 인생을 사는 이유를 깨우쳐야한다.
          </v-sheet>
          <v-btn :label="btnLabel"> {{ btnLabel }}</v-btn>
         </v-flex>
        <v-flex>
             <v-btn :label="btnLabel"> {{ btnLabel }}</v-btn>
         </v-flex>
        <v-flex>
             <v-btn :label="btnLabel"> {{ btnLabel }}</v-btn>
         </v-flex>
      </v-layout>
    </v-container>  
  </v-app>
</div>
```

아래는 codepen.io 에서 동일한 코드를 실행한 결과입니다. 여러분이 경계를 잘 확인하도록 border 속성을 미리 설정해 두었습니다.

<!-- https://codepen.io/code-machina/pen/ErqKxR -->

<pre class="codepen" data-height="470" data-type="result" data-href="ErqKxR" data-user="code-machina" data-safe="true"></pre>

## 레이아웃 응용 (2단 패널)

그렇다면 조금의 응용을 해보겠습니다. 우리가 보통 보는 커뮤니티 사이트들은 보통 본문에 속하는 패널과 다른 부수적인 정보를 담는 2단형 패널을 사용합니다. 그리드 시스템을 사용하면 아주 손쉽게 이를 구현할 수 있습니다. 좌측 패널은 메인 패널이며 우측 패널은 다른 정보를 참조하는 패널입니다. 저 코마는 이를 8:4의 비율로 나누었습니다.

아래는 codepen 샘플입니다. 다양한 샘플들을 감상하기 위해서는 [코마의 Vuetify 샘플](https://codepen.io/code-machina) 를 참조해주세요. 저 코마는 여러분들을 위해서 다양한 예시 및 샘플들을 제공해 드리겠습니다.

<!-- https://codepen.io/code-machina/pen/PVMNdW -->

<pre class="codepen" data-height="470" data-type="result" data-href="PVMNdW" data-user="code-machina" data-safe="true"></pre>

## 2단 패널 코드 설명

2단 패널은 단순히 v-layout, v-flex 의 조합입니다. 간단한 규칙과 그리드 시스템을 잘 파악하고 있다면 여러분들도 충분히 원하는 레이아웃을 설정할 수 있으며 때에 따라서 이 설정을 바꿀 수 있습니다. 바로 Vue 를 이용해서 말이죠. Vue 에 대한 토픽은 나중에 다룰 예정입니다. 그러나 실망하지 마세요. 코마는 여러분들의 실력 향상을 위한 많은 계획을 가지고 있습니다.

각설하고 코드 리뷰 후에 오늘의 Veutify 강좌 1탄을 마치도록 하겠습니다.

- 단계 1. 코드 영역을 수직으로 나눈다. (v-layout[column] > v-flex 을 사용)

```html
<v-layout column>
  <!-- 타이틀 영역 -->
  <v-flex>

  </v-flex>
  <!-- 본문 영역 -->
  <v-flex>
  </v-flex>
</v-layout>
```

- 단계 2. `본문 영역`을 수평으로 2단으로 분리한다. (v-layout[row] > v-flex > v-layout[column])

```html
<!-- 본문 영역 -->
  <v-flex>
    <v-layout row>
      <!-- 2단 패널의 좌측 -->
      <v-flex xs8>
      </v-flex>
      <!-- 2단 패널의 우측 -->
      <x-flex xs4>
      </x-flex>
    </v-layout>
  </v-flex>
```

- 단계 3. 각 영역에 컴포넌트들을 채워넣기

```html
<!-- 코드 영역을 크게 두개로 나눈다. -->
<v-layout column>
  <!-- 타이틀 영역 -->
  <v-flex>

  </v-flex>
  <!-- 본문 영역 -->
  <v-flex>
    <v-layout row>
      <!-- 2단 패널의 좌측 -->
      <v-flex xs8>
        <v-layout column>
          <v-flex>
            <div class="componentA">
            </div>
          </v-flex>
          <v-flex>
            <div class="componentA">
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- 2단 패널의 우측 -->
      <x-flex xs4>
        <v-layout>
          <v-flex>
            <div class="helper">

            </div>
          </v-flex>
        </v-layout>
      </x-flex>
    </v-layout>
  </v-flex>
</v-layout>
```

# 코마의 핵심 요약

눈치가 빠르신 분들은 구조의 일관된 규칙이 있음을 알 수 있습니다. 물론 눈치채지 못하셔도 상관 없습니다. **코마**는 항상 요점 정리를 제공합니다. 코드를 보면 v-flex 가 왜 이렇게 많이 등장하는가 질문하실 수 있습니다. 여기에는 설계 방식에 따른 논리적 구분의 필요성이 내재하고 있습니다. 그러나 우리가 그들의 설계 철학까지 알 필요는 없습니다. 그저 원칙만 잘 지키면 되는 것입니다.

- **코딩 규칙**
  - v-layout 내에 하나 이상의 v-flex 가 나열될 수 있다.
  - v-layout 이 존재하면 v-flex 가 반드시 필요하다.
  - v-layout 내에 v-layout 이 필요한 경우 v-layout > v-flex > v-layout 구조를 사용해야 한다.

# 결론

오늘은 Vuetify.js 를 이용해 Web 화면의 레이아웃을 정의하는 방법을 알아보았습니다. 저는 코드를 구성하기 전에 전체 틀을 잡는 것이 가장 중요하다고 생각됩니다. 강력한 기능의 컴포넌트들은 그때 그때 만들어서 배치하거나 미리 별도의 폴더에 따로 만들어 두면 됩니다. 그러나 아무리 기능이 강력하더라도 일관된 규칙이 없다면 보기에 상당히 불편합니다. 독자 분들은 그러한 상황을 좋아하지 않을 것이라고 생각합니다.

지금까지 **코마**의 훈훈한 블로그 였습니다. 구독해 주셔서 감사합니다. 더욱 발전하는 모습을 보여드리기 위해 노력하도록 하겠습니다.

