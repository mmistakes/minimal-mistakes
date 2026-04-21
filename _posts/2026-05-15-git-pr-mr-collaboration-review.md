---
layout: single
title: "Git 08. PR/MR 기반 협업 흐름과 리뷰 기준"
description: "Pull request와 merge request를 Git branch 협업 흐름 위에서 이해하고 리뷰 기준을 정리한 글."
date: 2026-05-15 09:00:00 +0900
lang: ko
translation_key: git-pr-mr-collaboration-review
section: development
topic_key: devops
categories: DevOps
tags: [git, pull-request, merge-request, review, collaboration]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

PR과 MR은 Git 자체 명령이라기보다 hosted Git 서비스가 제공하는 협업 단위다. branch의 변경을 제안하고, diff를 리뷰하고, 자동 검사 결과를 확인한 뒤 merge할지 결정하는 흐름이다.

이 글의 결론은 PR/MR을 "merge 버튼 누르기 전 절차"가 아니라 품질 게이트로 봐야 한다는 것이다. Jenkins나 다른 CI가 붙으면 PR/MR은 코드 리뷰와 자동 검증이 만나는 지점이 된다.

## 문서 정보

- 작성일: 2026-04-21
- 검증 기준일: 2026-04-21
- 문서 성격: analysis
- 테스트 환경: Windows PowerShell, 임시 로컬 Git 저장소. Hosted PR/MR UI 실행 테스트 없음.
- 테스트 버전: Git 2.45.2.windows.1. GitHub Docs와 GitLab Docs는 2026-04-21 확인본을 기준으로 삼았다.
- 출처 등급: GitHub/GitLab 공식 문서와 로컬 Git branch/remote 재현 결과를 사용했다.
- 비고: 이 글은 GitHub와 GitLab의 UI 세부 차이를 비교하지 않고 공통 협업 흐름에 집중한다.

## 문제 정의

PR/MR을 처음 접할 때 자주 생기는 오해는 아래와 같다.

- PR/MR을 Git 명령이라고 생각한다.
- 리뷰 없이 merge해도 branch를 쓴 것이므로 충분하다고 생각한다.
- CI 실패와 리뷰 코멘트를 별개 절차로 본다.
- 큰 변경을 하나의 PR/MR에 몰아넣는다.

이번 글은 PR/MR을 branch, diff, review, checks, merge의 흐름으로 정리한다.

## 확인된 사실

- GitHub Docs 기준으로 pull request는 코드 변경을 제안, 리뷰, merge할 수 있게 한다.
  근거: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- GitHub Docs 기준으로 PR의 Files changed 탭은 제안 변경과 기존 코드의 차이를 보여준다.
  근거: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- GitHub Docs 기준으로 PR에서는 commit, changed files, base와 compare branch 사이의 diff를 리뷰하고 토론할 수 있다.
  근거: [Reviewing changes in pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- GitLab Docs 기준으로 merge request는 코드 리뷰, 토론, 코드 변경 추적, CI/CD pipeline 정보 확인을 위한 중심 위치를 제공한다.
  근거: [Merge requests](https://docs.gitlab.com/user/project/merge_requests/)

PR/MR의 최소 흐름은 아래처럼 정리할 수 있다.

```text
feature branch push
open PR/MR
review diff and discussion
run checks or pipelines
merge or request changes
```

Git 명령으로는 branch와 remote를 다루지만, PR/MR은 그 위에 리뷰와 정책을 얹는 서비스 기능이다.

## 직접 재현한 결과

- 직접 확인한 결과: 2026-04-21 로컬 bare remote와 두 clone을 사용해 PR/MR의 기반이 되는 branch push와 fetch 흐름을 재현했다.

```powershell
git push -u origin main
git clone remote.git coworker
# coworker clone에서 commit 후 push
git fetch origin
git merge origin/main --ff-only
```

- 실행 결과 요약: 로컬 Git만으로 branch push와 원격 변경 fetch/merge는 재현했다. GitHub 또는 GitLab에 실제 PR/MR을 생성하지는 않았다. 따라서 PR/MR UI, required review, required status checks, pipeline 표시 방식은 공식 문서 기준으로만 확인했다.

## 해석 / 의견

내 판단으로는 좋은 PR/MR의 핵심은 "작고 검토 가능한 변경"이다. 리뷰어가 의도를 이해할 수 있어야 하고, CI가 실패했을 때 어느 변경이 원인인지 좁힐 수 있어야 한다.

리뷰 기준은 팀마다 다르지만 최소한 아래 질문은 남겨야 한다.

- 변경 목적이 설명되어 있는가
- diff가 목적과 맞는 범위에 머무르는가
- 테스트나 직접 확인 결과가 있는가
- 설정, 배포, 롤백 영향이 적혀 있는가
- Docker image tag나 release 흐름에 영향을 주는가

이 기준이 있어야 Jenkins로 넘어갔을 때 "빌드만 통과하면 merge"라는 약한 품질 게이트를 피할 수 있다.

## 한계와 예외

이 글은 GitHub와 GitLab의 모든 PR/MR 설정을 비교하지 않는다. CODEOWNERS, branch protection, merge queue, approval rule, required status checks, GitLab approval rule은 별도 운영 주제로 다뤄야 한다.

직접 재현은 hosted 서비스 없이 로컬 Git remote만 사용했다. 실제 PR/MR 생성, 리뷰 코멘트, CI pipeline 연동, merge button 동작은 재현하지 않았다.

## 참고자료

- GitHub Docs, [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- GitHub Docs, [Reviewing changes in pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- GitLab Docs, [Merge requests](https://docs.gitlab.com/user/project/merge_requests/)

