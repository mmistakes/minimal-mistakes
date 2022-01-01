---
layout: single
title: "[Git] Git reset, revert"
categories: Git
tag: [Git, Version Control]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ reset vs revert

> 프로젝트를 진행 하다보면 본인이 커밋(commit)한 내용을 과거의 상태로 돌려야 하는 경우가 생긴다, 이 때 Git은 reset, revert Command를 통해 과거의 버전을 복구하는 기능을 제공한다.

### reset

```bash
$ > git reset <옵션> <돌아가고싶은 커밋id>
```

#### git reset 명령어에는 아래 세 가지 옵션을 줄 수 있다

- **hard**: 파일 내용까지 전부 되돌린다 (**해당 시점 이후 이력 다 날려버림**)
- **mixed(default)**: 파일 내용은 그대로 유지하면서 stagin area에 안 올림 (**add 전 상태**)
- **soft**: 파일 내용은 그대로 유지하면서 staging area에 올림 (**add 상태**)

### reset option

**--hard**

```bash
$ > git commit -m "1"
$ > git commit -m "2"
$ > git commit -m "3"

git reset --hard [1번 커밋 hash]
git push
```

- **hard 옵션 사용 시 돌아간 커밋 이후 모든 변경 이력은 모두 삭제됨**
- 즉, 위처럼 command를 작성하면 1번 이후의 변경 이력(2번, 3번)은 모두 사라짐

**--mixed**

```bash
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --mixed [1번commit hash]
git add .
git commit -m "~"
git push
```

- **변경 이력**은 모두 삭제하지만, **변경 내용**은 모두 남아있음
- **변경 내용**이 남아있다는 의미는 **파일에서 수정된 내용**은 변경이 안된다는 의미
- 위처럼 실행 시 커밋 이력은 날라가지만 **unStage 상태**의 코드는 남아 있다

**--soft**

```bash
git commit -m "1"
git commit -m "2"
git commit -m "3"

git reset --soft [1번commit hash]
git commit -m "~"
git push
```

- 변경 이력은 모두 삭제하지만 변경 내용은 모두 남아있으며, stage 상태
- add 명령어 필요없이 바로 commit 진행 가능

### origin에 올린 상태에서 reset하고 push 한다면?

- 로컬은 origin에 있는 commit을 삭제한 채로 origin에 덮으려고 하니 당연히 에러가 뜬다.
- --force 옵션을 주어 강제로 로컬 commit history를 origin commit history로 덮어쓴다.
- 즉, 만약 해당 리포를 다른 사람들과 공유하고 있다면 무조건 하시면 안되는 행동이다.

### revert

```bash
$ > git commit -m "1번 커밋"
$ > git commit -m "2번 커밋"
$ > git commit -m "3번 커밋"

$ > git revert [1번commit hash]
```

위처럼 명령 실행 시 1번 커밋 이후의 커밋이 삭제되는 것이 아닌, 1번 커밋에 해당되는 내용만
삭제가 된다. 그리고 Revert "1번 커밋"이라는 커밋에는 1번 커밋이 삭제된 이력을 남긴다

```bash
Revert "1번 커밋" # Revert할 경우 남는 커밋
3번 커밋
2번 커밋
1번 커밋
```

- 이전 커밋 내역을 그대로 남겨둔 채 새로운 커밋 생성
- 다른 사람과 공유하는 브랜치에서는 revert 사용 지향
- reset 사용하다가 잘못하면 커밋 히스토리가 변경 되면 충돌이 발생할 수 있음

### 참고 자료

- [Git revert, reset](https://www.youtube.com/watch?v=eVo2lmkXaDc&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=11)
- [그림으로 보는 reset, revert 차이](http://www.devpools.kr/2017/01/31/%EA%B0%9C%EB%B0%9C%EB%B0%94%EB%B3%B4%EB%93%A4-1%ED%99%94-git-back-to-the-future/)
- [git reset, revert 이전 커밋으로 돌리기](https://kyounghwan01.github.io/blog/etc/git/git-reset-revert/#%E1%84%8B%E1%85%B5-%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B3%E1%86%AF-%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2)
