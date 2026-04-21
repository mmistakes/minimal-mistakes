---
layout: single
title: "Git 03. branch와 merge는 언제 어떻게 써야 하는가"
description: "Git branch와 merge를 폴더 복사본이 아니라 개발 흐름과 이력 연결 관점에서 이해하는 글."
date: 2026-05-05 09:00:00 +0900
lang: ko
translation_key: git-branch-and-merge
section: development
topic_key: devops
categories: DevOps
tags: [git, branch, merge, workflow]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git branch는 폴더 복사본이 아니라 commit을 가리키는 개발 라인으로 이해하는 편이 정확하다. merge는 다른 branch의 변경을 현재 branch로 가져와 이력을 연결하는 작업이다.

이 글의 결론은 branch를 "작업 격리 단위"로 쓰되, merge 시점에는 이력과 리뷰 단위를 함께 생각해야 한다는 것이다. 이후 PR/MR과 Jenkins trigger는 대부분 branch와 merge 흐름 위에 놓인다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 Git Flow 같은 특정 branching model을 표준처럼 제시하지 않는다.

## 문제 정의

branch를 처음 배울 때 아래 오해가 자주 생긴다.

- branch를 프로젝트 폴더 복사본처럼 생각한다.
- branch를 만들면 자동으로 안전한 작업이 된다고 생각한다.
- fast-forward merge와 merge commit의 차이를 모른다.
- 언제 branch를 나누고 언제 합쳐야 하는지 기준이 없다.

이번 글은 branch와 merge의 기본 의미를 설명하고, 협업에서 어떤 기준으로 써야 하는지 정리한다.

## 확인된 사실

- Git 공식 glossary 기준으로 branch는 개발 라인이며, branch의 최신 commit은 branch tip이고 branch head가 그 tip을 가리킨다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- `git branch` 공식 문서 기준으로 branch 명령은 branch를 만들고, 나열하고, 삭제하는 기능을 제공한다.
  근거: [git branch](https://git-scm.com/docs/git-branch)
- Git 공식 glossary 기준으로 merge는 다른 branch의 내용을 현재 branch로 가져오는 동작이며, 충돌이 있으면 수동 개입이 필요할 수 있다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- `git merge` 공식 문서 기준으로 merge는 둘 이상의 개발 이력을 함께 합친다.
  근거: [git merge](https://git-scm.com/docs/git-merge)
- Git 공식 glossary 기준으로 fast-forward는 새 merge commit을 만들지 않고 branch를 다른 branch의 같은 revision으로 이동시키는 특수한 merge 형태다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)

기본 흐름은 아래처럼 작다.

```powershell
git switch -c feature
# work and commit
git switch main
git merge feature
```

branch는 작업을 나누는 도구이고, merge는 나눈 작업을 다시 연결하는 도구다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 임시 저장소에서 `feature` branch를 만들고, `main`에도 별도 commit을 만든 뒤 `--no-ff` merge를 수행했다.

```powershell
git switch -c feature
Set-Content -LiteralPath feature.txt -Value "feature work"
git add feature.txt
git commit -m "Add feature"
git switch main
Set-Content -LiteralPath main.txt -Value "main work"
git add main.txt
git commit -m "Add main work"
git merge --no-ff feature -m "Merge feature"
git log --oneline --graph --decorate --all -5
```

- 실행 결과 요약: `git merge --no-ff feature`는 exit code `0`으로 끝났고, `git log --graph`에는 `Merge feature` merge commit과 `feature` branch의 `Add feature` commit이 함께 표시됐다.

## 해석 / 의견

내 판단으로는 초급 단계에서 branch는 "기능 단위로 마음껏 만드는 것"보다 "검토 가능한 변경 단위로 나누는 것"이 더 중요하다. 너무 큰 branch는 merge conflict와 리뷰 부담을 키우고, 너무 작은 branch는 흐름을 과하게 쪼갠다.

merge 방식도 팀 정책과 맞춰야 한다. fast-forward는 이력이 단순해지고, merge commit은 feature 단위의 합류 지점이 남는다. 어느 쪽이 무조건 옳다기보다, 장애 추적과 리뷰 기록을 어떻게 남길 것인지에 따라 선택해야 한다.

## 한계와 예외

이 글은 Git Flow, trunk-based development, release branch 전략을 비교하지 않는다. 또한 `cherry-pick`, `revert`, `merge --squash`는 별도 주제로 남긴다.

직접 재현은 로컬 branch merge만 확인했다. GitHub, GitLab, Bitbucket의 branch protection이나 merge method 설정은 확인하지 않았다.

## 참고자료

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git branch](https://git-scm.com/docs/git-branch)
- Git, [git merge](https://git-scm.com/docs/git-merge)

