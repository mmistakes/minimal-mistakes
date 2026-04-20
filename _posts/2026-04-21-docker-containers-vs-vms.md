---
layout: single
title: "Docker 01. 컨테이너와 VM은 무엇이 다른가"
description: "Docker 컨테이너를 VM과 비교하면서 이미지, writable layer, volume, bind mount까지 초급자 관점으로 정리한 글."
date: 2026-04-21 09:00:00 +0900
lang: ko
translation_key: docker-containers-vs-vms
section: development
topic_key: devops
categories: DevOps
tags: [docker, container, vm, volume, bind-mount]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Docker를 처음 볼 때 가장 흔한 오해는 "컨테이너는 가벼운 VM"이라는 표현을 사실로 받아들이는 것이다. 이 말은 방향만 얼핏 맞고, 실무 판단에는 자주 부족하다. 컨테이너는 운영체제 전체가 아니라 격리된 프로세스에 가깝고, 이미지와 writable layer, volume, bind mount를 함께 봐야 실제 동작이 선명해진다.

이 글은 Docker 시리즈의 출발점으로 컨테이너와 VM의 차이를 초급자 관점에서 정리한다. 결론부터 말하면 Docker를 이해하는 가장 실용적인 시작점은 "컨테이너는 이미지에서 시작된 격리된 실행 단위"라고 보고, 데이터 지속성은 기본 writable layer가 아니라 별도 mount로 다뤄야 한다는 점을 먼저 잡는 것이다.

## 문서 정보

- 작성일: 2026-04-20
- 검증 기준일: 2026-04-20
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. 현재 작성 환경의 Windows PowerShell에서 `docker` CLI가 잡히지 않아 Docker 공식 문서 예시를 기준으로 정리했다.
- 테스트 버전: Docker CLI/Engine 로컬 버전 미확인, Docker 공식 문서 2026-04-20 확인본
- 출처 등급: Docker 공식 문서만 사용했다.
- 비고: 이 글은 cgroup, namespace, seccomp를 깊게 설명하는 보안 글이 아니라, 이후 Dockerfile과 registry 글을 읽기 위한 기초 개념 정리에 초점을 둔다.

## 문제 정의

Docker 입문에서 아래 지점이 가장 자주 섞인다.

- 컨테이너가 VM과 같은 수준의 격리 단위인지 헷갈린다.
- 이미지와 컨테이너를 같은 것으로 착각한다.
- 컨테이너 안에 저장한 데이터가 왜 사라지는지 초기에 이해하지 못한다.
- Windows나 macOS에서 Docker Desktop을 쓸 때도 "컨테이너가 언제나 호스트 커널을 직접 공유한다"고 단정한다.

이번 글의 범위는 Docker의 가장 기본적인 실행 모델이다. 이미지 빌드, Dockerfile 작성, build cache, registry push는 다음 글에서 따로 다룬다.

## 확인된 사실

