---
layout: single
title: "Git 05. conflict를 재현하고 해결하는 기본 절차"
description: "Git merge conflict가 왜 발생하는지와 status, 파일 수정, add, commit으로 해결하는 기본 절차를 정리한 글."
date: 2026-05-09 09:00:00 +0900
lang: ko
translation_key: git-conflict-resolution-basics
section: development
topic_key: devops
categories: DevOps
tags: [git, conflict, merge, status]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git conflict는 Git이 망가졌다는 뜻이 아니라, 서로 다른 변경을 자동으로 하나의 결과로 만들 수 없다는 신호다. 해결 절차는 생각보다 단순하다. 상태를 확인하고, 충돌 파일을 사람이 고치고, `git add`로 해결 표시를 한 뒤 commit한다.

이 글의 결론은 conflict를 두려워하기보다 작은 예제로 직접 만들어 보는 편이 낫다는 것이다. conflict를 한 번 재현해 보면 PR/MR에서 충돌이 났을 때도 문제를 더 차분히 볼 수 있다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: tutorial
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 merge conflict의 기본 절차만 다루고, rerere나 mergetool 설정은 제외한다.

## 문제 정의

conflict 상황에서 초급자가 자주 하는 실수는 아래와 같다.

- 충돌 표시가 보이면 Git이 파일을 망가뜨렸다고 생각한다.
- 어떤 branch의 변경을 살려야 하는지 확인하지 않고 한쪽만 선택한다.
- 파일을 수정하고도 `git add`를 하지 않아 해결 상태로 넘어가지 못한다.
- conflict 해결 commit이 무엇을 의미하는지 모른다.

이번 글은 conflict를 일부러 만들고 해결하는 최소 절차를 설명한다.

## 확인된 사실

- Git 공식 glossary 기준으로 merge 중 변경이 충돌하면 merge 완료를 위해 수동 개입이 필요할 수 있다.
  근거: [Git Glossary](https://git-scm.com/docs/gitglossary)
- `git merge` 공식 문서 기준으로 merge conflict가 생기면 Git은 자동 merge에 실패한 파일에 conflict marker를 남긴다.
  근거: [git merge](https://git-scm.com/docs/git-merge)
- `git status` 공식 문서 기준으로 status는 unmerged path 상태를 보여줄 수 있다.
  근거: [git status](https://git-scm.com/docs/git-status)
- `git add` 공식 문서 기준으로 add는 working tree 내용을 index에 반영하므로, conflict 해결 후 파일을 add해 해결된 상태로 표시할 수 있다.
  근거: [git add](https://git-scm.com/docs/git-add)
- `git commit` 공식 문서 기준으로 commit은 현재 index 내용으로 새 commit을 만든다.
  근거: [git commit](https://git-scm.com/docs/git-commit)

기본 절차는 아래와 같다.

```powershell
git merge other-branch
git status
# 충돌 파일 수정
git add conflict.txt
git commit
```

중요한 점은 "파일을 고치는 것"과 "Git에게 해결됐다고 알려 주는 것"이 분리되어 있다는 점이다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 `conflict-left`와 `conflict-right` branch에서 같은 파일을 다르게 만든 뒤 merge conflict를 재현했다.

```powershell
git switch -c conflict-left main
Set-Content -LiteralPath conflict.txt -Value "left"
git add conflict.txt
git commit -m "Left conflict"
git switch -c conflict-right main
Set-Content -LiteralPath conflict.txt -Value "right"
git add conflict.txt
git commit -m "Right conflict"
git merge conflict-left
```

- 실행 결과 요약: `git merge conflict-left`는 exit code `1`로 끝났고 자동 merge가 완료되지 않았다. `conflict.txt`를 `left and right`로 수정한 뒤 `git add conflict.txt`와 `git commit -m "Resolve conflict"`를 실행하자 conflict 해결 commit이 생성됐다.

## 해석 / 의견

내 판단으로는 conflict 해결의 핵심은 Git 명령보다 판단 기준이다. 둘 중 하나를 무조건 고르는 것이 아니라, 최종 결과가 기능적으로 맞는지 확인해야 한다. 코드라면 테스트를 돌리고, 설정 파일이라면 실제 적용 범위와 우선순위를 확인해야 한다.

또한 큰 conflict는 대개 큰 branch에서 온다. 작은 단위로 자주 합치고, 포맷팅 변경과 기능 변경을 같은 commit에 섞지 않으면 conflict 비용이 줄어든다.

## 한계와 예외

이 글은 텍스트 파일 conflict만 다룬다. binary file, generated file, lock file, submodule conflict는 해결 방식이 다를 수 있다.

직접 재현은 단일 파일과 단순 merge에서만 수행했다. rebase conflict, cherry-pick conflict, mergetool, IDE merge UI는 확인하지 않았다.

## 참고자료

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git merge](https://git-scm.com/docs/git-merge)
- Git, [git status](https://git-scm.com/docs/git-status)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)

