---
layout: single
title: "Docker 04. 이미지 빌드가 느려지는 이유와 캐시가 깨지는 지점"
description: "Docker build cache가 어떻게 재사용되고 언제 invalidation되는지, Dockerfile 순서가 왜 중요한지 정리한 글."
date: 2026-04-24 09:00:00 +0900
lang: ko
translation_key: docker-build-cache-and-invalidation
section: development
topic_key: devops
categories: DevOps
tags: [docker, build-cache, dockerfile, buildkit, cache-invalidation]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Docker 이미지를 여러 번 빌드하다 보면 어떤 날은 금방 끝나고, 어떤 날은 거의 처음부터 다시 도는 것처럼 느껴진다. 이 차이는 대부분 build cache와 cache invalidation 규칙에서 나온다. Docker는 instruction과 그 instruction이 의존하는 파일 상태가 같으면 이전 레이어를 재사용하고, 중간 어느 단계가 바뀌면 그 뒤 단계도 다시 실행한다.

이 글의 핵심 결론은 단순하다. 초급 단계에서 체감 build 속도는 머신 성능만큼이나 "Dockerfile이 덜 자주 바뀌는 것과 자주 바뀌는 것을 얼마나 잘 분리했는가"에 많이 영향을 받는다. 특히 `COPY . .`를 너무 앞에 두면 dependency install 같은 비싼 단계가 계속 다시 실행되기 쉽다.

## 문서 정보

- 작성일: 2026-04-20
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, Docker Desktop for Windows. Docker Desktop과 `docker-desktop` WSL 배포판을 재시작한 뒤 `desktop-linux` context에서 Linux container로 실행했다.
- 테스트 버전: Docker Desktop 4.70.0(224270), Docker CLI/Engine 29.4.0(API 1.54), Docker Compose v5.1.2, Docker Buildx v0.33.0-desktop.1. Docker 공식 문서는 2026-04-20 확인본을 기준으로 삼았다.
- 출처 등급: Docker 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 build cache의 기본 규칙과 초급 최적화 패턴을 다루며, CI용 remote cache 세부 설정까지는 깊게 들어가지 않는다.

## 문제 정의

초급자가 Docker build 속도에서 자주 겪는 문제는 아래와 같다.

- 소스 코드 한 줄 바꿨는데 dependency install부터 다시 돈다.
- `RUN apt-get update`가 다음 빌드에서도 자동으로 새 패키지를 가져올 것이라고 기대한다.
- `.dockerignore`를 왜 써야 하는지, cache와 무슨 관계인지 감이 안 온다.
- Dockerfile의 명령 순서가 성능과 직접 연결된다는 점을 놓친다.

이번 글은 build cache의 작동 방식과 초급 단계에서 가장 큰 차이를 만드는 정리 원칙을 다룬다.

## 확인된 사실