- 공식 문서 기준으로 Docker는 애플리케이션을 개발, 전달, 실행하기 위한 오픈 플랫폼이며, 컨테이너를 배포와 테스트의 단위로 다룬다.
  근거: [What is Docker?](https://docs.docker.com/get-started/docker-overview/)
- 공식 문서 기준으로 컨테이너는 애플리케이션 구성 요소별로 실행되는 격리된 프로세스이며, self-contained, isolated, independent, portable하다고 설명된다.
  근거: [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- 공식 문서 기준으로 VM은 자체 kernel과 운영체제를 포함하는 반면, 여러 컨테이너는 같은 kernel을 공유할 수 있다.
  근거: [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- 공식 문서 기준으로 Docker Desktop은 native Windows container를 제외하면 모든 컨테이너를 customized Linux VM 안에서 실행한다.
  근거: [Container security FAQs](https://docs.docker.com/security/faqs/containers/)
- 공식 문서 기준으로 컨테이너 내부에 기본으로 생성되는 파일은 read-only 이미지 레이어 위의 writable container layer에 저장되며, 컨테이너가 파괴되면 이 데이터는 유지되지 않는다.
  근거: [Storage](https://docs.docker.com/engine/storage/)
- 공식 문서 기준으로 volume은 Docker daemon이 관리하는 persistent storage이고, bind mount는 host path와 container path를 직접 연결한다.
  근거: [Storage](https://docs.docker.com/engine/storage/)

공식 문서의 가장 기본적인 실행 예시는 아래와 같은 흐름이다.

```powershell
docker run -d -p 8080:80 docker/welcome-to-docker
docker ps
docker stop <container-id>
```

이 예시는 "이미지 하나를 실행 가능한 컨테이너로 띄운다"는 Docker의 핵심 흐름을 가장 짧게 보여준다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-20 현재 작성 환경의 PowerShell에서 `docker` 명령은 인식되지 않았다.

```powershell
docker --version
```

- 실행 결과 요약: `docker` CLI가 PATH에서 발견되지 않아 컨테이너 실행 예제를 이 환경에서 직접 재현하지 못했다.
- 직접 재현 없음: 따라서 이 글의 명령 예시와 동작 설명은 2026-04-20 기준 Docker 공식 문서가 직접 보여 주는 CLI 형태와 설명을 기준으로 정리했다.

## 해석 / 의견

내 판단으로는 Docker 입문에서 가장 먼저 버려야 할 표현은 "컨테이너는 그냥 작은 VM"이라는 말이다. 이 비유는 초반에 감을 잡는 데는 도움이 될 수 있지만, 곧바로 잘못된 기대를 만든다. VM처럼 통째 운영체제가 따로 뜬다고 생각하면 이미지와 컨테이너의 관계, writable layer의 휘발성, volume과 bind mount의 필요성이 늦게 이해된다.

실무적으로 더 유용한 이해 틀은 이렇다. 이미지는 실행에 필요한 파일과 설정을 담은 read-only 패키지이고, 컨테이너는 그 이미지 위에 얇은 writable layer와 실행 옵션이 붙은 "실행 중인 인스턴스"다. 그래서 컨테이너를 지웠을 때 데이터가 함께 사라지는 것은 이상한 현상이 아니라 기본 동작에 가깝다.

또 하나 중요한 점은 Windows와 macOS에서 Docker를 배운 사람에게 "컨테이너는 언제나 호스트 커널을 직접 공유한다"고 단정해서 설명하면 안 된다는 것이다. Linux host에서는 그 설명이 핵심에 가깝지만, Docker Desktop에서는 Linux VM이 중간에 들어간다. 따라서 개발 환경 설명과 운영 환경 설명을 같은 문장으로 뭉개면 초급자가 volume, bind mount, file sharing, host access를 이해할 때 더 빨리 헷갈린다.

초급자 기준으로는 이 글에서 세 가지를 먼저 기억하면 된다.

- 컨테이너는 운영체제 전체보다 격리된 프로세스에 가깝다.
- 이미지와 컨테이너는 같지 않다.
- 데이터 지속성이 필요하면 기본 writable layer만 믿지 말고 volume이나 bind mount를 따로 봐야 한다.

## 한계와 예외

이 글은 Docker의 격리 메커니즘을 kernel 기능 수준으로 깊게 설명하지 않는다. `namespace`, `cgroup`, capability, seccomp, rootless mode, user namespace isolation은 이후 보안 관점 글에서 별도로 다뤄야 할 주제다.

또한 이 글은 Linux container 중심 설명이다. Docker 공식 문서도 Windows container를 별도 예외로 다루므로, Windows container의 이미지 호환성이나 `windowsfilter` storage driver까지는 여기서 다루지 않았다.

무엇보다 현재 작성 환경에는 Docker CLI가 없어서 컨테이너 실행과 storage mount 예제를 직접 재현하지 못했다. 따라서 여기서 사실로 적은 내용은 Docker 공식 문서가 직접 설명하는 범위에 한정한다.

## 참고자료

- Docker Docs, [What is Docker?](https://docs.docker.com/get-started/docker-overview/)
- Docker Docs, [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- Docker Docs, [Storage](https://docs.docker.com/engine/storage/)
- Docker Docs, [Container security FAQs](https://docs.docker.com/security/faqs/containers/)
