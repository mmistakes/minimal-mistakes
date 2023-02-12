---
layout: single
title: 'react create app없이 webpack과 babel로 react개발하기-1'
categories: 'React'
tag: [webpack, babel, react]
toc: true
toc_label: 'Contents'
toc_sticky: true
author_profile: false
sidebar:
  nav: 'sidebar-category'
---

React create app을 사용하면 모든 것이 자동으로 생성되서 편리하다. 하지만, 편리함을 만끽하기전에 하나씩 세팅을 해보면서 원리를 파악하고 React create app이 어떤 것들을 자동으로 생성해주는 깨닫는 것이 좋다.
Webpack과 Babel을 이용하여 React 개발/끝말잇기게임을 만드는 과정을 써보고자 한다.

> 제로초님의 리액트 강의를 듣고 정리한 내용이다. [@ZeroCho TV](https://www.youtube.com/@ZeroChoTV)

### Webpack이란?

---

Webpack은 여러 개의 모듈(javascript, css, html, image 등)을 하나의 javascript 파일로 묶어주는 모듈 번들러(bundler)이다. React를 통해 개발을 한다면 기능을 여러 컴포넌트로 분리할 것이다. webpack은 이렇게 쪼개져 있는 컴포넌트들을 하나의 javascript로 변환해 준다.

### Webpack을 이용한 React 개발하기

---

#### 1. 설치

- init

```
npm init
```

  <img src="/assets/images/2023-02-12/1.png" width="300" height="200"/>

package name, author, license를 작성하고 yes 하면, package.json 파일이 생긴다.

- react와 react-dom을 설치

```
npm i react react-dom
```

- webpack과 webpack-cli를 설치

```
npm i -D webpack webpack-cli
```

-D로 개발용으로 설치한다.

package.json에서 react와 webpack이 설치되었음을 확인할 수 있다.

<img src="/assets/images/2023-02-12/2.png" width="200" height="150"/>

#### 2. webpack.config.js 작성하기

현재 디렉토리에 webpack.config.js 파일을 생성하고 기본적인 설정을 한다.
