---
layout: post
title:  "Docker 보안 강화 Part 1"
subtitle: "Docker Security Hardening Part-1"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-08-06 00:00:00 +0900
categories: [ "docker", "security", "hardening"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 Docker 보안 강화에 대해서 알아보도록 하겠습니다. 😺

<!--more-->

## 개요

도커는 가장 인기있는 컨테이너링 기술입니다. 호스트에서 곧바로 어플리케이션을 구동하는 방식에 비해 향상된 보안 수준을 제공할 수 있습니다. 그러나, 이러한 도커도 잘못 구성될 경우 보안상 취약점을 노출할 수 있습니다. 저 코마는 여러분에게 쉽고도 편리하게 도커의 보안 수준을 유지하는 방안을 소개해 드리고자 합니다.

{% include advertisements.html %}

## 소개 방식

보안에는 항상 우려 사항(concern)이라는 것이 문두에 오게됩니다. 만약 ~ 하면 ~ 해질 위험이 있다고 보통 표현하게됩니다. 이는 보안이 항상 임의의 나쁜 행위자가 있음을 염두하기 때문에 나타나는 사고 방식입니다.

그리고 이러한 사고방식은 보안 상의 위험을 미리 예측하고 기민하게 대응하도록 도와줍니다. 따라서, 저 코마는 이 사고 방식에 따라 **발생할 위험에 대해 Docker 보안 강화 방안을 설명드리고자 합니다.**

## 컨테이너 탈출 위험

영어를 그대로 옮겨 적다보니 표현이 조금 어색합니다. 그러나 말하고자 하는 바는 명확합니다. 컨테이너를 탈출하여 호스트 머신에 접근하는 행위는 대표적인 위험에 속합니다. 이것은 알려진 방식과 알려지지 않은 방식으로 나눌 수 있는데요.

알려지지 않은 방식은 확률 측면에서 다수의 나쁜 행위자들에게 알려져 있을 가능성이 높지 않기 때문에 배제하도록 하겠습니다.

단, 중요한 점은 알려진 방식에 의해서 도커가 이러한 위험에 노출되어 있는 경우입니다. 이에, 도커 사용자 여러분들은 아래의 사항을 지킴으로써 위험이 발생할 확률을 가능한 낮추는게 좋습니다.

- 주기적인 도커 엔진과 도커 머신의 패치 관리

아래의 링크는 도커 Community Edition 의 Change Log 입니다. 네 맞습니다. 오픈 소스이므로 항상 코드가 공개되어 있기 때문에, 취약점이 발견되고 조치되는 주기가 매우 빠릅니다. 따라서, 정기적으로 이러한 이슈들을 관찰할 필요가 있습니다.

- [깃헙: 도커 ChangeLog](https://github.com/docker/docker-ce/releases/tag/v18.09.2)

이글을 쓰는 시점에서 최신 이슈를 살펴보니, 역시 발표된 취약점이 있습니다. 공개된 취약점 식별 번호는 `CVE-2019-5736` 입니다.

- [CVE-2019-5736 : PoC](https://gist.github.com/bcb079e04c2a3101c422be07a262627c.git)
- [lxc : commit 내용](https://github.com/lxc/lxc/commit/6400238d08cdf1ca20d49bafb85f4e224348bf9d)


# 마무리

지금까지 프론트 앱을 Microservice 구현을 위해 컨테이너화를 하고 Nginx, Vue 구성이 제대로 동작하는지 확인하였습니다. 다음 장에는 Backend 를 구성하여 진정한 API Gateway 패턴을 구현해 보도록 하겠습니다. 지금까지 **코마** 였습니다.

구독해주셔서 감사합니다. 더욱 좋은 내용으로 찾아뵙도록 하겠습니다. 감사합니다

# 링크 정리

이번 시간에 참조한 링크는 아래와 같습니다. 잘 정리하셔서 필요할 때 사용하시길 바랍니다.

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-5736
- https://github.com/Frichetten/CVE-2019-5736-PoC/blob/master/main.go
- https://gist.github.com/code-machina/bcb079e04c2a3101c422be07a262627c
- https://github.com/lxc/lxc/commit/6400238d08cdf1ca20d49bafb85f4e224348bf9d
- https://resources.whitesourcesoftware.com/blog-whitesource/top-5-docker-vulnerabilities
- https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
- https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html
- https://docs.docker.com/get-started/