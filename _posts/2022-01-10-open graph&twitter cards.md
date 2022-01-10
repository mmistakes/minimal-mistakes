---
layout: single
title:  "오픈 그래프&트위터 카드"
categories: study
typora-root-url: ../
---


### 오픈 그래프 ( The Open Graph protocol )

오픈 그래프란, 웹 페이지가 소셜 미디어에 공유될 때 우선적으로 보여지는 이미지, 정보 등을 지정하는 것

![Slack Open Graph example](https://raw.githubusercontent.com/ParkYoungWoong/starbucks-vanilla-app/master/_assets/slack_message_og_example.jpg)

![KakaoTalk Open Graph example](https://raw.githubusercontent.com/ParkYoungWoong/starbucks-vanilla-app/master/_assets/kakao_og_example.jpg)

```
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Starbucks" />
<meta property="og:title" content="Starbucks Coffee Korea" />
<meta property="og:description" content="스타벅스는 세계에서 가장 큰 다국적 커피 전문점으로, 64개국에서 총 23,187개의 매점을 운영하고 있습니다." />
<meta property="og:image" content="./images/starbucks_seo.jpg" />
<meta property="og:url" content="https://starbucks.co.kr" />
```

다음과 같이 meta 태그 안에 서술되며 og는 Open Graph의 약어 이다.

* <code>og:type<code>  : 페이지의 유형을 나타냄 ex) <code>website<code>,<code>video.movie<code>
* <code>og:site_name<code> : 사이트의 이름
* <code>og:title<code> : 페이지의 이름
* <code>og:description<code> : 페이지의 간단한 설명 ( 내용이 너무 많으면 카카오톡의 경우 불건전 정보로 인식 )
* <code>og:image<code> : 페이지의 대표 이미지 주소
* <code>og:url<code> : 페이지의 주소



### 트위터 카드 ( Twitter Cards)

트위터 카드는 웹 페이지가 트위터로 공유될 때 우선적으로 보여지는 이미지와 정보를 지정하는 것



사용법은 오픈 그래프의 약어인 <code>op<code>를 <code>twitter<code>로 바꾸면 된다.