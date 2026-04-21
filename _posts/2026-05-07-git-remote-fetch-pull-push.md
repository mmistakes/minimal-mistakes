---
layout: single
title: "Git 04. remote, fetch, pull, push를 분리해서 이해하기"
description: "Git 원격 저장소 흐름을 remote, fetch, pull, push 명령의 역할별로 나눠 정리한 글."
date: 2026-05-07 09:00:00 +0900
lang: ko
translation_key: git-remote-fetch-pull-push
section: development
topic_key: devops
categories: DevOps
tags: [git, remote, fetch, pull, push]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Git 원격 작업에서 가장 중요한 구분은 가져오기와 반영하기다. `fetch`는 원격의 commit과 ref 정보를 로컬에 가져오고, `pull`은 가져온 뒤 현재 branch에 통합하며, `push`는 로컬 ref를 원격에 업데이트한다.

이 글의 결론은 `pull`을 만능 동기화 버튼처럼 쓰기 전에 `fetch`와 `merge` 또는 `rebase`의 관계를 먼저 이해해야 한다는 것이다. Jenkins가 저장소를 가져와 빌드할 때도 이 구분이 중요해진다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: tutorial
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소와 bare remote 저장소
- 테스트 버전: Git 2.45.2.windows.1. Git 공식 문서는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: Git 공식 문서와 로컬 직접 실행 결과를 사용했다.
- 비고: 이 글은 인증, SSH key, credential helper 설정을 다루지 않는다.

## 문제 정의

원격 저장소를 다룰 때 초급자가 자주 헷갈리는 부분은 아래와 같다.

- `origin`을 GitHub 자체라고 생각한다.
- `fetch`와 `pull`을 같은 명령처럼 쓴다.
- `push`가 파일 업로드인지 branch ref 업데이트인지 구분하지 못한다.
- `pull` 후 merge commit이 생기거나 conflict가 나는 이유를 모른다.

이번 글은 hosted Git 서비스가 아니라 Git 명령의 관점에서 remote 흐름을 분리한다.

## 확인된 사실

- `git remote` 공식 문서 기준으로 remote는 추적하는 저장소 집합을 관리한다.
  근거: [git remote](https://git-scm.com/docs/git-remote)
- `git remote add` 공식 문서 기준으로 remote를 추가한 뒤 `git fetch <name>`으로 remote-tracking branch를 만들거나 갱신할 수 있다.
  근거: [git remote](https://git-scm.com/docs/git-remote)
- `git fetch` 공식 문서 기준으로 fetch는 다른 저장소에서 objects와 refs를 다운로드한다.
  근거: [git fetch](https://git-scm.com/docs/git-fetch)
- `git pull` 공식 문서 기준으로 pull은 다른 저장소 또는 local branch에서 변경을 가져오고 현재 branch에 통합한다.
  근거: [git pull](https://git-scm.com/docs/git-pull)
- `git push` 공식 문서 기준으로 push는 local refs를 사용해 remote refs를 업데이트하고 필요한 objects를 보낸다.
  근거: [git push](https://git-scm.com/docs/git-push)

역할을 나누면 아래처럼 이해할 수 있다.

```powershell
git remote -v
git fetch origin
git merge origin/main --ff-only
git push origin main
```

`pull`은 편의 명령이지만, 그 안에서 무엇이 일어나는지 모르면 문제를 추적하기 어렵다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 임시 bare 저장소를 만들고, `origin` remote를 추가한 뒤 push, clone, coworker commit, fetch, fast-forward merge를 재현했다.

```powershell
git init --bare remote.git
git remote add origin ../remote.git
git push -u origin main
git clone remote.git coworker
# coworker clone에서 commit 후 push
git fetch origin
git status --short --branch
git merge origin/main --ff-only
```

- 실행 결과 요약: `git push -u origin main`은 `main` branch를 bare remote에 만들고 upstream을 설정했다. 다른 clone에서 `Add remote work` commit을 push한 뒤 원래 저장소에서 `git fetch origin`을 실행하자 `origin/main`이 갱신됐다. `git merge origin/main --ff-only`는 exit code `0`으로 끝났다.

## 해석 / 의견

내 판단으로는 초급자에게 `git pull`을 먼저 가르치는 것보다 `fetch`를 먼저 보여주는 편이 낫다. fetch는 현재 branch를 바로 바꾸지 않기 때문에 "원격에 무엇이 있는지 확인한다"는 감각을 만들기 좋다.

실무에서는 `pull` 자체가 나쁜 명령은 아니다. 다만 팀이 merge 기반인지 rebase 기반인지, fast-forward만 허용하는지에 따라 `pull` 결과가 달라진다. 그래서 CI/CD로 넘어가기 전에는 "원격 정보를 가져오는 단계"와 "내 branch에 통합하는 단계"를 분리해서 설명하는 것이 안전하다.

## 한계와 예외

이 글은 SSH key, HTTPS token, credential helper, signed commit, protected branch를 다루지 않는다. 또한 shallow clone, partial clone, submodule, mirror remote도 제외했다.

직접 재현은 로컬 bare 저장소에서만 수행했다. GitHub, GitLab 같은 hosted 서비스의 권한, branch protection, pull request ref는 확인하지 않았다.

## 참고자료

- Git, [git remote](https://git-scm.com/docs/git-remote)
- Git, [git fetch](https://git-scm.com/docs/git-fetch)
- Git, [git pull](https://git-scm.com/docs/git-pull)
- Git, [git push](https://git-scm.com/docs/git-push)

