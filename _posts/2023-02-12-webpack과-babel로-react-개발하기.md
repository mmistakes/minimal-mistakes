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
Webpack과 Babel을 이용하여 **React 개발/끝말잇기게임**을 만드는 과정을 써보고자 한다.

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

**name**

- 원하는 이름으로 설정한다.

**mode**

- 개발용은 'development', 실서비스는 'productio'으로 넣어준다.

**entry(입력)**

- 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로입니다.
  현재디렉토리에 client.js 을 대상으로 웹팩이 빌드를 수행하는 코드입니다.

**output(출력)**

- 웹팩을 돌리고 난 결과물의 파일 경로를 의미합니다.

```

path: path.join(__dirname, 'dist'),
filename: 'app.js',
publicPath: '/dist',

```

path는 output으로 나올 파일이 저장될 경로입니다.
**path.join()**은 경로를 알아서 합쳐주고, **\_\_dirname**은 현재경로를 , **'dist'**는 현재경로에 'dist'라는 폴더의 생성을 의미합니다.
filename은 원하는 파일의 이름을 넣어줍니다.(대부분 app.js를 넣어준다.)
publicPath는 파일들이 위치할 서버 상의 경로입니다.

##### 2-1. webpack 실행시키는 법

package.json파일 script에

```
 "scripts": {
    "dev": "webpack"
  },
```

를 추가하고 `npm run dev` 또는 `npx webpack` 으로 실행한다.

##### 2-2. babel 설치

리액트의 JSX같은 문법을 브라우저에서 사용하기 위해 babel을 설치하고 webpack에 연결하여야 한다.

```
npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
```

babel-loader와 @babel/core는 필수이고, 나머지 preset은 선택입니다. preset-react는 jsx와 같은 형태를 지원하고, preset-env는 브라우저가 알아서 최신문법을 환경에 맞게 옛날 문법으로 바꿔준다.
