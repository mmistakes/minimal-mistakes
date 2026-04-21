---
layout: single
title: "Git 02. status, diff, add, commit, log로 변경 흐름 이해하기"
description: "Git의 기본 변경 흐름을 status, diff, add, commit, log 명령으로 나눠 초급자 관점에서 정리한 글."
date: 2026-05-03 09:00:00 +0900
lang: ko
translation_key: git-status-diff-add-commit-log
section: development
topic_key: devops
categories: DevOps
tags: [git, status, diff, add, commit, log]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git 기본 명령은 외우는 순서보다 읽는 순서가 중요하다. `status`로 상태를 보고, `diff`로 내용을 확인하고, `add`로 index에 올리고, `commit`으로 기록하고, `log`로 이력을 확인한다.

이 글의 결론은 `git add .`와 `git commit -m`을 습관처럼 치기 전에 `status`와 `diff`를 먼저 보는 흐름을 몸에 붙이는 편이 안전하다는 것이다. Jenkins나 PR/MR로 넘어가도 이 기본 흐름이 그대로 이어진다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: tutorial
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 reset, restore, stash를 다루지 않고 기본 기록 흐름만 다룬다.

## 문제 정의

Git 명령어를 처음 배울 때 아래 문제가 자주 생긴다.

- `status`를 보지 않고 바로 commit한다.
- `diff`를 보지 않아 의도하지 않은 변경이 들어간다.
- `add`가 파일을 서버에 올리는 명령이라고 오해한다.
- `log`를 단순 기록 목록으로만 보고 branch 흐름을 읽지 않는다.

이번 글은 변경 하나가 commit까지 가는 최소 경로를 명령어별로 분리한다.

## 확인된 사실

- `git status` 공식 문서 기준으로 status는 index와 `HEAD`, working tree와 index 사이의 차이, 그리고 Git이 추적하지 않는 파일을 보여준다.
  근거: [git status](https://git-scm.com/docs/git-status)
- `git diff` 공식 문서 기준으로 diff는 commit, working tree, index 사이의 변경을 보여주는 명령이다.
  근거: [git diff](https://git-scm.com/docs/git-diff)
- `git add` 공식 문서 기준으로 add는 working tree의 현재 내용을 index에 반영한다.
  근거: [git add](https://git-scm.com/docs/git-add)
- `git commit` 공식 문서 기준으로 commit은 현재 index 내용과 메시지로 새 commit을 만든다.
  근거: [git commit](https://git-scm.com/docs/git-commit)
- `git log` 공식 문서 기준으로 log는 commit log를 보여준다.
  근거: [git log](https://git-scm.com/docs/git-log)

초급 실습에서 가장 기본적인 확인 순서는 아래와 같다.

```powershell
git status --short
git diff
git add app.txt
git diff --cached
git commit -m "Update app"
git log --oneline -2
```

`git diff`와 `git diff --cached`를 나눠 보는 이유는 working tree 변경과 index에 올라간 변경이 다를 수 있기 때문이다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 임시 저장소에서 `app.txt`를 수정하고 add 전후 diff를 확인했다.

```powershell
Add-Content -LiteralPath app.txt -Value "line 2"
git status --short
git diff -- app.txt
git add app.txt
git diff --cached -- app.txt
git commit -m "Update app"
git log --oneline -2
```

- 실행 결과 요약: add 전 `git status --short`는 ` M app.txt`를 출력했다. `git diff -- app.txt`에는 `+line 2`가 보였고, add 후 같은 변경은 `git diff --cached -- app.txt`에서 확인됐다. commit 후 `git log --oneline -2`에는 `Update app`과 `Add app` 두 commit이 표시됐다.

## 해석 / 의견

내 판단으로는 Git 기본 명령은 "작성 명령"보다 "확인 명령"을 먼저 배워야 한다. `status`와 `diff`를 충분히 보는 습관이 있으면 commit 품질이 좋아지고, PR 리뷰에서 "왜 이 파일도 바뀌었지?" 같은 잡음이 줄어든다.

또한 `git add .`는 편하지만 초급 단계에서는 너무 넓다. 처음에는 파일명을 명시하거나 `git add -p`처럼 hunk 단위로 고르는 흐름을 배워 두는 편이 낫다. 이 글에서는 `git add -p`를 직접 다루지 않았지만, 의도한 변경만 commit에 넣는다는 생각은 계속 유지해야 한다.

## 한계와 예외

이 글은 reset, restore, checkout, stash처럼 변경을 되돌리거나 임시 보관하는 명령을 다루지 않는다. 또한 binary file diff, rename detection, submodule 상태 표시는 프로젝트 설정과 Git 버전에 따라 더 복잡해질 수 있다.

직접 재현은 한 파일만 있는 작은 저장소에서 수행했다. 대형 저장소, generated file, line ending 변환, file mode 변경은 확인하지 않았다.

## 참고자료

- Git, [git status](https://git-scm.com/docs/git-status)
- Git, [git diff](https://git-scm.com/docs/git-diff)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)
- Git, [git log](https://git-scm.com/docs/git-log)

