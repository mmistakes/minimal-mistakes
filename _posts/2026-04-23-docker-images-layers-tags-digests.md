---
layout: single
title: "Docker 02. 이미지, 레이어, 태그, digest를 어떻게 이해해야 하는가"
description: "Docker image, layer, tag, digest의 차이와 배포 시 무엇을 가변 값으로 두고 무엇을 고정해야 하는지 정리한 글."
date: 2026-04-23 09:00:00 +0900
lang: ko
translation_key: docker-images-layers-tags-digests
section: development
topic_key: devops
categories: DevOps
tags: [docker, image, layer, tag, digest]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Docker를 조금만 써도 `image`, `layer`, `tag`, `digest`가 계속 같이 나온다. 그런데 초급자 입장에서는 이 네 단어가 모두 "이미지 버전 비슷한 것"처럼 보이기 쉽다. 실제로는 역할이 다르다. 이미지는 불변 패키지이고, 레이어는 그 이미지를 이루는 파일 시스템 변화 단위이며, 태그는 사람이 붙이는 이름표에 가깝고, digest는 실제 내용을 가리키는 고정 식별자에 가깝다.

이 글의 결론은 간단하다. 로컬 개발과 사람 간 협업에서는 tag가 편하고, 재현성과 배포 고정에는 digest가 중요하다. tag만 믿으면 "같은 이름인데 다른 내용"을 나중에 만나기 쉽고, digest만 쓰면 운영이 지나치게 불편해질 수 있으므로 둘을 역할별로 나눠 써야 한다.

## 문서 정보

- 작성일: 2026-04-20
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, Docker Desktop for Windows. Docker Desktop과 `docker-desktop` WSL 배포판을 재시작한 뒤 `desktop-linux` context에서 Linux container로 실행했다.
- 테스트 버전: Docker Desktop 4.70.0(224270), Docker CLI/Engine 29.4.0(API 1.54), Docker Compose v5.1.2, Docker Buildx v0.33.0-desktop.1. Docker 공식 문서는 2026-04-20 확인본을 기준으로 삼았다.
- 출처 등급: Docker 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 multi-platform manifest와 image signing을 다루지 않고, 초급자가 tag와 digest를 구분하는 데 필요한 최소 개념에 집중한다.

## 문제 정의

초급자가 이미지를 다룰 때 흔히 아래에서 막힌다.

- image와 container를 같은 것으로 착각한다.
- layer가 왜 필요한지, 실제로 무엇이 layer인지 감이 안 온다.
- `latest` 같은 tag를 버전처럼 믿는다.
- digest를 보면 너무 길어서 "실무에서 굳이 써야 하나"라고 느낀다.

이번 글은 Docker image 자체를 이해하는 데 필요한 최소 개념을 정리한다. registry push 흐름은 다음 글에서 따로 다룬다.

## 확인된 사실

