---
layout: single
title: "Docker 03. Dockerfile 기본 문법과 build context를 어떻게 이해해야 하는가"
description: "Dockerfile, WORKDIR, CMD, ENTRYPOINT, build context, .dockerignore를 초급자 관점에서 정리한 글."
date: 2026-04-25 09:00:00 +0900
lang: ko
translation_key: dockerfile-basics-and-build-context
section: development
topic_key: devops
categories: DevOps
tags: [docker, dockerfile, build-context, workdir, entrypoint, cmd]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Dockerfile을 처음 쓸 때 가장 많이 헷갈리는 것은 문법 자체보다 "이 파일이 정확히 무엇을 정의하는가"와 "`.` 이 왜 중요한가"다. Dockerfile은 단순한 쉘 스크립트가 아니라 이미지를 만드는 명세에 가깝고, `docker build -t name .`의 마지막 `.`은 build context를 지정한다. 이 차이를 놓치면 `COPY`가 실패하거나, 필요 없는 파일이 build에 딸려 들어오거나, `CMD`와 `ENTRYPOINT`가 기대와 다르게 작동한다.

이 글의 결론은 초급 단계에서 Dockerfile을 "이미지 빌드 명세 + build context 접근 제어"로 이해하는 것이 가장 실용적이라는 점이다. `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `ENTRYPOINT`를 모두 외우는 것보다, 어떤 파일이 context에 들어오고 어떤 명령이 이미지 메타데이터를 바꾸는지를 먼저 구분하는 편이 훨씬 중요하다.

## 문서 정보

- 작성일: 2026-04-20
- 검증 기준일: 2026-04-20
- 문서 성격: analysis
- 테스트 환경: 실행 테스트 없음. 현재 작성 환경의 Windows PowerShell에서 `docker` CLI가 잡히지 않아 Docker 공식 문서 예시를 기준으로 정리했다.
- 테스트 버전: Docker CLI/Engine 로컬 버전 미확인, Docker 공식 문서 2026-04-20 확인본
- 출처 등급: Docker 공식 문서만 사용했다.
- 비고: 이 글은 multi-stage build, build secret, build arg 심화보다 Dockerfile과 build context의 기본 관계를 먼저 다룬다.

## 문제 정의

초급자는 Dockerfile에서 보통 아래 부분을 헷갈린다.

- Dockerfile을 셸 스크립트처럼 이해한다.
- `docker build -t test .` 마지막 `.`의 의미를 놓친다.
- `COPY`가 Dockerfile 기준이 아니라 build context 기준으로 동작한다는 점을 잘 모른다.
- `CMD`와 `ENTRYPOINT`의 역할 차이를 초기에 제대로 구분하지 못한다.

이번 글은 가장 기본적인 작성 규칙과 이해 틀을 다룬다. 이미지 최적화와 cache invalidation은 다음 글에서 이어서 본다.

## 확인된 사실

- 공식 문서 기준으로 Docker는 Dockerfile의 instruction을 읽어 이미지를 build하며, Dockerfile은 이미지를 만들기 위한 text file이다.
  근거: [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- 공식 문서 기준으로 `docker build`와 `docker buildx build`는 Dockerfile과 context를 함께 사용한다. build context는 build가 접근할 수 있는 파일 집합이다.
  근거: [Build context](https://docs.docker.com/build/concepts/context/)
- 공식 문서 기준으로 `docker build -t test:latest .`에서 마지막 `.`은 current directory를 build context로 지정한다.
  근거: [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- 공식 문서 기준으로 `COPY`와 `ADD`는 build context 안의 파일과 디렉터리를 참조한다.
  근거: [Build context](https://docs.docker.com/build/concepts/context/)
- 공식 문서 기준으로 `.dockerignore`는 context root에 두며, 패턴과 일치하는 파일과 디렉터리를 build context에서 제외한다.
  근거: [Build context](https://docs.docker.com/build/concepts/context/)
- 공식 문서 기준으로 `WORKDIR`는 그 뒤에 오는 `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD`의 작업 디렉터리를 설정하며, 명시적으로 지정하는 것이 best practice에 가깝다.
  근거: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
- 공식 문서 기준으로 `CMD`는 컨테이너 실행 시 기본 명령 또는 기본 인자를 제공하며, 여러 개를 적으면 마지막 것만 유효하다.
  근거: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
- 공식 문서 기준으로 exec form `ENTRYPOINT`가 있으면 `docker run <image> ...`의 인자가 뒤에 붙고, `CMD`는 기본 인자 역할을 할 수 있다.
  근거: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)

공식 문서의 가장 기본적인 Dockerfile 흐름은 아래처럼 요약할 수 있다.

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

그리고 가장 기본적인 build 호출은 아래와 같은 형태다.

```powershell
docker build -t hello-app:0.1.0 .
```

예시 태그는 의미를 분명히 하려고 `latest` 대신 고정 예시 값인 `0.1.0`을 사용했다.

여기서 중요한 것은 `Dockerfile` 파일 위치보다 마지막 `.`이 가리키는 context 범위다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-20 현재 작성 환경의 PowerShell에서 `docker` 명령은 인식되지 않았다.

```powershell
docker --version
```

- 실행 결과 요약: 현재 환경에서는 Dockerfile build 예제를 직접 돌릴 수 없었다.
- 직접 재현 없음: 따라서 이 글의 Dockerfile 예시와 `build context`, `.dockerignore`, `CMD`, `ENTRYPOINT` 설명은 Docker 공식 문서의 설명을 기준으로 정리했다.

## 해석 / 의견

내 판단으로는 Dockerfile 입문에서 가장 중요한 포인트는 "Dockerfile은 셸 스크립트가 아니라 이미지 빌드 명세에 가깝다"는 점이다. 물론 `RUN`은 셸 명령을 실행할 수 있다. 하지만 Dockerfile 전체는 파일 시스템 변화와 메타데이터를 차례대로 쌓아 이미지를 만드는 선언형 흐름에 더 가깝다. 이 관점을 잡지 못하면 `COPY`가 왜 안 되는지, `WORKDIR`를 왜 명시해야 하는지, `CMD`가 왜 마지막 것만 살아남는지 이해가 느려진다.

두 번째 핵심은 build context다. 초급자는 Dockerfile 경로와 context 범위를 자주 같은 것으로 생각한다. 하지만 실제로는 `docker build -f docker/prod.Dockerfile .`처럼 Dockerfile은 하위 디렉터리에 있고, context는 현재 디렉터리 전체일 수도 있다. 그래서 `COPY`가 무엇을 볼 수 있는지는 Dockerfile의 상대 경로보다 context가 무엇인지가 더 중요하다.

`CMD`와 `ENTRYPOINT`도 초기에 역할을 나눠서 기억하는 편이 좋다. 가장 실용적인 기준은 이렇다.

- `ENTRYPOINT`: 이 이미지를 어떤 실행 파일처럼 동작하게 만들고 싶을 때
- `CMD`: 기본 명령 또는 기본 인자를 주고 싶을 때

초급 단계에서는 `WORKDIR`를 명시하고, `COPY` 범위를 줄이고, exec form `CMD` 또는 `ENTRYPOINT`를 쓰는 쪽이 훨씬 덜 헷갈린다.

## 한계와 예외

이 글은 multi-stage build, `ARG`, `ENV`, build secret, cache mount, healthcheck, non-root user 설정까지는 다루지 않는다. 초급자가 먼저 막히는 Dockerfile과 context 개념 정리에 범위를 제한했다.

또한 실제 프로젝트에서는 base image가 이미 `WORKDIR`를 설정했을 수 있다. 하지만 공식 문서도 명시하듯 의도하지 않은 작업 디렉터리를 피하려면 현재 이미지에서 다시 `WORKDIR`를 명시하는 편이 안전하다.

현재 작성 환경에는 Docker CLI가 없어 `docker build`, `docker run`, `.dockerignore` 적용 결과를 직접 재현하지 못했다. 따라서 여기서 사실로 적은 내용은 2026-04-20 기준 Docker 공식 문서가 직접 설명하는 범위로 제한한다.

## 참고자료

- Docker Docs, [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- Docker Docs, [Build context](https://docs.docker.com/build/concepts/context/)
- Docker Docs, [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
