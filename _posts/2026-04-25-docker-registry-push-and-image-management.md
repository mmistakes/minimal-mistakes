---
layout: single
title: "Docker 05. 레지스트리 푸시와 배포용 이미지 관리 기준"
description: "Docker registry, repository, tag, push 흐름과 배포용 이미지 관리 기준을 초급자 관점에서 정리한 글."
date: 2026-04-25 09:00:00 +0900
lang: ko
translation_key: docker-registry-push-and-image-management
section: development
topic_key: devops
categories: DevOps
tags: [docker, registry, repository, push, tag, digest]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Docker를 혼자 로컬에서만 쓸 때는 이미지 build까지만 해도 된다. 하지만 팀 작업, Jenkins, 배포 환경으로 넘어가면 결국 registry와 push를 이해해야 한다. 이때 자주 섞이는 개념이 registry, repository, tag, digest다. registry는 저장소 서비스 전체이고, repository는 그 안의 이미지 묶음이며, tag는 사람이 붙이는 이름표, digest는 실제 내용 기준의 식별자다.

이 글의 결론은 배포용 이미지를 관리할 때 "registry에 어떤 이름으로 push할 것인가"만큼 "어떤 tag를 가변으로 둘 것인가"가 중요하다는 점이다. `latest` 하나만 믿는 흐름은 나중에 재현성과 롤백을 어렵게 만들 수 있으므로, 릴리스 태그와 digest 기록을 같이 가져가는 편이 훨씬 안전하다.

## 문서 정보

- 작성일: 2026-04-20
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, Docker Desktop for Windows. Docker Desktop과 `docker-desktop` WSL 배포판을 재시작한 뒤 `desktop-linux` context에서 Linux container로 실행했다.
- 테스트 버전: Docker Desktop 4.70.0(224270), Docker CLI/Engine 29.4.0(API 1.54), Docker Compose v5.1.2, Docker Buildx v0.33.0-desktop.1. Docker 공식 문서는 2026-04-20 확인본을 기준으로 삼았다.
- 출처 등급: Docker 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 image signing, admission policy, content trust보다 기본 push 흐름과 이름 규칙에 집중한다.

## 문제 정의

초급자가 registry를 다룰 때 흔히 아래 지점에서 막힌다.

- registry와 repository를 같은 말처럼 쓴다.
- 로컬 tag와 원격 repository 이름의 관계를 헷갈린다.
- `docker push`가 정확히 무엇을 올리는지 감이 안 온다.
- `latest`만 쓰면 충분하다고 생각한다.

이번 글은 기본 push 흐름과 초급 배포 관리 기준을 정리한다. multi-arch manifest나 signing 정책은 범위에서 제외한다.

## 확인된 사실

- 공식 문서 기준으로 image registry는 container image를 저장하고 공유하는 중앙 위치이며, public 또는 private일 수 있다. Docker Hub는 default registry다.
  근거: [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- 공식 문서 기준으로 registry와 repository는 다르다. registry는 전체 저장 위치이고, repository는 그 안의 관련 image 모음이다.
  근거: [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- 공식 문서 기준으로 `docker image push`는 이미지를 registry나 self-hosted registry로 업로드한다.
  근거: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- 공식 문서 기준으로 push 전에 `docker image tag`를 이용해 target registry/repository/tag 이름을 붙일 수 있다.
  근거: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/), [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- 공식 문서 기준으로 `docker image push --all-tags`는 같은 repository 아래 여러 tag를 한 번에 push할 수 있다.
  근거: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- 공식 문서 기준으로 push 결과에는 digest가 출력되며, 그 digest는 이후 특정 내용을 pin하는 데 쓸 수 있다.
  근거: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/), [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)

공식 문서 흐름을 기준으로 하면 가장 기본적인 push 패턴은 아래와 같이 정리할 수 있다.

```powershell
docker build -t myapp:1.0.0 .
docker image tag myapp:1.0.0 registry-host:5000/team/myapp:1.0.0
docker image tag myapp:1.0.0 registry-host:5000/team/myapp:stable
docker image push --all-tags registry-host:5000/team/myapp
```

이 흐름의 핵심은 "하나의 로컬 image에 여러 tag를 붙이고, registry 기준 이름으로 다시 태깅한 뒤, repository 단위로 push할 수 있다"는 점이다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 Windows PowerShell에서 로컬 registry container를 띄우고, 로컬 이미지를 `localhost:5000` 기준 이름으로 tag한 뒤 push, remove, pull을 재현했다.

```powershell
docker run -d --name codex-registry -p 5000:5000 registry:2
docker image tag codex/cache-test:0.2.1 localhost:5000/codex/cache-test:0.2.1
docker image push localhost:5000/codex/cache-test:0.2.1
docker image rm localhost:5000/codex/cache-test:0.2.1
docker pull localhost:5000/codex/cache-test:0.2.1
docker rm -f codex-registry
```

- 실행 결과 요약: `docker image push localhost:5000/codex/cache-test:0.2.1`은 exit code `0`으로 끝났고, push 결과에 `digest: sha256:2f16fcd4eea767e42b0f9faa3adc514f0eb7768e48bda82d13d3c69b73ed384c`가 출력됐다. local tag를 삭제한 뒤 같은 reference를 pull했을 때 pull도 exit code `0`이었고, pull된 image ID는 push 전 로컬 image ID와 같았다.

## 해석 / 의견

내 판단으로는 registry를 이해할 때 가장 먼저 버려야 할 습관은 `latest` 하나에 모든 의미를 몰아넣는 것이다. `latest`는 편하지만, 릴리스 이력과 롤백, 장애 대응, Jenkins 산출물 추적에는 약하다. 배포 기록에 "무슨 이미지를 올렸는가"를 남길 때는 적어도 읽기 쉬운 릴리스 태그 하나와 정확한 digest 하나를 같이 남기는 편이 낫다.

초급 단계에서는 아래 정도의 이름 규칙만 있어도 운영이 한결 편해진다.

- 고정 릴리스 태그: `1.0.0`
- 사람 친화적 이동 태그: `stable` 또는 `prod`
- 정확한 고정값 기록: push 결과의 digest

이렇게 하면 사람은 tag로 소통하고, 시스템이나 운영 기록은 digest로 고정할 수 있다. Jenkins 파이프라인으로 넘어가도 이 구분이 그대로 도움이 된다.

또한 repository 이름과 registry 호스트가 image reference 안에 함께 들어간다는 점을 초기에 익혀두는 것이 중요하다. 로컬에서는 `myapp:1.0.0`처럼 짧게 써도, 실제 배포 경로에서는 `registry-host:5000/team/myapp:1.0.0` 같은 형태가 더 정확한 운영 단위가 된다.

## 한계와 예외

이 글은 registry 인증, access token, content trust, signature verification, multi-platform manifest push까지 다루지 않는다. 초급자가 기본 naming과 push 흐름을 이해하는 범위에 한정했다.

또한 모든 팀이 `stable`이나 `prod` 같은 이동 tag를 반드시 써야 하는 것은 아니다. 조직에 따라 immutable 릴리스 태그만 쓰고, 승격은 별도 메타데이터로 관리할 수도 있다. 다만 어떤 방식을 택하든 digest 기록은 유용하다.

직접 재현은 `registry:2` 이미지를 사용한 로컬 registry(`localhost:5000`)에서만 수행했다. Docker Hub 로그인, access token, private remote registry, self-hosted registry의 TLS 설정, content trust, signature verification, multi-platform manifest push는 확인하지 않았다.

## 참고자료

- Docker Docs, [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- Docker Docs, [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)
