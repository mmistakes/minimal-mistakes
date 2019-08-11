---
layout: post
title:  "도커 오버레이 네트워크(Docker Overlay Network) 알아보기"
subtitle: "오버레이 네트워크 활용 전략"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-09 00:00:00 +0900
categories: [ "docker", "network", "overlay"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 도커의 오버레이 네트워크(Docker Overlay Network)에 대해서 알아보도록 하겠습니다. 😺

<!--more-->

## 개요

이 글을 통해서 여러분은 브릿지란 무엇인지 그리고 네트워크 분야와 도커 영역에서의 브릿지가 가지는 차이점에 대해서 이해할 수 있습니다.

또한, 도커에서 브릿지를 사용할 때 **주의 해야할 구성**을 이해할 수 있기 때문에 기술 면접, 인터뷰, 기술 영업 등에서 유용하게 써먹을 수 있는 개념입니다.

마지막으로 도커 브릿지의 이론적인 영역과 네트워크 지식을 겸비하여 도커 가상 네트워크를 구성하는 역량을 기르는 바탕을 키울 수 있습니다.

{% include advertisements.html %}

## 참고

- [도커 Docs: 오버레이 네트워크](https://docs.docker.com/network/overlay/)
- [](https://docs.docker.com/network/network-tutorial-overlay)