---
layout: single
title: "Git 초기 설정"
categories: [macos, git]
tag: [mac, macos, m1, m2, m3, setup, 맥, 재설치, 초기화, git, github]
order: 4
published: true
typora-root-url: ../
---

개발자로써 Git을 이용할 때의 정보를 자기자신에게 맞출 수 있어야합니다.

Git의 설정은 `git config` 명령어로 설정할 수 있습니다. 여러가지 설정을 할 수 있지만 기본적인 것과 설정하면 편리하게 사용할 수 있는 내용을 준비해봤습니다.

### 기본 브랜치 변경

```bash
git config --global init.defaultBranch main
```

예전엔 기본 브랜치가 `master` 였지만 최근 `main`을 많이 이용하고 있습니다. 만약 프로젝트에서 `git init`의 명령어로 git을 적용시킬시에 ` `master`로 생성이 되어 매번 수기로 `main`으로 변경하고 있다면 위의 명령어 한번에 해결됩니다.

### 사용자 이름과 이메일 설정

```bash
git config --global user.name "name"
git config --global user.email "example@email.com"
```

git을 이용하여 개발한 내용을 `push` 를 통해 내용을 올릴 수 있습니다. 이때 배포자가 누구인지에 대한 정보도 같이 올라가게 되어 있습니다.

![gitlog](/images/2024-01-03-macos-setup4/gitlog.png)

`git log`의 명령어를 통해 이전 내역을 체크할때도 위와 같이 Author에 나의 정보를 추가 또는 변경할 수 있습니다. 만약 프로젝트별로 사용자와 이메일을 다르게 하고 싶다면 `--global` 옵션을 제거 하여 `local` 환경에 별도 설정하시면 됩니다.

### 기본 에디터 변경

```bash
git config --global core.editor "code --wait --disable-extensions"
```

`git commit`을 진행하여 내용을 작성할 때, 작성하기 쉽게 하기 위해 VSCode를 이용합니다. 위의 내용을 작성하고 `git commit`를 입력하면 다음의 화면이 나옵니다.

![gitcommit](/images/2024-01-03-macos-setup4/gitcommit.png)

1번째 라인에 내용을 적고 저장 후 닫으면 commit이 완료됩니다.

### 기본 Commit Message를 변경

```markdown
# ▼ <header> 작성

# ▼ <빈 줄>

# ▼ <body> 작성

# ▼ <빈 줄>

# ▼ <footer> 작성

# <header>

# - 필수 입력

# - 형식: <type>(<scope>): <short summary>

# <type>

# - 필수 입력

# - feat : 새로운 기능을 추가

# - fix : 버그를 수정

# - chore : 실제 기능과 무관한 빌드, 패키지관련 수정 (ex .gitignore 파일 수정)

# - docs : 문서(주석) 추가/수정

# - test : 테스트 코드 추가/수정

# - refact : 기능의 변경 없이, 코드를 리팩토링

# - style : UI 추가/수정

# <scope>

# - 선택 사항

# - 변경사항에 영향받는 npm 패키지 이름

# <short summary>

# - 필수 입력

# - 제목은 50자 이내

# - 변경사항이 "무엇"인지 명확히 작성

# - 끝에 마침표 금지

# <body>

# - 선택 사항

# - 최소 20자 필수 입력(<type>docs 제외)

# - 현재 시제, 명령문으로 작성

# - 변경 사항의 동기(왜)를 설명

# - 변경 효과를 설명하기 위해 이전 동작과 현재 동작의 비교를 포함할 수 있음

# <footer>

# - Breaking Changes, deprecations 또는 이 커밋이 close하거나 연관된 깃헙 이슈, 지라 티켓, 풀리퀘스트 포함

# - 예시

# - 1. Breaking Changes

# BREAKING CHANGE: <breaking change 요약>

# <빈 줄>

# <breaking change 설명 + migration 지시>

# <빈 줄>

# <빈 줄>

# Fixes #<issue number>

# - 2. deprecations

# DEPRECATED: <deprecated 된 것>

# <빈 줄>

# <deprecation 설명 + 추천 update 경로>

# <빈 줄>

# <빈 줄>

# Closes #<pr 번호>

# Fixes : 이슈 수정중 (미완료)

# Resolves : 이슈를 해결한 경우

# Ref : 참고할 이슈가 있는 경우

# Related to: 해당 커밋과 관련된 이슈번호 (미완료)
```

위의 내용을 `~/.gitmessage.txt`에 위치시킵니다.

```bash
git config --global commit.template ~/.gitmessage.txt
```

위의 명령어를 작성하면 다음부터 작성하는 commit의 내용이 위와 같이 변경됩니다. 개발한 내용을 더 풍성하게 작성하여 다른 개발자에게 전달 할 수 있게 합니다.
