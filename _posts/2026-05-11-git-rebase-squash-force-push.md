---
layout: single
title: "Git 06. rebase, squash, force push를 조심해서 다뤄야 하는 이유"
description: "Git rebase와 squash가 history를 어떻게 바꾸는지, force push를 언제 조심해야 하는지 정리한 글."
date: 2026-05-11 09:00:00 +0900
lang: ko
translation_key: git-rebase-squash-force-push
section: development
topic_key: devops
categories: DevOps
tags: [git, rebase, squash, force-push]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

`rebase`와 `squash`는 commit history를 읽기 좋게 만들 수 있지만, 이미 공유된 history를 바꾸면 다른 사람의 작업 흐름을 깨뜨릴 수 있다. `force push`는 그 바뀐 history를 원격 branch에 반영하는 강한 동작이므로 더 조심해야 한다.

이 글의 결론은 개인 작업 branch에서는 rebase와 squash가 유용하지만, 공유 branch에서는 팀 정책 없이는 쓰지 않는 편이 안전하다는 것이다. 꼭 강제 push가 필요하다면 일반 `--force`보다 `--force-with-lease`를 우선 검토해야 한다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소와 bare remote 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 interactive rebase 전체 기능이 아니라, rebase/squash/force push의 위험 경계에 집중한다.

## 문제 정의

초급자가 history 정리 명령에서 자주 겪는 문제는 아래와 같다.

- rebase를 merge의 예쁜 버전 정도로만 이해한다.
- squash가 commit을 합치는 과정에서 commit ID를 바꾼다는 점을 놓친다.
- 이미 원격에 push한 branch를 rebase한 뒤 일반 push가 거절되는 이유를 모른다.
- `git push --force`를 습관처럼 쓴다.

이번 글은 history를 다시 쓰는 명령을 언제 조심해야 하는지 정리한다.

## 확인된 사실

- `git rebase` 공식 문서 기준으로 rebase는 commit들을 다른 base tip 위에 다시 적용한다.
  근거: [git rebase](https://git-scm.com/docs/git-rebase)
- `git rebase` 공식 문서 기준으로 interactive mode에서는 commit을 재정렬하거나 합칠 수 있다.
  근거: [git rebase](https://git-scm.com/docs/git-rebase)
- `git commit` 공식 문서 기준으로 `--amend`는 새 commit을 만드는 방식으로 마지막 commit을 수정한다.
  근거: [git commit](https://git-scm.com/docs/git-commit)
- `git push` 공식 문서 기준으로 push는 remote refs를 업데이트하며, `--force-with-lease`는 기대한 원격 값과 다를 때 update를 보호하는 방식으로 설명된다.
  근거: [git push](https://git-scm.com/docs/git-push)

기본 rebase 흐름은 아래처럼 생겼다.

```powershell
git switch feature
git rebase main
```

이 명령은 feature branch의 commit을 main 위에 다시 얹는다. 결과가 비슷해 보여도 기존 commit과 새 commit은 같은 것이 아닐 수 있다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 임시 저장소에서 `rebase-demo` branch를 만든 뒤 `main`이 앞서가게 만들고, `git rebase main`으로 branch를 다시 얹었다.

```powershell
git switch main
git switch -c rebase-demo
Set-Content -LiteralPath rebase.txt -Value "rebase work"
git add rebase.txt
git commit -m "Add rebase work"
git switch main
Set-Content -LiteralPath base.txt -Value "base work"
git add base.txt
git commit -m "Advance main"
git switch rebase-demo
git rebase main
```

- 실행 결과 요약: rebase 후 `rebase-demo`의 `Add rebase work` commit은 `Advance main` commit 뒤에 위치했다. 이후 isolated bare remote에 `rebase-demo`를 push하고 `git commit --amend`로 commit을 다시 만든 뒤 `git push --force-with-lease origin rebase-demo`를 실행했으며, forced update가 성공했다.

## 해석 / 의견

내 판단으로는 rebase는 "이력을 예쁘게 만드는 도구"가 아니라 "이력을 다시 쓰는 도구"로 먼저 배워야 한다. 개인 branch에서 PR을 올리기 전 작은 commit들을 정리하는 데는 좋지만, 다른 사람이 이미 기반으로 삼은 branch를 바꾸면 상대방에게 복구 비용이 생긴다.

force push도 마찬가지다. 필요한 순간은 있지만 기본값이 되어서는 안 된다. 특히 `main`, `release`, 운영 배포 branch처럼 여러 사람이 의존하는 branch에서는 branch protection과 리뷰 정책으로 막아 두는 편이 일반적으로 안전하다.

## 한계와 예외

이 글은 interactive rebase의 `pick`, `reword`, `edit`, `squash`, `fixup` 전체 사용법을 다루지 않는다. 또한 GitHub/GitLab의 squash merge 버튼과 local interactive rebase는 사용자 경험과 정책이 다르므로 같은 것으로 단정하지 않는다.

직접 재현은 isolated bare remote에서만 수행했다. 실제 협업 저장소의 protected branch, required review, required status checks 환경에서는 force push가 거절될 수 있다.

## 참고자료

- Git, [git rebase](https://git-scm.com/docs/git-rebase)
- Git, [git commit](https://git-scm.com/docs/git-commit)
- Git, [git push](https://git-scm.com/docs/git-push)

