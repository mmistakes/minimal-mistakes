---
layout: single
title: "[CSS] 스크롤 시 배경이미지 고정하는 방법"
categories: CSS
tag: [CSS]
toc: true
---

## 배경 이미지 고정하는 방법

꿋꿋 프로젝트를 진행하면서, 컨텐츠가 많아지면 배경 이미지를 어떻게 해야할까 고민을 하다 배경 이미지를 고정하면 괜찮겠다 싶은 마음에 찾아보게 되었다. 그를 위해, 본문 컨텐츠 뒤의 배경 이미지를 고정시켜 스크롤 이동 시에도 같은 배경을 볼 수 있도록 고정하는 기능이 필요했다.

- 예시 : [꿋꿋 리뷰 페이지](https://ggdggd.vercel.app/review)

<div align="center">
  <img src="/img/2024-04-29/fixed.gif" alt="src 디렉토리 내 favicon.ico 파일 위치">
</div>
  
## background-attachment 속성

### background-attachment : 스크롤 시 배경이미지도 같이 스크롤 될 것인지에 대한 여부를 지정하는 속성이다.

- scroll(default) : 컨테이너 기준으로 배경이 고정된다. 컨테이너 내부의 요소들이 내용이 많아 스크롤이 생긴다면 컨테이너 중심으로 배경이 고정된다.
- fixed : 윈도우 창 기준으로 배경이 고정된다. 컨텐츠들의 내용에 상관없이 절대적으로 윈도우 창을 기준으로 위치하여 고정되어 있다.
- local : 컨테이너 기준으로 배경이 존재하지만, 스크롤이 내려가면, 그와 동시에 같이 이동한다.

- 이해자료 : [Background attachment example](https://mdn.github.io/learning-area/css/styling-boxes/backgrounds/background-attachment.html)

### TailwindCSS 사용 시, 아래와 같이 사용할 수 있다.

[TailwindCSS : background-attachment](https://tailwindcss.com/docs/background-attachment)

<div align="center">
  <img src="/img/2024-04-29/tailwindBgAttachment.png" alt="src 디렉토리 내 favicon.ico 파일 위치">
</div>

##### 참고자료

- [WEBSTORYBOY](https://webstoryboy.co.kr/1824)