- 공식 문서 기준으로 container image는 컨테이너 실행에 필요한 파일, 바이너리, 라이브러리, 설정을 담은 standardized package다.
  근거: [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- 공식 문서 기준으로 image는 immutable하며, container image는 layer로 구성된다.
  근거: [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- 공식 문서 기준으로 컨테이너는 read-only 이미지 레이어 위에 container별 writable layer를 가진다. 이 writable layer의 데이터는 컨테이너가 파괴되면 유지되지 않는다.
  근거: [Storage](https://docs.docker.com/engine/storage/)
- 공식 문서 기준으로 `docker image tag`는 source image를 가리키는 새 tag를 만드는 명령이다.
  근거: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- 공식 문서 기준으로 `docker image pull`은 pull이 끝난 뒤 digest를 출력하며, digest는 tag 대신 pull 식별자로 사용할 수 있다.
  근거: [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)
- 공식 문서 기준으로 tag는 바뀔 수 있고, digest는 immutable한 참조로 다뤄진다.
  근거: [Image validation](https://docs.docker.com/build/policies/validate-images/)

공식 문서 예시를 따라가면 tag와 digest의 차이는 아래처럼 요약할 수 있다.

```powershell
docker pull ubuntu:24.04
docker pull ubuntu@sha256:<digest>
docker image tag myapp:1.0 myorg/myapp:stable
```

첫 줄과 세 번째 줄은 사람이 기억하기 쉬운 이름을 쓰는 흐름이고, 두 번째 줄은 정확히 같은 내용을 다시 가리키는 흐름에 가깝다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 Windows PowerShell에서 `alpine:3.20` 이미지를 pull하고, RepoDigest 확인, digest 기준 pull, 새 tag 생성까지 재현했다.

{% raw %}
```powershell
docker pull alpine:3.20
docker image inspect alpine:3.20 --format '{{index .RepoDigests 0}}'
docker pull alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc
docker image tag alpine:3.20 codex/alpine-test:verified
```
{% endraw %}

- 실행 결과 요약: `alpine:3.20` pull 결과 RepoDigest는 `alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc`였다. 같은 digest로 다시 pull하면 image가 최신 상태라고 출력됐다. `codex/alpine-test:verified` tag는 `alpine:3.20`과 같은 image ID를 가리켰다.

## 해석 / 의견

내 판단으로는 초급자가 가장 먼저 바로잡아야 할 오해는 "tag가 버전 그 자체"라는 생각이다. tag는 버전처럼 쓸 수는 있지만, 본질적으로는 사람이 읽기 쉬운 이름표에 더 가깝다. 같은 repository 안에서 `stable`, `prod`, `latest`, `1.0` 같은 tag는 운영 정책에 따라 다른 이미지를 다시 가리키게 만들 수 있다.

반대로 digest는 사람이 읽기에는 불편하지만, 실제 내용을 고정하는 값으로 이해하는 편이 정확하다. 그래서 운영 관점에서는 "사람이 보기 좋은 tag"와 "정확히 같은 내용을 가리키는 digest"를 분리해서 가져가는 편이 좋다. 예를 들어 배포 문서, 릴리스 노트, Jenkins 산출물 기록에는 digest를 함께 남기고, 화면이나 커뮤니케이션에는 tag를 노출하는 방식이 가장 실용적이다.

layer 개념도 초급자에게는 중요하다. image가 단일 tarball 비슷한 덩어리라고만 생각하면 왜 build cache가 생기고, 왜 일부 단계만 다시 build되는지 다음 글에서 이해가 느려진다. image가 immutable한 layer들의 조합이라는 점을 먼저 잡아두면 Dockerfile과 cache 글이 훨씬 빨리 연결된다.

실무적으로는 아래 정도로 기억하면 충분하다.

- image: 실행에 필요한 불변 패키지
- layer: 이미지 내부 변화 단위
- tag: 사람이 다루기 쉬운 가변 이름
- digest: 내용을 고정하는 식별자

## 한계와 예외

이 글은 multi-platform image, manifest list, OCI layout, content trust까지 다루지 않는다. digest 설명은 초급자가 단일 image reference를 이해하는 범위에 한정했다.

또한 "tag는 바뀔 수 있다"는 설명이 곧 "tag는 쓰면 안 된다"는 뜻은 아니다. 개발, QA, 협업, release naming에는 tag가 여전히 편리하다. 다만 재현성과 배포 고정이 중요한 지점에서는 digest를 함께 남겨야 한다는 의미다.

직접 재현은 `alpine:3.20` 단일 이미지 참조를 대상으로 했다. multi-platform image, manifest list, OCI layout, content trust까지는 별도로 검증하지 않았다. tag와 digest에 대한 일반 설명은 Docker 공식 문서가 설명하는 범위와 위 로컬 실행 결과에 한정한다.

## 참고자료

- Docker Docs, [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- Docker Docs, [Storage](https://docs.docker.com/engine/storage/)
- Docker Docs, [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [Image validation](https://docs.docker.com/build/policies/validate-images/)
