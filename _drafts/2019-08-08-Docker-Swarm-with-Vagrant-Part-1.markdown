---
layout: post
title:  "Vagrant 를 이용한 Docker Swarm 테스팅 (Windows 10)"
subtitle: "빠르게 구축하고 테스팅하기"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-08 00:00:00 +0900
categories: [ "docker", "swarm", "vagrant", "windows10", "virtualbox"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다.  😺

<!--more-->

## 개요



{% include advertisements.html %}


## 요구 사항

- Hyper-V 설정 Off
  - 프로그램 설정에서 Hyper-V 를 Off 합니다.
- VT-X 설정 Off

- Device Guard 설정 위치
![Device Guard](/assets/img/2019/08/guard-off-1.png)

- 설정 Disabled 상태로 변경 확인
![Device Guard](/assets/img/2019/08/guard-off-2.png)

{% include advertisements.html %}

## 

## 마무리

지금까지 프론트 앱을 Microservice 구현을 위해 컨테이너화를 하고 Nginx, Vue 구성이 제대로 동작하는지 확인하였습니다. 다음 장에는 Backend 를 구성하여 진정한 API Gateway 패턴을 구현해 보도록 하겠습니다. 지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

## 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- [Babun, Vagrant](https://medium.com/@robzhu/setting-up-a-docker-host-on-windows-with-vagrant-37db0250190c)
- [Vagrantfile : Ubuntu 16.04 + Docker Setup](https://gist.github.com/code-machina/1994fb4c8546a680d58b61a5cdbc1fe2)
- [Docker Swarm Node](http://redgreenrepeat.com/2018/10/12/working-with-multiple-node-docker-swarm/)