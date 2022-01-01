---
layout: single
title: "[Git] Git branch"
categories: Git
tag: [Git, Version Control]
toc: true
author_profile: false
# sidebar:
#   nav: "docs"
---

## ✔ branch

### 깃에서 파일을 수정하는 경우?

- 작업을 진행 하다가 필요에 따라 작업이 **분기**되는 현상
- **Git**은 **브랜치**를 쓸만한 수준까지 끌어 올렸다?
- SVN에서의 브랜치를 사용한 경험이 있는 경우 차이점을 느낄 수 있다?
- Git은 모든 것을 내부적인 **브랜치**로 구성하고 있다?

## ✔ git branch

### 브랜치 검색

```bash
$ > git branch

# 결과
* master
(END)
```

- 고객사가 어떠한 요구 사항을 제안 했을 경우
- 필요없는 개발 사항을 제안 했을 경우
- 즉, 쉽게 버릴 수 있는 방법은 **분기** 브랜치를 따서 개발을 하면 된다

### 브랜치 생성

```bash
$ > git branch exp #생성
```

### 브랜치 변경

```bash
$ > git checkout exp #브랜치 변경
```

- **브랜치 생성시** 이전 브랜치와 동일한 상태를 가짐
- master -> 브랜치 생성 (exp) -> exp는 master와 동일한 상태
- 현재 어느 브랜치에 속해있느냐에 따라서 파일의 내용이 달라진다

## ✔ 브랜치 정보 확인?

### 모든 브랜치 정보 확인

<img width="887" alt="스크린샷 2021-07-06 오후 5 02 16" src="https://user-images.githubusercontent.com/53969142/124564376-f5233100-de7b-11eb-9184-478477034c9e.png">

```bash
$ > git log --branched --decorate
$ > git log --branched --decorate --graph
$ > git log --branches --decorate --graph --oneline
```

- 서로의 커밋 상태가 각자의 길을 걷고 있는 경우 확연하게 차이를 확인할 수 있다
- exp 브랜치에서 commit한 후 mater 브랜치에서도 commit을 해야 차이 확인 가능

### 버전과 버전간의 차이점 확인

```bash
$ > git log master..exp  #exp에는 있고 master에는 없는 것
$ > git log exp..master  #master에는 있고 exp에는 없는 것
```

### 브랜치 병합

```bash
$ > git merge exp #master 브랜치에서 수행해야 한다
```

- `exp`에서 `master`로 `병합`을 하려면 master 브랜치에서 `merge` 명령어를 수행

### 참고 자료

- [Git branch](https://www.youtube.com/watch?v=PmWPdYkAMg4&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=20)
- [Git create branch](https://www.youtube.com/watch?v=GK8R3SjG3B4&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=21)
