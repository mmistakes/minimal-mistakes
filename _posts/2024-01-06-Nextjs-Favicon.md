---
layout: single
title: "[Next.js] Next.js에서는 favicon 설정을 어떻게 할까?"
categories: JS
tag: [Next, favicon, SEO]
toc: true
---

# Next.js를 사용하는 프로젝트에서는 favicon 설정을 어떻게 해야하나.

애플 디벨로퍼 아카데미에서 개발하여 출시한 서비스 꿋꿋의 웹 프론트엔드 제작을 부탁받았다.
디자인 시안이 주어졌고, 백엔드는 후에 작업하려고 한다.
프로젝트를 진행하면서 검색엔진 최적화가 반드시 필요하다는 이야기가 기억이 나서 기본적인 것들을 찾아보면서,
SEO에 가장 기본이 되는 파비콘 설정을 하려고 한다.
그런데 Next.js에서는 파비콘 설정을 어떻게 해야 하는 지 몰라서 정리를 해두려고 한다.
아래 사항은 Next.js v13 이상의 App Router를 사용하는 프로젝트에만 해당하는 내용이라는 것을 명심하자.

## 파일만 바꾸고, 이름은 동일하게

`npx create-next-app {app 이름}` 명령어를 통해서 Next.js 앱을 생성하면,
파비콘 파일은 {app}/src/app/favicon.ico 루트로 존재한다.

<div align="center">
  <img src="/img/2024-01-06/src.png" alt="src 디렉토리 내 favicon.ico 파일 위치">
</div>

이 부분에서 기존 favicon.ico 파일(vercel 로고)을 삭제하고, 원하는 이미지 파일을 favicon.ico 라는 이름으로 변경해 주면 된다.  
한마디로 app 디렉터리 최상단에 위치시키면 된다는 이야기다.

실제로 Next.js 공식홈페이지에서도 아래 사진과 같이 유효한 위치에 대해서 표로 정리해 두었다.

<img src="/img/2024-01-06/routes.png" alt="src 디렉토리 내 favicon.ico 파일 위치">

위와 같이 설정한다면 실제 head 태그에 적용되는 모습은 아래와 같이 나온다고 이야기한다.

<img src="/img/2024-01-06/output.png" alt="src 디렉토리 내 favicon.ico 파일 위치">

## reference

[Next.js github discussions](https://github.com/vercel/next.js/discussions/50704)
[Next.js - favicon, icon, and apple-icon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
