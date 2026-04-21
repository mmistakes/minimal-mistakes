---
layout: single
title: "Git 01. Git은 무엇을 기록하고 무엇을 기록하지 않는가"
description: "Git이 commit, index, working tree를 어떻게 다루는지와 Git이 자동으로 보장하지 않는 영역을 초급자 관점에서 정리한 글."
date: 2026-05-01 09:00:00 +0900
lang: ko
translation_key: git-records-and-boundaries
section: development
topic_key: devops
categories: DevOps
tags: [git, commit, repository, index, working-tree]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git을 처음 배울 때 가장 먼저 잡아야 하는 기준은 "Git은 파일을 저장한다"보다 "Git은 commit으로 이어진 프로젝트 상태를 기록한다"는 쪽에 가깝다. 파일을 수정했다고 바로 Git 기록이 되는 것이 아니라, working tree의 변경을 index에 올리고 commit을 만들 때 기록이 남는다.

이 글의 결론은 Git을 백업 도구나 배포 도구처럼 이해하면 금방 헷갈린다는 점이다. Git은 변경 이력과 협업 흐름의 기반이지만, 빌드 산출물, 배포 상태, 서버의 실제 운영 상태까지 자동으로 보장하지는 않는다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 Git 내부 object 형식을 깊게 설명하지 않고, 이후 branch, remote, PR/MR 글을 읽기 위한 최소 개념에 집중한다.

## 문제 정의

초급자가 Git을 배울 때 자주 섞는 지점은 아래와 같다.

- 파일을 저장하면 Git이 자동으로 기록한다고 생각한다.
- `git add`와 `git commit`의 경계를 모른다.
- branch를 폴더 복사본처럼 이해한다.
- Git이 배포 환경의 실제 상태까지 보장한다고 오해한다.

이번 글은 Git의 기록 단위와 기록하지 않는 영역을 구분한다. 명령어 실습은 다음 글에서 더 자세히 다룬다.

## 확인된 사실

- Git 공식 glossary 기준으로 commit은 Git history의 한 지점이며, commit 동작은 index의 현재 상태를 새 commit으로 저장하고 `HEAD`를 새 commit으로 이동시키는 일이다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git 공식 glossary 기준으로 index는 working tree의 저장된 버전이며, merge 중에는 한 파일의 여러 버전을 담을 수도 있다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git 공식 glossary 기준으로 branch는 개발 라인이고, branch head는 해당 branch의 최신 commit을 가리킨다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- `git commit` 공식 문서 기준으로 commit은 현재 index 내용과 log message로 새 commit을 만든다.
  근거: [git commit](https://git-scm.com/docs/git-commit)
- `git add` 공식 문서 기준으로 `git add`는 다음 commit에 들어갈 내용을 준비하기 위해 index를 갱신한다.
  근거: [git add](https://git-scm.com/docs/git-add)

이 사실을 기준으로 보면 Git의 기본 흐름은 아래처럼 나눠서 이해하는 편이 안전하다.

```powershell
git status
git add app.txt
git commit -m "Add app"
git log --oneline
```

파일을 수정하는 행위와 Git history에 기록하는 행위는 같은 일이 아니다. Git이 추적하는 기록은 commit으로 남은 상태이며, 아직 add하지 않은 변경이나 commit하지 않은 변경은 history의 일부가 아니다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 Windows PowerShell에서 임시 저장소를 만들고 `app.txt`를 추가한 뒤 commit을 생성했다.

```powershell
git init -b main demo
git config user.name "Codex Test"
git config user.email "codex@example.invalid"
Set-Content -LiteralPath app.txt -Value "line 1"
git status --short
git add app.txt
git commit -m "Add app"
git log --oneline -1
```

- 실행 결과 요약: `git status --short`는 add 전 `?? app.txt`를 출력했다. `git add app.txt` 뒤 `git commit -m "Add app"`은 exit code `0`으로 끝났고, `git log --oneline -1`에서 `Add app` commit이 확인됐다.

## 해석 / 의견

내 판단으로는 Git 입문에서 가장 먼저 익혀야 하는 문장은 "Git은 내가 저장한 모든 파일을 자동으로 기억하지 않는다"이다. Git은 선택된 변경을 index에 올리고 commit으로 남긴 뒤에야 협업 가능한 이력이 된다.

또한 Git은 source history를 잘 다루지만, 운영 상태를 그대로 설명하지는 않는다. 예를 들어 Docker 이미지가 어떤 digest로 배포됐는지, Jenkins가 어떤 환경 변수로 빌드했는지, Kubernetes에 어떤 manifest가 실제 적용됐는지는 Git commit만으로 자동 보장되지 않는다. 이런 정보는 tag, release note, CI 기록, 배포 기록과 연결해야 한다.

초급 단계에서는 아래 세 줄을 계속 구분하면 좋다.

- working tree: 지금 파일 시스템에 있는 변경
- index: 다음 commit에 들어갈 후보
- commit: 공유와 추적이 가능한 기록 단위

## 한계와 예외

이 글은 Git object model, packfile, reflog, garbage collection을 다루지 않는다. 또한 Git LFS처럼 대용량 파일을 별도 방식으로 관리하는 확장 기능도 범위에서 제외했다.

직접 재현은 로컬 저장소에서만 수행했다. 원격 저장소, branch protection, hosted Git 서비스의 PR/MR 정책은 확인하지 않았다. 따라서 이 글의 결론은 Git의 기본 기록 모델에 대한 설명이지, 특정 조직의 협업 정책까지 포함한 결론은 아니다.

## 참고자료

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)

