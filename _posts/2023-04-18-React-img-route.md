---
layout: single
title: "[React] 왜 React에서 img경로는 깨지는 걸까?"
categories: React
tag: [React, img, 경로]
toc: true
---

<img src="/img/logo/react.png" alt="리액트 로고">

## React에서는 이미지 경로가 이상하다.

```html
<img src="~~" />
```

HTML와 동일하게 작성하면 사진이 깨져서 나온다.

## 그 이유는 뭘까 ?

구글링을 해도 대부분 해결책만 주고, 문제의 원인은 제공해주지 않는다.  
그래서 내가 구글링 중 찾은 기록과 나의 생각을 남기고자 이 글을 쓴다.

[Using the image tag in React - Dave Ceddia](https://daveceddia.com/react-image-tag/)  
위 글을 정리 해본다면, 이것은 리액트의 문제가 아닌 서버 때문이라고 한다.  
우리는 리액트를 로컬에서 개발할 때, 대부분 `npm start`, `yarn start`등의 명령어 들을 통해 로컬 서버를 열고, HMR을 통해서 즉각적인 변화를 보며 작업을 진행한다.  
또한, 배포를 할 경우에도, 서버를 통해서 배포를 진행한다.

하지만, 이미지 경로를 로컬의 기준으로 작성한다면,  
요즘 대부분의 브라우저는 샌드박스로 처리되어 있어서 로컬의 경로로 파일에 엑세스 할 수 없다고 한다. 웹 서버가 동일한 위치에 해당 파일을 가지고 있지 않기 때문에 서버를 구동하거나, 앱을 배포하자마자 깨져보일 것이다.

따라서 우리는 img 태그를 사용할 때, src 속성값이 서버가 제공하는 위치를 가르켜야 한다.

여기에 내 생각을 덧붙이자면, 우리가 작성한 JSX는 index.html 파일 내 `<div id="root"></div>` 태그의 자식요소로 들어가게 된다. 따라서 img 태그의 경로를 현재 작성중인 JSX파일을 기준으로 불러와서 저장 후 컴파일을 진행하게 되면, JSX는 root의 자식으로 들어가게 될 것이고, 적용된 index.html 파일 내의 img태그 입장에서는 그 경로를 인식하지 못하게 된다고 생각한다.

## 해결 방법 [[CRA 공식 홈페이지]](https://create-react-app.dev/docs/adding-images-fonts-and-files/)

### 1. public 폴더에 이미지 파일 첨부

index.html파일이 public 폴더 내에 있으므로, 기준이 public 폴더가 된다.  
public 폴더에 이미지를 첨부하고, 그 기준으로 경로를 호출하면 문제가 되지 않는다.

<div align="left">
  <img src="/img/2023-04-18/public.png" alt="public 폴더 내 assets 폴더 내 image.png파일"/>
</div>
  
```jsx
export function ImportImage() {
  ...
  return (
    <img src="/assets/image.png" alt="..." />
  )
}
```

### 2. src폴더 내의 이미지 파일을 import

상대경로를 지정해서 이미지 파일을 import 하는 방법을 통해  
img 태그의 src 속성 경로로 지정할 수 있다.

<div align="left">
  <img src="/img/2023-04-18/srcpng.png" alt="src 폴더 내 assets 폴더 내 image.png파일"/>
</div>

```jsx
import Image from "../assets/image.png";

export function ImportImage() {
  ...
  return (
    <img src={Image} alt="..." />
  )
}
```

### 3. CSS background-image 속성을 통해 사용

CSS background-image 속성에 상대경로로 지정하여 사용할 수 있다.  
하지만, 웹 표준, 웹 접근성 관점에서 볼 때 주의해서 사용해야 할 것 같다.

<div align="left">
  <img src="/img/2023-04-18/srcpng.png" alt="src 폴더 내 assets 폴더 내 image.png파일"/>
</div>

```css
.Image {
  background-image: url(../assets/image.png);
}
```

### 4. 이미지 파일 자체를 하나의 Component로 사용(SVG파일)

SVG파일에 한정하여 이미지를 React Component로 지정할 수 있다.  
react-scripts@2.0.0버전 이상 혹은 react@16.3.0버전 이상에서 사용 가능하다.

<div align="left">
  <img src="/img/2023-04-18/srcsvg.png" alt="src 폴더 내 assets 폴더 내 image.svg파일"/>
</div>

```jsx
import { ReactComponent as Image } from '../assets/image.svg';

export function ImportImage() {
  ...
  return (
    <Image />
  )
}
```

### 5. node.js 메서드 require().default 사용

node.js 메서드인 require() 메서드를 사용하여 가져오는 방법이다.  
그냥 require('경로')만 작성하게 되면 리턴 값이 객체이므로,  
뒤에 .default로 변환해 주는 작업을 한번 더 거쳐야한다.  
이 방법은 export/import 와 동일하게 작동하고,  
현재 파일에서 외부 모듈을 사용할 수 있도록 해준다.

<div align="left">
  <img src="/img/2023-04-18/srcpng.png" alt="src 폴더 내 assets 폴더 내 image.png파일"/>
</div>

```jsx
export function ImportImage() {
  ...
  return (
    <img src={require('../assets/image.png').default} alt="..." />
  )
}
```

## 결론

앞서 말한 방법 이외에도 검색한 이미지의 링크를 직접 연결하는 방법 등 이미지를 불러오는 방법은 다양하다.
위 방법 중 정답은 없다. 이미지를 앱에 저장하지 않고, 서버에서 불러올 수도 있고,
현재 본인의 개발 환경에서 가능한 방법이나 익숙한 방법으로 하는 게 좋다고 생각한다.

[Display Images In React - Lorenzo Zarantonello](https://levelup.gitconnected.com/display-images-in-react-8ff1f5b1cf9a)  
경로 지정 방법을 정리해 놓은 글이다. 참고하기에 좋다.

## 용어 정리

###### HMR이란? [(Hot Module Replacement)](https://webpack.kr/guides/hot-module-replacement/)

> Hot Module Replacement의 약자로, 모든 종류의 모듈을 새로고침 할 필요 없이 런타임에 업데이트 가능하게 하는 Webpack에서 제공하는 기능

###### 샌드박스란? [(wikipedia)](<https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EB%B0%95%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EB%B3%B4%EC%95%88)>)

> 외부로부터 들어온 프로그램이 보호된 영역에서 동작해 시스템이 부정하게 조작되는 것을 막는 보안 형태
