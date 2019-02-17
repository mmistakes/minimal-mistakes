---
layout: post
title:  "Vuetify 를 이용한 UI 만들기 Part 1."
subtitle: "Layout 구성하기"
author: "코마"
date:   2019-02-12 21:00:00 +0900
categories: [ "veutify", "vue", "layout" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 Veutify 를 이용해 Web UI 를 꾸미기전에 Layout 을 잡는 방법을 소개해드리겠습니다.

<!--more-->

# 개요

Vuetify 는 Google 의 Material UI 프로젝트를 Vue 에 맞게끔 포팅한 버전입니다. 즉, UI 의 배치와 컴포넌트는 Google 의 철학을 따르고 있습니다.

그렇다면 모든 UI 프로젝트가 그렇듯 컴포넌트를 이쁘게 잘 배치하고 사용자가 편하게 이를 사용할 수 있도록 하는 것이 중요합니다. 저 **코마**는 여러분들에게 Layout 의 기본 개념을 설명드리고 실제로 컴포넌트의 레이아웃을 잡는 방법을 알려드리도록 하겠습니다.

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
