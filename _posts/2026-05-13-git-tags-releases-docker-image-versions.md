---
layout: single
title: "Git 07. tag와 release로 Docker 이미지 버전과 배포 이력 연결하기"
description: "Git tag, GitHub release, Docker image tag를 구분하고 배포 이력으로 연결하는 기준을 정리한 글."
date: 2026-05-13 09:00:00 +0900
lang: ko
translation_key: git-tags-releases-docker-image-versions
section: development
topic_key: devops
categories: DevOps
tags: [git, tag, release, docker, image-tag]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git tag와 Docker image tag는 이름이 비슷하지만 같은 것이 아니다. Git tag는 저장소 history의 특정 지점을 가리키고, Docker image tag는 container image reference에 붙는 이름이다.

이 글의 결론은 릴리스와 배포 이력을 추적하려면 Git tag, release note, Docker image tag, image digest를 연결해서 기록해야 한다는 것이다. Jenkins 파이프라인으로 넘어가면 이 연결이 빌드 산출물 추적의 핵심이 된다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서, Docker 공식 문서, GitHub Docs는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git/Docker/GitHub 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 semantic versioning 규칙 자체를 설명하지 않는다.

## 문제 정의

배포 이력에서 자주 섞이는 개념은 아래와 같다.

- Git tag와 Docker image tag를 같은 것으로 생각한다.
- GitHub release가 Git tag 없이 독립적으로 존재한다고 생각한다.
- Docker image tag만 남기고 digest를 기록하지 않는다.
- 어떤 commit에서 어떤 image가 만들어졌는지 추적할 수 없다.

이번 글은 Git tag와 Docker image tag를 분리하고, 운영 기록에서는 어떻게 연결해야 하는지 정리한다.

## 확인된 사실

- `git tag` 공식 문서 기준으로 tag는 Git object에 태그를 만들고, 일반적으로 release 지점을 표시하는 데 쓰인다.
  근거: [git tag](https://git-scm.com/docs/git-tag)
- GitHub Docs 기준으로 release는 배포 가능한 software iteration이며 Git tag를 기반으로 한다.
  근거: [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- Docker 공식 문서 기준으로 `docker image tag`는 source image에 target image reference를 붙인다.
  근거: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker 공식 문서 기준으로 `docker image push`는 image를 registry에 업로드하며, push 결과에서 digest를 확인할 수 있다.
  근거: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)

실무 기록은 아래 값을 분리해서 남기는 편이 좋다.

```text
Git commit: 8cd1bb0
Git tag: v1.0.1
Docker image tag: registry.example.com/team/app:1.0.1
Docker image digest: sha256:...
```

Git tag는 source history 지점이고, Docker digest는 image content 고정값이다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 임시 저장소에서 annotated tag를 만들고 tag가 특정 commit을 가리키는 것을 확인했다.

```powershell
git tag -a v1.0.1 -m "Release v1.0.1"
git tag --list
git show --stat --oneline v1.0.1
```

- 실행 결과 요약: `git tag --list`는 `v1.0.0`과 `v1.0.1`을 출력했다. `git show --stat --oneline v1.0.1`은 `Release v1.0.1` tag 메시지와 해당 tag가 가리키는 `8cd1bb0 Add rebase work amended` commit을 보여줬다.

## 해석 / 의견

내 판단으로는 Docker 배포로 넘어가기 전 Git tag를 반드시 익혀야 한다. "어떤 source에서 만들었는가"와 "어떤 image를 배포했는가"가 분리되면 장애 대응 때 추적이 어려워진다.

다만 Git tag만으로는 충분하지 않다. 같은 source commit에서 빌드해도 build argument, base image, build time dependency, multi-platform 설정에 따라 image 결과가 달라질 수 있다. 그래서 운영 기록에는 Git commit/tag와 함께 image digest도 남겨야 한다.

## 한계와 예외

이 글은 semantic versioning, CalVer, release branch 전략을 비교하지 않는다. 또한 signed tag, provenance, SBOM, SLSA, image signing은 별도 보안 주제로 남긴다.

직접 재현은 Git tag 생성만 수행했다. Docker image build/push는 이전 Docker 05 글의 재현 결과를 전제로 설명했으며, 이 글에서 Docker registry push를 다시 실행하지는 않았다.

## 참고자료

- Git, [git tag](https://git-scm.com/docs/git-tag)
- GitHub Docs, [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)