- 공식 문서 기준으로 build cache는 instruction과 그 instruction이 의존하는 파일이 바뀌지 않았을 때 이전 layer를 재사용한다.
  근거: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- 공식 문서 기준으로 어떤 layer가 바뀌면 그 뒤에 오는 layer들도 다시 build된다.
  근거: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- 공식 문서 기준으로 `COPY`, `ADD`, 그리고 bind mount를 쓰는 `RUN --mount=type=bind`는 파일 metadata를 바탕으로 cache checksum을 계산한다. 단, `mtime`만 바뀐 경우는 cache invalidation 기준에 포함되지 않는다.
  근거: [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- 공식 문서 기준으로 `RUN` instruction의 cache는 자동으로 새로고침되지 않는다. 따라서 같은 명령 문자열이면 다음 빌드에서도 이전 캐시 결과를 재사용할 수 있다.
  근거: [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- 공식 문서 기준으로 Docker는 cache 최적화를 위해 layer ordering, 작은 context 유지, bind mount, cache mount, external cache 사용을 권장한다.
  근거: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- 공식 문서 기준으로 context root에 `.dockerignore`를 두면 불필요한 파일과 디렉터리를 context에서 제외할 수 있다.
  근거: [Build context](https://docs.docker.com/build/concepts/context/)

공식 문서가 보여 주는 비효율적인 패턴과 더 나은 패턴은 아래처럼 요약할 수 있다.

```dockerfile
# cache를 자주 깨는 예시
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
```

```dockerfile
# 의존성 레이어를 더 오래 재사용하기 쉬운 예시
FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
```

또한 context를 줄이기 위한 기본 예시는 아래처럼 볼 수 있다.

```text
node_modules
tmp*
```

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 Windows PowerShell에서 같은 Dockerfile을 반복 build하고, `app.txt`만 바꾼 뒤 cache 재사용 범위가 달라지는지 확인했다.

```powershell
docker build --progress=plain -t codex/cache-test:0.2.0 <temp-context>
docker build --progress=plain -t codex/cache-test:0.2.0 <temp-context>
# app.txt만 수정
docker build --progress=plain -t codex/cache-test:0.2.1 <temp-context>
docker run --rm codex/cache-test:0.2.1
```

- 실행 결과 요약: 두 번째 build에서는 `CACHED`로 표시된 단계가 5개였다. 이후 `app.txt`만 수정하고 다시 build했을 때는 `COPY package.txt .`와 `RUN cp package.txt package.copy` 단계가 `CACHED`로 재사용됐고, `COPY app.txt .`와 `RUN cp app.txt app.copy` 단계는 다시 실행됐다. 최종 이미지 실행 결과는 수정된 `app-v2-...` 값이었다.

## 해석 / 의견

내 판단으로는 초급자가 Docker build를 느리게 만드는 가장 흔한 원인은 복잡한 최적화 부족이 아니라, 자주 바뀌는 파일을 너무 이른 단계에 복사하는 것이다. 특히 Node, Python, Java 계열 프로젝트에서 `COPY . .`를 dependency install보다 먼저 두면 코드 한 줄 수정도 package install 단계 재실행으로 이어지기 쉽다.

또 다른 흔한 오해는 `RUN apt-get update` 같은 명령이 "다음에 다시 빌드하면 자동으로 최신 패키지를 반영한다"는 기대다. 공식 문서 기준으로는 `RUN` 자체의 cache는 파일 내용을 비교해 자동 무효화하지 않는다. 즉, 같은 instruction이면 이전 결과를 재사용할 수 있다. 이 점을 이해하지 못하면 "왜 다시 빌드했는데 패키지가 안 바뀌었지" 같은 혼란이 생긴다.

초급 단계에서 가장 효과가 큰 원칙은 아래 세 가지라고 본다.

- 덜 자주 바뀌는 파일을 먼저 복사한다.
- build context를 작게 유지한다.
- "캐시가 있으면 빨라진다"보다 "무엇이 캐시를 깨는가"를 먼저 이해한다.

CI/CD 단계로 가면 external cache나 BuildKit cache mount가 더 중요해지지만, 그 전에 Dockerfile 순서만 바로잡아도 체감 차이가 큰 경우가 많다.

## 한계와 예외

이 글은 실제 프로젝트별 빌드 시간을 벤치마크한 실험 글이 아니다. 따라서 "이 구조가 항상 몇 배 빠르다" 같은 정량 결론은 제시하지 않는다.

또한 cache mount, external cache, registry cache는 사용하는 빌더와 CI 환경에 따라 세부 설정이 달라진다. 여기서는 Docker 공식 문서가 제시하는 개념과 초급 최적화 원칙만 다뤘다.

직접 재현은 작은 임시 Dockerfile로 cache 재사용 여부만 관찰한 것이다. 실제 프로젝트별 빌드 시간 벤치마크, remote cache, registry cache, cache mount 성능은 측정하지 않았다. 따라서 "몇 배 빠르다" 같은 정량 결론은 이 글에서 제시하지 않는다.

## 참고자료

- Docker Docs, [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- Docker Docs, [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- Docker Docs, [Build context](https://docs.docker.com/build/concepts/context/)
