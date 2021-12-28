---
layout: single
title: "[Project] React 개인 프로젝트 Component 구조"
categories: Project
tag:
  [
    Project,
    React,
    개발 환경 설정,
    개인 프로젝트,
    토이 프로젝트,
    atomic design,
    Prettier,
    ESLint,
  ]
toc: true
author_profile: true
sidebar:
  nav: "docs"
---

# Project

**React 개인 프로젝트 - 개발 환경 구축 마무리 및 Component 구조**

## React 개인 프로젝트

### 개발 환경 설정

CRA 없이 개발 환경 구축

#### Prettier

yarn add -D prettier

devDependency에 prettier 추가

최상위 폴더에 .prettierrc 파일 추가

```json
{
  "singleQuote": true, // 작은 따옴표
  "semi": false, // 세미 콜론 사용여부
  "useTabs": false, // 스페이스 대신 tab 사용
  "tabWidth": 2, // tab 간격
  "trailingComma": "all", // 멀티라인 시 콤마 사용 여부
  "printWidth": 100, // 코드 한 줄 길이
  "endOfLine": "auto" // 개행(crlf \r\n, lf \n, cr \r) / auto -> 파일의 현재 개행문자
}
```

prettier는 속성들이 어렵지는 않다. 직관적이기도 하고.

추가해야할 속성이 있다면 prettier doc에서 확인하면 될 듯 하다.

#### ESLint

yarn add -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react

- eslint-config-prettier: ESLint의 포맷팅과 Prettier의 포맷팅 룰 겹치지 않도록 ESLint 포맷팅을 무시한다.
- eslint-plugin-prettier: prettier 상의 포맷팅 문제를 eslint 에러로서 표출해준다.
- eslint-plugin-react: ESLint가 React 문법을 이해할 수 있도록 하는 plugin

최상위 폴더에 .eslintrc 파일 추가

```json
{
  "plugins": ["prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "ignorePatterns": ["*.config.js"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto" // 개행관련 오류 발생하여 추가
      }
    ]
  }
}
```

아직 하나하나 설명은 할 수 없다..

#### Component 구조

atomic design 기반 디렉토리 구조

먼저 atomic design을 기반으로 디렉토리 및 컴포넌트 구조를 구축하려고 한다.

저번 Post It 프로젝트에 너무 막 하다보니, 나중에 추가도 어렵고, 심지어 Modal을 가장 바깥도 아닌 애매한 곳에 두게 되고,
수정 또한 어려웠다.

그래서 이번에 이러한 디렉토리 구조에 대해서 알아보았고, atomic design에 대해서 알게 되었다.

개념은 간단하다.

분해될 수 없는 가장 작은 단위로 컴포넌트들을 쪼개서 그것을 원자(atoms)에 담고, 원자가 모인 그룹을 분자(molecules),
그것들이 또 모여서 organisms가 되어 template, page를 구성한다는 것이다.

이렇게 되면 원자를 필요한 곳에서 여기저기서 재사용하여 사용할 수 있다.

또한, 디렉토리 구조가 깔끔하여 알아보기 쉽다! page는 몇 페이지인지 바로 확인할 수 있거나 재사용하려는 분자 단위 컴포넌트도 찾기 쉬울 것이다.

하지만, bottom-up 방식의 조금은 직관적이지 않은 방식 탓에 구성하는 데에 시간이 꽤 오래 걸린다.

아직 어떻게 해야하는지 모르겠어서 컴포넌트를 최대한 잘게 쪼개다가 1시간 동안 멍만 때린 것 같은 기분이다.

그래서 일단은 생각 나는대로 큰 컴포넌트 대로 나누고, 그 안에 필요한 원자들을 나누어 추가하였다.

<img src='./assets/images/211228_directory.JPG' />

#### 할 것

styled-component 추가 스타일링 하면서 진행

React-Router 페이지 별 동작 확인

Component (Pill Card) 완성하기
